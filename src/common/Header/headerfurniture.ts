import pr1 from "@assets/images/home-furniture/pr-01.jpg"
import pr2 from "@assets/images/home-furniture/pr-02.png"
import pr3 from "@assets/images/home-furniture/pr-03.png"
import pr4 from "@assets/images/home-furniture/pr-04.png"
import pr5 from "@assets/images/home-furniture/pr-05.png"

const HomePage1 = [
    { id: "homeDefault", label: "Home Default", link: "/", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "homeClassic", label: "Home Classic", link: "/home-classic", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "homeVideo", label: "Home Video Banner", link: "/home-video-banner" },
    { id: "homeCategories", label: "Home Categories Links", link: "/home-categories-links" },
    { id: "homeStatic", label: "Home Static Image", link: "/home-static-image" },
    { id: "homeMetro", label: "Home Metro", link: "/home-metro" },
    { id: "homeLookBook", label: "Home Lookbook", link: "/home-lookbook" },
    { id: "homeInstagram", label: "Home Instgram Shop", link: "/home-instagram-shop" },
    { id: "homeMedical", label: "Home Medical", link: "/home-medical", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "homeFlower", label: "Home Flower", link: "/home-flower" },
    { id: "homeFurniture", label: "Home Furniture", link: "/home-furniture", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "homeBag", label: "Home Bag", link: "/home-bag" },
    { id: "homeLingeries", label: "Home Lingeries", link: "/home-lingeries" },
    { id: "homeCosmetics", label: "Home Cosmetics", link: "/home-cosmetics", badge: "new", badgeColor: "badge-tag badge bg-danger" },
    { id: "homeGlasses", label: "Home Glasses", link: "/home-glasses", badge: "new", badgeColor: "badge-tag badge bg-danger" },
    { id: "homeShoes", label: "Home Shoes", link: "/home-shoes", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
]

const HomePage2 = [
    { id: "homeFashion9", label: "Home Fashion 9", link: "/home-fashion9" },
    { id: "homeLookbookCollection", label: "Home Lookbook Collection", link: "/home-lookbook-collection" },
    { id: "homeFashionSimple", label: "Home Fashion Simple", link: "/home-fashion-simple" },
    { id: "homeFashion10", label: "Home Fashion 10", link: "/home-fashion10" },
    { id: "homeDecor", label: "Home Decor", link: "/home-decor" },
    { id: "homeDecor2", label: "Home Decor 2", link: "/home-decor2" },
    { id: "homeFashionVertical", label: "Home Fashion Vertical", link: "/home-fashion-vertical" },
    { id: "homeElectric", label: "Home Electric", link: "/home-electric" },
    { id: "homeElectricVertical", label: "Home Electric Vertical", link: "/home-electric-vertical" },
    { id: "homeDigital", label: "Home Digital", link: "/home-digital" },
    { id: "oneProductStore", label: "One Product Store", link: "/home-one-product-store", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "homeHandmade", label: "Home Handmade", link: "/home-handmade" },
    { id: "homeFashionTrend", label: "Home Fashion Trend", link: "/home-fashion-trend" },
    { id: "homeKids", label: "Home Kids", link: "/home-kids" },
    { id: "homeSport", label: "Home Sport", link: "/home-sport", badge: "new", badgeColor: "badge-tag badge bg-danger" },
    { id: "homeJewelry", label: "Home Jewelry", link: "/home-jewelry", badge: "new", badgeColor: "badge-tag badge bg-danger" }
]

const Features = [
    { id: "filterOptions", label: "Filter Options", link: "/shop-filter-sidebar", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "catalogMode", label: "Catalog mode", link: "/" },
    { id: "cookiesLawInfo", label: "Cookies law info", link: "/shop" },
    { id: "ageVerification", label: "Age verification", link: "/home-age-verified" },
    { id: "megaMenu", label: "Mega menu", link: "/" },
    { id: "rightSidebar", label: "Right Sidebar", link: "/shop-right-sidebar" },
    { id: "hiddenSidebar", label: "Hidden sidebar", link: "/shop-hidden-sidebar" },
    { id: "checkout", label: "Checkout", link: "/checkout" },
    { id: "frequentlyBoughtTogether", label: "Frequently Bought Together", link: "/product-detail-frequently-bought-together" },
    { id: "variantImagesGrouped", label: "Variant Images Grouped", link: "/product-detail-variant-images-grouped" },
    { id: "demoRTL", label: "Demo RTL", link: "/home-rtl", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "gridListSwitcher", label: "Grid/List switcher", link: "/shop-grid-list-switcher", badge: "Hot", badgeColor: "badge-tag badge bg-danger" },
    { id: "compare", label: "Compare", link: "/home-shoes", badge: "new", badgeColor: "badge-tag badge bg-danger" },
    { id: "pickupAvailability", label: "Pickup Availability", link: "/product-detail-pickup-availability", badge: "Selling feature", badgeColor: "position-absolute badge bg-danger rounded-pill fw-normal text-white", badgeStyle: { "left": "103%", "top": "10px" } }
]

const ProductFeatures = [
    { id: "FrequentlyBoughtTogether", lable: "Frequently Bought Together", link: "/product-detail-frequently-bought-together", badge: "new", badgeColor: "badge-tag badge bg-danger", badgeStyle: { "whiteSpace": "nowrap" } },
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

const swiperdata = [
    {
        imageUrl: pr1,
        name: "Hans Wegner Style Elbow Chair",
        price: "$300.00"
      },
      {
        imageUrl: pr2,
        name: "Rook Tripod Table Lamp Wooden",
        price: "$620.00",
        oldPrice: "$800.00",
        sale: "-23%"
      },
      {
        imageUrl: pr3,
        name: "Flow Table Lamp EU Spainmboo Chair",
        price: "$110.00"
      },
      {
        imageUrl: pr4,
        name: "3-seater sofa w/ chaiselong",
        price: "$680.00"
      },
      {
        imageUrl: pr5,
        name: "Liby Sage Green",
        price: "$100.00"
      }
]

export { HomePage1, HomePage2, Features, ProductFeatures, swiperdata }