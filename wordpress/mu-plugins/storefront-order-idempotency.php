<?php
/**
 * Plugin Name: Storefront Order Idempotency
 * Description: Prevents duplicate WooCommerce orders created by the Next.js storefront BFF.
 * Version: 1.0.0
 */

defined( 'ABSPATH' ) || exit;

final class OD_Storefront_Order_Idempotency {
    private const META_KEY = '_storefront_idempotency_key';
    private const PAYLOAD_HASH_META_KEY = '_storefront_payload_hash';
    private const LOCK_PREFIX = 'od_storefront_order_lock_';
    private const LOCK_TTL_SECONDS = 90;

    private static ?string $active_lock_option = null;

    public static function init(): void {
        // rest_dispatch_request runs after the route permission_callback, so replay never bypasses Woo authentication.
        add_filter( 'rest_dispatch_request', array( __CLASS__, 'before_dispatch' ), 9, 4 );
        add_filter( 'rest_request_after_callbacks', array( __CLASS__, 'after_dispatch' ), 10, 3 );
        add_action( 'shutdown', array( __CLASS__, 'release_active_lock' ) );
    }

    public static function before_dispatch(
        $result,
        WP_REST_Request $request,
        string $route,
        array $handler
    ) {
        unset( $route, $handler );

        if ( null !== $result || ! self::is_order_create_request( $request ) ) {
            return $result;
        }

        $idempotency_key = self::get_request_meta_value( $request, self::META_KEY );
        $payload_hash    = self::get_request_meta_value( $request, self::PAYLOAD_HASH_META_KEY );

        if ( '' === $idempotency_key ) {
            return $result;
        }

        if ( ! preg_match( '/^[A-Za-z0-9][A-Za-z0-9._:-]{15,127}$/', $idempotency_key ) ) {
            return new WP_Error(
                'storefront_idempotency_key_invalid',
                'Invalid storefront idempotency key.',
                array( 'status' => 400 )
            );
        }

        if ( '' === $payload_hash || ! preg_match( '/^[a-f0-9]{64}$/', $payload_hash ) ) {
            return new WP_Error(
                'storefront_payload_hash_invalid',
                'Invalid storefront payload hash.',
                array( 'status' => 400 )
            );
        }

        $existing_order = self::find_existing_order( $idempotency_key );
        if ( $existing_order instanceof WC_Order ) {
            return self::build_replay_response( $existing_order, $payload_hash );
        }

        $lock_option = self::get_lock_option_name( $idempotency_key );
        self::remove_stale_lock( $lock_option );

        if ( ! add_option( $lock_option, time(), '', false ) ) {
            $existing_order = self::find_existing_order( $idempotency_key );
            if ( $existing_order instanceof WC_Order ) {
                return self::build_replay_response( $existing_order, $payload_hash );
            }

            return new WP_Error(
                'storefront_order_in_progress',
                'An order with this idempotency key is already being processed.',
                array(
                    'status'      => 409,
                    'retry_after' => 2,
                )
            );
        }

        self::$active_lock_option = $lock_option;
        return $result;
    }

    public static function after_dispatch( $result, array $handler, WP_REST_Request $request ) {
        unset( $handler );

        if ( self::is_order_create_request( $request ) ) {
            self::release_active_lock();
        }

        return $result;
    }

    public static function release_active_lock(): void {
        if ( null === self::$active_lock_option ) {
            return;
        }

        delete_option( self::$active_lock_option );
        self::$active_lock_option = null;
    }

    private static function is_order_create_request( WP_REST_Request $request ): bool {
        return 'POST' === strtoupper( $request->get_method() )
            && 1 === preg_match( '#^/wc/v3/orders/?$#', $request->get_route() );
    }

    private static function get_request_meta_value( WP_REST_Request $request, string $key ): string {
        $params    = $request->get_json_params();
        $meta_data = is_array( $params['meta_data'] ?? null ) ? $params['meta_data'] : array();

        foreach ( $meta_data as $meta_item ) {
            if ( ! is_array( $meta_item ) || (string) ( $meta_item['key'] ?? '' ) !== $key ) {
                continue;
            }

            $value = $meta_item['value'] ?? '';
            return is_scalar( $value ) ? trim( (string) $value ) : '';
        }

        return '';
    }

    private static function get_lock_option_name( string $idempotency_key ): string {
        return self::LOCK_PREFIX . hash( 'sha256', $idempotency_key );
    }

    private static function remove_stale_lock( string $lock_option ): void {
        $created_at = (int) get_option( $lock_option, 0 );
        if ( $created_at > 0 && $created_at < time() - self::LOCK_TTL_SECONDS ) {
            delete_option( $lock_option );
        }
    }

    private static function find_existing_order( string $idempotency_key ): ?WC_Order {
        if ( ! function_exists( 'wc_get_orders' ) ) {
            return null;
        }

        $orders = wc_get_orders(
            array(
                'limit'      => 1,
                'orderby'    => 'date',
                'order'      => 'DESC',
                'return'     => 'objects',
                'meta_query' => array(
                    array(
                        'key'     => self::META_KEY,
                        'value'   => $idempotency_key,
                        'compare' => '=',
                    ),
                ),
            )
        );

        $order = is_array( $orders ) ? reset( $orders ) : null;
        return $order instanceof WC_Order ? $order : null;
    }

    private static function build_replay_response( WC_Order $order, string $payload_hash ) {
        $stored_payload_hash = (string) $order->get_meta( self::PAYLOAD_HASH_META_KEY, true );

        if ( '' !== $stored_payload_hash && ! hash_equals( $stored_payload_hash, $payload_hash ) ) {
            return new WP_Error(
                'storefront_idempotency_conflict',
                'The idempotency key was already used with another payload.',
                array( 'status' => 409 )
            );
        }

        return new WP_REST_Response(
            array(
                'id'                               => $order->get_id(),
                'number'                           => $order->get_order_number(),
                'status'                           => $order->get_status(),
                'total'                            => $order->get_total(),
                'storefront_idempotency_replayed' => true,
            ),
            200,
            array( 'X-Idempotent-Replay' => 'true' )
        );
    }
}

OD_Storefront_Order_Idempotency::init();
