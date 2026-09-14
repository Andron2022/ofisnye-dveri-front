<?php
/**
 * Plugin Name: Headless SEO Foundation
 * Description: Adds one SEO contract for the Next.js storefront to WP and WooCommerce REST responses.
 * Version: 1.0.0
 */

defined( 'ABSPATH' ) || exit;

final class OD_Headless_SEO_Foundation {
    private const REST_FIELD = 'headless_seo';
    private const FIELD_TITLE = 'seo_title';
    private const FIELD_DESCRIPTION = 'seo_description';
    private const FIELD_IMAGE = 'seo_og_image';
    private const FIELD_NOINDEX = 'seo_noindex';

    public static function init(): void {
        add_action( 'acf/init', array( __CLASS__, 'register_acf_fields' ) );
        add_action( 'rest_api_init', array( __CLASS__, 'register_wp_rest_fields' ) );
        add_filter( 'woocommerce_rest_prepare_product_object', array( __CLASS__, 'extend_product_response' ), 10, 3 );
        add_filter( 'woocommerce_rest_prepare_product_cat', array( __CLASS__, 'extend_product_category_response' ), 10, 3 );
        add_filter( 'wp_robots', array( __CLASS__, 'block_wp_frontend_indexing' ) );
        add_filter( 'wp_sitemaps_enabled', '__return_false' );
        add_action( 'send_headers', array( __CLASS__, 'send_wp_frontend_noindex_header' ) );
    }

    public static function register_acf_fields(): void {
        if ( ! function_exists( 'acf_add_local_field_group' ) ) {
            return;
        }

        acf_add_local_field_group(
            array(
                'key'                   => 'group_od_headless_seo',
                'title'                 => 'SEO для headless-сайта',
                'fields'                => array(
                    array(
                        'key'          => 'field_od_seo_title',
                        'label'        => 'SEO title',
                        'name'         => self::FIELD_TITLE,
                        'type'         => 'text',
                        'instructions' => 'Необязательно. Если поле пустое, Next.js использует название страницы, записи, товара или категории.',
                        'maxlength'    => 70,
                        'wrapper'      => array( 'width' => '50' ),
                    ),
                    array(
                        'key'          => 'field_od_seo_description',
                        'label'        => 'Meta description',
                        'name'         => self::FIELD_DESCRIPTION,
                        'type'         => 'textarea',
                        'instructions' => 'Необязательно. Краткое описание страницы для поисковой выдачи и социальных сетей.',
                        'rows'         => 3,
                        'maxlength'    => 220,
                        'new_lines'    => '',
                        'wrapper'      => array( 'width' => '50' ),
                    ),
                    array(
                        'key'           => 'field_od_seo_og_image',
                        'label'         => 'Изображение для соцсетей (OG)',
                        'name'          => self::FIELD_IMAGE,
                        'type'          => 'image',
                        'instructions'  => 'Необязательно. Рекомендуемое соотношение сторон 1.91:1. Если поле пустое, используется основное изображение материала или товара.',
                        'return_format' => 'id',
                        'preview_size'  => 'medium',
                        'library'       => 'all',
                        'wrapper'       => array( 'width' => '50' ),
                    ),
                    array(
                        'key'           => 'field_od_seo_noindex',
                        'label'         => 'Не индексировать',
                        'name'          => self::FIELD_NOINDEX,
                        'type'          => 'true_false',
                        'instructions'  => 'Включайте только для страниц, которые не должны попадать в поисковую выдачу и sitemap.',
                        'ui'            => 1,
                        'default_value' => 0,
                        'wrapper'       => array( 'width' => '50' ),
                    ),
                ),
                'location'              => array(
                    array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'page' ) ),
                    array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ) ),
                    array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'portfolio_project' ) ),
                    array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ),
                    array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'door_seo_landing' ) ),
                    array( array( 'param' => 'taxonomy', 'operator' => '==', 'value' => 'product_cat' ) ),
                ),
                'position'              => 'normal',
                'style'                 => 'default',
                'label_placement'       => 'top',
                'instruction_placement' => 'label',
                'active'                => true,
                'show_in_rest'          => false,
            )
        );
    }

    public static function register_wp_rest_fields(): void {
        register_rest_field(
            array( 'page', 'post', 'portfolio_project', 'door_seo_landing' ),
            self::REST_FIELD,
            array(
                'get_callback' => static function ( array $object ): array {
                    return self::build_post_seo( (int) ( $object['id'] ?? 0 ) );
                },
                'schema'       => self::get_rest_schema(),
            )
        );
    }

    public static function extend_product_response( $response, $product, $request ) {
        unset( $request );

        if ( ! $response instanceof WP_REST_Response || ! $product instanceof WC_Product ) {
            return $response;
        }

        $data                     = $response->get_data();
        $data[ self::REST_FIELD ] = self::build_post_seo( $product->get_id() );
        $response->set_data( $data );

        return $response;
    }

    public static function extend_product_category_response( $response, $term, $request ) {
        unset( $request );

        if ( ! $response instanceof WP_REST_Response || ! $term instanceof WP_Term ) {
            return $response;
        }

        $data                     = $response->get_data();
        $data[ self::REST_FIELD ] = self::build_term_seo( $term );
        $response->set_data( $data );

        return $response;
    }

    public static function block_wp_frontend_indexing( array $robots ): array {
        if ( ! self::is_public_wp_html_request() ) {
            return $robots;
        }

        $robots['noindex']  = true;
        $robots['nofollow'] = true;
        unset( $robots['index'], $robots['follow'] );

        return $robots;
    }

    public static function send_wp_frontend_noindex_header(): void {
        if ( self::is_public_wp_html_request() && ! headers_sent() ) {
            header( 'X-Robots-Tag: noindex, nofollow', true );
        }
    }

    public static function get_post_seo( int $post_id ): array {
        return self::build_post_seo( $post_id );
    }

    private static function build_post_seo( int $post_id ): array {
        if ( $post_id <= 0 ) {
            return self::empty_seo();
        }

        return self::build_seo_payload(
            self::get_post_field_value( self::FIELD_TITLE, $post_id ),
            self::get_post_field_value( self::FIELD_DESCRIPTION, $post_id ),
            self::get_post_field_value( self::FIELD_IMAGE, $post_id ),
            self::get_post_field_value( self::FIELD_NOINDEX, $post_id )
        );
    }

    private static function build_term_seo( WP_Term $term ): array {
        return self::build_seo_payload(
            self::get_term_field_value( self::FIELD_TITLE, $term ),
            self::get_term_field_value( self::FIELD_DESCRIPTION, $term ),
            self::get_term_field_value( self::FIELD_IMAGE, $term ),
            self::get_term_field_value( self::FIELD_NOINDEX, $term )
        );
    }

    private static function get_post_field_value( string $field_name, int $post_id ) {
        if ( function_exists( 'get_field' ) ) {
            return get_field( $field_name, $post_id, false );
        }

        return get_post_meta( $post_id, $field_name, true );
    }

    private static function get_term_field_value( string $field_name, WP_Term $term ) {
        if ( function_exists( 'get_field' ) ) {
            return get_field( $field_name, $term, false );
        }

        return get_term_meta( $term->term_id, $field_name, true );
    }

    private static function build_seo_payload( $title, $description, $image_value, $noindex ): array {
        return array(
            'title'       => self::sanitize_optional_text( $title ),
            'description' => self::sanitize_optional_textarea( $description ),
            'image'       => self::resolve_image( $image_value ),
            'noindex'     => self::to_bool( $noindex ),
        );
    }

    private static function empty_seo(): array {
        return array(
            'title'       => null,
            'description' => null,
            'image'       => null,
            'noindex'     => false,
        );
    }

    private static function sanitize_optional_text( $value ): ?string {
        if ( ! is_scalar( $value ) ) {
            return null;
        }

        $value = trim( sanitize_text_field( (string) $value ) );
        return '' !== $value ? $value : null;
    }

    private static function sanitize_optional_textarea( $value ): ?string {
        if ( ! is_scalar( $value ) ) {
            return null;
        }

        $value = trim( preg_replace( '/\s+/u', ' ', sanitize_textarea_field( (string) $value ) ) );
        return '' !== $value ? $value : null;
    }

    private static function resolve_image( $value ): ?array {
        $attachment_id = 0;

        if ( is_numeric( $value ) ) {
            $attachment_id = (int) $value;
        } elseif ( is_array( $value ) ) {
            $attachment_id = (int) ( $value['ID'] ?? $value['id'] ?? 0 );
        } elseif ( is_string( $value ) && filter_var( $value, FILTER_VALIDATE_URL ) ) {
            $attachment_id = attachment_url_to_postid( $value );
        }

        if ( $attachment_id <= 0 ) {
            return null;
        }

        $url = wp_get_attachment_image_url( $attachment_id, 'full' );
        if ( ! $url ) {
            return null;
        }

        return array(
            'id'  => $attachment_id,
            'url' => esc_url_raw( $url ),
            'alt' => self::sanitize_optional_text( get_post_meta( $attachment_id, '_wp_attachment_image_alt', true ) ),
        );
    }

    private static function to_bool( $value ): bool {
        if ( is_bool( $value ) ) {
            return $value;
        }

        if ( is_numeric( $value ) ) {
            return 1 === (int) $value;
        }

        return in_array( strtolower( trim( (string) $value ) ), array( '1', 'true', 'yes', 'on' ), true );
    }

    private static function get_rest_schema(): array {
        return array(
            'description' => 'SEO fields consumed by the headless Next.js storefront.',
            'type'        => 'object',
            'context'     => array( 'view', 'edit' ),
            'readonly'    => true,
            'properties'  => array(
                'title'       => array( 'type' => array( 'string', 'null' ) ),
                'description' => array( 'type' => array( 'string', 'null' ) ),
                'image'       => array(
                    'type'       => array( 'object', 'null' ),
                    'properties' => array(
                        'id'  => array( 'type' => 'integer' ),
                        'url' => array( 'type' => 'string', 'format' => 'uri' ),
                        'alt' => array( 'type' => array( 'string', 'null' ) ),
                    ),
                ),
                'noindex'     => array( 'type' => 'boolean' ),
            ),
        );
    }

    private static function is_public_wp_html_request(): bool {
        if ( is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
            return false;
        }

        if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
            return false;
        }

        if ( function_exists( 'wp_is_json_request' ) && wp_is_json_request() ) {
            return false;
        }

        if ( defined( 'WP_CLI' ) && WP_CLI ) {
            return false;
        }

        return true;
    }
}

OD_Headless_SEO_Foundation::init();
