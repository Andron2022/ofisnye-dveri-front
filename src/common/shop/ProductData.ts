import pr1 from '@assets/images/products/pr-01.jpg'
import pr2 from '@assets/images/products/pr-02.jpg'
import pr27 from '@assets/images/products/pr-27.jpg'
import pr28 from '@assets/images/products/pr-28.jpg'
import pr33 from '@assets/images/products/pr-33.jpg'
import pr34 from '@assets/images/products/pr-34.jpg'
import pr18 from '@assets/images/products/pr-18.jpg'
import pr17 from '@assets/images/products/pr-17.jpg'
import pr11 from '@assets/images/products/pr-11.jpg'
import pr15 from '@assets/images/products/pr-15.jpg'
import pr14 from '@assets/images/products/pr-14.jpg'
import pr4 from '@assets/images/products/pr-04.jpg'
import pr5 from '@assets/images/products/pr-05.jpg'
import pr31 from '@assets/images/products/pr-31.jpg'
import pr32 from '@assets/images/products/pr-32.jpg'
import pr6 from '@assets/images/products/pr-06.jpg'
import pr7 from '@assets/images/products/pr-07.jpg'
import pr8 from '@assets/images/products/pr-08.jpg'
import pr9 from '@assets/images/products/pr-09.jpg'
import pro1 from '@assets/images/home-fashion-simple/pr-01.jpg'
import pro2 from '@assets/images/home-fashion-simple/pr-02.jpg'
import pr01 from '@assets/images/shop/pr-01.jpg'
import pr47 from '@assets/images/home-fashion-9/pr-s-47.jpg'
import pr35 from '@assets/images/products/pr-35.jpg'

const ProductData = [
    {
        id: 1,
        imageUrl: pr1,
        hoverImageUrl: pr2,
        size: "XS, S, M, L, XL",
        label: "New",
        labelClass: "bg-success",
        title: "Analogue Resin Strap",
        price: "$30.00",
    },
    {
        id: 2,
        imageUrl: pr27,
        hoverImageUrl: pr28,
        label: "-34%",
        labelClass: "bg-danger",
        title: "La Bohème Rose Gold",
        price: "$68.00",
    },
    {
        id: 3,
        imageUrl: pr33,
        hoverImageUrl: pr34,
        size: "S, M, L",
        title: "Ridley High Waist",
        price: "$36.00",
    },
    {
        id: 4,
        imageUrl: pr18,
        hoverImageUrl: pr17,
        size: "S, M, L",
        title: "Cream Women Pants",
        price: "$35.00",
    },
    {
        id: 5,
        imageUrl: pr11,
        size: "S, M, L",
        title: "Women Black Pants",
        price: "$100.00",
    },
    {
        id: 6,
        imageUrl: pr33,
        hoverImageUrl: pr34,
        size: "S, M, L",
        title: "Sweatshirt In Geometric Print",
        price: "$35.00",
    },
    {
        id: 7,
        imageUrl: pr15,
        hoverImageUrl: pr14,
        title: "Mercury Tee",
        price: "$68.00",
        color: [
            {
                pic: pr15,
                imageUrl: pr15
            },
            {
                pic: pr14,
                imageUrl: pr14
            }
        ]
    },
    {
        id: 8,
        imageUrl: pr4,
        size: "S, M, L",
        title: "Blush Beanie",
        price: "$15.00",
        colors: [
            {
                color: "bg-body",
                imageUrl: pr5
            },
            {
                color: "bg_color_pink",
                imageUrl: pr31
            },
            {
                color: "bg-dark",
                imageUrl: pr32
            },
        ]
    },
    {
        id: 9,
        imageUrl: pr6,
        size: "XS, S, M",
        title: "Cluse La Boheme Rose Gold",
        del: "$60.00",
        price: "$45.00",
        colors: [
            {
                color: "bg_color_green",
                imageUrl: pr7
            },
            {
                color: "bg-body-secondary",
                imageUrl: pr8
            },
            {
                color: "bg_color_blue",
                imageUrl: pr9
            },
        ]
    },
    {
        id: 10,
        imageUrl: pro1,
        hoverImageUrl: pro2,
        size: "S, M, L",
        title: "Short Sleeved Hoodie",
        price: "$50.00"
    },
    {
        id: 11,
        imageUrl: pr01,
        title: "Chill Candle",
        price: "$16.00"
    },
    {
        id: 12,
        imageUrl: pr47,
        title: "Sport Sneaker",
        price: "$35.00"
    },
]


const WishlistData = [
    {
        id: 1,
        imageUrl: pr1,
        hoverImageUrl: pr2,
        size: "XS, S, M, L, XL",
        label: "New",
        labelClass: "bg-success",
        title: "Analogue Resin Strap",
        price: "$30.00",
    },
    {
        id: 2,
        imageUrl: pr27,
        hoverImageUrl: pr28,
        label: "-34%",
        labelClass: "bg-danger",
        title: "La Bohème Rose Gold",
        del: "$60.00",
        price: "$40.00",
        colors: [
            {
                color: "bg_color_pink",
                imageUrl: pr27
            },
            {
                color: "bg-black",
                imageUrl: pr35
            },
        ]
    },
    {
        id: 3,
        imageUrl: pr33,
        hoverImageUrl: pr34,
        size: "S, M, L",
        title: "Ridley High Waist",
        price: "$36.00",
    },
    {
        id: 4,
        imageUrl: pr18,
        hoverImageUrl: pr17,
        size: "S, M, L",
        title: "Cream Women Pants",
        price: "$35.00",
    },
    {
        id: 5,
        imageUrl: pr11,
        size: "S, M, L",
        title: "Women Black Pants",
        price: "$100.00",
    },
    {
        id: 6,
        imageUrl: pr33,
        hoverImageUrl: pr34,
        size: "S, M, L",
        title: "La Bohème Rose Gold",
        del: "$60.00 ",
        price: "$40.00",
        colors: [
            {
                color: "bg_color_black",
                imageUrl: pr33
            },
            {
                color: "bg-black",
                imageUrl: pr34
            },
        ]
    },
    {
        id: 7,
        imageUrl: pr15,
        hoverImageUrl: pr14,
        title: "Mercury Tee",
        price: "$68.00",
        color: [
            {
                pic: pr15,
                imageUrl: pr15
            },
            {
                pic: pr14,
                imageUrl: pr14
            }
        ]
    },
    {
        id: 8,
        imageUrl: pr4,
        size: "S, M, L",
        title: "Blush Beanie",
        price: "$15.00",
        colors: [
            {
                color: "bg-body",
                imageUrl: pr5
            },
            {
                color: "bg_color_pink",
                imageUrl: pr31
            },
            {
                color: "bg-dark",
                imageUrl: pr32
            },
        ]
    },
    {
        id: 9,
        imageUrl: pr6,
        size: "XS, S, M",
        title: "La Bohème Rose Gold",
        del: "$60.00",
        price: "$45.00",
        colors: [
            {
                color: "bg-green2",
                imageUrl: pr7
            },
            {
                color: "bg-sea",
                imageUrl: pr8
            },
            {
                color: "bg-blue-dark",
                imageUrl: pr9
            },
        ]
    },
    {
        id: 10,
        imageUrl: pro1,
        hoverImageUrl: pro2,
        size: "S, M, L",
        title: "Short Sleeved Hoodie",
        price: "$50.00"
    },
    {
        id: 11,
        imageUrl: pr01,
        title: "Chill Candle",
        price: "$16.00"
    },
    {
        id: 12,
        imageUrl: pr47,
        title: "Sport Sneaker",
        price: "$35.00"
    },
]

export { ProductData, WishlistData };