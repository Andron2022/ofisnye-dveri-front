<?php
/**
 * Plugin Name: Door SEO Landing (MU)
 * Description: Manages explicit SEO landing pages for door catalog filters and exposes a headless REST contract.
 * Version: 1.0.0
 */

defined( 'ABSPATH' ) || exit;

final class OD_Door_SEO_Landing {
    private const POST_TYPE = 'door_seo_landing';
    private const REST_NAMESPACE = 'od/v1';
    private const ROOT_CATEGORY_SLUG = 'mezhkomnatnye-dveri';

    private const FIELD_ENABLED = 'door_seo_enabled';
    private const FIELD_BASE_CATEGORY = 'door_seo_base_category';
    private const FIELD_SLUG = 'door_seo_landing_slug';
    private const FIELD_NAVIGATION_PRIORITY = 'door_seo_navigation_priority';
    private const FIELD_SHOW_IN_POPULAR_COLLECTIONS = 'door_seo_show_in_popular_collections';
    private const FIELD_H1 = 'door_seo_h1';
    private const FIELD_INTRO = 'door_seo_intro';
    private const FIELD_TARGET_INTENT = 'door_seo_target_intent';
    private const FIELD_SELECTION_NOTES = 'door_seo_selection_notes';
    private const FIELD_RELATED = 'door_seo_related_landings';

    /** @var array<string, array{taxonomy:string, field:string, label:string}> */
    private const LEGACY_FILTERS = array(
        'tsvet-dveri' => array(
            'taxonomy' => 'pa_tsvet-dveri',
            'field'    => 'door_seo_filter_tsvet_dveri',
            'label'    => 'Цвет двери',
        ),
        'razmer-dveri' => array(
            'taxonomy' => 'pa_razmer-dveri',
            'field'    => 'door_seo_filter_razmer_dveri',
            'label'    => 'Размер двери',
        ),
        'kolichestvo-poloten' => array(
            'taxonomy' => 'pa_kolichestvo-poloten',
            'field'    => 'door_seo_filter_kolichestvo_poloten',
            'label'    => 'Количество полотен',
        ),
        'material-dveri' => array(
            'taxonomy' => 'pa_material-dveri',
            'field'    => 'door_seo_filter_material_dveri',
            'label'    => 'Материал двери',
        ),
        'osteklenie' => array(
            'taxonomy' => 'pa_osteklenie',
            'field'    => 'door_seo_filter_osteklenie',
            'label'    => 'Остекление',
        ),
        'tip-otkryvaniya' => array(
            'taxonomy' => 'pa_tip-otkryvaniya',
            'field'    => 'door_seo_filter_tip_otkryvaniya',
            'label'    => 'Тип открывания',
        ),
        'naznachenie' => array(
            'taxonomy' => 'pa_naznachenie',
            'field'    => 'door_seo_filter_naznachenie',
            'label'    => 'Назначение',
        ),
        'napravlenie-otkryvaniya' => array(
            'taxonomy' => 'pa_napravlenie-otkryvaniya',
            'field'    => 'door_seo_filter_napravlenie_otkryvaniya',
            'label'    => 'Направление открывания',
        ),
        'ognestoykost' => array(
            'taxonomy' => 'pa_ognestoykost',
            'field'    => 'door_seo_filter_ognestoykost',
            'label'    => 'Огнестойкость',
        ),
        'tip-ostekleniya' => array(
            'taxonomy' => 'pa_tip-ostekleniya',
            'field'    => 'door_seo_filter_tip_ostekleniya',
            'label'    => 'Тип остекления',
        ),
    );

    /**
     * SEO landing domain model stays unchanged. Only the list of filters comes
     * from the Door Attribute Registry when the new configuration layer is loaded.
     */
    private static function get_filters(): array {
        if ( class_exists( 'OD_Door_Product_Configuration' ) ) {
            $filters = OD_Door_Product_Configuration::get_catalog_filter_definitions();
            if ( ! empty( $filters ) ) {
                return $filters;
            }
        }
        return self::LEGACY_FILTERS;
    }

    public static function init(): void {
        add_action( 'init', array( __CLASS__, 'register_post_type' ), 20 );
        // Woo registers dynamic pa_* taxonomies during init. Register ACF fields later
        // so every attribute taxonomy is available when the field group is built.
        add_action( 'init', array( __CLASS__, 'register_acf_fields' ), 30 );
        add_filter( 'acf/fields/taxonomy/query/key=field_od_door_seo_base_category', array( __CLASS__, 'filter_base_category_choices' ), 10, 3 );
        add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
        add_action( 'acf/save_post', array( __CLASS__, 'validate_after_acf_save' ), 30 );
        add_action( 'admin_notices', array( __CLASS__, 'render_validation_notice' ) );
    }

    public static function register_post_type(): void {
        register_post_type(
            self::POST_TYPE,
            array(
                'labels' => array(
                    'name'          => 'SEO-посадочные дверей',
                    'singular_name' => 'SEO-посадочная дверей',
                    'add_new_item'  => 'Добавить SEO-посадочную',
                    'edit_item'     => 'Редактировать SEO-посадочную',
                    'menu_name'     => 'SEO-посадочные',
                ),
                'public'              => false,
                'publicly_queryable'  => false,
                'show_ui'             => true,
                'show_in_menu'        => 'edit.php?post_type=product',
                'show_in_rest'        => false,
                'exclude_from_search' => true,
                'rewrite'             => false,
                'query_var'           => false,
                'supports'            => array( 'title', 'editor', 'revisions', 'page-attributes' ),
                'capability_type'      => 'post',
                'map_meta_cap'         => true,
            )
        );
    }

    public static function register_acf_fields(): void {
        if ( ! function_exists( 'acf_add_local_field_group' ) ) {
            return;
        }

        $fields = array(
            array(
                'key'           => 'field_od_door_seo_enabled',
                'label'         => 'Активна',
                'name'          => self::FIELD_ENABLED,
                'type'          => 'true_false',
                'instructions'  => 'Только активная опубликованная запись может работать как SEO-посадочная.',
                'ui'            => 1,
                'default_value' => 1,
            ),
            array(
                'key'           => 'field_od_door_seo_base_category',
                'label'         => 'Базовая категория дверей',
                'name'          => self::FIELD_BASE_CATEGORY,
                'type'          => 'taxonomy',
                'taxonomy'      => 'product_cat',
                'field_type'    => 'select',
                'return_format' => 'id',
                'add_term'      => 0,
                'save_terms'    => 0,
                'load_terms'    => 0,
                'allow_null'    => 0,
                'required'      => 1,
                'instructions'  => 'Категория должна находиться внутри дерева «Межкомнатные двери».',
            ),
            array(
                'key'          => 'field_od_door_seo_landing_slug',
                'label'        => 'Slug SEO-посадочной',
                'name'         => self::FIELD_SLUG,
                'type'         => 'text',
                'required'     => 1,
                'instructions' => 'Только последний сегмент URL, например ofisnye. Полный URL вычисляет storefront.',
            ),
            array(
                'key'           => 'field_od_door_seo_navigation_priority',
                'label'         => 'Приоритет навигации',
                'name'          => self::FIELD_NAVIGATION_PRIORITY,
                'type'          => 'number',
                'default_value' => 0,
                'step'          => 1,
                'instructions'  => 'Используется только при равной специфичности нескольких SEO-посадочных. Чем больше число, тем выше приоритет.',
            ),
            array(
                'key'           => 'field_od_door_seo_show_in_popular_collections',
                'label'         => 'Показывать в «Популярных подборках»',
                'name'          => self::FIELD_SHOW_IN_POPULAR_COLLECTIONS,
                'type'          => 'true_false',
                'ui'            => 1,
                'default_value' => 1,
                'instructions'  => 'Управляет только автоматическим показом ссылки на эту SEO-посадочную в блоке «Популярные подборки». Не влияет на URL, фильтрацию, canonical, sitemap или явно заданные связанные SEO-посадочные.',
            ),
            array(
                'key'          => 'field_od_door_seo_h1',
                'label'        => 'H1',
                'name'         => self::FIELD_H1,
                'type'         => 'text',
                'instructions' => 'Если пусто, storefront использует административное название записи.',
            ),
            array(
                'key'          => 'field_od_door_seo_intro',
                'label'        => 'Вводный текст',
                'name'         => self::FIELD_INTRO,
                'type'         => 'textarea',
                'rows'         => 4,
                'new_lines'    => '',
            ),
            array(
                'key'          => 'field_od_door_seo_target_intent',
                'label'        => 'Целевой объект / поисковый интент',
                'name'         => self::FIELD_TARGET_INTENT,
                'type'         => 'textarea',
                'rows'         => 3,
                'new_lines'    => '',
            ),
            array(
                'key'          => 'field_od_door_seo_selection_notes',
                'label'        => 'Особенности выбора',
                'name'         => self::FIELD_SELECTION_NOTES,
                'type'         => 'textarea',
                'rows'         => 4,
                'new_lines'    => '',
            ),
        );

        foreach ( self::get_filters() as $filter_key => $config ) {
            if ( ! taxonomy_exists( $config['taxonomy'] ) ) {
                continue;
            }

            $fields[] = array(
                'key'           => 'field_od_door_seo_' . str_replace( '-', '_', $filter_key ),
                'label'         => 'Фильтр: ' . $config['label'],
                'name'          => $config['field'],
                'type'          => 'taxonomy',
                'taxonomy'      => $config['taxonomy'],
                'field_type'    => 'multi_select',
                'return_format' => 'id',
                'add_term'      => 0,
                'save_terms'    => 0,
                'load_terms'    => 0,
                'allow_null'    => 1,
                'multiple'      => 1,
                'instructions'  => 'Несколько значений внутри одного атрибута объединяются OR; разные атрибуты — AND.',
            );
        }

        for ( $index = 1; $index <= 5; $index++ ) {
            $fields[] = array(
                'key'   => 'field_od_door_seo_faq_q_' . $index,
                'label' => 'FAQ ' . $index . ' — вопрос',
                'name'  => 'door_seo_faq_question_' . $index,
                'type'  => 'text',
            );
            $fields[] = array(
                'key'       => 'field_od_door_seo_faq_a_' . $index,
                'label'     => 'FAQ ' . $index . ' — ответ',
                'name'      => 'door_seo_faq_answer_' . $index,
                'type'      => 'textarea',
                'rows'      => 3,
                'new_lines' => '',
            );
        }

        $fields[] = array(
            'key'           => 'field_od_door_seo_related_landings',
            'label'         => 'Связанные SEO-посадочные',
            'name'          => self::FIELD_RELATED,
            'type'          => 'post_object',
            'post_type'     => array( self::POST_TYPE ),
            'return_format' => 'id',
            'multiple'      => 1,
            'allow_null'    => 1,
            'ui'            => 1,
            'instructions'  => 'Управляемая внутренняя перелинковка между SEO-посадочными.',
        );

        acf_add_local_field_group(
            array(
                'key'      => 'group_od_door_seo_landing',
                'title'    => 'SEO-посадочная дверей',
                'fields'   => $fields,
                'location' => array(
                    array(
                        array(
                            'param'    => 'post_type',
                            'operator' => '==',
                            'value'    => self::POST_TYPE,
                        ),
                    ),
                ),
                'position' => 'normal',
                'style'    => 'default',
                'active'   => true,
            )
        );
    }

    public static function filter_base_category_choices( array $args, $field, $post_id ): array {
        unset( $field, $post_id );

        $root = get_term_by( 'slug', self::ROOT_CATEGORY_SLUG, 'product_cat' );
        if ( ! $root instanceof WP_Term ) {
            return $args;
        }

        $descendants = get_term_children( (int) $root->term_id, 'product_cat' );
        if ( is_wp_error( $descendants ) ) {
            return $args;
        }

        $args['include'] = array_values( array_unique( array_merge(
            array( (int) $root->term_id ),
            array_map( 'intval', $descendants )
        ) ) );

        return $args;
    }

    public static function register_rest_routes(): void {
        register_rest_route(
            self::REST_NAMESPACE,
            '/door-seo-landings',
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( __CLASS__, 'rest_get_landings' ),
                'permission_callback' => '__return_true',
                'args'                => array(
                    'base_category_id' => array(
                        'type'              => 'integer',
                        'sanitize_callback' => 'absint',
                    ),
                    'slug' => array(
                        'type'              => 'string',
                        'sanitize_callback' => 'sanitize_title',
                    ),
                ),
            )
        );

        register_rest_route(
            self::REST_NAMESPACE,
            '/door-seo-landings/(?P<id>\d+)/products',
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( __CLASS__, 'rest_get_landing_products' ),
                'permission_callback' => '__return_true',
                'args'                => array(
                    'id' => array(
                        'type'              => 'integer',
                        'required'          => true,
                        'sanitize_callback' => 'absint',
                    ),
                ),
            )
        );

        register_rest_route(
            self::REST_NAMESPACE,
            '/door-filter-terms',
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( __CLASS__, 'rest_get_filter_terms' ),
                'permission_callback' => '__return_true',
            )
        );

        register_rest_route(
            self::REST_NAMESPACE,
            '/door-catalog-products',
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( __CLASS__, 'rest_get_catalog_products' ),
                'permission_callback' => '__return_true',
                'args'                => array(
                    'base_category_id' => array(
                        'type'              => 'integer',
                        'required'          => true,
                        'sanitize_callback' => 'absint',
                    ),
                ),
            )
        );
    }

    public static function rest_get_landings( WP_REST_Request $request ): WP_REST_Response {
        $query_args = array(
            'post_type'      => self::POST_TYPE,
            'post_status'    => 'publish',
            'posts_per_page' => 200,
            'orderby'        => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
            'no_found_rows'  => true,
        );

        $base_category_id = absint( $request->get_param( 'base_category_id' ) );
        $slug             = sanitize_title( (string) $request->get_param( 'slug' ) );
        $meta_query       = array();

        if ( $base_category_id > 0 ) {
            $meta_query[] = array(
                'key'     => self::FIELD_BASE_CATEGORY,
                'value'   => $base_category_id,
                'compare' => '=',
            );
        }

        if ( '' !== $slug ) {
            $meta_query[] = array(
                'key'     => self::FIELD_SLUG,
                'value'   => $slug,
                'compare' => '=',
            );
        }

        if ( ! empty( $meta_query ) ) {
            $query_args['meta_query'] = count( $meta_query ) > 1
                ? array_merge( array( 'relation' => 'AND' ), $meta_query )
                : $meta_query;
        }

        $posts = get_posts( $query_args );
        $items = array();

        foreach ( $posts as $post ) {
            $payload = self::build_landing_payload( $post );
            if ( ! $payload['enabled'] ) {
                continue;
            }
            $items[] = $payload;
        }

        return rest_ensure_response( array( 'items' => $items ) );
    }

    public static function rest_get_landing_products( WP_REST_Request $request ): WP_REST_Response {
        $post_id = absint( $request->get_param( 'id' ) );
        $post    = get_post( $post_id );

        if ( ! $post || self::POST_TYPE !== $post->post_type || 'publish' !== $post->post_status ) {
            return new WP_REST_Response( array( 'message' => 'SEO landing not found.' ), 404 );
        }

        $payload = self::build_landing_payload( $post );
        if ( ! $payload['enabled'] || ! $payload['valid'] ) {
            return new WP_REST_Response(
                array(
                    'message' => 'SEO landing is not valid.',
                    'issues'  => $payload['issues'],
                ),
                409
            );
        }

        $ids = self::find_product_ids( $post_id );

        return rest_ensure_response(
            array(
                'landing_id' => $post_id,
                'ids'        => $ids,
                'count'      => count( $ids ),
            )
        );
    }

    public static function rest_get_filter_terms(): WP_REST_Response {
        $groups = array();

        foreach ( self::get_filters() as $filter_key => $config ) {
            if ( ! taxonomy_exists( $config['taxonomy'] ) ) {
                continue;
            }

            $terms = get_terms(
                array(
                    'taxonomy'   => $config['taxonomy'],
                    'hide_empty' => false,
                    'orderby'    => 'name',
                    'order'      => 'ASC',
                )
            );

            if ( is_wp_error( $terms ) ) {
                continue;
            }

            $groups[] = array(
                'filter_key' => $filter_key,
                'taxonomy'   => $config['taxonomy'],
                'label'      => $config['label'],
                'terms'      => array_values(
                    array_map(
                        static function ( WP_Term $term ): array {
                            return array(
                                'id'    => (int) $term->term_id,
                                'name'  => $term->name,
                                'slug'  => $term->slug,
                                'count' => (int) $term->count,
                            );
                        },
                        $terms
                    )
                ),
            );
        }

        return rest_ensure_response( array( 'groups' => $groups ) );
    }

    public static function rest_get_catalog_products( WP_REST_Request $request ): WP_REST_Response {
        $base_category_id = absint( $request->get_param( 'base_category_id' ) );
        $base_category    = $base_category_id > 0 ? get_term( $base_category_id, 'product_cat' ) : null;

        if ( ! $base_category instanceof WP_Term || ! self::category_belongs_to_door_tree( $base_category ) ) {
            return new WP_REST_Response(
                array( 'message' => 'Base category is invalid or outside the door catalog tree.' ),
                400
            );
        }

        $rules  = array();
        $issues = array();

        foreach ( self::get_filters() as $filter_key => $config ) {
            $term_ids = self::normalize_id_list( $request->get_param( $filter_key ) );
            if ( empty( $term_ids ) ) {
                continue;
            }

            if ( ! taxonomy_exists( $config['taxonomy'] ) ) {
                $issues[] = 'Unknown taxonomy for filter ' . $filter_key . '.';
                continue;
            }

            $valid_term_ids = array();
            foreach ( $term_ids as $term_id ) {
                $term = get_term( $term_id, $config['taxonomy'] );
                if ( ! $term instanceof WP_Term ) {
                    $issues[] = 'Invalid term ID ' . $term_id . ' for filter ' . $filter_key . '.';
                    continue;
                }
                $valid_term_ids[] = (int) $term->term_id;
            }

            if ( ! empty( $valid_term_ids ) ) {
                sort( $valid_term_ids, SORT_NUMERIC );
                $rules[] = array(
                    'filter_key' => $filter_key,
                    'taxonomy'   => $config['taxonomy'],
                    'term_ids'   => array_values( array_unique( $valid_term_ids ) ),
                );
            }
        }

        if ( ! empty( $issues ) ) {
            return new WP_REST_Response(
                array(
                    'message' => 'Door catalog filter state is invalid.',
                    'issues'  => array_values( array_unique( $issues ) ),
                ),
                400
            );
        }

        $ids = self::find_product_ids_for_rules( $base_category_id, $rules );

        return rest_ensure_response(
            array(
                'base_category_id' => $base_category_id,
                'filters'          => $rules,
                'ids'              => $ids,
                'count'            => count( $ids ),
            )
        );
    }

    public static function validate_after_acf_save( $post_id ): void {
        $post_id = is_numeric( $post_id ) ? (int) $post_id : 0;
        if ( $post_id <= 0 || self::POST_TYPE !== get_post_type( $post_id ) ) {
            return;
        }

        $post = get_post( $post_id );
        if ( ! $post || 'publish' !== $post->post_status ) {
            return;
        }

        $payload = self::build_landing_payload( $post );
        if ( $payload['valid'] ) {
            return;
        }

        remove_action( 'acf/save_post', array( __CLASS__, 'validate_after_acf_save' ), 30 );
        wp_update_post(
            array(
                'ID'          => $post_id,
                'post_status' => 'draft',
            )
        );
        add_action( 'acf/save_post', array( __CLASS__, 'validate_after_acf_save' ), 30 );

        set_transient(
            'od_door_seo_validation_' . get_current_user_id(),
            implode( ' ', $payload['issues'] ),
            60
        );
    }

    public static function render_validation_notice(): void {
        $key     = 'od_door_seo_validation_' . get_current_user_id();
        $message = get_transient( $key );

        if ( ! is_string( $message ) || '' === trim( $message ) ) {
            return;
        }

        delete_transient( $key );
        echo '<div class="notice notice-error is-dismissible"><p><strong>SEO-посадочная переведена в черновик:</strong> ' . esc_html( $message ) . '</p></div>';
    }

    private static function build_landing_payload( WP_Post $post ): array {
        $post_id          = (int) $post->ID;
        $enabled          = self::to_bool( self::get_field_value( self::FIELD_ENABLED, $post_id ) );
        $base_category_id = self::normalize_single_id( self::get_field_value( self::FIELD_BASE_CATEGORY, $post_id ) );
        $landing_slug     = sanitize_title( (string) self::get_field_value( self::FIELD_SLUG, $post_id ) );
        $show_in_popular_collections = metadata_exists( 'post', $post_id, self::FIELD_SHOW_IN_POPULAR_COLLECTIONS )
            ? self::to_bool( self::get_field_value( self::FIELD_SHOW_IN_POPULAR_COLLECTIONS, $post_id ) )
            : true;
        $base_category    = $base_category_id > 0 ? get_term( $base_category_id, 'product_cat' ) : null;
        $rules            = self::build_rules( $post_id );
        $issues           = self::validate_landing( $post_id, $base_category, $landing_slug, $rules );

        return array(
            'id'            => $post_id,
            'title'         => get_the_title( $post_id ),
            'slug'                => $landing_slug,
            'enabled'                     => $enabled,
            'navigation_priority'         => (int) self::get_field_value( self::FIELD_NAVIGATION_PRIORITY, $post_id ),
            'show_in_popular_collections' => $show_in_popular_collections,
            'modified'                    => get_post_modified_time( DATE_ATOM, true, $post_id ),
            'base_category' => $base_category instanceof WP_Term
                ? array(
                    'id'   => (int) $base_category->term_id,
                    'name' => $base_category->name,
                    'slug' => $base_category->slug,
                )
                : null,
            'rules'          => $rules,
            'h1'             => self::sanitize_optional_text( self::get_field_value( self::FIELD_H1, $post_id ) ),
            'intro'          => self::sanitize_optional_textarea( self::get_field_value( self::FIELD_INTRO, $post_id ) ),
            'content_html'   => self::render_post_content( $post_id ),
            'target_intent'  => self::sanitize_optional_textarea( self::get_field_value( self::FIELD_TARGET_INTENT, $post_id ) ),
            'selection_notes'=> self::sanitize_optional_textarea( self::get_field_value( self::FIELD_SELECTION_NOTES, $post_id ) ),
            'faq'            => self::build_faq( $post_id ),
            'related_ids'    => array_values( array_filter(
                self::normalize_id_list( self::get_field_value( self::FIELD_RELATED, $post_id ) ),
                static fn( int $related_id ): bool => $related_id !== $post_id
            ) ),
            'headless_seo'   => self::get_headless_seo( $post_id ),
            'valid'          => empty( $issues ),
            'issues'         => $issues,
        );
    }

    private static function build_rules( int $post_id ): array {
        $rules = array();

        foreach ( self::get_filters() as $filter_key => $config ) {
            if ( ! taxonomy_exists( $config['taxonomy'] ) ) {
                continue;
            }

            $term_ids = self::normalize_id_list( self::get_field_value( $config['field'], $post_id ) );
            if ( empty( $term_ids ) ) {
                continue;
            }

            $terms = array();
            foreach ( $term_ids as $term_id ) {
                $term = get_term( $term_id, $config['taxonomy'] );
                if ( ! $term instanceof WP_Term ) {
                    continue;
                }

                $terms[] = array(
                    'id'   => (int) $term->term_id,
                    'name' => $term->name,
                    'slug' => $term->slug,
                );
            }

            $rules[] = array(
                'filter_key' => $filter_key,
                'taxonomy'   => $config['taxonomy'],
                'terms'      => $terms,
            );
        }

        return $rules;
    }

    private static function validate_landing( int $post_id, $base_category, string $landing_slug, array $rules ): array {
        $issues = array();

        if ( '' === trim( get_the_title( $post_id ) ) ) {
            $issues[] = 'Укажите административное название SEO-посадочной.';
        }

        if ( ! $base_category instanceof WP_Term || ! self::category_belongs_to_door_tree( $base_category ) ) {
            $issues[] = 'Выберите базовую категорию внутри дерева «Межкомнатные двери».';
        }

        if ( '' === $landing_slug ) {
            $issues[] = 'Укажите slug SEO-посадочной.';
        } elseif ( ! preg_match( '/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $landing_slug ) ) {
            $issues[] = 'Slug SEO-посадочной должен содержать только латинские буквы, цифры и дефисы.';
        }

        if ( empty( $rules ) ) {
            $issues[] = 'Выберите хотя бы одно условие фильтра.';
        }

        foreach ( $rules as $rule ) {
            if ( empty( $rule['terms'] ) ) {
                $issues[] = 'Одно из условий фильтра не содержит существующих Woo terms.';
            }
        }

        $issues = array_merge( $issues, self::validate_filter_term_references( $post_id ) );

        if ( $base_category instanceof WP_Term && self::has_rules_collision( $post_id, (int) $base_category->term_id, $rules ) ) {
            $issues[] = 'Для этой базовой категории уже существует опубликованная SEO-посадочная с тем же набором фильтров.';
        }

        if ( $base_category instanceof WP_Term && '' !== $landing_slug ) {
            if ( self::has_direct_child_category_collision( $base_category, $landing_slug ) ) {
                $issues[] = 'URL конфликтует с дочерней Woo-категорией.';
            }

            if ( self::has_product_collision( $base_category, $landing_slug ) ) {
                $issues[] = 'URL конфликтует с опубликованным товаром в базовой категории.';
            }

            if ( self::has_landing_collision( $post_id, (int) $base_category->term_id, $landing_slug ) ) {
                $issues[] = 'Для этой базовой категории уже существует SEO-посадочная с таким slug.';
            }
        }

        return array_values( array_unique( $issues ) );
    }

    private static function validate_filter_term_references( int $post_id ): array {
        $issues = array();

        foreach ( self::get_filters() as $filter_key => $config ) {
            $term_ids = self::normalize_id_list( self::get_field_value( $config['field'], $post_id ) );
            if ( empty( $term_ids ) ) {
                continue;
            }

            if ( ! taxonomy_exists( $config['taxonomy'] ) ) {
                $issues[] = 'Таксономия ' . $config['taxonomy'] . ' для фильтра ' . $filter_key . ' не зарегистрирована.';
                continue;
            }

            foreach ( $term_ids as $term_id ) {
                $term = get_term( $term_id, $config['taxonomy'] );
                if ( ! $term instanceof WP_Term ) {
                    $issues[] = 'Term ID ' . $term_id . ' больше не существует в ' . $config['taxonomy'] . '.';
                }
            }
        }

        return array_values( array_unique( $issues ) );
    }

    private static function normalize_rules_signature( array $rules ): string {
        $normalized = array();

        foreach ( $rules as $rule ) {
            $filter_key = isset( $rule['filter_key'] ) ? sanitize_key( (string) $rule['filter_key'] ) : '';
            $taxonomy   = isset( $rule['taxonomy'] ) ? sanitize_key( (string) $rule['taxonomy'] ) : '';
            $term_ids   = array();

            if ( isset( $rule['term_ids'] ) ) {
                $term_ids = self::normalize_id_list( $rule['term_ids'] );
            } elseif ( isset( $rule['terms'] ) && is_array( $rule['terms'] ) ) {
                foreach ( $rule['terms'] as $term ) {
                    if ( is_array( $term ) && isset( $term['id'] ) && is_numeric( $term['id'] ) ) {
                        $term_ids[] = (int) $term['id'];
                    }
                }
                $term_ids = array_values( array_unique( array_filter( $term_ids, static fn( int $id ): bool => $id > 0 ) ) );
            }

            if ( '' === $filter_key || '' === $taxonomy || empty( $term_ids ) ) {
                continue;
            }

            sort( $term_ids, SORT_NUMERIC );
            $normalized[ $filter_key ] = array(
                'filter_key' => $filter_key,
                'taxonomy'   => $taxonomy,
                'term_ids'   => $term_ids,
            );
        }

        ksort( $normalized, SORT_STRING );
        return (string) wp_json_encode( array_values( $normalized ) );
    }

    private static function has_rules_collision( int $post_id, int $base_category_id, array $rules ): bool {
        $signature = self::normalize_rules_signature( $rules );
        if ( '[]' === $signature || '' === $signature ) {
            return false;
        }

        $ids = get_posts(
            array(
                'post_type'      => self::POST_TYPE,
                'post_status'    => 'publish',
                'posts_per_page' => 200,
                'fields'         => 'ids',
                'post__not_in'   => array( $post_id ),
                'meta_query'     => array(
                    array(
                        'key'     => self::FIELD_BASE_CATEGORY,
                        'value'   => $base_category_id,
                        'compare' => '=',
                    ),
                ),
                'no_found_rows'  => true,
            )
        );

        foreach ( $ids as $other_id ) {
            if ( $signature === self::normalize_rules_signature( self::build_rules( (int) $other_id ) ) ) {
                return true;
            }
        }

        return false;
    }

    private static function find_product_ids( int $post_id ): array {
        $base_category_id = self::normalize_single_id( self::get_field_value( self::FIELD_BASE_CATEGORY, $post_id ) );
        if ( $base_category_id <= 0 ) {
            return array();
        }

        $rules = array();
        foreach ( self::build_rules( $post_id ) as $rule ) {
            $term_ids = array_values(
                array_filter(
                    array_map(
                        static fn( array $term ): int => (int) ( $term['id'] ?? 0 ),
                        $rule['terms']
                    )
                )
            );

            if ( empty( $term_ids ) ) {
                return array();
            }

            sort( $term_ids, SORT_NUMERIC );
            $rules[] = array(
                'filter_key' => $rule['filter_key'],
                'taxonomy'   => $rule['taxonomy'],
                'term_ids'   => array_values( array_unique( $term_ids ) ),
            );
        }

        return self::find_product_ids_for_rules( $base_category_id, $rules );
    }

    private static function find_product_ids_for_rules( int $base_category_id, array $rules ): array {
        $tax_query = array(
            'relation' => 'AND',
            array(
                'taxonomy'         => 'product_cat',
                'field'            => 'term_id',
                'terms'            => array( $base_category_id ),
                'include_children' => true,
                'operator'         => 'IN',
            ),
            array(
                'taxonomy' => 'product_type',
                'field'    => 'slug',
                'terms'    => array( 'simple' ),
                'operator' => 'IN',
            ),
        );

        foreach ( $rules as $rule ) {
            $term_ids = self::normalize_id_list( $rule['term_ids'] ?? array() );
            if ( empty( $term_ids ) ) {
                continue;
            }

            $taxonomy = isset( $rule['taxonomy'] ) ? sanitize_key( (string) $rule['taxonomy'] ) : '';
            if ( '' === $taxonomy || ! taxonomy_exists( $taxonomy ) ) {
                return array();
            }

            $tax_query[] = array(
                'taxonomy' => $taxonomy,
                'field'    => 'term_id',
                'terms'    => $term_ids,
                // IN gives OR inside one filter group; separate tax_query clauses are AND.
                'operator' => 'IN',
            );
        }

        $query = new WP_Query(
            array(
                'post_type'              => 'product',
                'post_status'            => 'publish',
                'fields'                 => 'ids',
                'posts_per_page'         => -1,
                'orderby'                => 'date',
                'order'                  => 'DESC',
                'tax_query'              => $tax_query,
                'no_found_rows'          => true,
                'update_post_meta_cache' => false,
                'update_post_term_cache' => false,
            )
        );

        return array_values( array_map( 'intval', $query->posts ) );
    }


    private static function category_belongs_to_door_tree( WP_Term $category ): bool {
        $root = get_term_by( 'slug', self::ROOT_CATEGORY_SLUG, 'product_cat' );
        if ( ! $root instanceof WP_Term ) {
            return false;
        }

        if ( (int) $category->term_id === (int) $root->term_id ) {
            return true;
        }

        $ancestors = get_ancestors( $category->term_id, 'product_cat', 'taxonomy' );
        return in_array( (int) $root->term_id, array_map( 'intval', $ancestors ), true );
    }

    private static function has_direct_child_category_collision( WP_Term $base_category, string $landing_slug ): bool {
        $children = get_terms(
            array(
                'taxonomy'   => 'product_cat',
                'hide_empty' => false,
                'parent'     => (int) $base_category->term_id,
            )
        );

        if ( is_wp_error( $children ) ) {
            return false;
        }

        foreach ( $children as $child ) {
            if ( self::category_route_slug( $child->slug ) === $landing_slug ) {
                return true;
            }
        }

        return false;
    }

    private static function category_route_slug( string $slug ): string {
        $aliases = array(
            'skrytye-dveri'          => 'skrytye',
            'protivopozharnye-dveri' => 'protivopozharnye',
        );

        if ( isset( $aliases[ $slug ] ) ) {
            return $aliases[ $slug ];
        }

        return str_ends_with( $slug, '-dveri' ) ? substr( $slug, 0, -6 ) : $slug;
    }

    private static function has_product_collision( WP_Term $base_category, string $landing_slug ): bool {
        $product = get_page_by_path( $landing_slug, OBJECT, 'product' );
        if ( ! $product instanceof WP_Post || 'publish' !== $product->post_status ) {
            return false;
        }

        $root = get_term_by( 'slug', self::ROOT_CATEGORY_SLUG, 'product_cat' );
        if ( $root instanceof WP_Term && (int) $base_category->term_id === (int) $root->term_id ) {
            $categories = get_the_terms( $product->ID, 'product_cat' );
            if ( is_wp_error( $categories ) || empty( $categories ) ) {
                return false;
            }

            foreach ( $categories as $category ) {
                if ( $category instanceof WP_Term && self::category_belongs_to_door_tree( $category ) ) {
                    return true;
                }
            }

            return false;
        }

        return has_term( (int) $base_category->term_id, 'product_cat', $product->ID );
    }

    private static function has_landing_collision( int $post_id, int $base_category_id, string $landing_slug ): bool {
        $ids = get_posts(
            array(
                'post_type'      => self::POST_TYPE,
                'post_status'    => 'publish',
                'posts_per_page' => 2,
                'fields'         => 'ids',
                'post__not_in'   => array( $post_id ),
                'meta_query'     => array(
                    'relation' => 'AND',
                    array(
                        'key'     => self::FIELD_BASE_CATEGORY,
                        'value'   => $base_category_id,
                        'compare' => '=',
                    ),
                    array(
                        'key'     => self::FIELD_SLUG,
                        'value'   => $landing_slug,
                        'compare' => '=',
                    ),
                ),
                'no_found_rows'  => true,
            )
        );

        return ! empty( $ids );
    }

    private static function build_faq( int $post_id ): array {
        $faq = array();

        for ( $index = 1; $index <= 5; $index++ ) {
            $question = self::sanitize_optional_text( self::get_field_value( 'door_seo_faq_question_' . $index, $post_id ) );
            $answer   = self::sanitize_optional_textarea( self::get_field_value( 'door_seo_faq_answer_' . $index, $post_id ) );

            if ( null === $question || null === $answer ) {
                continue;
            }

            $faq[] = array(
                'question' => $question,
                'answer'   => $answer,
            );
        }

        return $faq;
    }

    private static function render_post_content( int $post_id ): ?string {
        $content = (string) get_post_field( 'post_content', $post_id );
        if ( '' === trim( $content ) ) {
            return null;
        }

        $rendered = wp_kses_post( apply_filters( 'the_content', $content ) );
        return '' !== trim( $rendered ) ? $rendered : null;
    }

    private static function get_headless_seo( int $post_id ): array {
        if ( class_exists( 'OD_Headless_SEO_Foundation' ) && method_exists( 'OD_Headless_SEO_Foundation', 'get_post_seo' ) ) {
            return OD_Headless_SEO_Foundation::get_post_seo( $post_id );
        }

        return array(
            'title'       => null,
            'description' => null,
            'image'       => null,
            'noindex'     => false,
        );
    }

    private static function get_field_value( string $field_name, int $post_id ) {
        if ( function_exists( 'get_field' ) ) {
            return get_field( $field_name, $post_id, false );
        }

        return get_post_meta( $post_id, $field_name, true );
    }

    private static function normalize_single_id( $value ): int {
        $ids = self::normalize_id_list( $value );
        return $ids[0] ?? 0;
    }

    private static function normalize_id_list( $value ): array {
        if ( $value instanceof WP_Post ) {
            return array( (int) $value->ID );
        }

        if ( $value instanceof WP_Term ) {
            return array( (int) $value->term_id );
        }

        if ( is_numeric( $value ) ) {
            $id = (int) $value;
            return $id > 0 ? array( $id ) : array();
        }

        if ( is_string( $value ) && '' !== trim( $value ) ) {
            $value = preg_split( '/\s*,\s*/', $value );
        }

        if ( ! is_array( $value ) ) {
            return array();
        }

        $ids = array();
        foreach ( $value as $item ) {
            if ( $item instanceof WP_Post ) {
                $ids[] = (int) $item->ID;
            } elseif ( $item instanceof WP_Term ) {
                $ids[] = (int) $item->term_id;
            } elseif ( is_numeric( $item ) ) {
                $ids[] = (int) $item;
            }
        }

        return array_values( array_unique( array_filter( $ids, static fn( int $id ): bool => $id > 0 ) ) );
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

    private static function to_bool( $value ): bool {
        if ( is_bool( $value ) ) {
            return $value;
        }

        if ( is_numeric( $value ) ) {
            return 1 === (int) $value;
        }

        return in_array( strtolower( trim( (string) $value ) ), array( '1', 'true', 'yes', 'on' ), true );
    }
}

OD_Door_SEO_Landing::init();
