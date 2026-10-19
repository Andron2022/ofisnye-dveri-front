<?php
// Isolated WP/ACF contract checks. No WordPress bootstrap or database writes.
define( 'ABSPATH', __DIR__ );
$fields = array();
$rest = array();
$form_post_id = 1;
$post_types = array( 1 => 'page', 2 => 'post', 3 => 'portfolio_project', 4 => 'product', 5 => 'door_seo_landing', 6 => 'page', 7 => 'page' );
$post_slugs = array( 1 => 'o-nas', 6 => 'glavnaya', 7 => 'stenovye-paneli' );
$values = array( 'seo_title' => 'SEO Title', 'seo_description' => 'SEO description', 'seo_og_image' => 10, 'seo_noindex' => '0', 'seo_og_title' => 'OG title', 'seo_twitter_image' => 11, 'seo_canonical_url' => '/kontakty' );
function add_action( ...$args ) {}
function add_filter( ...$args ) {}
function acf_add_local_field_group( $group ) { $GLOBALS['fields'] = $group; }
function register_rest_field( $types, $name, $args ) { $GLOBALS['rest'] = $args; }
function acf_get_form_data( $key ) { return $GLOBALS['form_post_id']; }
function get_post_type( $id ) { return $GLOBALS['post_types'][ $id ] ?? false; }
function get_post_field( $key, $id ) { return $GLOBALS['post_slugs'][ $id ] ?? ''; }
function get_field( $name, $id, $format ) { return $GLOBALS['values'][ $name ] ?? null; }
function get_post_meta( $id, $key, $single ) { return 'Alt'; }
function sanitize_text_field( $value ) { return strip_tags( $value ); }
function sanitize_textarea_field( $value ) { return strip_tags( $value ); }
function wp_get_attachment_image_url( $id, $size ) { return 'https://wp.test/' . $id . '.jpg'; }
function esc_url_raw( $url ) { return $url; }
class WP_Term { public $term_id = 9; }
class WC_Product { public function get_id() { return 4; } }
class WP_REST_Response {
    private $data;
    public function __construct( $data ) { $this->data = $data; }
    public function get_data() { return $this->data; }
    public function set_data( $data ) { $this->data = $data; }
}
function check( $condition, $message ) {
    if ( ! $condition ) throw new RuntimeException( $message );
}
require __DIR__ . '/../wordpress/mu-plugins/headless-seo-foundation.php';
OD_Headless_SEO_Foundation::register_acf_fields();
OD_Headless_SEO_Foundation::register_wp_rest_fields();
$names = array_column( $fields['fields'], 'name' );
foreach ( array( 'seo_title', 'seo_description', 'seo_og_image', 'seo_noindex', 'seo_og_title', 'seo_og_description', 'seo_twitter_title', 'seo_twitter_description', 'seo_twitter_image', 'seo_canonical_url' ) as $name ) {
    check( in_array( $name, $names, true ), 'Missing ACF field: ' . $name );
}
check( count( $names ) === count( array_unique( $names ) ), 'Duplicate ACF fields' );
check( $rest['schema']['properties']['image'] === $rest['schema']['properties']['twitter_image'], 'Image schemas differ' );
$seo = $rest['get_callback']( array( 'id' => 1 ) );
check( $seo['title'] === 'SEO Title' && $seo['noindex'] === false, 'Legacy fields changed' );
check( $seo['og_title'] === 'OG title' && $seo['og_description'] === null, 'Social payload invalid' );
check( $seo['image']['id'] === 10 && $seo['twitter_image']['id'] === 11, 'Image resolution invalid' );
check( $seo['canonical_url'] === '/kontakty', 'Editorial canonical missing' );
foreach ( array( 1, 2, 3 ) as $id ) {
    $form_post_id = $id;
    check( OD_Headless_SEO_Foundation::prepare_canonical_field( array( 'key' => 'canonical' ) ) !== false, 'Canonical hidden for editorial content' );
}
foreach ( array( 4, 5, 6, 7, 'product_cat_9' ) as $id ) {
    $form_post_id = $id;
    check( OD_Headless_SEO_Foundation::prepare_canonical_field( array() ) === false, 'Canonical exposed for automatic route' );
    check( OD_Headless_SEO_Foundation::get_post_seo( (int) $id )['canonical_url'] === null, 'Unsupported canonical leaked to REST' );
}
$category = OD_Headless_SEO_Foundation::extend_product_category_response( new WP_REST_Response( array( 'id' => 9 ) ), new WP_Term(), null )->get_data();
check( $category['headless_seo']['canonical_url'] === null && $category['headless_seo']['og_title'] === 'OG title', 'Woo category contract invalid' );
$product = OD_Headless_SEO_Foundation::extend_product_response( new WP_REST_Response( array( 'id' => 4 ) ), new WC_Product(), null )->get_data();
check( $product['headless_seo']['canonical_url'] === null && $product['headless_seo']['og_title'] === 'OG title', 'Woo product contract invalid' );
foreach ( array( 'https://other.test/x', '//other.test/x', '/a?x=1', '/a#x', '/a/../b', '/%2e%2e/b', '/%2fother.test', '/%252fother.test', '/bad%zz', '/a\\b', "/a\nb", '/checkout', '/api/health', '/sitemap.xml', '/a//b' ) as $value ) {
    check( OD_Headless_SEO_Foundation::validate_canonical_value( true, $value ) !== true, 'Unsafe canonical accepted: ' . $value );
}
foreach ( array( '', '/o-nas', '/kontakty/', '/novosti-i-stati/statya' ) as $value ) {
    check( OD_Headless_SEO_Foundation::validate_canonical_value( true, $value ) === true, 'Valid canonical rejected: ' . $value );
}
echo "PASS: ACF visibility, backwards compatible WP/Woo payload, images, canonical validation.\n";
