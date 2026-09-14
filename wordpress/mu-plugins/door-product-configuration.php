<?php
/**
 * Plugin Name: Door Product Schema & Configuration Policy (MU)
 * Description: Data-driven door schema registry, configuration policies, dependency guards and resolved headless contract.
 * Version: 2.0.0
 */

defined( 'ABSPATH' ) || exit;

final class OD_Door_Product_Configuration {
    private const VERSION = 2;
    private const REST_NAMESPACE = 'od/v1';
    private const ROOT_CATEGORY_SLUG = 'mezhkomnatnye-dveri';
    private const ACCESSORY_ROOT_CATEGORY_SLUG = 'furnitura';

    private const OPTION_ATTRIBUTE_REGISTRY = 'od_door_attribute_registry_v2';
    private const OPTION_ATTRIBUTE_HISTORY = 'od_door_attribute_history_v2';
    private const OPTION_OPTION_REGISTRY = 'od_door_option_registry_v2';
    private const OPTION_FALLBACK_MODES = 'od_door_fallback_modes_v2';
    private const POLICY_META = 'od_door_configuration_policy_v2';
    private const CANONICAL_CATEGORY_META = 'od_door_configuration_category_id_v2';

    private const ADMIN_PAGE = 'od-door-configuration-v2';

    /** @var array<string,array>|null Request-local snapshot; persistent source is wp_options. */
    private static ?array $attribute_registry_cache = null;

    private const LEGACY_FILTERS = array(
        'tsvet-dveri' => array( 'taxonomy' => 'pa_tsvet-dveri', 'label' => 'Цвет двери', 'order' => 10, 'display_type' => 'color' ),
        'razmer-dveri' => array( 'taxonomy' => 'pa_razmer-dveri', 'label' => 'Размер двери', 'order' => 20, 'display_type' => 'buttons' ),
        'kolichestvo-poloten' => array( 'taxonomy' => 'pa_kolichestvo-poloten', 'label' => 'Количество полотен', 'order' => 30, 'display_type' => 'buttons' ),
        'material-dveri' => array( 'taxonomy' => 'pa_material-dveri', 'label' => 'Материал двери', 'order' => 40, 'display_type' => 'checkbox' ),
        'osteklenie' => array( 'taxonomy' => 'pa_osteklenie', 'label' => 'Остекление', 'order' => 50, 'display_type' => 'checkbox' ),
        'tip-otkryvaniya' => array( 'taxonomy' => 'pa_tip-otkryvaniya', 'label' => 'Тип открывания', 'order' => 60, 'display_type' => 'checkbox' ),
        'naznachenie' => array( 'taxonomy' => 'pa_naznachenie', 'label' => 'Назначение', 'order' => 70, 'display_type' => 'checkbox' ),
        'napravlenie-otkryvaniya' => array( 'taxonomy' => 'pa_napravlenie-otkryvaniya', 'label' => 'Направление открывания', 'order' => 80, 'display_type' => 'checkbox' ),
        'ognestoykost' => array( 'taxonomy' => 'pa_ognestoykost', 'label' => 'Огнестойкость', 'order' => 90, 'display_type' => 'checkbox' ),
        'tip-ostekleniya' => array( 'taxonomy' => 'pa_tip-ostekleniya', 'label' => 'Тип остекления', 'order' => 100, 'display_type' => 'checkbox' ),
    );

    public static function init(): void {
        // Registry discovery must not run on every public REST request. It is
        // persisted in wp_options and refreshed only from admin/lifecycle events.
        add_action( 'admin_init', array( __CLASS__, 'sync_attribute_registry' ), 45 );
        add_action( 'admin_menu', array( __CLASS__, 'register_admin_page' ) );
        add_action( 'admin_post_od_door_config_save', array( __CLASS__, 'handle_admin_save' ) );
        add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );

        add_action( 'woocommerce_before_attribute_delete', array( __CLASS__, 'guard_attribute_delete' ), 10, 1 );
        add_action( 'woocommerce_attribute_added', array( __CLASS__, 'sync_attribute_registry' ), 20, 0 );
        add_action( 'woocommerce_attribute_updated', array( __CLASS__, 'sync_attribute_registry' ), 20, 0 );
        add_action( 'woocommerce_attribute_deleted', array( __CLASS__, 'sync_attribute_registry' ), 20, 0 );
        add_action( 'pre_delete_term', array( __CLASS__, 'guard_term_delete' ), 10, 2 );
        add_action( 'before_delete_post', array( __CLASS__, 'guard_product_delete' ), 10, 1 );
        add_action( 'woocommerce_admin_process_product_object', array( __CLASS__, 'validate_product_before_admin_save' ), 100, 1 );
        add_action( 'set_object_terms', array( __CLASS__, 'validate_family_terms_after_set' ), 100, 6 );
    }

    /* ---------------------------------------------------------------------
     * Registry
     * ------------------------------------------------------------------ */

    private static function clean_key( $value ): string {
        return preg_replace( '/[^A-Za-z0-9_-]/', '', (string) $value ) ?: '';
    }

    private static function bool_value( $value ): bool {
        if ( is_bool( $value ) ) return $value;
        if ( is_numeric( $value ) ) return 1 === (int) $value;
        return in_array( strtolower( trim( (string) $value ) ), array( '1', 'true', 'yes', 'on' ), true );
    }

    private static function int_list( $value ): array {
        if ( is_string( $value ) ) {
            $value = preg_split( '/\s*,\s*/', trim( $value ) );
        }
        if ( ! is_array( $value ) ) return array();
        $ids = array_map( 'intval', $value );
        return array_values( array_unique( array_filter( $ids, static fn( int $id ): bool => $id > 0 ) ) );
    }

    private static function string_list( $value ): array {
        if ( is_string( $value ) ) {
            $value = preg_split( '/\s*,\s*/', trim( $value ) );
        }
        if ( ! is_array( $value ) ) return array();
        $out = array();
        foreach ( $value as $item ) {
            $item = trim( (string) $item );
            if ( '' !== $item ) $out[] = $item;
        }
        return array_values( array_unique( $out ) );
    }

    private static function default_fallback_modes(): array {
        return array(
            'family' => true,
            'variant_dimensions' => true,
            'order_options' => true,
            'accessories' => true,
        );
    }

    public static function get_fallback_modes(): array {
        $stored = get_option( self::OPTION_FALLBACK_MODES, array() );
        return array_merge( self::default_fallback_modes(), is_array( $stored ) ? $stored : array() );
    }

    private static function default_option_registry(): array {
        return array(
            'box' => array(
                'key' => 'box', 'label' => 'Дверная коробка',
                'choices' => array(
                    array( 'id' => 'none', 'label' => 'Без коробки', 'price_delta' => 0 ),
                    array( 'id' => 'std_wood', 'label' => 'Стандартная деревянная коробка', 'price_delta' => 0 ),
                    array( 'id' => 'aluminium', 'label' => 'Алюминиевая коробка', 'price_delta' => 0 ),
                    array( 'id' => 'telescopic', 'label' => 'Телескопическая коробка', 'price_delta' => 0 ),
                ),
            ),
            'openingSide' => array(
                'key' => 'openingSide', 'label' => 'Сторона открывания',
                'choices' => array(
                    array( 'id' => 'any', 'label' => 'Любое (без фрезеровки)', 'price_delta' => 0 ),
                    array( 'id' => 'right', 'label' => 'Правая', 'price_delta' => 0 ),
                    array( 'id' => 'left', 'label' => 'Левая', 'price_delta' => 0 ),
                ),
            ),
            'soundproofing' => array(
                'key' => 'soundproofing', 'label' => 'Шумоизоляция',
                'choices' => array(
                    array( 'id' => 'base', 'label' => 'Базовый вариант ≥48 дБ', 'price_delta' => 0 ),
                    array( 'id' => 'plus', 'label' => 'Шумоизоляция Plus', 'price_delta' => 0 ),
                    array( 'id' => 'premium', 'label' => 'Шумоизоляция Premium', 'price_delta' => 0 ),
                ),
            ),
            'threshold' => array(
                'key' => 'threshold', 'label' => 'Выдвижной порожек',
                'choices' => array(
                    array( 'id' => 'none', 'label' => 'Без порожка', 'price_delta' => 0 ),
                    array( 'id' => 'plus', 'label' => 'С порожком', 'price_delta' => 0 ),
                ),
            ),
        );
    }

    public static function get_option_registry(): array {
        $stored = get_option( self::OPTION_OPTION_REGISTRY, array() );
        if ( ! is_array( $stored ) || empty( $stored ) ) {
            $stored = self::default_option_registry();
            update_option( self::OPTION_OPTION_REGISTRY, $stored, false );
        }
        return self::normalize_option_registry( $stored );
    }

    private static function normalize_option_registry( array $registry ): array {
        $normalized = array();
        foreach ( $registry as $raw_key => $group ) {
            if ( ! is_array( $group ) ) continue;
            $key = self::clean_key( $group['key'] ?? $raw_key );
            if ( '' === $key ) continue;
            $label = sanitize_text_field( (string) ( $group['label'] ?? $key ) );
            $choices = array();
            foreach ( (array) ( $group['choices'] ?? array() ) as $choice ) {
                if ( ! is_array( $choice ) ) continue;
                $id = self::clean_key( $choice['id'] ?? '' );
                if ( '' === $id ) continue;
                $choices[ $id ] = array(
                    'id' => $id,
                    'label' => sanitize_text_field( (string) ( $choice['label'] ?? $id ) ),
                    'price_delta' => (float) ( $choice['price_delta'] ?? 0 ),
                );
            }
            if ( empty( $choices ) ) continue;
            $normalized[ $key ] = array( 'key' => $key, 'label' => $label, 'choices' => array_values( $choices ) );
        }
        return $normalized;
    }

    public static function sync_attribute_registry(): array {
        if ( ! function_exists( 'wc_get_attribute_taxonomies' ) ) {
            return is_array( get_option( self::OPTION_ATTRIBUTE_REGISTRY, array() ) ) ? get_option( self::OPTION_ATTRIBUTE_REGISTRY, array() ) : array();
        }

        $stored = get_option( self::OPTION_ATTRIBUTE_REGISTRY, array() );
        $stored = is_array( $stored ) ? $stored : array();
        $history = get_option( self::OPTION_ATTRIBUTE_HISTORY, array() );
        $history = is_array( $history ) ? $history : array();
        $live = array();

        foreach ( wc_get_attribute_taxonomies() as $attribute ) {
            $attribute_id = (int) $attribute->attribute_id;
            $name = sanitize_title( (string) $attribute->attribute_name );
            $taxonomy = function_exists( 'wc_attribute_taxonomy_name' ) ? wc_attribute_taxonomy_name( $name ) : 'pa_' . $name;
            $legacy = self::LEGACY_FILTERS[ $name ] ?? null;
            $existing = isset( $stored[ $taxonomy ] ) && is_array( $stored[ $taxonomy ] ) ? $stored[ $taxonomy ] : array();

            $live[ $taxonomy ] = array(
                'attribute_id' => $attribute_id,
                'taxonomy' => $taxonomy,
                'filter_key' => self::clean_key( $existing['filter_key'] ?? $name ),
                'label' => sanitize_text_field( (string) ( $existing['label'] ?? $attribute->attribute_label ?? $name ) ),
                'exists' => true,
                'catalog_filter_enabled' => array_key_exists( 'catalog_filter_enabled', $existing )
                    ? self::bool_value( $existing['catalog_filter_enabled'] )
                    : null !== $legacy,
                'catalog_filter_order' => (int) ( $existing['catalog_filter_order'] ?? ( $legacy['order'] ?? 1000 + $attribute_id ) ),
                'display_type' => sanitize_key( (string) ( $existing['display_type'] ?? ( $legacy['display_type'] ?? 'checkbox' ) ) ),
            );
            unset( $history[ $taxonomy ] );
        }

        foreach ( $stored as $taxonomy => $entry ) {
            if ( isset( $live[ $taxonomy ] ) || ! is_array( $entry ) ) continue;
            $history[ $taxonomy ] = array(
                'attribute_id' => (int) ( $entry['attribute_id'] ?? 0 ),
                'taxonomy' => (string) $taxonomy,
                'label' => sanitize_text_field( (string) ( $entry['label'] ?? $taxonomy ) ),
                'filter_key' => self::clean_key( $entry['filter_key'] ?? preg_replace( '/^pa_/', '', (string) $taxonomy ) ),
                'last_seen_at' => sanitize_text_field( (string) ( $history[ $taxonomy ]['last_seen_at'] ?? current_time( 'mysql', true ) ) ),
                'exists' => false,
            );
        }

        update_option( self::OPTION_ATTRIBUTE_REGISTRY, $live, false );
        update_option( self::OPTION_ATTRIBUTE_HISTORY, $history, false );
        self::$attribute_registry_cache = $live;
        return $live;
    }

    public static function get_attribute_registry(): array {
        if ( null === self::$attribute_registry_cache ) {
            $stored = get_option( self::OPTION_ATTRIBUTE_REGISTRY, array() );
            self::$attribute_registry_cache = is_array( $stored ) && ! empty( $stored )
                ? $stored
                : self::sync_attribute_registry();
        }

        $registry = self::$attribute_registry_cache;
        uasort( $registry, static function ( array $a, array $b ): int {
            $order = (int) $a['catalog_filter_order'] <=> (int) $b['catalog_filter_order'];
            return 0 !== $order ? $order : strcasecmp( (string) $a['label'], (string) $b['label'] );
        } );
        return $registry;
    }

    /**
     * Public bridge used by the existing SEO landing plugin.
     * The SEO domain model is unchanged: filter_key + taxonomy + term_id[].
     */
    public static function get_catalog_filter_definitions(): array {
        $out = array();
        foreach ( self::get_attribute_registry() as $entry ) {
            if ( empty( $entry['exists'] ) || empty( $entry['catalog_filter_enabled'] ) ) continue;
            $filter_key = self::clean_key( $entry['filter_key'] ?? '' );
            $taxonomy = sanitize_key( (string) ( $entry['taxonomy'] ?? '' ) );
            if ( '' === $filter_key || '' === $taxonomy ) continue;
            $out[ $filter_key ] = array(
                'taxonomy' => $taxonomy,
                'field' => 'door_seo_filter_' . str_replace( '-', '_', $filter_key ),
                'label' => sanitize_text_field( (string) ( $entry['label'] ?? $filter_key ) ),
                'attribute_id' => (int) ( $entry['attribute_id'] ?? 0 ),
                'order' => (int) ( $entry['catalog_filter_order'] ?? 0 ),
                'display_type' => sanitize_key( (string) ( $entry['display_type'] ?? 'checkbox' ) ),
            );
        }
        return $out;
    }

    public static function get_accessory_group_registry(): array {
        $root = get_term_by( 'slug', self::ACCESSORY_ROOT_CATEGORY_SLUG, 'product_cat' );
        if ( ! $root instanceof WP_Term ) return array();

        $terms = get_terms( array(
            'taxonomy' => 'product_cat',
            'hide_empty' => false,
            'parent' => (int) $root->term_id,
            'orderby' => 'name',
            'order' => 'ASC',
        ) );
        if ( is_wp_error( $terms ) ) return array();

        $groups = array();
        foreach ( $terms as $term ) {
            if ( ! $term instanceof WP_Term ) continue;
            $key = self::clean_key( $term->slug );
            if ( '' === $key ) continue;
            $groups[ $key ] = array(
                'key' => $key,
                'label' => $term->name,
                'category_id' => (int) $term->term_id,
                'category_slug' => $term->slug,
                'parent_id' => (int) $term->parent,
            );
        }
        return $groups;
    }

    private static function accessory_root_category(): ?WP_Term {
        $root = get_term_by( 'slug', self::ACCESSORY_ROOT_CATEGORY_SLUG, 'product_cat' );
        return $root instanceof WP_Term ? $root : null;
    }

    private static function category_in_accessory_tree( int $category_id ): bool {
        $root = self::accessory_root_category();
        if ( ! $root || $category_id <= 0 ) return false;
        if ( (int) $root->term_id === $category_id ) return true;
        return in_array( (int) $root->term_id, array_map( 'intval', get_ancestors( $category_id, 'product_cat', 'taxonomy' ) ), true );
    }

    private static function category_in_branch( int $category_id, int $branch_root_id ): bool {
        if ( $category_id <= 0 || $branch_root_id <= 0 ) return false;
        if ( $category_id === $branch_root_id ) return true;
        return in_array( $branch_root_id, array_map( 'intval', get_ancestors( $category_id, 'product_cat', 'taxonomy' ) ), true );
    }

    private static function product_is_accessory( int $product_id ): bool {
        $terms = get_the_terms( $product_id, 'product_cat' );
        if ( ! is_array( $terms ) ) return false;
        foreach ( $terms as $term ) {
            if ( $term instanceof WP_Term && self::category_in_accessory_tree( (int) $term->term_id ) ) return true;
        }
        return false;
    }

    private static function product_in_accessory_group( int $product_id, int $group_category_id ): bool {
        if ( $product_id <= 0 || $group_category_id <= 0 ) return false;
        $terms = get_the_terms( $product_id, 'product_cat' );
        if ( ! is_array( $terms ) ) return false;
        foreach ( $terms as $term ) {
            if ( $term instanceof WP_Term && self::category_in_branch( (int) $term->term_id, $group_category_id ) ) return true;
        }
        return false;
    }

    /* ---------------------------------------------------------------------
     * Policy storage / normalization
     * ------------------------------------------------------------------ */

    private static function empty_policy(): array {
        return array(
            'variant_dimensions' => array( 'mode' => 'inherit', 'taxonomies' => array() ),
            'options' => array(),
            'accessories' => array(),
        );
    }

    private static function normalize_policy( $policy, string $scope_type ): array {
        $policy = is_array( $policy ) ? $policy : array();
        $normalized = self::empty_policy();

        if ( 'product' !== $scope_type ) {
            $variant = is_array( $policy['variant_dimensions'] ?? null ) ? $policy['variant_dimensions'] : array();
            $mode = 'replace' === ( $variant['mode'] ?? '' ) ? 'replace' : 'inherit';
            $taxonomies = array_values( array_filter( self::string_list( $variant['taxonomies'] ?? array() ), static fn( string $taxonomy ): bool => str_starts_with( $taxonomy, 'pa_' ) ) );
            $normalized['variant_dimensions'] = array( 'mode' => $mode, 'taxonomies' => $taxonomies );
        }

        foreach ( (array) ( $policy['options'] ?? array() ) as $raw_key => $raw ) {
            if ( ! is_array( $raw ) ) continue;
            $key = self::clean_key( $raw_key );
            if ( '' === $key ) continue;
            $mode = in_array( $raw['mode'] ?? '', array( 'replace', 'disabled' ), true ) ? $raw['mode'] : 'inherit';
            $choices = array();
            foreach ( (array) ( $raw['choices'] ?? array() ) as $choice ) {
                if ( ! is_array( $choice ) ) continue;
                $id = self::clean_key( $choice['id'] ?? '' );
                if ( '' === $id ) continue;
                $choices[ $id ] = array(
                    'id' => $id,
                    'price_delta' => (float) ( $choice['price_delta'] ?? 0 ),
                    'is_default' => self::bool_value( $choice['is_default'] ?? false ),
                );
            }
            $normalized['options'][ $key ] = array( 'mode' => $mode, 'choices' => array_values( $choices ) );
        }

        foreach ( (array) ( $policy['accessories'] ?? array() ) as $raw_key => $raw ) {
            if ( ! is_array( $raw ) ) continue;
            $key = self::clean_key( $raw_key );
            if ( '' === $key ) continue;
            $mode = in_array( $raw['mode'] ?? '', array( 'replace', 'disabled' ), true ) ? $raw['mode'] : 'inherit';
            $source = 'explicit' === ( $raw['source'] ?? '' ) ? 'explicit' : 'category';
            $normalized['accessories'][ $key ] = array(
                'mode' => $mode,
                'source' => $source,
                'category_id' => absint( $raw['category_id'] ?? 0 ),
                'product_ids' => self::int_list( $raw['product_ids'] ?? array() ),
            );
        }

        return $normalized;
    }

    public static function get_policy( string $scope_type, int $scope_id ): array {
        if ( $scope_id <= 0 ) return self::empty_policy();
        if ( 'category' === $scope_type || 'family' === $scope_type ) {
            $raw = get_term_meta( $scope_id, self::POLICY_META, true );
        } elseif ( 'product' === $scope_type ) {
            $raw = get_post_meta( $scope_id, self::POLICY_META, true );
        } else {
            return self::empty_policy();
        }
        return self::normalize_policy( $raw, $scope_type );
    }

    private static function save_policy( string $scope_type, int $scope_id, array $policy ): void {
        $policy = self::normalize_policy( $policy, $scope_type );
        if ( 'category' === $scope_type || 'family' === $scope_type ) {
            update_term_meta( $scope_id, self::POLICY_META, $policy );
        } elseif ( 'product' === $scope_type ) {
            update_post_meta( $scope_id, self::POLICY_META, $policy );
        }
    }

    /* ---------------------------------------------------------------------
     * Door tree / family / lineage
     * ------------------------------------------------------------------ */

    private static function root_category(): ?WP_Term {
        $root = get_term_by( 'slug', self::ROOT_CATEGORY_SLUG, 'product_cat' );
        return $root instanceof WP_Term ? $root : null;
    }

    private static function category_in_door_tree( int $category_id ): bool {
        $root = self::root_category();
        if ( ! $root ) return false;
        if ( (int) $root->term_id === $category_id ) return true;
        return in_array( (int) $root->term_id, array_map( 'intval', get_ancestors( $category_id, 'product_cat', 'taxonomy' ) ), true );
    }

    private static function product_in_door_tree( int $product_id ): bool {
        if ( $product_id <= 0 || 'product' !== get_post_type( $product_id ) ) return false;
        $terms = get_the_terms( $product_id, 'product_cat' );
        if ( ! is_array( $terms ) ) return false;
        foreach ( $terms as $term ) {
            if ( $term instanceof WP_Term && self::category_in_door_tree( (int) $term->term_id ) ) return true;
        }
        return false;
    }

    private static function category_lineage( int $category_id ): array {
        if ( $category_id <= 0 || ! self::category_in_door_tree( $category_id ) ) return array();
        $ancestors = array_reverse( array_map( 'intval', get_ancestors( $category_id, 'product_cat', 'taxonomy' ) ) );
        $ids = array_values( array_filter( array_merge( $ancestors, array( $category_id ) ), array( __CLASS__, 'category_in_door_tree' ) ) );
        $out = array();
        foreach ( $ids as $id ) {
            $term = get_term( $id, 'product_cat' );
            if ( $term instanceof WP_Term ) {
                $out[] = array( 'id' => (int) $term->term_id, 'slug' => $term->slug, 'name' => $term->name );
            }
        }
        return $out;
    }

    private static function family_for_product( int $product_id, array &$issues, array &$warnings ): array {
        $terms = get_the_terms( $product_id, 'door_family' );
        $terms = is_wp_error( $terms ) || ! is_array( $terms ) ? array() : array_values( array_filter( $terms, static fn( $term ): bool => $term instanceof WP_Term ) );
        if ( 1 === count( $terms ) ) {
            $term = $terms[0];
            $siblings = get_posts( array(
                'post_type' => 'product', 'post_status' => 'publish', 'fields' => 'ids', 'posts_per_page' => -1,
                'tax_query' => array( array( 'taxonomy' => 'door_family', 'field' => 'term_id', 'terms' => array( (int) $term->term_id ) ) ),
                'no_found_rows' => true,
            ) );
            return array(
                'id' => (int) $term->term_id,
                'slug' => $term->slug,
                'name' => $term->name,
                'source' => 'taxonomy',
                'sibling_ids' => array_values( array_map( 'intval', $siblings ) ),
            );
        }

        if ( count( $terms ) > 1 ) {
            $issues[] = 'У опубликованной двери задано больше одного door_family taxonomy term.';
            return array( 'id' => 0, 'slug' => '', 'name' => '', 'source' => 'invalid_taxonomy', 'sibling_ids' => array() );
        }

        $fallbacks = self::get_fallback_modes();
        if ( ! $fallbacks['family'] ) {
            $issues[] = 'У опубликованной двери не задан door_family taxonomy term.';
            return array( 'id' => 0, 'slug' => '', 'name' => '', 'source' => 'missing', 'sibling_ids' => array() );
        }

        $legacy_code = trim( (string) get_post_meta( $product_id, 'door_family', true ) );
        if ( '' === $legacy_code ) $legacy_code = trim( (string) get_post_meta( $product_id, 'family_code', true ) );
        if ( '' === $legacy_code ) {
            $warnings[] = 'door_family taxonomy некорректна, а legacy family fallback не содержит значения.';
            return array( 'id' => 0, 'slug' => '', 'name' => '', 'source' => 'legacy_missing', 'sibling_ids' => array() );
        }

        $siblings = get_posts( array(
            'post_type' => 'product', 'post_status' => 'publish', 'fields' => 'ids', 'posts_per_page' => -1,
            'meta_query' => array( 'relation' => 'OR',
                array( 'key' => 'door_family', 'value' => $legacy_code, 'compare' => '=' ),
                array( 'key' => 'family_code', 'value' => $legacy_code, 'compare' => '=' ),
            ),
            'no_found_rows' => true,
        ) );
        $warnings[] = 'Использован legacy family fallback; настройте door_family taxonomy и отключите fallback.';
        return array(
            'id' => 0,
            'slug' => sanitize_title( $legacy_code ),
            'name' => $legacy_code,
            'source' => 'legacy_meta',
            'sibling_ids' => array_values( array_map( 'intval', $siblings ) ),
        );
    }

    private static function deepest_common_door_category( array $product_ids ): int {
        if ( empty( $product_ids ) ) return 0;
        $common = null;
        foreach ( $product_ids as $product_id ) {
            $terms = get_the_terms( (int) $product_id, 'product_cat' );
            $ids = array();
            if ( is_array( $terms ) ) {
                foreach ( $terms as $term ) {
                    if ( $term instanceof WP_Term && self::category_in_door_tree( (int) $term->term_id ) ) $ids[] = (int) $term->term_id;
                }
            }
            $common = null === $common ? $ids : array_values( array_intersect( $common, $ids ) );
        }
        if ( empty( $common ) ) return 0;
        usort( $common, static fn( int $a, int $b ): int => count( get_ancestors( $b, 'product_cat', 'taxonomy' ) ) <=> count( get_ancestors( $a, 'product_cat', 'taxonomy' ) ) );
        return (int) $common[0];
    }

    private static function resolve_canonical_category( int $product_id, array $family, array &$issues, array &$warnings ): array {
        $category_id = 0;
        $source = 'missing';
        if ( (int) ( $family['id'] ?? 0 ) > 0 ) {
            $category_id = absint( get_term_meta( (int) $family['id'], self::CANONICAL_CATEGORY_META, true ) );
            if ( $category_id > 0 ) $source = 'family_policy';
        }

        if ( $category_id <= 0 ) {
            $fallbacks = self::get_fallback_modes();
            if ( $fallbacks['family'] || $fallbacks['variant_dimensions'] || $fallbacks['order_options'] || $fallbacks['accessories'] ) {
                $candidate_ids = ! empty( $family['sibling_ids'] ) ? $family['sibling_ids'] : array( $product_id );
                $category_id = self::deepest_common_door_category( $candidate_ids );
                if ( $category_id > 0 ) {
                    $source = 'inferred_fallback';
                    $warnings[] = 'Canonical configuration category ещё не задана на family; временно использована общая наиболее глубокая категория family.';
                }
            }
        }

        if ( $category_id <= 0 || ! self::category_in_door_tree( $category_id ) ) {
            $issues[] = 'Не удалось определить canonical configuration category внутри дерева межкомнатных дверей.';
            return array( 'id' => 0, 'slug' => '', 'name' => '', 'source' => $source );
        }

        $term = get_term( $category_id, 'product_cat' );
        if ( ! $term instanceof WP_Term ) {
            $issues[] = 'Canonical configuration category не существует.';
            return array( 'id' => 0, 'slug' => '', 'name' => '', 'source' => $source );
        }
        return array( 'id' => (int) $term->term_id, 'slug' => $term->slug, 'name' => $term->name, 'source' => $source );
    }

    /* ---------------------------------------------------------------------
     * Resolver
     * ------------------------------------------------------------------ */

    private static function attribute_definition_by_taxonomy( string $taxonomy ): array {
        $registry = self::get_attribute_registry();
        $entry = $registry[ $taxonomy ] ?? array();
        return array(
            'taxonomy' => $taxonomy,
            'filter_key' => self::clean_key( $entry['filter_key'] ?? preg_replace( '/^pa_/', '', $taxonomy ) ),
            'label' => sanitize_text_field( (string) ( $entry['label'] ?? $taxonomy ) ),
        );
    }

    private static function resolve_variant_dimensions( array $lineage, int $family_id, array &$issues, array &$warnings ): array {
        $taxonomies = null;
        $source = null;
        foreach ( $lineage as $category ) {
            $policy = self::get_policy( 'category', (int) $category['id'] );
            if ( 'replace' === $policy['variant_dimensions']['mode'] ) {
                $taxonomies = $policy['variant_dimensions']['taxonomies'];
                $source = 'category:' . (int) $category['id'];
            }
        }
        if ( $family_id > 0 ) {
            $policy = self::get_policy( 'family', $family_id );
            if ( 'replace' === $policy['variant_dimensions']['mode'] ) {
                $taxonomies = $policy['variant_dimensions']['taxonomies'];
                $source = 'family:' . $family_id;
            }
        }

        $strict = null !== $taxonomies;
        if ( null === $taxonomies ) {
            if ( self::get_fallback_modes()['variant_dimensions'] ) {
                $taxonomies = array( 'pa_tsvet-dveri', 'pa_razmer-dveri', 'pa_kolichestvo-poloten' );
                $source = 'legacy_static_fallback';
            } else {
                $taxonomies = array();
                $source = 'none';
                $warnings[] = 'VariantDimensions fallback выключен, но новая variant policy не задана.';
            }
        }

        $dimensions = array();
        foreach ( array_values( array_unique( $taxonomies ) ) as $taxonomy ) {
            if ( ! taxonomy_exists( $taxonomy ) ) {
                if ( $strict ) {
                    $issues[] = 'Variant dimension taxonomy не существует: ' . $taxonomy;
                } else {
                    $warnings[] = 'Variant dimension taxonomy не существует: ' . $taxonomy;
                }
                continue;
            }
            $definition = self::attribute_definition_by_taxonomy( $taxonomy );
            $definition['source'] = $source;
            $dimensions[] = $definition;
        }
        return array( 'items' => $dimensions, 'source' => $source, 'strict' => $strict );
    }

    private static function parse_legacy_select( $value, string $fallback ): string {
        $value = trim( (string) $value );
        if ( '' === $value ) return $fallback;
        $parts = explode( ':', $value, 2 );
        return trim( $parts[0] ) ?: $fallback;
    }

    private static function meta_bool( int $product_id, array $keys, bool $fallback = false ): bool {
        foreach ( $keys as $key ) {
            $value = get_post_meta( $product_id, $key, true );
            if ( '' === $value || null === $value ) continue;
            return self::bool_value( $value );
        }
        return $fallback;
    }

    private static function meta_float( int $product_id, array $keys, float $fallback = 0 ): float {
        foreach ( $keys as $key ) {
            $value = get_post_meta( $product_id, $key, true );
            if ( '' === $value || null === $value ) continue;
            $value = str_replace( ',', '.', (string) $value );
            if ( is_numeric( $value ) ) return (float) $value;
        }
        return $fallback;
    }

    private static function legacy_option_groups( int $product_id ): array {
        $defaults = array(
            'box' => self::parse_legacy_select( get_post_meta( $product_id, 'configurator_box_default_option', true ) ?: get_post_meta( $product_id, 'box_default_option', true ), 'none' ),
            'openingSide' => self::parse_legacy_select( get_post_meta( $product_id, 'configurator_opening_side_default_option', true ) ?: get_post_meta( $product_id, 'configurator_opening_side_default_options', true ) ?: get_post_meta( $product_id, 'configurator_opening_side', true ) ?: get_post_meta( $product_id, 'opening_side_default_option', true ), 'any' ),
            'soundproofing' => self::parse_legacy_select( get_post_meta( $product_id, 'configurator_soundproofing_default_option', true ) ?: get_post_meta( $product_id, 'configurator_sound_insulation', true ) ?: get_post_meta( $product_id, 'soundproofing_default_option', true ), 'base' ),
            'threshold' => self::parse_legacy_select( get_post_meta( $product_id, 'configurator_slide_threshold_default_option', true ) ?: get_post_meta( $product_id, 'configurator_slide_threshold_defoult_option', true ) ?: get_post_meta( $product_id, 'slide_threshold_default_option', true ), 'none' ),
        );
        $registry = self::default_option_registry();
        $enabled = array(
            'box' => array(
                'none' => self::meta_bool( $product_id, array( 'configurator_box_none_enabled', 'box_none_enabled' ), true ),
                'std_wood' => self::meta_bool( $product_id, array( 'configurator_box_std_enabled', 'box_std_enabled' ) ),
                'aluminium' => self::meta_bool( $product_id, array( 'configurator_box_aluminium_enabled', 'box_aluminium_enabled' ) ),
                'telescopic' => self::meta_bool( $product_id, array( 'configurator_box_telescopic_enabled', 'box_telescopic_enabled' ) ),
            ),
            'openingSide' => array( 'any' => true, 'right' => true, 'left' => true ),
            'soundproofing' => array(
                'base' => true,
                'plus' => self::meta_bool( $product_id, array( 'configurator_soundproofing_plus_enabled', 'soundproofing_plus_enabled' ) ),
                'premium' => self::meta_bool( $product_id, array( 'configurator_soundproofing_premium_enabled', 'soundproofing_premium_enabled' ) ),
            ),
            'threshold' => array(
                'none' => true,
                'plus' => self::meta_bool( $product_id, array( 'configurator_slide_threshold_enabled', 'slide_threshold_enabled' ) ),
            ),
        );
        $prices = array(
            'box' => array(
                'none' => 0,
                'std_wood' => self::meta_float( $product_id, array( 'configurator_box_std_price_delta', 'box_std_price_delta' ) ),
                'aluminium' => self::meta_float( $product_id, array( 'configurator_box_aluminium_price_delta', 'box_aluminium_price_delta' ) ),
                'telescopic' => self::meta_float( $product_id, array( 'configurator_box_telescopic_price_delta', 'box_telescopic_price_delta' ) ),
            ),
            'openingSide' => array(
                'any' => 0,
                'right' => self::meta_float( $product_id, array( 'configurator_opening_side_right_price_delta', 'opening_side_right_price_delta' ) ),
                'left' => self::meta_float( $product_id, array( 'configurator_opening_side_left_price_delta', 'opening_side_left_price_delta' ) ),
            ),
            'soundproofing' => array(
                'base' => 0,
                'plus' => self::meta_float( $product_id, array( 'configurator_soundproofing_plus_price_delta', 'soundproofing_plus_price_delta' ) ),
                'premium' => self::meta_float( $product_id, array( 'configurator_soundproofing_premium_price_delta', 'configurator_soundproofing_premium_prive_delta', 'configurator_soundproofing_premium_prise_delta', 'soundproofing_premium_price_delta' ) ),
            ),
            'threshold' => array(
                'none' => 0,
                'plus' => self::meta_float( $product_id, array( 'configurator_slide_threshold_price_delta', 'slide_threshold_price_delta' ) ),
            ),
        );

        $out = array();
        foreach ( $registry as $key => $group ) {
            $choices = array();
            foreach ( $group['choices'] as $choice ) {
                if ( empty( $enabled[ $key ][ $choice['id'] ] ) ) continue;
                $choices[] = array(
                    'id' => $choice['id'], 'label' => $choice['label'], 'enabled' => true,
                    'price_delta' => (float) ( $prices[ $key ][ $choice['id'] ] ?? 0 ),
                    'is_default' => $choice['id'] === $defaults[ $key ],
                );
            }
            if ( empty( $choices ) ) continue;
            if ( ! array_filter( $choices, static fn( array $choice ): bool => ! empty( $choice['is_default'] ) ) ) $choices[0]['is_default'] = true;
            $default = current( array_filter( $choices, static fn( array $choice ): bool => ! empty( $choice['is_default'] ) ) );
            $out[ $key ] = array(
                'key' => $key, 'title' => $group['label'], 'default_option_id' => $default['id'],
                'choices' => array_values( $choices ), 'source' => 'legacy_meta_fallback',
            );
        }
        return $out;
    }

    private static function resolve_option_groups( int $product_id, array $lineage, int $family_id, array &$issues ): array {
        $registry = self::get_option_registry();
        $states = array();
        $scopes = array();
        foreach ( $lineage as $category ) $scopes[] = array( 'type' => 'category', 'id' => (int) $category['id'] );
        if ( $family_id > 0 ) $scopes[] = array( 'type' => 'family', 'id' => $family_id );
        $scopes[] = array( 'type' => 'product', 'id' => $product_id );

        foreach ( $scopes as $scope ) {
            $policy = self::get_policy( $scope['type'], $scope['id'] );
            foreach ( $policy['options'] as $key => $rule ) {
                if ( 'inherit' === $rule['mode'] ) continue;
                $states[ $key ] = $rule;
                $states[ $key ]['source_scope'] = $scope['type'] . ':' . $scope['id'];
            }
        }

        $legacy = self::get_fallback_modes()['order_options'] ? self::legacy_option_groups( $product_id ) : array();
        $out = array();
        foreach ( $registry as $key => $group ) {
            $state = $states[ $key ] ?? null;
            if ( null === $state ) {
                if ( isset( $legacy[ $key ] ) ) $out[] = $legacy[ $key ];
                continue;
            }
            if ( 'disabled' === $state['mode'] ) continue;
            if ( 'replace' !== $state['mode'] ) continue;

            $registry_choices = array_column( $group['choices'], null, 'id' );
            $choices = array();
            foreach ( $state['choices'] as $choice_rule ) {
                $choice_id = $choice_rule['id'];
                if ( ! isset( $registry_choices[ $choice_id ] ) ) {
                    $issues[] = 'Policy ' . $state['source_scope'] . ' ссылается на неизвестный choice ' . $key . ':' . $choice_id;
                    continue;
                }
                $base = $registry_choices[ $choice_id ];
                $choices[] = array(
                    'id' => $choice_id,
                    'label' => $base['label'],
                    'enabled' => true,
                    'price_delta' => (float) $choice_rule['price_delta'],
                    'is_default' => ! empty( $choice_rule['is_default'] ),
                );
            }
            if ( empty( $choices ) ) {
                $issues[] = 'Policy ' . $state['source_scope'] . ' оставляет option group ' . $key . ' без choices.';
                continue;
            }
            $defaults = array_keys( array_filter( $choices, static fn( array $choice ): bool => ! empty( $choice['is_default'] ) ) );
            if ( count( $defaults ) > 1 ) {
                $issues[] = 'Option group ' . $key . ' имеет больше одного default choice.';
                continue;
            }
            if ( empty( $defaults ) ) $choices[0]['is_default'] = true;
            $default = current( array_filter( $choices, static fn( array $choice ): bool => ! empty( $choice['is_default'] ) ) );
            $out[] = array(
                'key' => $key,
                'title' => $group['label'],
                'default_option_id' => $default['id'],
                'choices' => array_values( $choices ),
                'source' => $state['source_scope'],
            );
        }
        return $out;
    }

    private static function accessory_ids_for_category( int $category_id ): array {
        if ( $category_id <= 0 ) return array();
        $ids = get_posts( array(
            'post_type' => 'product', 'post_status' => 'publish', 'fields' => 'ids', 'posts_per_page' => -1,
            'tax_query' => array( array( 'taxonomy' => 'product_cat', 'field' => 'term_id', 'terms' => array( $category_id ), 'include_children' => true ) ),
            'no_found_rows' => true,
        ) );
        return array_values( array_map( 'intval', $ids ) );
    }

    private static function legacy_accessory_ids( int $product_id, string $group_key ): array {
        $keys = array(
            'ruchki' => array( 'configurator_related_handles', 'configurator_related_handless', 'related_handles' ),
            'petli' => array( 'configurator_related_hinges', 'related_hinges' ),
            'zamki' => array( 'configurator_related_locks', 'related_locks' ),
        );
        if ( ! isset( $keys[ $group_key ] ) ) return array();
        foreach ( $keys[ $group_key ] as $meta_key ) {
            $value = get_post_meta( $product_id, $meta_key, true );
            $ids = self::int_list( $value );
            if ( ! empty( $ids ) ) return $ids;
        }
        return array();
    }

    private static function resolve_accessory_groups( int $product_id, array $lineage, int $family_id, array &$issues ): array {
        $registry = self::get_accessory_group_registry();
        $states = array();
        $scopes = array();
        foreach ( $lineage as $category ) $scopes[] = array( 'type' => 'category', 'id' => (int) $category['id'] );
        if ( $family_id > 0 ) $scopes[] = array( 'type' => 'family', 'id' => $family_id );
        $scopes[] = array( 'type' => 'product', 'id' => $product_id );
        foreach ( $scopes as $scope ) {
            $policy = self::get_policy( $scope['type'], $scope['id'] );
            foreach ( $policy['accessories'] as $key => $rule ) {
                if ( 'inherit' === $rule['mode'] ) continue;
                $states[ $key ] = $rule;
                $states[ $key ]['source_scope'] = $scope['type'] . ':' . $scope['id'];
            }
        }

        $out = array();
        foreach ( $registry as $key => $group ) {
            $state = $states[ $key ] ?? null;
            if ( null === $state ) {
                if ( self::get_fallback_modes()['accessories'] ) {
                    $ids = self::legacy_accessory_ids( $product_id, $key );
                    if ( ! empty( $ids ) ) {
                        $out[] = array( 'key' => $key, 'title' => $group['label'], 'category_id' => $group['category_id'], 'source_mode' => 'legacy', 'product_ids' => $ids, 'source' => 'legacy_meta_fallback' );
                    }
                }
                continue;
            }
            if ( 'disabled' === $state['mode'] ) continue;
            if ( 'replace' !== $state['mode'] ) continue;

            if ( 'explicit' === $state['source'] ) {
                $ids = array();
                foreach ( $state['product_ids'] as $id ) {
                    if ( 'product' !== get_post_type( $id ) ) {
                        $issues[] = 'Accessory policy ' . $state['source_scope'] . ' содержит несуществующий product #' . $id;
                        continue;
                    }
                    if ( ! self::product_in_accessory_group( $id, (int) $group['category_id'] ) ) {
                        $issues[] = 'Accessory policy ' . $state['source_scope'] . ' содержит product #' . $id . ' вне группы «' . $group['label'] . '».';
                        continue;
                    }
                    $ids[] = $id;
                }
                if ( ! empty( $ids ) ) {
                    $out[] = array( 'key' => $key, 'title' => $group['label'], 'category_id' => $group['category_id'], 'source_mode' => 'explicit', 'product_ids' => array_values( array_unique( $ids ) ), 'source' => $state['source_scope'] );
                }
            } else {
                $category_id = $state['category_id'] > 0 ? $state['category_id'] : (int) $group['category_id'];
                $accessory_category = get_term( $category_id, 'product_cat' );
                if ( ! ( $accessory_category instanceof WP_Term ) ) {
                    $issues[] = 'Accessory policy ' . $state['source_scope'] . ' ссылается на несуществующую product_cat #' . $category_id;
                    continue;
                }
                if ( ! self::category_in_branch( $category_id, (int) $group['category_id'] ) ) {
                    $issues[] = 'Accessory policy ' . $state['source_scope'] . ' использует категорию #' . $category_id . ' вне группы «' . $group['label'] . '».';
                    continue;
                }
                $out[] = array( 'key' => $key, 'title' => $group['label'], 'category_id' => $category_id, 'source_mode' => 'category', 'product_ids' => self::accessory_ids_for_category( $category_id ), 'source' => $state['source_scope'] );
            }
        }
        return $out;
    }

    private static function validate_current_variant_coordinate( int $product_id, array $variant_result, array &$issues, array &$warnings ): void {
        $dimensions = (array) ( $variant_result['items'] ?? array() );
        if ( empty( $dimensions ) ) return;

        foreach ( $dimensions as $dimension ) {
            $taxonomy = (string) ( $dimension['taxonomy'] ?? '' );
            if ( '' === $taxonomy ) continue;
            $terms = get_the_terms( $product_id, $taxonomy );
            $terms = is_wp_error( $terms ) || ! is_array( $terms )
                ? array()
                : array_values( array_filter( $terms, static fn( $term ): bool => $term instanceof WP_Term ) );
            if ( 1 === count( $terms ) ) continue;

            $message = sprintf(
                'Product #%d должен иметь ровно один term для variant dimension %s; найдено: %d.',
                $product_id,
                $taxonomy,
                count( $terms )
            );
            if ( ! empty( $variant_result['strict'] ) ) {
                $issues[] = $message;
            } else {
                $warnings[] = $message;
            }
        }
    }

    private static function validate_variant_coordinates( array $family, array $variant_result, array &$issues, array &$warnings ): void {
        $sibling_ids = self::int_list( $family['sibling_ids'] ?? array() );
        $dimensions = $variant_result['items'];
        if ( count( $sibling_ids ) < 2 ) return;
        if ( empty( $dimensions ) ) {
            $message = 'Variant dimensions пусты для family с несколькими published siblings.';
            if ( ! empty( $variant_result['strict'] ) || 'none' === ( $variant_result['source'] ?? '' ) ) {
                $issues[] = $message;
            } else {
                $warnings[] = $message;
            }
            return;
        }

        $seen = array();
        foreach ( $sibling_ids as $product_id ) {
            $parts = array();
            $invalid = false;
            foreach ( $dimensions as $dimension ) {
                $terms = get_the_terms( $product_id, $dimension['taxonomy'] );
                $terms = is_wp_error( $terms ) || ! is_array( $terms ) ? array() : array_values( array_filter( $terms, static fn( $term ): bool => $term instanceof WP_Term ) );
                if ( 1 !== count( $terms ) ) {
                    $message = sprintf( 'Product #%d должен иметь ровно один term для variant dimension %s; найдено: %d.', $product_id, $dimension['taxonomy'], count( $terms ) );
                    if ( $variant_result['strict'] ) $issues[] = $message; else $warnings[] = $message;
                    $invalid = true;
                    continue;
                }
                $parts[] = $dimension['taxonomy'] . ':' . (int) $terms[0]->term_id;
            }
            if ( $invalid ) continue;
            $coordinate = implode( '|', $parts );
            if ( isset( $seen[ $coordinate ] ) ) {
                $message = sprintf( 'В family найдены два published siblings с одинаковой variant coordinate: #%d и #%d.', $seen[ $coordinate ], $product_id );
                if ( $variant_result['strict'] ) $issues[] = $message; else $warnings[] = $message;
            } else {
                $seen[ $coordinate ] = $product_id;
            }
        }
    }

    public static function resolve_product( int $product_id, bool $include_family_coordinate_diagnostics = false ): array {
        $issues = array();
        $warnings = array();
        if ( $product_id <= 0 || 'product' !== get_post_type( $product_id ) ) {
            return array( 'schema_version' => self::VERSION, 'product_id' => $product_id, 'valid' => false, 'issues' => array( 'Product not found.' ), 'warnings' => array() );
        }

        $family = self::family_for_product( $product_id, $issues, $warnings );
        $canonical = self::resolve_canonical_category( $product_id, $family, $issues, $warnings );
        $lineage = $canonical['id'] > 0 ? self::category_lineage( (int) $canonical['id'] ) : array();
        $variant = self::resolve_variant_dimensions( $lineage, (int) $family['id'], $issues, $warnings );
        self::validate_current_variant_coordinate( $product_id, $variant, $issues, $warnings );
        if ( $include_family_coordinate_diagnostics ) {
            self::validate_variant_coordinates( $family, $variant, $issues, $warnings );
        }
        $options = self::resolve_option_groups( $product_id, $lineage, (int) $family['id'], $issues );
        $accessories = self::resolve_accessory_groups( $product_id, $lineage, (int) $family['id'], $issues );

        return array(
            'schema_version' => self::VERSION,
            'product_id' => $product_id,
            'valid' => empty( $issues ),
            'issues' => array_values( array_unique( $issues ) ),
            'warnings' => array_values( array_unique( $warnings ) ),
            'fallback_modes' => self::get_fallback_modes(),
            'family' => $family,
            'canonical_category' => $canonical,
            'category_lineage' => $lineage,
            'variant_dimensions' => $variant['items'],
            'variant_dimensions_source' => $variant['source'],
            'option_groups' => $options,
            'accessory_groups' => $accessories,
        );
    }

    /* ---------------------------------------------------------------------
     * REST
     * ------------------------------------------------------------------ */

    public static function register_rest_routes(): void {
        register_rest_route( self::REST_NAMESPACE, '/door-configuration/schema', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array( __CLASS__, 'rest_schema' ),
            'permission_callback' => '__return_true',
        ) );
        register_rest_route( self::REST_NAMESPACE, '/door-product-configuration/(?P<id>\d+)', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => array( __CLASS__, 'rest_product_configuration' ),
            'permission_callback' => '__return_true',
            'args' => array( 'id' => array( 'type' => 'integer', 'sanitize_callback' => 'absint' ) ),
        ) );
        register_rest_route( self::REST_NAMESPACE, '/door-configuration/manifest', array(
            'methods' => WP_REST_Server::READABLE,
            'callback' => static fn(): WP_REST_Response => rest_ensure_response( self::build_manifest() ),
            'permission_callback' => static fn(): bool => current_user_can( 'manage_woocommerce' ),
        ) );
    }

    public static function rest_schema(): WP_REST_Response {
        return rest_ensure_response( array(
            'schema_version' => self::VERSION,
            'attributes' => array_values( self::get_attribute_registry() ),
            'catalog_filters' => array_values( self::get_catalog_filter_definitions() ),
            'option_groups' => array_values( self::get_option_registry() ),
            'accessory_groups' => array_values( self::get_accessory_group_registry() ),
            'fallback_modes' => self::get_fallback_modes(),
        ) );
    }

    public static function rest_product_configuration( WP_REST_Request $request ): WP_REST_Response {
        $started_at = microtime( true );
        $payload = self::resolve_product( absint( $request['id'] ), false );
        $response = new WP_REST_Response( $payload, $payload['valid'] ? 200 : 409 );
        $response->header(
            'Server-Timing',
            'od-door-config;dur=' . number_format( ( microtime( true ) - $started_at ) * 1000, 1, '.', '' )
        );
        return $response;
    }

    /* ---------------------------------------------------------------------
     * Dependency guards
     * ------------------------------------------------------------------ */

    private static function all_policy_refs(): array {
        $refs = array();
        $categories = get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => false, 'fields' => 'ids' ) );
        if ( ! is_wp_error( $categories ) ) {
            foreach ( $categories as $id ) {
                $policy = self::get_policy( 'category', (int) $id );
                if ( $policy !== self::empty_policy() ) $refs[] = array( 'scope' => 'category:' . (int) $id, 'policy' => $policy );
            }
        }
        $families = get_terms( array( 'taxonomy' => 'door_family', 'hide_empty' => false, 'fields' => 'ids' ) );
        if ( ! is_wp_error( $families ) ) {
            foreach ( $families as $id ) {
                $policy = self::get_policy( 'family', (int) $id );
                if ( $policy !== self::empty_policy() ) $refs[] = array( 'scope' => 'family:' . (int) $id, 'policy' => $policy );
            }
        }
        $products = get_posts( array( 'post_type' => 'product', 'post_status' => 'any', 'fields' => 'ids', 'posts_per_page' => -1, 'meta_key' => self::POLICY_META, 'no_found_rows' => true ) );
        foreach ( $products as $id ) $refs[] = array( 'scope' => 'product:' . (int) $id, 'policy' => self::get_policy( 'product', (int) $id ) );
        return $refs;
    }

    private static function seo_uses_filter_key( string $filter_key ): bool {
        $field = 'door_seo_filter_' . str_replace( '-', '_', $filter_key );
        $ids = get_posts( array(
            'post_type' => 'door_seo_landing', 'post_status' => array( 'publish', 'draft', 'pending', 'private' ), 'fields' => 'ids', 'posts_per_page' => 1,
            'meta_query' => array( array( 'key' => $field, 'value' => '', 'compare' => '!=' ) ), 'no_found_rows' => true,
        ) );
        return ! empty( $ids );
    }

    private static function seo_uses_term( string $filter_key, int $term_id ): bool {
        $field = 'door_seo_filter_' . str_replace( '-', '_', $filter_key );
        $ids = get_posts( array(
            'post_type' => 'door_seo_landing', 'post_status' => 'any', 'fields' => 'ids', 'posts_per_page' => -1,
            'meta_query' => array( array( 'key' => $field, 'compare' => 'EXISTS' ) ), 'no_found_rows' => true,
        ) );
        foreach ( $ids as $post_id ) {
            if ( in_array( $term_id, self::int_list( get_post_meta( (int) $post_id, $field, true ) ), true ) ) return true;
        }
        return false;
    }

    private static function attribute_dependencies( string $taxonomy ): array {
        $deps = array();
        $registry = self::get_attribute_registry();
        $entry = $registry[ $taxonomy ] ?? null;
        if ( is_array( $entry ) && ! empty( $entry['catalog_filter_enabled'] ) ) $deps[] = 'включён в фильтры каталога';
        if ( is_array( $entry ) && self::seo_uses_filter_key( (string) $entry['filter_key'] ) ) $deps[] = 'используется SEO-посадочной';

        if ( taxonomy_exists( $taxonomy ) ) {
            $terms = get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => false, 'fields' => 'ids' ) );
            if ( ! is_wp_error( $terms ) ) {
                foreach ( $terms as $term_id ) {
                    $objects = get_objects_in_term( (int) $term_id, $taxonomy );
                    if ( ! is_wp_error( $objects ) && ! empty( $objects ) ) { $deps[] = 'используется товарами'; break; }
                }
            }
        }
        foreach ( self::all_policy_refs() as $ref ) {
            if ( in_array( $taxonomy, $ref['policy']['variant_dimensions']['taxonomies'] ?? array(), true ) ) {
                $deps[] = 'используется variant policy ' . $ref['scope'];
            }
        }
        return array_values( array_unique( $deps ) );
    }

    public static function guard_attribute_delete( $attribute_id ): void {
        if ( ! function_exists( 'wc_get_attribute_taxonomies' ) ) return;
        foreach ( wc_get_attribute_taxonomies() as $attribute ) {
            if ( (int) $attribute->attribute_id !== (int) $attribute_id ) continue;
            $name = sanitize_title( (string) $attribute->attribute_name );
            $taxonomy = function_exists( 'wc_attribute_taxonomy_name' ) ? wc_attribute_taxonomy_name( $name ) : 'pa_' . $name;
            $deps = self::attribute_dependencies( $taxonomy );
            if ( ! empty( $deps ) ) {
                wp_die( esc_html( 'Нельзя удалить атрибут ' . $taxonomy . '. Зависимости: ' . implode( '; ', $deps ) ), 'Door Configuration Guard', array( 'response' => 409 ) );
            }
            return;
        }
    }

    public static function guard_term_delete( $term_id, $taxonomy ): void {
        $term_id = absint( $term_id );
        $taxonomy = sanitize_key( (string) $taxonomy );
        if ( $term_id <= 0 ) return;

        $deps = array();
        if ( str_starts_with( $taxonomy, 'pa_' ) ) {
            $objects = get_objects_in_term( $term_id, $taxonomy );
            if ( ! is_wp_error( $objects ) && ! empty( $objects ) ) $deps[] = 'term используется товарами';
            $registry = self::get_attribute_registry();
            $entry = $registry[ $taxonomy ] ?? null;
            if ( is_array( $entry ) ) {
                if ( self::seo_uses_term( (string) $entry['filter_key'], $term_id ) ) $deps[] = 'term используется SEO-посадочной';
            }
        } elseif ( 'door_family' === $taxonomy ) {
            $objects = get_objects_in_term( $term_id, 'door_family' );
            if ( ! is_wp_error( $objects ) && ! empty( $objects ) ) $deps[] = 'family назначена товарам';
            if ( get_term_meta( $term_id, self::POLICY_META, true ) ) $deps[] = 'family имеет configuration policy';
            if ( get_term_meta( $term_id, self::CANONICAL_CATEGORY_META, true ) ) $deps[] = 'family имеет canonical category';
        } elseif ( 'product_cat' === $taxonomy ) {
            $term = get_term( $term_id, 'product_cat' );
            $group_key = $term instanceof WP_Term ? self::clean_key( $term->slug ) : '';
            $accessory_registry = self::get_accessory_group_registry();
            if ( $group_key && isset( $accessory_registry[ $group_key ] ) && (int) $accessory_registry[ $group_key ]['category_id'] === $term_id ) {
                if ( ! empty( self::accessory_ids_for_category( $term_id ) ) ) {
                    $deps[] = 'accessory group содержит опубликованные товары';
                }
            }
            foreach ( self::all_policy_refs() as $ref ) {
                foreach ( $ref['policy']['accessories'] as $key => $rule ) {
                    if ( (int) ( $rule['category_id'] ?? 0 ) === $term_id || ( $group_key && $key === $group_key && 'inherit' !== $rule['mode'] ) ) {
                        $deps[] = 'категория используется accessory policy ' . $ref['scope'];
                    }
                }
            }
            $families = get_terms( array( 'taxonomy' => 'door_family', 'hide_empty' => false, 'fields' => 'ids' ) );
            if ( ! is_wp_error( $families ) ) {
                foreach ( $families as $family_id ) {
                    if ( (int) get_term_meta( (int) $family_id, self::CANONICAL_CATEGORY_META, true ) === $term_id ) $deps[] = 'категория является canonical для family #' . (int) $family_id;
                }
            }
        }
        if ( ! empty( $deps ) ) wp_die( esc_html( 'Удаление заблокировано. ' . implode( '; ', array_values( array_unique( $deps ) ) ) ), 'Door Configuration Guard', array( 'response' => 409 ) );
    }

    public static function guard_product_delete( int $post_id ): void {
        if ( 'product' !== get_post_type( $post_id ) ) return;
        $deps = array();
        foreach ( self::all_policy_refs() as $ref ) {
            foreach ( $ref['policy']['accessories'] as $rule ) {
                if ( in_array( $post_id, self::int_list( $rule['product_ids'] ?? array() ), true ) ) $deps[] = 'product используется accessory policy ' . $ref['scope'];
            }
        }
        if ( ! empty( $deps ) ) wp_die( esc_html( 'Удаление товара заблокировано. ' . implode( '; ', array_values( array_unique( $deps ) ) ) ), 'Door Configuration Guard', array( 'response' => 409 ) );
    }

    private static bool $family_terms_rollback = false;

    private static function strict_variant_issues_for_product( int $product_id ): array {
        $resolved = self::resolve_product( $product_id, true );
        if ( 'legacy_static_fallback' === ( $resolved['variant_dimensions_source'] ?? '' ) ) return array();
        return array_values( array_filter( (array) ( $resolved['issues'] ?? array() ), static function ( string $issue ): bool {
            return str_contains( strtolower( $issue ), 'variant' ) || str_contains( strtolower( $issue ), 'coordinate' );
        } ) );
    }

    public static function validate_product_before_admin_save( $product ): void {
        if ( ! is_object( $product ) || ! method_exists( $product, 'get_id' ) || ! method_exists( $product, 'get_attributes' ) ) return;
        $product_id = (int) $product->get_id();
        if ( $product_id <= 0 ) return;

        $resolved = self::resolve_product( $product_id );
        if ( 'legacy_static_fallback' === ( $resolved['variant_dimensions_source'] ?? '' ) ) return;
        $family = $resolved['family'] ?? array();
        if ( (int) ( $family['id'] ?? 0 ) <= 0 ) return;
        $dimensions = (array) ( $resolved['variant_dimensions'] ?? array() );
        if ( empty( $dimensions ) ) return;

        $attributes = $product->get_attributes();
        $coordinate = array();
        foreach ( $dimensions as $dimension ) {
            $taxonomy = (string) ( $dimension['taxonomy'] ?? '' );
            $attribute = $attributes[ $taxonomy ] ?? null;
            $options = is_object( $attribute ) && method_exists( $attribute, 'get_options' ) ? array_values( array_filter( array_map( 'intval', (array) $attribute->get_options() ) ) ) : array();
            if ( 1 !== count( $options ) ) {
                throw new WC_Data_Exception( 'od_invalid_variant_coordinate', sprintf( 'Товар должен иметь ровно одно значение %s для variant coordinate.', $taxonomy ) );
            }
            $coordinate[] = $taxonomy . ':' . $options[0];
        }
        $coordinate_key = implode( '|', $coordinate );
        foreach ( self::int_list( $family['sibling_ids'] ?? array() ) as $sibling_id ) {
            if ( $sibling_id === $product_id ) continue;
            $parts = array();
            $valid = true;
            foreach ( $dimensions as $dimension ) {
                $taxonomy = (string) ( $dimension['taxonomy'] ?? '' );
                $terms = get_the_terms( $sibling_id, $taxonomy );
                $terms = is_array( $terms ) ? array_values( array_filter( $terms, static fn( $term ): bool => $term instanceof WP_Term ) ) : array();
                if ( 1 !== count( $terms ) ) { $valid = false; break; }
                $parts[] = $taxonomy . ':' . (int) $terms[0]->term_id;
            }
            if ( $valid && implode( '|', $parts ) === $coordinate_key ) {
                throw new WC_Data_Exception( 'od_duplicate_variant_coordinate', sprintf( 'Variant coordinate конфликтует с опубликованным sibling #%d.', $sibling_id ) );
            }
        }
    }

    public static function validate_family_terms_after_set( $object_id, $terms, $tt_ids, $taxonomy, $append, $old_tt_ids ): void {
        unset( $terms, $tt_ids, $append );
        if ( self::$family_terms_rollback || 'door_family' !== $taxonomy || 'product' !== get_post_type( (int) $object_id ) ) return;
        $assigned = get_the_terms( (int) $object_id, 'door_family' );
        $assigned = is_array( $assigned ) ? array_values( array_filter( $assigned, static fn( $term ): bool => $term instanceof WP_Term ) ) : array();
        $problem = '';
        if ( count( $assigned ) > 1 ) $problem = 'Товару нельзя назначить больше одного door_family.';
        if ( 0 === count( $assigned ) && ! self::get_fallback_modes()['family'] ) $problem = 'Family fallback выключен: опубликованная дверь должна иметь один door_family.';
        if ( '' === $problem ) {
            $variant_issues = self::strict_variant_issues_for_product( (int) $object_id );
            if ( ! empty( $variant_issues ) ) $problem = implode( ' ', $variant_issues );
        }
        if ( '' === $problem ) return;

        $old_term_ids = array();
        foreach ( (array) $old_tt_ids as $tt_id ) {
            $term = get_term_by( 'term_taxonomy_id', (int) $tt_id, 'door_family' );
            if ( $term instanceof WP_Term ) $old_term_ids[] = (int) $term->term_id;
        }
        self::$family_terms_rollback = true;
        wp_set_object_terms( (int) $object_id, $old_term_ids, 'door_family', false );
        self::$family_terms_rollback = false;
        wp_die( esc_html( 'Изменение door_family отменено: ' . $problem ), 'Door Configuration Guard', array( 'response' => 409 ) );
    }

    /* ---------------------------------------------------------------------
     * Admin UI / save
     * ------------------------------------------------------------------ */

    public static function register_admin_page(): void {
        add_submenu_page(
            'edit.php?post_type=product',
            'Конфигурация дверей',
            'Конфигурация дверей',
            'manage_woocommerce',
            self::ADMIN_PAGE,
            array( __CLASS__, 'render_admin_page' )
        );
    }

    private static function admin_url( string $tab = 'attributes', array $extra = array() ): string {
        return add_query_arg( array_merge( array( 'post_type' => 'product', 'page' => self::ADMIN_PAGE, 'tab' => $tab ), $extra ), admin_url( 'edit.php' ) );
    }

    private static function redirect_admin( string $tab, string $message, array $extra = array() ): void {
        wp_safe_redirect( self::admin_url( $tab, array_merge( $extra, array( 'od_message' => rawurlencode( $message ) ) ) ) );
        exit;
    }

    private static function validate_scope_entity( string $scope_type, int $scope_id ): ?string {
        if ( 'category' === $scope_type ) {
            $term = get_term( $scope_id, 'product_cat' );
            if ( ! $term instanceof WP_Term ) return 'Категория #' . $scope_id . ' не найдена.';
            if ( ! self::category_in_door_tree( $scope_id ) ) return 'Category policy разрешена только внутри дерева «Межкомнатные двери».';
            return null;
        }
        if ( 'family' === $scope_type ) {
            $term = get_term( $scope_id, 'door_family' );
            return $term instanceof WP_Term ? null : 'Семейство #' . $scope_id . ' не найдено.';
        }
        if ( 'product' === $scope_type ) {
            if ( 'product' !== get_post_type( $scope_id ) ) return 'Товар #' . $scope_id . ' не найден.';
            return self::product_in_door_tree( $scope_id ) ? null : 'Product policy разрешена только для товара внутри дерева «Межкомнатные двери».';
        }
        return 'Некорректный scope type.';
    }

    public static function handle_admin_save(): void {
        if ( ! current_user_can( 'manage_woocommerce' ) ) wp_die( 'Forbidden', '', array( 'response' => 403 ) );
        check_admin_referer( 'od_door_config_save' );
        $section = sanitize_key( $_POST['section'] ?? '' );

        if ( 'attributes' === $section ) {
            $registry = self::get_attribute_registry();
            $submitted = is_array( $_POST['attributes'] ?? null ) ? wp_unslash( $_POST['attributes'] ) : array();
            foreach ( $registry as $taxonomy => &$entry ) {
                $row = is_array( $submitted[ $taxonomy ] ?? null ) ? $submitted[ $taxonomy ] : array();
                $next_enabled = ! empty( $row['enabled'] );
                if ( ! $next_enabled && ! empty( $entry['catalog_filter_enabled'] ) && self::seo_uses_filter_key( (string) $entry['filter_key'] ) ) {
                    self::redirect_admin( 'attributes', 'Нельзя отключить фильтр ' . $entry['label'] . ': он используется SEO-посадочной.' );
                }
                $entry['catalog_filter_enabled'] = $next_enabled;
                $entry['catalog_filter_order'] = (int) ( $row['order'] ?? $entry['catalog_filter_order'] );
                $entry['display_type'] = sanitize_key( (string) ( $row['display_type'] ?? $entry['display_type'] ) );
            }
            unset( $entry );
            update_option( self::OPTION_ATTRIBUTE_REGISTRY, $registry, false );
            self::redirect_admin( 'attributes', 'Реестр атрибутов и фильтров сохранён.' );
        }

        if ( 'fallbacks' === $section ) {
            $raw = is_array( $_POST['fallbacks'] ?? null ) ? $_POST['fallbacks'] : array();
            update_option( self::OPTION_FALLBACK_MODES, array(
                'family' => ! empty( $raw['family'] ),
                'variant_dimensions' => ! empty( $raw['variant_dimensions'] ),
                'order_options' => ! empty( $raw['order_options'] ),
                'accessories' => ! empty( $raw['accessories'] ),
            ), false );
            self::redirect_admin( 'fallbacks', 'Fallback-настройки сохранены.' );
        }

        if ( 'option_registry' === $section ) {
            $old = self::get_option_registry();
            $json = trim( (string) wp_unslash( $_POST['registry_json'] ?? '' ) );
            $decoded = json_decode( $json, true );
            if ( ! is_array( $decoded ) ) self::redirect_admin( 'options', 'Ошибка JSON Option Registry.' );
            $next = self::normalize_option_registry( $decoded );
            if ( empty( $next ) ) self::redirect_admin( 'options', 'Option Registry не может быть пустым.' );
            $dependency_error = self::validate_option_registry_removals( $old, $next );
            if ( $dependency_error ) self::redirect_admin( 'options', $dependency_error );
            update_option( self::OPTION_OPTION_REGISTRY, $next, false );
            self::redirect_admin( 'options', 'Option Registry сохранён.' );
        }

        if ( 'policy' === $section ) {
            $scope_type = sanitize_key( (string) ( $_POST['scope_type'] ?? '' ) );
            $scope_id = absint( $_POST['scope_id'] ?? 0 );
            if ( ! in_array( $scope_type, array( 'category', 'family', 'product' ), true ) || $scope_id <= 0 ) self::redirect_admin( 'policies', 'Некорректный scope.' );
            $scope_error = self::validate_scope_entity( $scope_type, $scope_id );
            if ( $scope_error ) self::redirect_admin( 'policies', $scope_error, array( 'scope_type' => $scope_type, 'scope_id' => $scope_id ) );

            $policy_json = trim( (string) wp_unslash( $_POST['policy_json'] ?? '' ) );
            $decoded = json_decode( $policy_json, true );
            if ( ! is_array( $decoded ) ) self::redirect_admin( 'policies', 'Ошибка JSON policy.', array( 'scope_type' => $scope_type, 'scope_id' => $scope_id ) );
            $policy = self::normalize_policy( $decoded, $scope_type );
            $validation = self::validate_policy_references( $policy, $scope_type );
            if ( ! empty( $validation ) ) self::redirect_admin( 'policies', implode( ' ', $validation ), array( 'scope_type' => $scope_type, 'scope_id' => $scope_id ) );

            $old_policy = self::get_policy( $scope_type, $scope_id );
            $old_canonical = 'family' === $scope_type ? absint( get_term_meta( $scope_id, self::CANONICAL_CATEGORY_META, true ) ) : 0;
            self::save_policy( $scope_type, $scope_id, $policy );

            if ( 'family' === $scope_type ) {
                $canonical_id = absint( $_POST['canonical_category_id'] ?? 0 );
                if ( $canonical_id > 0 ) update_term_meta( $scope_id, self::CANONICAL_CATEGORY_META, $canonical_id ); else delete_term_meta( $scope_id, self::CANONICAL_CATEGORY_META );
                $canonical_errors = self::validate_family_canonical_category( $scope_id, $canonical_id );
                if ( ! empty( $canonical_errors ) ) {
                    self::save_policy( $scope_type, $scope_id, $old_policy );
                    if ( $old_canonical > 0 ) update_term_meta( $scope_id, self::CANONICAL_CATEGORY_META, $old_canonical ); else delete_term_meta( $scope_id, self::CANONICAL_CATEGORY_META );
                    self::redirect_admin( 'policies', implode( ' ', $canonical_errors ), array( 'scope_type' => $scope_type, 'scope_id' => $scope_id ) );
                }
            }

            $variant_errors = self::validate_all_strict_variant_policies();
            if ( ! empty( $variant_errors ) ) {
                self::save_policy( $scope_type, $scope_id, $old_policy );
                if ( 'family' === $scope_type ) {
                    if ( $old_canonical > 0 ) update_term_meta( $scope_id, self::CANONICAL_CATEGORY_META, $old_canonical ); else delete_term_meta( $scope_id, self::CANONICAL_CATEGORY_META );
                }
                self::redirect_admin( 'policies', implode( ' ', $variant_errors ), array( 'scope_type' => $scope_type, 'scope_id' => $scope_id ) );
            }
            self::redirect_admin( 'policies', 'Policy сохранена.', array( 'scope_type' => $scope_type, 'scope_id' => $scope_id ) );
        }

        if ( 'manifest_import' === $section ) {
            $json = trim( (string) wp_unslash( $_POST['manifest_json'] ?? '' ) );
            $manifest = json_decode( $json, true );
            if ( ! is_array( $manifest ) ) self::redirect_admin( 'manifest', 'Некорректный JSON manifest.' );
            $errors = self::import_manifest( $manifest );
            if ( ! empty( $errors ) ) self::redirect_admin( 'manifest', 'Import отклонён: ' . implode( ' ', $errors ) );
            self::redirect_admin( 'manifest', 'Configuration manifest импортирован.' );
        }

        self::redirect_admin( 'attributes', 'Неизвестная операция.' );
    }

    private static function validate_policy_references( array $policy, string $scope_type, ?array $option_registry_override = null ): array {
        $errors = array();
        $attributes = self::get_attribute_registry();
        if ( 'product' !== $scope_type && 'replace' === $policy['variant_dimensions']['mode'] ) {
            foreach ( $policy['variant_dimensions']['taxonomies'] as $taxonomy ) {
                if ( ! isset( $attributes[ $taxonomy ] ) || empty( $attributes[ $taxonomy ]['exists'] ) ) $errors[] = 'Неизвестный variant attribute: ' . $taxonomy . '.';
            }
        }
        $option_registry = null !== $option_registry_override ? $option_registry_override : self::get_option_registry();
        foreach ( $policy['options'] as $key => $rule ) {
            if ( ! isset( $option_registry[ $key ] ) ) { $errors[] = 'Неизвестная option group: ' . $key . '.'; continue; }
            $ids = array_column( $option_registry[ $key ]['choices'], 'id' );
            foreach ( $rule['choices'] as $choice ) if ( ! in_array( $choice['id'], $ids, true ) ) $errors[] = 'Неизвестный option choice: ' . $key . ':' . $choice['id'] . '.';
            if ( 'replace' === $rule['mode'] ) {
                if ( empty( $rule['choices'] ) ) $errors[] = 'Option group ' . $key . ' в режиме REPLACE должна содержать хотя бы один choice.';
                $default_count = count( array_filter( $rule['choices'], static fn( array $choice ): bool => ! empty( $choice['is_default'] ) ) );
                if ( $default_count > 1 ) $errors[] = 'Option group ' . $key . ' не может иметь больше одного default choice.';
            }
        }
        $accessory_registry = self::get_accessory_group_registry();
        foreach ( $policy['accessories'] as $key => $rule ) {
            if ( ! isset( $accessory_registry[ $key ] ) ) { $errors[] = 'Неизвестная accessory group: ' . $key . '.'; continue; }
            if ( 'replace' !== $rule['mode'] ) continue;
            $group_category_id = (int) $accessory_registry[ $key ]['category_id'];
            if ( 'explicit' === $rule['source'] ) {
                foreach ( $rule['product_ids'] as $product_id ) {
                    if ( 'product' !== get_post_type( $product_id ) ) {
                        $errors[] = 'Неизвестный accessory product #' . $product_id . '.';
                    } elseif ( ! self::product_is_accessory( $product_id ) ) {
                        $errors[] = 'Product #' . $product_id . ' не принадлежит дереву «Фурнитура».';
                    } elseif ( ! self::product_in_accessory_group( $product_id, $group_category_id ) ) {
                        $errors[] = 'Product #' . $product_id . ' не принадлежит accessory group «' . $accessory_registry[ $key ]['label'] . '».';
                    }
                }
            } else {
                $category_id = (int) ( $rule['category_id'] ?? 0 );
                if ( $category_id <= 0 ) $category_id = $group_category_id;
                if ( ! self::category_in_accessory_tree( $category_id ) ) {
                    $errors[] = 'Accessory category #' . $category_id . ' должна быть внутри дерева «Фурнитура».';
                } elseif ( ! self::category_in_branch( $category_id, $group_category_id ) ) {
                    $errors[] = 'Accessory category #' . $category_id . ' не принадлежит group «' . $accessory_registry[ $key ]['label'] . '».';
                }
            }
        }
        return array_values( array_unique( $errors ) );
    }

    private static function validate_option_registry_removals( array $old, array $next ): ?string {
        foreach ( self::all_policy_refs() as $ref ) {
            foreach ( $ref['policy']['options'] as $key => $rule ) {
                if ( ! isset( $next[ $key ] ) && 'inherit' !== $rule['mode'] ) return 'Нельзя удалить option group ' . $key . ': используется ' . $ref['scope'] . '.';
                if ( ! isset( $next[ $key ] ) ) continue;
                $next_ids = array_column( $next[ $key ]['choices'], 'id' );
                foreach ( $rule['choices'] as $choice ) if ( ! in_array( $choice['id'], $next_ids, true ) ) return 'Нельзя удалить choice ' . $key . ':' . $choice['id'] . ': используется ' . $ref['scope'] . '.';
            }
        }
        return null;
    }

    private static function validate_family_canonical_category( int $family_id, int $category_id ): array {
        if ( $category_id <= 0 ) return array(); // transition fallback can remain active
        if ( ! self::category_in_door_tree( $category_id ) ) return array( 'Canonical category должна быть внутри дерева «Межкомнатные двери».' );
        $products = get_posts( array( 'post_type' => 'product', 'post_status' => 'publish', 'fields' => 'ids', 'posts_per_page' => -1,
            'tax_query' => array( array( 'taxonomy' => 'door_family', 'field' => 'term_id', 'terms' => array( $family_id ) ) ), 'no_found_rows' => true ) );
        foreach ( $products as $product_id ) {
            if ( has_term( $category_id, 'product_cat', (int) $product_id ) ) continue;
            // Allow a product assigned to a descendant of canonical category.
            $cats = get_the_terms( (int) $product_id, 'product_cat' );
            $ok = false;
            if ( is_array( $cats ) ) foreach ( $cats as $cat ) if ( $cat instanceof WP_Term && in_array( $category_id, array_map( 'intval', get_ancestors( (int) $cat->term_id, 'product_cat', 'taxonomy' ) ), true ) ) { $ok = true; break; }
            if ( ! $ok ) return array( 'Product #' . (int) $product_id . ' family не принадлежит canonical configuration branch.' );
        }
        return array();
    }

    private static function validate_all_strict_variant_policies(): array {
        $errors = array();
        $families = get_terms( array( 'taxonomy' => 'door_family', 'hide_empty' => false, 'fields' => 'ids' ) );
        if ( is_wp_error( $families ) ) return array();
        foreach ( $families as $family_id ) {
            $products = get_posts( array( 'post_type' => 'product', 'post_status' => 'publish', 'fields' => 'ids', 'posts_per_page' => 1,
                'tax_query' => array( array( 'taxonomy' => 'door_family', 'field' => 'term_id', 'terms' => array( (int) $family_id ) ) ), 'no_found_rows' => true ) );
            if ( empty( $products ) ) continue;
            $resolved = self::resolve_product( (int) $products[0], true );
            if ( 'legacy_static_fallback' === ( $resolved['variant_dimensions_source'] ?? '' ) ) continue;
            foreach ( (array) ( $resolved['issues'] ?? array() ) as $issue ) {
                if ( str_contains( $issue, 'variant' ) || str_contains( $issue, 'Variant' ) || str_contains( $issue, 'coordinate' ) ) $errors[] = 'Family #' . (int) $family_id . ': ' . $issue;
            }
        }
        return array_values( array_unique( $errors ) );
    }

    public static function render_admin_page(): void {
        if ( ! current_user_can( 'manage_woocommerce' ) ) return;
        $tab = sanitize_key( $_GET['tab'] ?? 'attributes' );
        $message = isset( $_GET['od_message'] ) ? sanitize_text_field( wp_unslash( $_GET['od_message'] ) ) : '';
        $tabs = array( 'attributes' => 'Атрибуты и фильтры', 'options' => 'Опции заказа', 'policies' => 'Политики', 'fallbacks' => 'Fallback / диагностика', 'manifest' => 'Export / Import' );
        echo '<div class="wrap"><h1>Конфигурация дверей</h1>';
        if ( $message ) echo '<div class="notice notice-info is-dismissible"><p>' . esc_html( rawurldecode( $message ) ) . '</p></div>';
        echo '<nav class="nav-tab-wrapper">';
        foreach ( $tabs as $key => $label ) echo '<a class="nav-tab ' . ( $tab === $key ? 'nav-tab-active' : '' ) . '" href="' . esc_url( self::admin_url( $key ) ) . '">' . esc_html( $label ) . '</a>';
        echo '</nav><div style="margin-top:20px;max-width:1200px">';
        if ( 'attributes' === $tab ) self::render_attributes_tab();
        elseif ( 'options' === $tab ) self::render_options_tab();
        elseif ( 'policies' === $tab ) self::render_policies_tab();
        elseif ( 'fallbacks' === $tab ) self::render_fallbacks_tab();
        elseif ( 'manifest' === $tab ) self::render_manifest_tab();
        else self::render_attributes_tab();
        echo '</div></div>';
    }

    private static function form_open( string $section ): void {
        echo '<form method="post" action="' . esc_url( admin_url( 'admin-post.php' ) ) . '">';
        echo '<input type="hidden" name="action" value="od_door_config_save">';
        echo '<input type="hidden" name="section" value="' . esc_attr( $section ) . '">';
        wp_nonce_field( 'od_door_config_save' );
    }

    private static function render_attributes_tab(): void {
        $registry = self::get_attribute_registry();
        self::form_open( 'attributes' );
        echo '<p>Woo attributes обнаруживаются автоматически. Новый атрибут появляется здесь выключенным и не становится фильтром без явного выбора.</p>';
        echo '<table class="widefat striped"><thead><tr><th>Attribute</th><th>Taxonomy</th><th>Filter key</th><th>Фильтр каталога</th><th>Порядок</th><th>UI</th></tr></thead><tbody>';
        foreach ( $registry as $taxonomy => $row ) {
            echo '<tr><td><strong>' . esc_html( $row['label'] ) . '</strong><br><small>ID ' . (int) $row['attribute_id'] . '</small></td><td><code>' . esc_html( $taxonomy ) . '</code></td><td><code>' . esc_html( $row['filter_key'] ) . '</code></td>';
            echo '<td><label><input type="checkbox" name="attributes[' . esc_attr( $taxonomy ) . '][enabled]" value="1" ' . checked( ! empty( $row['catalog_filter_enabled'] ), true, false ) . '> использовать</label></td>';
            echo '<td><input type="number" style="width:90px" name="attributes[' . esc_attr( $taxonomy ) . '][order]" value="' . (int) $row['catalog_filter_order'] . '"></td>';
            echo '<td><select name="attributes[' . esc_attr( $taxonomy ) . '][display_type]">';
            foreach ( array( 'checkbox', 'color', 'buttons', 'select' ) as $type ) echo '<option value="' . esc_attr( $type ) . '" ' . selected( $row['display_type'], $type, false ) . '>' . esc_html( $type ) . '</option>';
            echo '</select></td></tr>';
        }
        echo '</tbody></table>'; submit_button( 'Сохранить фильтры' ); echo '</form>';
        $history = get_option( self::OPTION_ATTRIBUTE_HISTORY, array() );
        echo '<details style="margin-top:24px"><summary><strong>Удалённые / недоступные атрибуты</strong></summary><pre style="background:#fff;padding:12px;overflow:auto">' . esc_html( wp_json_encode( $history, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) ) . '</pre></details>';
    }

    private static function render_options_tab(): void {
        self::form_open( 'option_registry' );
        echo '<p>Registry задаёт существующие option groups и choices. Policy ниже определяет, где они доступны. Формат сохраняет camelCase ключи, например <code>openingSide</code>.</p>';
        echo '<textarea name="registry_json" rows="28" style="width:100%;font-family:monospace">' . esc_textarea( wp_json_encode( self::get_option_registry(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) ) . '</textarea>';
        submit_button( 'Сохранить Option Registry' ); echo '</form>';
    }

    private static function render_policies_tab(): void {
        $scope_type = sanitize_key( $_GET['scope_type'] ?? 'family' );
        if ( ! in_array( $scope_type, array( 'category', 'family', 'product' ), true ) ) $scope_type = 'family';
        $scope_id = absint( $_GET['scope_id'] ?? 0 );
        echo '<form method="get" action="' . esc_url( admin_url( 'edit.php' ) ) . '"><input type="hidden" name="post_type" value="product"><input type="hidden" name="page" value="' . esc_attr( self::ADMIN_PAGE ) . '"><input type="hidden" name="tab" value="policies">';
        echo '<select name="scope_type"><option value="category" ' . selected( $scope_type, 'category', false ) . '>Категория</option><option value="family" ' . selected( $scope_type, 'family', false ) . '>Семейство</option><option value="product" ' . selected( $scope_type, 'product', false ) . '>Товар</option></select> ';
        echo '<input type="number" min="1" name="scope_id" value="' . ( $scope_id ?: '' ) . '" placeholder="ID scope"> ';
        submit_button( 'Открыть policy', 'secondary', '', false ); echo '</form>';
        echo '<p><small>ID можно взять из Woo/WordPress. Category policy поддерживает любую глубину; family policy дополнительно хранит canonical configuration category. Product scope не поддерживает variantDimensions.</small></p>';
        if ( $scope_id <= 0 ) return;

        $policy = self::get_policy( $scope_type, $scope_id );
        self::form_open( 'policy' );
        echo '<input type="hidden" name="scope_type" value="' . esc_attr( $scope_type ) . '"><input type="hidden" name="scope_id" value="' . $scope_id . '">';
        if ( 'family' === $scope_type ) {
            $canonical = absint( get_term_meta( $scope_id, self::CANONICAL_CATEGORY_META, true ) );
            echo '<p><label><strong>Canonical configuration category ID:</strong> <input type="number" min="0" name="canonical_category_id" value="' . $canonical . '"></label></p>';
        }
        echo '<p>Policy JSON. Семантика: variantDimensions — INHERIT/REPLACE; options/accessories — INHERIT/REPLACE/DISABLED. Accessory source: category или explicit.</p>';
        echo '<textarea name="policy_json" rows="32" style="width:100%;font-family:monospace">' . esc_textarea( wp_json_encode( $policy, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) ) . '</textarea>';
        submit_button( 'Сохранить policy' ); echo '</form>';

        if ( 'product' === $scope_type ) {
            $resolved = self::resolve_product( $scope_id, true );
            echo '<h2>Effective configuration</h2><pre style="background:#fff;padding:12px;overflow:auto;max-height:700px">' . esc_html( wp_json_encode( $resolved, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) ) . '</pre>';
        }
    }

    private static function render_fallbacks_tab(): void {
        $modes = self::get_fallback_modes();
        self::form_open( 'fallbacks' );
        echo '<p>Отключайте подсистемы по одной только после настройки и проверки новой configuration. New + legacy никогда не merge.</p>';
        foreach ( array( 'family' => 'Family fallback', 'variant_dimensions' => 'VariantDimensions fallback', 'order_options' => 'OrderOptions fallback', 'accessories' => 'Accessories fallback' ) as $key => $label ) {
            echo '<p><label><input type="checkbox" name="fallbacks[' . esc_attr( $key ) . ']" value="1" ' . checked( ! empty( $modes[ $key ] ), true, false ) . '> <strong>' . esc_html( $label ) . '</strong></label></p>';
        }
        submit_button( 'Сохранить fallback modes' ); echo '</form>';
        echo '<h2>Диагностика Registry</h2><pre style="background:#fff;padding:12px;overflow:auto">' . esc_html( wp_json_encode( array( 'catalog_filters' => self::get_catalog_filter_definitions(), 'accessory_groups' => self::get_accessory_group_registry() ), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) ) . '</pre>';
    }

    private static function render_manifest_tab(): void {
        $manifest = self::build_manifest();
        echo '<h2>Export</h2><p>Manifest использует taxonomy/category paths/family slugs/SKU вместо слепой зависимости от WP IDs там, где это важно между окружениями.</p>';
        echo '<textarea readonly rows="24" style="width:100%;font-family:monospace">' . esc_textarea( wp_json_encode( $manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ) ) . '</textarea>';
        echo '<h2>Import</h2>'; self::form_open( 'manifest_import' );
        echo '<textarea name="manifest_json" rows="20" style="width:100%;font-family:monospace" placeholder="Вставьте manifest JSON"></textarea>';
        submit_button( 'Проверить и импортировать manifest', 'primary' ); echo '</form>';
    }

    /* ---------------------------------------------------------------------
     * Manifest
     * ------------------------------------------------------------------ */

    private static function category_path( int $term_id ): string {
        $term = get_term( $term_id, 'product_cat' );
        if ( ! $term instanceof WP_Term ) return '';
        $ids = array_reverse( array_map( 'intval', get_ancestors( $term_id, 'product_cat', 'taxonomy' ) ) );
        $ids[] = $term_id;
        $slugs = array();
        foreach ( $ids as $id ) {
            $item = get_term( $id, 'product_cat' );
            if ( $item instanceof WP_Term ) $slugs[] = $item->slug;
        }
        return implode( '/', $slugs );
    }

    private static function category_id_by_path( string $path ): int {
        $parts = array_values( array_filter( explode( '/', trim( $path, '/' ) ) ) );
        $parent = 0;
        $current = null;
        foreach ( $parts as $slug ) {
            $terms = get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => false, 'slug' => sanitize_title( $slug ), 'parent' => $parent, 'number' => 1 ) );
            if ( is_wp_error( $terms ) || empty( $terms ) ) return 0;
            $current = $terms[0];
            $parent = (int) $current->term_id;
        }
        return $current instanceof WP_Term ? (int) $current->term_id : 0;
    }

    private static function product_sku( int $product_id ): string {
        return trim( (string) get_post_meta( $product_id, '_sku', true ) );
    }

    private static function product_id_by_sku( string $sku ): int {
        if ( function_exists( 'wc_get_product_id_by_sku' ) ) return (int) wc_get_product_id_by_sku( $sku );
        $ids = get_posts( array( 'post_type' => 'product', 'post_status' => 'any', 'fields' => 'ids', 'posts_per_page' => 1, 'meta_key' => '_sku', 'meta_value' => $sku ) );
        return (int) ( $ids[0] ?? 0 );
    }

    private static function export_policy( array $policy ): array {
        foreach ( $policy['accessories'] as &$rule ) {
            if ( ! empty( $rule['category_id'] ) ) $rule['category_path'] = self::category_path( (int) $rule['category_id'] );
            $rule['product_skus'] = array_values( array_filter( array_map( array( __CLASS__, 'product_sku' ), self::int_list( $rule['product_ids'] ?? array() ) ) ) );
            unset( $rule['category_id'], $rule['product_ids'] );
        }
        unset( $rule );
        return $policy;
    }

    private static function import_policy( array $policy ): array {
        foreach ( (array) ( $policy['accessories'] ?? array() ) as &$rule ) {
            if ( ! is_array( $rule ) ) continue;
            $rule['category_id'] = ! empty( $rule['category_path'] ) ? self::category_id_by_path( (string) $rule['category_path'] ) : 0;
            $rule['product_ids'] = array_values( array_filter( array_map( static fn( $sku ): int => self::product_id_by_sku( (string) $sku ), (array) ( $rule['product_skus'] ?? array() ) ) ) );
            unset( $rule['category_path'], $rule['product_skus'] );
        }
        unset( $rule );
        return $policy;
    }

    private static function validate_manifest_policy_portable_references( array $policy, string $scope_label ): array {
        $errors = array();
        foreach ( (array) ( $policy['accessories'] ?? array() ) as $group_key => $rule ) {
            if ( ! is_array( $rule ) || 'replace' !== ( $rule['mode'] ?? '' ) ) continue;
            if ( 'explicit' === ( $rule['source'] ?? '' ) ) {
                foreach ( (array) ( $rule['product_skus'] ?? array() ) as $sku ) {
                    $sku = trim( (string) $sku );
                    if ( '' === $sku ) {
                        $errors[] = $scope_label . ': пустой SKU в accessory group ' . $group_key . '.';
                        continue;
                    }
                    if ( self::product_id_by_sku( $sku ) <= 0 ) {
                        $errors[] = $scope_label . ': accessory product SKU не найден: ' . $sku . '.';
                    }
                }
            } else {
                $path = trim( (string) ( $rule['category_path'] ?? '' ), '/' );
                if ( '' !== $path && self::category_id_by_path( $path ) <= 0 ) {
                    $errors[] = $scope_label . ': accessory category path не найден: ' . $path . '.';
                }
            }
        }
        return $errors;
    }

    private static function snapshot_policy_storage(): array {
        $snapshot = array( 'categories' => array(), 'families' => array(), 'products' => array() );

        $category_ids = get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => false, 'fields' => 'ids' ) );
        if ( ! is_wp_error( $category_ids ) ) {
            foreach ( $category_ids as $id ) {
                $id = (int) $id;
                if ( metadata_exists( 'term', $id, self::POLICY_META ) ) {
                    $snapshot['categories'][ $id ] = get_term_meta( $id, self::POLICY_META, true );
                }
            }
        }

        $family_ids = get_terms( array( 'taxonomy' => 'door_family', 'hide_empty' => false, 'fields' => 'ids' ) );
        if ( ! is_wp_error( $family_ids ) ) {
            foreach ( $family_ids as $id ) {
                $id = (int) $id;
                $row = array();
                if ( metadata_exists( 'term', $id, self::POLICY_META ) ) {
                    $row['policy'] = get_term_meta( $id, self::POLICY_META, true );
                }
                if ( metadata_exists( 'term', $id, self::CANONICAL_CATEGORY_META ) ) {
                    $row['canonical'] = get_term_meta( $id, self::CANONICAL_CATEGORY_META, true );
                }
                if ( ! empty( $row ) ) $snapshot['families'][ $id ] = $row;
            }
        }

        $product_ids = get_posts( array(
            'post_type' => 'product', 'post_status' => 'any', 'fields' => 'ids', 'posts_per_page' => -1,
            'meta_key' => self::POLICY_META, 'no_found_rows' => true,
        ) );
        foreach ( $product_ids as $id ) {
            $id = (int) $id;
            if ( metadata_exists( 'post', $id, self::POLICY_META ) ) {
                $snapshot['products'][ $id ] = get_post_meta( $id, self::POLICY_META, true );
            }
        }
        return $snapshot;
    }

    private static function clear_policy_storage(): void {
        $snapshot = self::snapshot_policy_storage();
        foreach ( array_keys( $snapshot['categories'] ) as $id ) delete_term_meta( (int) $id, self::POLICY_META );
        foreach ( $snapshot['families'] as $id => $row ) {
            unset( $row );
            delete_term_meta( (int) $id, self::POLICY_META );
            delete_term_meta( (int) $id, self::CANONICAL_CATEGORY_META );
        }
        foreach ( array_keys( $snapshot['products'] ) as $id ) delete_post_meta( (int) $id, self::POLICY_META );
    }

    private static function restore_policy_storage( array $snapshot ): void {
        self::clear_policy_storage();
        foreach ( $snapshot['categories'] as $id => $policy ) update_term_meta( (int) $id, self::POLICY_META, $policy );
        foreach ( $snapshot['families'] as $id => $row ) {
            if ( array_key_exists( 'policy', $row ) ) update_term_meta( (int) $id, self::POLICY_META, $row['policy'] );
            if ( array_key_exists( 'canonical', $row ) ) update_term_meta( (int) $id, self::CANONICAL_CATEGORY_META, $row['canonical'] );
        }
        foreach ( $snapshot['products'] as $id => $policy ) update_post_meta( (int) $id, self::POLICY_META, $policy );
    }

    public static function build_manifest(): array {
        $categories = array();
        $category_ids = get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => false, 'fields' => 'ids' ) );
        if ( ! is_wp_error( $category_ids ) ) foreach ( $category_ids as $id ) {
            $raw = get_term_meta( (int) $id, self::POLICY_META, true );
            if ( ! $raw ) continue;
            $categories[] = array( 'category_path' => self::category_path( (int) $id ), 'policy' => self::export_policy( self::get_policy( 'category', (int) $id ) ) );
        }

        $families = array();
        $family_ids = get_terms( array( 'taxonomy' => 'door_family', 'hide_empty' => false, 'fields' => 'ids' ) );
        if ( ! is_wp_error( $family_ids ) ) foreach ( $family_ids as $id ) {
            $term = get_term( (int) $id, 'door_family' );
            if ( ! $term instanceof WP_Term ) continue;
            $raw = get_term_meta( (int) $id, self::POLICY_META, true );
            $canonical = absint( get_term_meta( (int) $id, self::CANONICAL_CATEGORY_META, true ) );
            if ( ! $raw && $canonical <= 0 ) continue;
            $families[] = array( 'family_slug' => $term->slug, 'canonical_category_path' => $canonical > 0 ? self::category_path( $canonical ) : '', 'policy' => self::export_policy( self::get_policy( 'family', (int) $id ) ) );
        }

        $products = array();
        $product_ids = get_posts( array( 'post_type' => 'product', 'post_status' => 'any', 'fields' => 'ids', 'posts_per_page' => -1, 'meta_key' => self::POLICY_META, 'no_found_rows' => true ) );
        foreach ( $product_ids as $id ) {
            $sku = self::product_sku( (int) $id );
            if ( '' === $sku ) continue;
            $products[] = array( 'sku' => $sku, 'policy' => self::export_policy( self::get_policy( 'product', (int) $id ) ) );
        }

        $roles = array();
        foreach ( self::get_attribute_registry() as $entry ) {
            $roles[] = array(
                'taxonomy' => $entry['taxonomy'], 'filter_key' => $entry['filter_key'], 'label' => $entry['label'],
                'catalog_filter_enabled' => ! empty( $entry['catalog_filter_enabled'] ), 'catalog_filter_order' => (int) $entry['catalog_filter_order'], 'display_type' => $entry['display_type'],
            );
        }
        return array(
            'schema_version' => self::VERSION,
            'attribute_roles' => $roles,
            'option_registry' => self::get_option_registry(),
            'accessory_group_registry' => array_values( array_map( static function ( array $group ): array {
                return array(
                    'key' => $group['key'],
                    'label' => $group['label'],
                    'category_path' => self::category_path( (int) $group['category_id'] ),
                );
            }, self::get_accessory_group_registry() ) ),
            'fallback_modes' => self::get_fallback_modes(),
            'category_policies' => $categories,
            'family_policies' => $families,
            'product_policies' => $products,
        );
    }

    private static function import_manifest( array $manifest ): array {
        if ( (int) ( $manifest['schema_version'] ?? 0 ) !== self::VERSION ) return array( 'Unsupported schema_version.' );
        $errors = array();
        $registry = self::get_attribute_registry();
        foreach ( (array) ( $manifest['attribute_roles'] ?? array() ) as $role ) {
            if ( ! is_array( $role ) ) continue;
            $taxonomy = sanitize_key( (string) ( $role['taxonomy'] ?? '' ) );
            if ( ! isset( $registry[ $taxonomy ] ) ) { $errors[] = 'Attribute отсутствует: ' . $taxonomy; continue; }
            $registry[ $taxonomy ]['filter_key'] = self::clean_key( $role['filter_key'] ?? $registry[ $taxonomy ]['filter_key'] );
            $registry[ $taxonomy ]['label'] = sanitize_text_field( (string) ( $role['label'] ?? $registry[ $taxonomy ]['label'] ) );
            $registry[ $taxonomy ]['catalog_filter_enabled'] = self::bool_value( $role['catalog_filter_enabled'] ?? false );
            $registry[ $taxonomy ]['catalog_filter_order'] = (int) ( $role['catalog_filter_order'] ?? 0 );
            $registry[ $taxonomy ]['display_type'] = sanitize_key( (string) ( $role['display_type'] ?? 'checkbox' ) );
        }
        $options = self::normalize_option_registry( (array) ( $manifest['option_registry'] ?? array() ) );
        if ( empty( $options ) ) $errors[] = 'Option Registry manifest пуст.';
        $option_dependency_error = self::validate_option_registry_removals( self::get_option_registry(), $options );
        if ( $option_dependency_error ) $errors[] = $option_dependency_error;

        $filter_keys = array();
        foreach ( $registry as $taxonomy => $entry ) {
            $key = (string) ( $entry['filter_key'] ?? '' );
            if ( '' === $key ) { $errors[] = 'Пустой filterKey для ' . $taxonomy . '.'; continue; }
            if ( isset( $filter_keys[ $key ] ) && $filter_keys[ $key ] !== $taxonomy ) $errors[] = 'Дублирующийся filterKey ' . $key . '.';
            $filter_keys[ $key ] = $taxonomy;
            $current = self::get_attribute_registry()[ $taxonomy ] ?? null;
            if ( is_array( $current ) && ! empty( $current['catalog_filter_enabled'] ) && empty( $entry['catalog_filter_enabled'] ) && self::seo_uses_filter_key( (string) $current['filter_key'] ) ) {
                $errors[] = 'Нельзя отключить filter ' . $current['filter_key'] . ': он используется SEO-посадочной.';
            }
            if ( is_array( $current ) && (string) $current['filter_key'] !== $key && self::seo_uses_filter_key( (string) $current['filter_key'] ) ) {
                $errors[] = 'Нельзя изменить filterKey ' . $current['filter_key'] . ': он используется SEO-посадочной.';
            }
        }

        $current_accessory_groups = self::get_accessory_group_registry();
        foreach ( (array) ( $manifest['accessory_group_registry'] ?? array() ) as $group ) {
            if ( ! is_array( $group ) ) continue;
            $key = self::clean_key( $group['key'] ?? '' );
            $path = trim( (string) ( $group['category_path'] ?? '' ), '/' );
            $category_id = self::category_id_by_path( $path );
            if ( '' === $key || ! isset( $current_accessory_groups[ $key ] ) ) {
                $errors[] = 'Accessory group отсутствует в текущем Woo: ' . ( $key ?: '(empty key)' ) . '.';
                continue;
            }
            if ( $category_id <= 0 || ! self::category_in_accessory_tree( $category_id ) ) {
                $errors[] = 'Accessory group category path не найден: ' . $path . '.';
                continue;
            }
            if ( (int) $current_accessory_groups[ $key ]['category_id'] !== $category_id ) {
                $errors[] = 'Accessory group ' . $key . ' указывает на другую category path в текущем Woo.';
            }
        }

        $planned = array();
        foreach ( (array) ( $manifest['category_policies'] ?? array() ) as $row ) {
            if ( ! is_array( $row ) ) continue;
            $path = (string) ( $row['category_path'] ?? '' );
            $id = self::category_id_by_path( $path );
            if ( $id <= 0 ) { $errors[] = 'Category path не найден: ' . $path; continue; }
            if ( ! self::category_in_door_tree( $id ) ) { $errors[] = 'Category policy вне дерева «Межкомнатные двери»: ' . $path . '.'; continue; }
            $raw_policy = (array) ( $row['policy'] ?? array() );
            $errors = array_merge( $errors, self::validate_manifest_policy_portable_references( $raw_policy, 'Category ' . $path ) );
            $planned[] = array( 'type' => 'category', 'id' => $id, 'policy' => self::normalize_policy( self::import_policy( $raw_policy ), 'category' ) );
        }
        foreach ( (array) ( $manifest['family_policies'] ?? array() ) as $row ) {
            if ( ! is_array( $row ) ) continue;
            $family_slug = sanitize_title( (string) ( $row['family_slug'] ?? '' ) );
            $term = get_term_by( 'slug', $family_slug, 'door_family' );
            if ( ! $term instanceof WP_Term ) { $errors[] = 'Family slug не найден: ' . (string) ( $row['family_slug'] ?? '' ); continue; }
            $canonical = ! empty( $row['canonical_category_path'] ) ? self::category_id_by_path( (string) $row['canonical_category_path'] ) : 0;
            if ( ! empty( $row['canonical_category_path'] ) && $canonical <= 0 ) $errors[] = 'Canonical category path не найден: ' . $row['canonical_category_path'];
            $raw_policy = (array) ( $row['policy'] ?? array() );
            $errors = array_merge( $errors, self::validate_manifest_policy_portable_references( $raw_policy, 'Family ' . $family_slug ) );
            $planned[] = array( 'type' => 'family', 'id' => (int) $term->term_id, 'canonical' => $canonical, 'policy' => self::normalize_policy( self::import_policy( $raw_policy ), 'family' ) );
        }
        foreach ( (array) ( $manifest['product_policies'] ?? array() ) as $row ) {
            if ( ! is_array( $row ) ) continue;
            $sku = trim( (string) ( $row['sku'] ?? '' ) );
            $id = self::product_id_by_sku( $sku );
            if ( $id <= 0 ) { $errors[] = 'Product SKU не найден: ' . $sku; continue; }
            if ( ! self::product_in_door_tree( $id ) ) { $errors[] = 'Product policy SKU вне дерева «Межкомнатные двери»: ' . $sku . '.'; continue; }
            $raw_policy = (array) ( $row['policy'] ?? array() );
            $errors = array_merge( $errors, self::validate_manifest_policy_portable_references( $raw_policy, 'Product ' . $sku ) );
            $planned[] = array( 'type' => 'product', 'id' => $id, 'policy' => self::normalize_policy( self::import_policy( $raw_policy ), 'product' ) );
        }
        foreach ( $planned as $row ) {
            $errors = array_merge( $errors, self::validate_policy_references( $row['policy'], $row['type'], $options ) );
            if ( 'family' === $row['type'] && ! empty( $row['canonical'] ) ) {
                $errors = array_merge( $errors, self::validate_family_canonical_category( $row['id'], (int) $row['canonical'] ) );
            }
        }
        if ( ! empty( $errors ) ) return array_values( array_unique( $errors ) );

        $old_registry = get_option( self::OPTION_ATTRIBUTE_REGISTRY, array() );
        $old_options = get_option( self::OPTION_OPTION_REGISTRY, array() );
        $old_fallbacks = get_option( self::OPTION_FALLBACK_MODES, array() );
        $old_policy_storage = self::snapshot_policy_storage();

        $fallback_input = is_array( $manifest['fallback_modes'] ?? null ) ? $manifest['fallback_modes'] : array();
        $next_fallbacks = array();
        foreach ( self::default_fallback_modes() as $key => $default ) {
            $next_fallbacks[ $key ] = array_key_exists( $key, $fallback_input ) ? self::bool_value( $fallback_input[ $key ] ) : $default;
        }

        update_option( self::OPTION_ATTRIBUTE_REGISTRY, $registry, false );
        update_option( self::OPTION_OPTION_REGISTRY, $options, false );
        update_option( self::OPTION_FALLBACK_MODES, $next_fallbacks, false );
        self::clear_policy_storage();
        foreach ( $planned as $row ) {
            self::save_policy( $row['type'], $row['id'], $row['policy'] );
            if ( 'family' === $row['type'] ) {
                if ( ! empty( $row['canonical'] ) ) update_term_meta( $row['id'], self::CANONICAL_CATEGORY_META, (int) $row['canonical'] ); else delete_term_meta( $row['id'], self::CANONICAL_CATEGORY_META );
            }
        }
        $variant_errors = self::validate_all_strict_variant_policies();
        if ( ! empty( $variant_errors ) ) {
            update_option( self::OPTION_ATTRIBUTE_REGISTRY, $old_registry, false );
            update_option( self::OPTION_OPTION_REGISTRY, $old_options, false );
            update_option( self::OPTION_FALLBACK_MODES, $old_fallbacks, false );
            self::restore_policy_storage( $old_policy_storage );
            return $variant_errors;
        }
        return array();
    }
}

OD_Door_Product_Configuration::init();
