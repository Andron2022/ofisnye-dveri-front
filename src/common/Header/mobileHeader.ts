import AUD from '@assets/images/svg/aud.svg'
import CAD from '@assets/images/svg/cad.svg'
import DKK from '@assets/images/svg/dkk.svg'
import EUR from '@assets/images/svg/eur.svg'
import GBP from '@assets/images/svg/gbp.svg'
import HKD from '@assets/images/svg/hkd.svg'
import JPY from '@assets/images/svg/jpy.svg'
import NZD from '@assets/images/svg/nzd.svg'
import SGD from '@assets/images/svg/sgd.svg'
import USD from '@assets/images/svg/usd.svg'

import pr1 from '@assets/images/home-fashion-9/pr-s-01.jpg'
import pr2 from "@assets/images/home-fashion-9/pr-s-02.jpg"
import pr3 from '@assets/images/home-fashion-9/pr-s-03.jpg'
import pr4 from '@assets/images/home-fashion-9/pr-s-04.jpg'
import pr5 from '@assets/images/home-fashion-9/pr-s-05.jpg'
import pr6 from '@assets/images/home-fashion-9/pr-s-06.jpg'
import pr7 from '@assets/images/home-fashion-9/pr-s-07.jpg'
import pr8 from '@assets/images/home-fashion-9/pr-s-08.jpg'
import pr9 from '@assets/images/home-fashion-9/pr-s-09.jpg'
import pr10 from '@assets/images/home-fashion-9/pr-s-10.jpg'
import pr11 from '@assets/images/home-fashion-9/pr-s-11.jpg'
import pr12 from '@assets/images/home-fashion-9/pr-s-12.jpg'
import pr13 from '@assets/images/home-fashion-9/pr-s-13.jpg'
import pr14 from '@assets/images/home-fashion-9/pr-s-14.jpg'
import pr15 from '@assets/images/home-fashion-9/pr-s-15.jpg'
import pr16 from '@assets/images/home-fashion-9/pr-s-16.jpg'

const HomePage = [
    { id: "HomeDefault", label: "Home Default", link: "/home-default" },
    { id: "HomeClassic", label: "Home Classic", link: "/home-classic" },
    { id: "HomeVideoBanner", label: "Home Video Banner", link: "/home-video-banner" },
    { id: "HomeCategoriesLinks", label: "Home Categories Links", link: "/home-categories-links" },
    { id: "HomeStaticImage", label: "Home Static Image", link: "/home-static-image" },
    { id: "HomeMetro", label: "Home Metro", link: "/home-metro" },
    { id: "HomeLookbook", label: "Home Lookbook", link: "/home-lookbook" },
    { id: "HomeInstagram Shop", label: "Home Instagram Shop", link: "/home-instagram-shop" },
    { id: "HomeMedical", label: "Home Medical", link: "/home-instagram-shop", badge: "Hot", badgeColor: "lbc_nav lb_menu_hot ml__5" },
    { id: "HomeFashion 9", label: "Home Fashion 9", link: "/home-fashion9" },
    { id: "HomeLookbook Collection", label: "Home Lookbook Collection", link: "/home-lookbook-collection" },
    { id: "HomeFashion Simple", label: "Home Fashion Simple", link: "/home-fashion-simple" },
    { id: "HomeFashion 10", label: "Home Fashion 10", link: "/home-fashion10" },
    { id: "HomeDecor", label: "Home Decor", link: "/home-decor2" },
    { id: "HomeFashion Vertical", label: "Home Fashion Vertical", link: "/home-fashion-vertical" },
    { id: "HomeElectric", label: "Home Electric", link: "/home-electric" },
    { id: "HomeElectric Vertical", label: "Home Electric Vertical", link: "/home-electric-vertical" },
]

const HomeLayout = [
    { id: "HeaderLayout1", label: "Header Layout 1", link: "/home-header-01" },
    { id: "HeaderLayout2", label: "Header Layout 2", link: "/home-header-02" },
    { id: "HeaderLayout3", label: "Header Layout 3", link: "/" },
    { id: "HeaderLayout4", label: "Header Layout 4", link: "/home-header-04" },
    { id: "HeaderLayout5", label: "Header Layout 5", link: "/home-electric" },
    { id: "HeaderLayout6", label: "Header Layout 6", link: "/home-header-06" },
    { id: "HeaderLayout7", label: "Header Layout 7", link: "/home-fashion-vertical" },
    { id: "HeaderLayout8", label: "Header Layout 8", link: "/home-electric-vertical" },
    { id: "HeaderTransparent", label: "Header Transparent", link: "/home-decor" },
]

const Shop = [
    { id: "GridLayout", label: "Grid Layout", link: "/shop" },
    { id: "PackeryLayout", label: "Packery Layout", link: "/shop-packery-layout" },
    { id: "MasonryLayout", label: "Masonry Layout", link: "/shop-masonry-layout" },
    { id: "FullWidthLayout", label: "Full Width Layout", link: "/shop-full-width-layout" },
    { id: "1600pxLayout", label: "1600px Layout", link: "/shop-1600px-layout" },
    { id: "LeftSidebar", label: "Left Sidebar", link: "/shop-left-sidebar" },
    { id: "RightSidebar", label: "Right Sidebar", link: "/shop-right-sidebar" },
    { id: "Hiddensidebar", label: "Hidden sidebar", link: "/shop-hidden-sidebar" },
    { id: "Filtersarea", label: "Filters area", link: "/shop" },
    { id: "Filterssidebar", label: "Filters sidebar", link: "/shop-filter-sidebar" },
    { id: "Shoppingcart", label: "Shopping cart", link: "/shopping-cart" },
]

const Product = [
    { id: "External/Affiliate Product", label: "External/Affiliate Product", link: "/product-detail-external-affiliate" },
    { id: "Simpleproduct", label: "Simple product", link: "/product-detail-simple-product" },
    { id: "Variableproduct", label: "Variable product", link: "/product-detail-layout-01" },
    { id: "GroupProduct", label: "Group Product", link: "/product-detail-grouped-product", badge: "hot", badgeColor: "badge bg-teal fw-normal rounded-pill" },
    { id: "InnerZoom #1", label: "Inner Zoom #1", link: "/product-detail-layout-02" },
    { id: "ExternalZoom", label: "External Zoom", link: "/product-detail-layout-01" },
    { id: "InnerZoom #2", label: "Inner Zoom #2", link: "/product-detail-layout-03" },
    { id: "PhotoSwipePopup", label: "PhotoSwipe Popup", link: "/product-detail-layout-01" },
    { id: "Descriptionwithproduct", label: "Description with product", link: "/product-detail-description-with-product" },
    { id: "Descriptionwithinstagram shop", label: "Description with instagram shop", link: "/product-detail-description-with-instagram-shop" },
    { id: "Productvideo", label: "Product video", link: "/product-detail-product-video", badge: "hot", badgeColor: "badge bg-teal fw-normal rounded-pill" },
    { id: "Product3D,ARmodels", label: "Product 3D, AR models", link: "/product-detail-3d-ar-models", badge: "hot", badgeColor: "badge bg-teal fw-normal rounded-pill" },
]

const Portfolio = [
    { id: "Portfolio2Columns", label: "Portfolio 2 Columns", link: "/portfolio-classic" },
    { id: "Portfolio3Columns", label: "Portfolio 3 Columns", link: "/portfolio-classic-3-columns" },
    { id: "Portfolio4Columns", label: "Portfolio 4 Columns", link: "/portfolio-classic-4-columns" },
    { id: "SinglePortfolioWithShop", label: "Single Portfolio With Shop", link: "/single-portfolio-classic-with-shop" },
    { id: "SinglePortfolioWithLookbook", label: "Single Portfolio With Lookbook", link: "/single-portfolio-classic-with-lookbook" },
    { id: "SinglePortfolioWithLookbook", label: "Single Portfolio With Lookbook", link: "/single-portfolio-classic-with-lookbook" },
]
const Blog = [
    { id: "Grid Layout", lable: "Grid Layout", link: "/blog-grid" },
    { id: "Masonry Layout", lable: "Masonry Layout", link: "/blog-masonry" },
    { id: "Left Sidebar", lable: "Left Sidebar", link: "/blog-left-sidebar" },
    { id: "Right Sidebar", lable: "Right Sidebar", link: "/blog-right-sidebar" },
    { id: "ingle Post with Product Listing", lable: "Single Post with Product Listing", link: "/blog-post-with-product-listing" },
    { id: "Single Post with Instagram Shop", lable: "Single Post with Instagram Shop", link: "/blog-post-with-instagram-shop" },
    { id: "Single Post with Categories", lable: "Single Post with Categories", link: "/blog-post-with-instagram-shop" },
    { id: "Single Post with lookbook", lable: "Single Post with lookbook", link: "/blog-post-with-lookbook" },

]

const Lookbook = [
    { id: "Lookbook Slider", label: "Lookbook Slider", link: "/home-lookbook" },
    { id: "Portfolio 3 Columns", label: "Portfolio 3 Columns", link: "/portfolio-classic-3-columns" },
    { id: "Lookbook Section", label: "Lookbook Section", link: "/home-lookbook-collection" },
    { id: "Lookbook instagram", label: "Lookbook instagram", link: "/home-default" },
    { id: "Lookbook in product", label: "Lookbook in product", link: "/product-detail-description-with-lookbook" },
    { id: "Lookbook in portfolio-classic post", label: "Lookbook in portfolio-classic post", link: "/single-portfolio-classic-with-lookbook" },
    { id: "Lookbook in page", label: "Lookbook in page", link: "/lookbook-in-page" },
]

const Country = [
    {
        name: "AUD",
        image: USD
    },
    {
        name: "CAD",
        image: USD
    },
    {
        name: "DKK",
        image: USD
    },
    {
        name: "DKK",
        image: USD
    },
    {
        name: "EUR",
        image: USD
    },
    {
        name: "GBP",
        image: USD
    },
    {
        name: "USD",
        image: USD
    },
]

const country2 = [
    {
        name: "AUD",
        image: AUD
    },
    {
        name: "CAD",
        image: CAD
    },
    {
        name: "DKK",
        image: DKK
    },
    {
        name: "EUR",
        image: EUR
    },
    {
        name: "GBP",
        image: GBP
    },
    {
        name: "HKD",
        image: HKD
    },
    {
        name: "JPY",
        image: JPY
    },
    {
        name: "NZD",
        image: NZD
    },
    {
        name: "SGD",
        image: SGD
    },
    {
        name: "USD",
        image: USD
    },
]
const Categories = [
    { id: "1", category: "Women’s Clothing", icon: "las la-female me-2" },
    { id: "2", category: "Men’s Clothing", icon: "las la-male me-2" },
    { id: "3", category: "Watches", icon: "las la-clock me-2" },
    { id: "4", category: "Accessories", iocn: "las la-glasses me-2" },
    { id: "5", category: "Electric", icon: "las la-camera-retro me-2" },
    { id: "6", category: "Shoes", icon: "las la-shoe-prints me-2" },
    { id: "7", category: "Jewellery", icon: "las la-gem me-2" },
    { id: "8", category: "T-Shirt", icon: "las la-tshirt me-2" },
    { id: "9", category: "Toys, Kids Baby", icon: "las la-child me-2" },
    { id: "10", category: "Decor", icon: "las la-chair me-2" },
]

const SearchModel = [
    { id: "1", img: pr1, title: "Analogue Resin Strap", price: "$30.00" },
    { id: "2", img: pr2, title: "Ridley High Waist", price: "$36.00" },
    { id: "3", img: pr3, title: "Blush Beanie", price: "$15.00" },
    { id: "4", img: pr4, title: "Cluse La Boheme Rose", bold: "Gold", del: "$60.00", price: "$45.00", label: "-25%", color: "badge bg-danger fw-normal text-white rounded-0" },
    { id: "5", img: pr5, title: "Mercury Tee", price: "$68.00" },
    { id: "6", img: pr6, title: "La Bohème Rose Gold ", del: "$60.00", price: "$40.00", label: "-34%", color: "badge bg-danger fw-normal text-white rounded-0" },
    { id: "7", img: pr7, title: "Cream women pants", price: "$35.00" },
    { id: "8", img: pr8, title: "Black mountain hat", price: "$50.00" },
    { id: "9", img: pr9, title: "Short Sleeved Hoodie", del: "$45.00", price: "$30.00", price2: "$34.00" },
    { id: "10", img: pr10, title: "Black mountain hat ", del: "$35.00" },
    { id: "11", img: pr11, title: "Men pants", del: "$49.00–$56.00" },
    { id: "12", img: pr12, title: "Skin Sweatpans", del: "$75.00", price: "$45.00", price2: "$40.00" },
    { id: "13", img: pr13, title: "Simple Skin T-shirt", del: "$56.00" },
    { id: "14", img: pr14, title: "Sunny Life", del: "$68.00" },
    { id: "15", img: pr15, title: "Leather White Trainers", del: "$20.00" },
    { id: "16", img: pr16, title: "Stripe Long Sleeve Top", del: "$15.00" },
]

export { HomePage, HomeLayout, Shop, Product, Portfolio,Blog, Lookbook, Categories, Country,SearchModel ,country2}