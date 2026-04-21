import banner1 from "@assets/images/home-classic/mega-bagal-1.jpg"
import banner2 from '@assets/images/home-classic/mega-cq-4.jpg'
import pr34 from "@assets/images/products/pr-34.jpg"

const ShopImage2 = [
    { id: "Women", title: "Wash me", link: "/shop-left-sidebar", img: banner1, },
    { id: "Men", title: "Woleen Tee", link: "/shop-left-sidebar", img: banner2, hoverImage: pr34 }
]

const ShopPage2 = [
    { id: "gridLayout", label: "Grid Layout", link: "/shop" },
    { id: "packeryLayout", label: "Packery Layout", link: "/shop-packery-layout" },
    { id: "masonryLayout", label: "Masonry Layout", link: "/shop-masonry-layout" },
    { id: "fullWidthLayout", label: "Full Width Layout", link: "/shop-full-width-layout" },
    { id: "layout1600px", label: "1600px Layout", link: "/shop-1600px-layout" },
    { id: "leftSidebar", label: "Left Sidebar", link: "/shop-left-sidebar" },
    { id: "rightSidebar", label: "Right Sidebar", link: "/shop-right-sidebar" },
    { id: "hiddenSidebar", label: "Hidden sidebar", link: "/shop-hidden-sidebar" },
    { id: "shoppingCart", label: "Shopping cart", link: "/shopping-cart" },
    { id: "filtersArea", label: "Filters area", link: "/shop" },
    { id: "filtersSidebar", label: "Filters sidebar", link: "/shop-filter-sidebar" },
]
const ShopFeatures2 = [
    { id: "filterOptions", label: "Filter options", link: "/shop-filter-sidebar", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "loadMoreButton", label: "Load more button", link: "/shop-load-more" },
    { id: "infiniteScrolling", label: "Infinite scrolling", link: "/shop-filter-sidebar" },
    { id: "catalog", label: "Catalog mode", link: "/index" },
    { id: "cookie", label: "Cookies law info", link: "/shop" },
    { id: "age", label: "Age verification", link: "/home-age-verified" },
    { id: "megamenu", label: "Mega menu", link: "/index" },
    { id: "rightsidebar", label: "Right Sidebar", link: "/shop-right-sidebar" },
    { id: "hiddenSearch", label: "Hidden Search", link: "/shop-hidden-sidebar" },
    { id: "checkout", label: "Checkout", link: "/checkout" }
]

const ProductDetail2 = [
    { id: "External/AffiliateProduct", label: "External/Affiliate Product", link: "/product-detail-external-affiliate" },
    { id: "Simpleproduct", label: "Simple product", link: "/product-detail-simple-product" },
    { id: "Variableproduct", label: "Variable product", link: "/product-detail-layout-01" },
    { id: "GroupedProduct", label: "Grouped Product", link: "/product-detail-grouped-product", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "InnerZoom#1", label: "Inner Zoom #1", link: "/product-detail-layout-02" },
    { id: "ExternalZoom", label: "External Zoom", link: "/product-detail-layout-01" },
    { id: "InnerZoom#2", label: "Inner Zoom #2", link: "/product-detail-layout-03" },
    { id: "PhotoSwipePopup", label: "PhotoSwipe Popup", link: "/product-detail-layout-01" },
    { id: "Descriptionwithproduct", label: "Description with product", link: "/product-detail-description-with-product" },
    { id: "Descriptionwithinstagramshop", label: "Description with instagram shop", link: "/product-detail-description-with-instagram-shop" },
    { id: "Productvideo", label: "Product video", link: "/product-detail-product-video" },
    { id: "Product3DARmodels", label: "Product 3D, AR models", link: "/product-detail-3d-ar-models" },
]

const ProductFeatures2 = [
    { id: "FrequentlyBoughtTogether", lable: "Frequently Bought Together", link: "/product-detail-frequently-bought-together", badge: "Hot", badgeColor: "badge-tag badge bg-danger", badgeStyle: { "whiteSpace": "nowrap" } },
    { id: "Productpre-orders", lable: "Product pre-orders", link: "/product-detail-pre-orders" },
    { id: "ProductUpsell", lable: "Product Upsell", link: "/product-detail-tab-accordion", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "DescriptionwithLookbook", lable: "Description with Lookbook", link: "/product-detail-description-with-lookbook", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "Backinstocknotification", lable: "Back in stock notification", link: "/product-detail-back-in-stock-notification" },
    { id: "VariantImagesGrouped", lable: "Variant Images Grouped", link: "/product-detail-variant-images-grouped", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "SizeGuideHTML", lable: "Size Guide HTML", link: "/product-detail-layout-01" },
    { id: "Delivery&Return", lable: "Delivery & Return", link: "/product-detail-layout-01" },
    { id: "AskaQuestion", lable: "Ask a Question", link: "/product-detail-layout-01" },
    { id: "Productsticky", lable: "Product sticky", link: "/product-detail-product-sticky" },
    { id: "360°product viewer", lable: "360° product viewer", link: "/product-detail-360-viewer" },
    { id: "Dynamiccheckoutbuttons", lable: "Dynamic checkout buttons", link: "/product-detail-swatch-radio", badge: "Hot", badgeColor: "badge-tag badge bg-danger", badgeStyle: { "whiteSpace": "nowrap" } },
    { id: "Stickyaddtocart", lable: "Sticky add to cart", link: "/product-detail-layout-01", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },

]

export { ShopImage2, ShopPage2, ShopFeatures2, ProductDetail2, ProductFeatures2 }