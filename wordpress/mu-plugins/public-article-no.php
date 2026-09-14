<?php
/**
 * Plugin Name: Public Article No (MU)
 * Description: Generates and stores public_article_no for Woo products and variations + admin column + admin search + product/variation UI + REST field.
 * Version: 1.1.0
 */

if (!defined('ABSPATH')) exit;

final class MU_Public_Article_No
{
    const META_KEY = 'public_article_no';
    const FACTOR   = 26;
    const OFFSET   = 32;
    const PAD      = 8;

    public static function init(): void
    {
        // Генерация при сохранении товара и вариаций
        add_action('woocommerce_admin_process_product_object', [__CLASS__, 'on_product_save'], 20);
        add_action('woocommerce_admin_process_variation_object', [__CLASS__, 'on_variation_save'], 20, 2);

        // Показ в админке Woo
        add_action('woocommerce_product_options_sku', [__CLASS__, 'render_product_field']);
        add_action('woocommerce_variation_options_pricing', [__CLASS__, 'render_variation_field'], 10, 3);

        // Дублирование товара
        add_filter('woocommerce_duplicate_product_exclude_meta', [__CLASS__, 'exclude_meta_from_duplicate']);
        add_action('woocommerce_product_duplicate', [__CLASS__, 'regenerate_no_after_duplicate'], 10, 2);

        // Колонка в списке товаров
        add_filter('manage_edit-product_columns', [__CLASS__, 'add_product_column'], 20);
        add_action('manage_product_posts_custom_column', [__CLASS__, 'render_product_column'], 20, 2);

        // Поиск по артикулу в списке товаров
        add_action('pre_get_posts', [__CLASS__, 'admin_search_by_article']);

        // Ширина колонки
        add_action('admin_head', [__CLASS__, 'admin_column_css']);

        // REST
        add_action('rest_api_init', [__CLASS__, 'register_rest_field']);
    }

    private static function compute_no(int $id): string
    {
        $n = ($id * self::FACTOR) + self::OFFSET;
        return str_pad((string) $n, self::PAD, '0', STR_PAD_LEFT);
    }

    private static function get_no(int $post_id): string
    {
        return (string) get_post_meta($post_id, self::META_KEY, true);
    }

    private static function ensure_no(int $post_id): void
    {
        if ($post_id <= 0) return;

        $existing = self::get_no($post_id);
        if ($existing !== '') return;

        update_post_meta($post_id, self::META_KEY, self::compute_no($post_id));
    }

    public static function exclude_meta_from_duplicate(array $meta_to_exclude): array
    {
        $meta_to_exclude[] = self::META_KEY;
        return array_unique($meta_to_exclude);
    }

    public static function regenerate_no_after_duplicate(WC_Product $duplicate, WC_Product $source): void
    {
        $duplicate_id = (int) $duplicate->get_id();
        if ($duplicate_id <= 0) return;

        delete_post_meta($duplicate_id, self::META_KEY);
        self::ensure_no($duplicate_id);

        if ($duplicate->is_type('variable')) {
            $children_ids = $duplicate->get_children();

            foreach ($children_ids as $variation_id) {
                $variation_id = (int) $variation_id;
                if ($variation_id <= 0) continue;

                delete_post_meta($variation_id, self::META_KEY);
                self::ensure_no($variation_id);
            }
        }
    }

    public static function on_product_save(WC_Product $product): void
    {
        $id = (int) $product->get_id();
        self::ensure_no($id);
    }

    public static function on_variation_save($variation, $i): void
    {
        if (!$variation instanceof WC_Product_Variation) return;

        $id = (int) $variation->get_id();
        self::ensure_no($id);
    }

    public static function render_product_field(): void
    {
        global $post;

        if (!$post || $post->post_type !== 'product') return;

        $post_id = (int) $post->ID;
        self::ensure_no($post_id);

        $no = self::get_no($post_id);

        woocommerce_wp_text_input([
            'id'                => self::META_KEY . '_display',
            'label'             => 'Артикул (UI)',
            'value'             => $no,
            'desc_tip'          => true,
            'description'       => 'Заполняется автоматически.',
            'custom_attributes' => [
                'readonly' => 'readonly',
                'disabled' => 'disabled',
            ],
        ]);
    }

    public static function render_variation_field($loop, $variation_data, $variation): void
    {
        $variation_id = is_object($variation) ? (int) $variation->ID : 0;
        if ($variation_id <= 0) return;

        self::ensure_no($variation_id);
        $no = self::get_no($variation_id);

        echo '<p class="form-row form-row-full">';
        echo '<label>Артикул (UI)</label>';
        echo '<input type="text" value="' . esc_attr($no) . '" readonly="readonly" disabled="disabled" />';
        echo '<span class="description" style="display:block;">Заполняется автоматически.</span>';
        echo '</p>';
    }

    public static function add_product_column(array $columns): array
    {
        $new = [];

        foreach ($columns as $key => $label) {
            $new[$key] = $label;

            if ($key === 'name') {
                $new[self::META_KEY] = 'Арт. UI';
            }
        }

        return $new;
    }

    public static function render_product_column(string $column, int $post_id): void
    {
        if ($column !== self::META_KEY) return;

        self::ensure_no($post_id);
        echo esc_html(self::get_no($post_id));
    }

    public static function admin_column_css(): void
    {
        $screen = function_exists('get_current_screen') ? get_current_screen() : null;
        if (!$screen || $screen->id !== 'edit-product') return;

        echo '<style>
            th#' . esc_attr(self::META_KEY) . ',
            td.' . esc_attr(self::META_KEY) . ' {
                width: 90px;
                min-width: 120px;
                white-space: nowrap;
            }

            th#taxonomy-door_family,
            td.column-taxonomy-door_family {
                width: 80px;
                white-space: nowrap;
    }
        </style>';
    }

    public static function admin_search_by_article(WP_Query $query): void
    {
        if (!is_admin() || !$query->is_main_query()) return;

        $screen = function_exists('get_current_screen') ? get_current_screen() : null;
        if (!$screen || $screen->id !== 'edit-product') return;

        $s = trim((string) $query->get('s'));
        if ($s === '') return;

        if (!preg_match('/^\d{8}$/', $s)) return;

        $query->set('s', '');
        $query->set('meta_query', [
            [
                'key'     => self::META_KEY,
                'value'   => $s,
                'compare' => '=',
            ],
        ]);
    }

    public static function register_rest_field(): void
    {
        register_rest_field('product', self::META_KEY, [
            'get_callback' => function ($obj) {
                $id = (int) ($obj['id'] ?? 0);
                if ($id <= 0) return '';

                self::ensure_no($id);
                return self::get_no($id);
            },
            'schema' => [
                'description' => 'Public Article Number (UI)',
                'type'        => 'string',
                'context'     => ['view', 'edit'],
            ],
        ]);

        register_rest_field('product_variation', self::META_KEY, [
            'get_callback' => function ($obj) {
                $id = (int) ($obj['id'] ?? 0);
                if ($id <= 0) return '';

                self::ensure_no($id);
                return self::get_no($id);
            },
            'schema' => [
                'description' => 'Public Article Number (UI)',
                'type'        => 'string',
                'context'     => ['view', 'edit'],
            ],
        ]);
    }
}

MU_Public_Article_No::init();