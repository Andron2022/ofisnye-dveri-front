import pr1 from "@assets/images/home-bags/pr-01.jpg"
import pr2 from "@assets/images/home-bags/pr-02.jpg"
import pr3 from "@assets/images/home-bags/pr-03.jpg"
import pr4 from "@assets/images/home-bags/pr-04.jpg"
import pr5 from "@assets/images/home-bags/pr-05.jpg"
import pr7 from "@assets/images/home-bags/pr-07.jpg"
import pr8 from "@assets/images/home-bags/pr-08.jpg"
import pr13 from "@assets/images/home-bags/pr-13.jpg"
import pr14 from "@assets/images/home-bags/pr-14.jpg"


const salesSwiperBag = [
    {
        id: 1,
        imageUrl: pr1,
        hoverImageUrl: pr2,
        title: "Tactical Bags",
        price: "$51.00 - $57.00",
        productDetailLink: "/product-detail-layout-01",
        colorOptions: [
            {
                color: "bg_color_blue",
                imageUrl: pr14
            },
            {
                color: "bg_color_green",
                imageUrl: pr1
            },
            {
                color: "bg-success",
                imageUrl: pr2
            },
            {
                color: "bg-dark",
                imageUrl: pr13
            }
        ]
    },
    {
        id: 2,
        imageUrl: pr3,
        hoverImageUrl: pr4,
        title: "Crumpler The Drewbob 200",
        price: "$79.00",
        productDetailLink: "/product-detail-layout-01"
    },
    {
        id: 3,
        imageUrl: pr5,
        hoverImageUrl: pr5,
        title: "Crumpler Rooftop Resume",
        price: "$189.00",
        productDetailLink: "/product-detail-layout-01"
    },
    {
        id: 4,
        imageUrl: pr7,
        hoverImageUrl: pr8,
        title: "Crumpler Big Breakfast Tote",
        price: "$199.00",
        productDetailLink: "/product-detail-layout-01"
    },
    {
        id: 5,
        imageUrl: pr3,
        hoverImageUrl: pr4,
        title: "Crumpler The Drewbob 200",
        price: "$79.00",
        productDetailLink: "/product-detail-layout-01"
    },
    {
        id: 6,
        imageUrl: pr5,
        hoverImageUrl: pr5,
        title: "Crumpler Rooftop Resume",
        price: "$189.00",
        productDetailLink: "/product-detail-layout-01"
    }
]

export { salesSwiperBag }