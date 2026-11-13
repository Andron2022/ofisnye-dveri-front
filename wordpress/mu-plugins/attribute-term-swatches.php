<?php
/**
 * Plugin Name: Attribute Term Swatches (MU)
 * Description: Public, normalized visual metadata for existing Woo attribute terms.
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

final class OD_Attribute_Term_Swatches {
    private const TAXONOMIES = array( 'pa_tsvet-dveri', 'pa_tsvet-paneli' );

    public static function register_routes(): void {
        register_rest_route( 'od/v1', '/attribute-term-swatches', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array( __CLASS__, 'rest_get' ),
            'permission_callback' => '__return_true',
            'args' => array(
                'taxonomy' => array( 'type' => 'string', 'required' => true, 'enum' => self::TAXONOMIES ),
                // Optional canonical assignments bridge Woo's string-valued product attributes.
                'product_ids' => array(
                    'type' => 'string',
                    'validate_callback' => static function ( $value ): bool {
                        return is_string( $value ) && 1 === preg_match( '/^[1-9][0-9]*(,[1-9][0-9]*){0,99}$/D', $value );
                    },
                ),
            ),
        ) );
    }

    private static function image_source( int $id, array $sizes, int $max_dimension ): ?string {
        foreach ( $sizes as $size ) {
            $image = wp_get_attachment_image_src( $id, $size );
            // WP falls back to the original when a derivative is missing. Never expose a large original.
            if ( $image && (int) $image[1] > 0 && (int) $image[2] > 0 && max( (int) $image[1], (int) $image[2] ) <= $max_dimension ) {
                $url = esc_url_raw( $image[0], array( 'http', 'https' ) );
                if ( $url ) return $url;
            }
        }
        return null;
    }

    private static function descriptor( WP_Term $term ): array {
        $issues = array();
        $type = get_term_meta( $term->term_id, 'swatch_type', true );
        if ( ! in_array( $type, array( 'color', 'image' ), true ) ) {
            $issues[] = $type ? 'invalid_type' : 'missing_metadata';
            $type = 'color';
        }
        $raw_order = get_term_meta( $term->term_id, 'swatch_order', true );
        $order = filter_var( $raw_order, FILTER_VALIDATE_INT, array( 'options' => array( 'min_range' => 0 ) ) );
        if ( false === $order ) {
            if ( '' !== $raw_order ) $issues[] = 'invalid_order';
            $order = 0;
        }

        $color = null;
        $thumbnail = null;
        $preview = null;
        if ( 'color' === $type ) {
            $raw_color = get_term_meta( $term->term_id, 'swatch_color', true );
            $color = is_string( $raw_color ) ? sanitize_hex_color( $raw_color ) : null;
            if ( ! $color ) { $color = null; $issues[] = 'invalid_color'; }
        } else {
            // ACF stores an attachment ID even when the field return format is URL.
            // Read the raw term meta; no field-group REST exposure or ACF formatting is needed.
            $raw_id = get_term_meta( $term->term_id, 'swatch_image', true );
            $id = filter_var( $raw_id, FILTER_VALIDATE_INT, array( 'options' => array( 'min_range' => 1 ) ) );
            if ( $id && 'attachment' === get_post_type( $id ) && 'trash' !== get_post_status( $id ) && wp_attachment_is_image( $id ) ) {
                $thumbnail = self::image_source( $id, array( 'thumbnail', 'medium' ), 320 );
                $preview = self::image_source( $id, array( 'medium', 'medium_large', 'thumbnail' ), 800 );
            }
            if ( ! $thumbnail || ! $preview ) {
                $thumbnail = null;
                $preview = null;
                $issues[] = 'missing_image_or_sizes';
            }
        }

        return array(
            'term_id' => (int) $term->term_id,
            'taxonomy' => $term->taxonomy,
            'name' => $term->name,
            'slug' => $term->slug,
            'type' => $type,
            'color' => $color,
            'thumbnail_url' => $thumbnail,
            'preview_url' => $preview,
            'order' => $order,
            'issues' => $issues,
        );
    }

    public static function rest_get( WP_REST_Request $request ) {
        $taxonomy = (string) $request->get_param( 'taxonomy' );
        if ( ! in_array( $taxonomy, self::TAXONOMIES, true ) || ! taxonomy_exists( $taxonomy ) ) {
            return new WP_Error( 'od_swatch_taxonomy', 'Swatch taxonomy is not available.', array( 'status' => 400 ) );
        }
        $terms = get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => false, 'orderby' => 'term_id', 'update_term_meta_cache' => true ) );
        if ( is_wp_error( $terms ) ) return $terms;

        // Prime all referenced attachments and their metadata together, avoiding a media query per term.
        $image_ids = array();
        foreach ( $terms as $term ) {
            if ( 'image' === get_term_meta( $term->term_id, 'swatch_type', true ) ) {
                $id = absint( get_term_meta( $term->term_id, 'swatch_image', true ) );
                if ( $id ) $image_ids[] = $id;
            }
        }
        if ( $image_ids ) {
            get_posts( array( 'post_type' => 'attachment', 'post_status' => array( 'inherit', 'publish', 'private' ), 'post__in' => array_unique( $image_ids ), 'numberposts' => -1 ) );
        }

        $products = array();
        $raw_ids = (string) $request->get_param( 'product_ids' );
        if ( '' !== $raw_ids ) {
            // Only published product assignments are public, never drafts or administrative metadata.
            $ids = get_posts( array(
                'post_type' => 'product', 'post_status' => 'publish', 'fields' => 'ids',
                'post__in' => array_unique( array_map( 'absint', explode( ',', $raw_ids ) ) ), 'numberposts' => -1,
            ) );
            $assignments = $ids ? wp_get_object_terms( $ids, $taxonomy, array( 'fields' => 'all_with_object_id' ) ) : array();
            if ( is_wp_error( $assignments ) ) return $assignments;
            $by_product = array_fill_keys( $ids, array() );
            foreach ( $assignments as $term ) $by_product[ $term->object_id ][] = (int) $term->term_id;
            ksort( $by_product, SORT_NUMERIC );
            foreach ( $by_product as $product_id => $term_ids ) {
                sort( $term_ids, SORT_NUMERIC );
                $products[] = array( 'product_id' => (int) $product_id, 'term_ids' => $term_ids );
            }
        }

        return rest_ensure_response( array(
            'schema_version' => 1,
            'taxonomy' => $taxonomy,
            'items' => array_map( array( __CLASS__, 'descriptor' ), $terms ),
            'products' => $products,
        ) );
    }
}

add_action( 'rest_api_init', array( 'OD_Attribute_Term_Swatches', 'register_routes' ) );
