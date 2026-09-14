<?php
/**
 * Plugin Name: Portfolio Project CPT (MU)
 * Description: Регистрирует CPT portfolio_project и таксономию portfolio_project_category для headless-портфолио.
 * Author: Off Dveri
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function (): void {
    register_post_type('portfolio_project', [
        'labels' => [
            'name'                  => 'Проекты портфолио',
            'singular_name'         => 'Проект портфолио',
            'menu_name'             => 'Портфолио',
            'name_admin_bar'        => 'Проект портфолио',
            'add_new'               => 'Добавить проект',
            'add_new_item'          => 'Добавить проект-портфолио',
            'new_item'              => 'Новый проект',
            'edit_item'             => 'Редактировать проект',
            'view_item'             => 'Просмотреть проект',
            'all_items'             => 'Все проекты',
            'search_items'          => 'Искать проекты',
            'parent_item_colon'     => 'Родительский проект:',
            'not_found'             => 'Проекты не найдены',
            'not_found_in_trash'    => 'В корзине проекты не найдены',
            'featured_image'        => 'Главное изображение проекта',
            'set_featured_image'    => 'Задать главное изображение',
            'remove_featured_image' => 'Удалить главное изображение',
            'use_featured_image'    => 'Использовать как главное изображение',
        ],

        // Headless-логика: WordPress — админка и REST-источник, публичные URL отдаёт Next.js.
        'public'             => false,
        'publicly_queryable' => false,
        'exclude_from_search'=> true,

        // Админка.
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_admin_bar'  => true,
        'menu_position'      => 26,
        'menu_icon'          => 'dashicons-portfolio',

        // REST для Next/BFF.
        'show_in_rest'       => true,
        'rest_base'          => 'portfolio_project',
        'rest_controller_class' => 'WP_REST_Posts_Controller',

        // URL-слой WordPress не нужен.
        'has_archive'        => false,
        'rewrite'            => false,
        'query_var'          => false,

        // Что будет доступно в редакторе.
        'supports'           => [
            'title',
            'editor',
            'excerpt',
            'thumbnail',
            'revisions',
            'page-attributes',
        ],

        'capability_type'    => 'post',
        'map_meta_cap'       => true,
    ]);

    register_taxonomy('portfolio_project_category', ['portfolio_project'], [
        'labels' => [
            'name'              => 'Категории портфолио',
            'singular_name'     => 'Категория портфолио',
            'menu_name'         => 'Категории портфолио',
            'all_items'         => 'Все категории',
            'edit_item'         => 'Редактировать категорию',
            'view_item'         => 'Просмотреть категорию',
            'update_item'       => 'Обновить категорию',
            'add_new_item'      => 'Добавить категорию',
            'new_item_name'     => 'Название категории',
            'parent_item'       => 'Родительская категория',
            'parent_item_colon' => 'Родительская категория:',
            'search_items'      => 'Искать категории',
            'not_found'         => 'Категории не найдены',
        ],

        // Таксономия нужна для админки, REST и фильтров на Next-архиве.
        'public'             => false,
        'publicly_queryable' => false,

        'show_ui'            => true,
        'show_admin_column'  => true,
        'show_in_nav_menus'  => false,
        'show_tagcloud'      => false,

        // REST для Next/BFF.
        'show_in_rest'       => true,
        'rest_base'          => 'portfolio_project_category',
        'rest_controller_class' => 'WP_REST_Terms_Controller',

        // Категории портфолио лучше делать иерархическими.
        'hierarchical'       => true,

        // Публичные WP URL не нужны.
        'rewrite'            => false,
        'query_var'          => false,
    ]);
});

add_action('rest_api_init', function (): void {
    register_rest_field('portfolio_project', 'portfolio_project_categories', [
        'get_callback' => function (array $post): array {
            $post_id = isset($post['id']) ? (int) $post['id'] : 0;

            if ($post_id <= 0) {
                return [];
            }

            $terms = get_the_terms($post_id, 'portfolio_project_category');

            if (is_wp_error($terms) || empty($terms)) {
                return [];
            }

            return array_values(array_map(static function (WP_Term $term): array {
                return [
                    'id'     => (int) $term->term_id,
                    'name'   => $term->name,
                    'slug'   => $term->slug,
                    'parent' => (int) $term->parent,
                ];
            }, $terms));
        },
        'schema' => [
            'description' => 'Категории проекта портфолио для headless-фронта.',
            'type'        => 'array',
            'context'     => ['view', 'edit'],
            'items'       => [
                'type'       => 'object',
                'properties' => [
                    'id' => [
                        'type' => 'integer',
                    ],
                    'name' => [
                        'type' => 'string',
                    ],
                    'slug' => [
                        'type' => 'string',
                    ],
                    'parent' => [
                        'type' => 'integer',
                    ],
                ],
            ],
        ],
    ]);
});