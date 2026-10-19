<?php
/**
 * Plugin Name: Headless SEO Foundation
 * Description: Adds one SEO contract for the Next.js storefront to WP and WooCommerce REST responses.
 * Version: 1.1.0
 */

defined( 'ABSPATH' ) || exit;

final class OD_Headless_SEO_Foundation {
    private const REST_FIELD = 'headless_seo';
    private const FIELD_TITLE = 'seo_title';
    private const FIELD_DESCRIPTION = 'seo_description';
    private const FIELD_IMAGE = 'seo_og_image';
    private const FIELD_NOINDEX = 'seo_noindex';
    private const FIELD_CANONICAL = 'seo_canonical_url';
    private const SOCIAL_FIELDS = array(
        'og_title'            => 'seo_og_title',
        'og_description'      => 'seo_og_description',
        'twitter_title'       => 'seo_twitter_title',
        'twitter_description' => 'seo_twitter_description',
        'twitter_image'       => 'seo_twitter_image',
    );
    private const INFORMATION_PAGE_SLUGS = array(
        'o-nas', 'kontakty', 'zamery', 'oplata', 'dostavka', 'ustanovka',
        'podryadchikam', 'arkhitektoram', 'uhod-i-obsluzhivanie', 'garantiya',
    );

    public static function init(): void {
        add_action( 'acf/init', array( __CLASS__, 'register_acf_fields' ) );
        add_filter( 'acf/prepare_field/key=field_od_seo_canonical_url', array( __CLASS__, 'prepare_canonical_field' ) );
        add_filter( 'acf/validate_value/key=field_od_seo_canonical_url', array( __CLASS__, 'validate_canonical_value' ), 10, 2 );
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

        $social_fields = array();
        foreach ( array(
            'og_title'            => 'Open Graph title',
            'og_description'      => 'Open Graph description',
            'twitter_title'       => 'Twitter/X title',
            'twitter_description' => 'Twitter/X description',
        ) as $key => $label ) {
            $is_description = str_ends_with( $key, 'description' );
            $social_fields[] = array(
                'key'          => 'field_od_' . self::SOCIAL_FIELDS[ $key ],
                'label'        => $label,
                'name'         => self::SOCIAL_FIELDS[ $key ],
                'type'         => $is_description ? 'textarea' : 'text',
                'instructions' => str_starts_with( $key, 'og_' )
                    ? 'Необязательно. Если пусто, используется соответствующее общее SEO-значение.'
                    : 'Необязательно. Если пусто, используется соответствующее значение Open Graph.',
                'rows'         => 3,
                'new_lines'    => '',
                'wrapper'      => array( 'width' => '50' ),
            );
        }

        acf_add_local_field_group(
            array(
                'key'                   => 'group_od_headless_seo',
                'title'                 => 'SEO для headless-сайта',
                'fields'                => array_merge( array(
                    array(
                        'key'          => 'field_od_seo_title',
                        'label'        => 'SEO title',
                        'name'         => self::FIELD_TITLE,
                        'type'         => 'text',
                        'instructions' => 'Выводится буквально, без добавления бренда. Если пусто, Next.js использует существующую генерацию заголовка.',
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
                ), $social_fields, array(
                    array(
                        'key'           => 'field_od_seo_twitter_image',
                        'label'         => 'Изображение Twitter/X',
                        'name'          => self::SOCIAL_FIELDS['twitter_image'],
                        'type'          => 'image',
                        'instructions'  => 'Необязательно. Если пусто, используется изображение Open Graph.',
                        'return_format' => 'id',
                        'preview_size'  => 'medium',
                        'library'       => 'all',
                        'wrapper'       => array( 'width' => '50' ),
                    ),
                    array(
                        'key'          => 'field_od_seo_canonical_url',
                        'label'        => 'Canonical: внутренний путь',
                        'name'         => self::FIELD_CANONICAL,
                        'type'         => 'text',
                        'instructions' => 'Только для информационных страниц, статей и проектов портфолио. Например: /o-nas. Без домена, query и #fragment. Целевой URL должен существовать и быть индексируемым. Если пусто, Canonical автоматический. При ссылке на другой URL эта страница исключается из Sitemap.',
                    ),
                ) ),
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

    private static function allows_canonical_override( int $post_id ): bool {
        $post_type = get_post_type( $post_id );
        return in_array( $post_type, array( 'post', 'portfolio_project' ), true )
            || ( 'page' === $post_type && in_array( get_post_field( 'post_name', $post_id ), self::INFORMATION_PAGE_SLUGS, true ) );
    }

    public static function prepare_canonical_field( $field ) {
        $post_id = function_exists( 'acf_get_form_data' ) ? (int) acf_get_form_data( 'post_id' ) : 0;
        return $post_id > 0 && self::allows_canonical_override( $post_id ) ? $field : false;
    }

    public static function validate_canonical_value( $valid, $value ) {
        if ( true !== $valid || '' === trim( (string) $value ) ) return $valid;

        $value = trim( (string) $value );
        $decoded = rawurldecode( $value );
        if ( ! str_starts_with( $value, '/' ) || str_starts_with( $value, '//' )
            || preg_match( '/%(?:2f|5c|25)/i', $value )
            || preg_match( '/[\s\\\\?#%\x00-\x1f\x7f]/u', $decoded )
            || str_contains( $decoded, '//' )
            || preg_match( '~(?:^|/)\.{1,2}(?:/|$)~', $decoded )
            || preg_match( '~^/(api|checkout|shopping-cart|feeds)(/|$)~i', $decoded )
            || preg_match( '~\.(xml|txt)(/|$)~i', $decoded ) ) {
            return 'Укажите внутренний путь storefront без домена, query, fragment, технических маршрутов и переходов через ..';
        }

        return $valid;
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
            self::get_post_field_value( self::FIELD_NOINDEX, $post_id ),
            self::get_social_values( static fn( string $name ) => self::get_post_field_value( $name, $post_id ) ),
            self::allows_canonical_override( $post_id ) ? self::get_post_field_value( self::FIELD_CANONICAL, $post_id ) : null
        );
    }

    private static function build_term_seo( WP_Term $term ): array {
        return self::build_seo_payload(
            self::get_term_field_value( self::FIELD_TITLE, $term ),
            self::get_term_field_value( self::FIELD_DESCRIPTION, $term ),
            self::get_term_field_value( self::FIELD_IMAGE, $term ),
            self::get_term_field_value( self::FIELD_NOINDEX, $term ),
            self::get_social_values( static fn( string $name ) => self::get_term_field_value( $name, $term ) )
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

    private static function get_social_values( callable $get_value ): array {
        $values = array();
        foreach ( self::SOCIAL_FIELDS as $key => $name ) {
            $values[ $key ] = $get_value( $name );
        }
        return $values;
    }

    private static function build_seo_payload( $title, $description, $image_value, $noindex, array $social = array(), $canonical = null ): array {
        return array(
            'title'       => self::sanitize_optional_text( $title ),
            'description' => self::sanitize_optional_textarea( $description ),
            'image'       => self::resolve_image( $image_value ),
            'noindex'     => self::to_bool( $noindex ),
            'og_title'            => self::sanitize_optional_text( $social['og_title'] ?? null ),
            'og_description'      => self::sanitize_optional_textarea( $social['og_description'] ?? null ),
            'twitter_title'       => self::sanitize_optional_text( $social['twitter_title'] ?? null ),
            'twitter_description' => self::sanitize_optional_textarea( $social['twitter_description'] ?? null ),
            'twitter_image'       => self::resolve_image( $social['twitter_image'] ?? null ),
            'canonical_url'       => self::sanitize_optional_text( $canonical ),
        );
    }

    private static function empty_seo(): array {
        return self::build_seo_payload( null, null, null, false );
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
        $image_schema = array(
            'type'       => array( 'object', 'null' ),
            'properties' => array(
                'id'  => array( 'type' => 'integer' ),
                'url' => array( 'type' => 'string', 'format' => 'uri' ),
                'alt' => array( 'type' => array( 'string', 'null' ) ),
            ),
        );

        return array(
            'description' => 'SEO fields consumed by the headless Next.js storefront.',
            'type'        => 'object',
            'context'     => array( 'view', 'edit' ),
            'readonly'    => true,
            'properties'  => array(
                'title'       => array( 'type' => array( 'string', 'null' ) ),
                'description' => array( 'type' => array( 'string', 'null' ) ),
                'image'       => $image_schema,
                'noindex'     => array( 'type' => 'boolean' ),
                'og_title'            => array( 'type' => array( 'string', 'null' ) ),
                'og_description'      => array( 'type' => array( 'string', 'null' ) ),
                'twitter_title'       => array( 'type' => array( 'string', 'null' ) ),
                'twitter_description' => array( 'type' => array( 'string', 'null' ) ),
                'twitter_image'       => $image_schema,
                'canonical_url'       => array( 'type' => array( 'string', 'null' ) ),
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
