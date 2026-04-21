import pr1 from "@assets/images/home-shoes/pr-01.jpg"
import pr2 from "@assets/images/home-shoes/pr-02.jpg"
import pr3 from "@assets/images/home-shoes/pr-03.jpg"
import pr4 from "@assets/images/home-shoes/pr-04.jpg"
import pr5 from "@assets/images/home-shoes/pr-05.jpg"
import pr6 from "@assets/images/home-shoes/pr-06.jpg"
import pr7 from "@assets/images/home-shoes/pr-07.jpg"
import pr8 from "@assets/images/home-shoes/pr-08.jpg"
import pr9 from "@assets/images/home-shoes/pr-09.jpg"
import pr10 from "@assets/images/home-shoes/pr-10.jpg"
import pr11 from "@assets/images/home-shoes/pr-11.jpg"
import pr12 from "@assets/images/home-shoes/pr-12.jpg"
import pr13 from "@assets/images/home-shoes/pr-13.jpg"
import pr14 from "@assets/images/home-shoes/pr-14.jpg"
import pr15 from "@assets/images/home-shoes/pr-15.jpg"
import pr16 from "@assets/images/home-shoes/pr-16.jpg"
import pr17 from "@assets/images/home-shoes/pr-17.jpg"
import pr18 from "@assets/images/home-shoes/pr-18.jpg"
import pr19 from "@assets/images/home-shoes/pr-19.jpg"
import pr20 from "@assets/images/home-shoes/pr-20.jpg"
import pr21 from "@assets/images/home-shoes/pr-21.jpg"

const tabsection = [
    {
        id: 1,
        imageUrl: pr4,
        hoverImageUrl: pr13,
        title: "Adidas Zapatillas Calcetin",
        price: "$122.00",
    },
    {
        id: 2,
        imageUrl: pr3,
        hoverImageUrl: pr4,
        title: "Deluxe Brand Uomo Slide Hi Tops",
        price: "$452.00",
        originalPrice: "$635.00",
        discount: "29%",
    },
    {
        id: 3,
        imageUrl: pr15,
        hoverImageUrl: pr15,
        title: "Deluxe Brand Donna Super Star Scarpe",
        price: "$52.00",
        sizes: ["40", "41", "42", "43", "44", "45"],
        colors: [
            { color: "bg-warning-subtle", imageUrl: pr14 },
            { color: "bg-dark", imageUrl: pr15 }
        ]
    },
    {
        id: 4,
        imageUrl: pr13,
        hoverImageUrl: pr3,
        title: "Gold Foil Chunky Leather Sneakers",
        price: "$309.00",
    },
    {
        id: 5,
        title: "Vans Classic Slip-on Shoes",
        price: "$99.00",
        originalPrice: "$149.00",
        imageUrl: pr16,
        hoverImageUrl: pr17,
        discount: "34%",
    },
    {
        id: 6,
        title: "Adidas Copa Primeknit Sneakers",
        price: "$289.00",
        imageUrl: pr18,
        hoverImageUrl: pr16,
    },
    {
        id: 7,
        title: "Premiata Hattori Sneakers",
        price: "$289.00",
        imageUrl: pr19,
        hoverImageUrl: pr18,
    },
    {
        id: 8,
        title: "Urban Street Reverse Logo Sneakers",
        price: "$299.00",
        imageUrl: pr20,
        hoverImageUrl: pr1,
    },
    {
        id: 9,
        imageUrl: pr21,
        hoverImageUrl: pr20,
        title: "Givenchy Paris Strap Sneakers",
        price: "$237.00",
    },
    {
        id: 10,
        imageUrl: pr6,
        hoverImageUrl: pr21,
        title: "Saint Laurent Classic Embroidered Sneakers",
        price: "$347.00",
    },
    {
        id: 11,
        imageUrl: pr1,
        hoverImageUrl: pr2,
        title: "Givenchy Logo Print Low-top Sneakers",
        price: "$152.00",
    },
    {
        id: 12,
        imageUrl: pr5,
        hoverImageUrl: pr6,
        title: "Sperry Men's 2-Eye Boat Shoes",
        price: "$52.00",
    },
    {
        id: 13,
        imageUrl: pr7,
        hoverImageUrl: pr8,
        title: "Birkenstock Boston Suede",
        price: "$46.00",
    },
    {
        id: 14,
        imageUrl: pr9,
        hoverImageUrl: pr10,
        title: "Adidas Gazelle Yellow Collegiate Gold",
        price: "$136.00",
    },
    {
        id: 15,
        imageUrl: pr11,
        hoverImageUrl: pr12,
        title: "Uomo Verde – Converse Utility Sneakers",
        price: "$188.00",
        originalPrice: "$222.00",
    }
]

const firstTab = [
    {
        title: "Adidas Zapatillas Calcetin",
        price: "$122.00",
        images: {
            default: pr4,
            hover: pr13
        },
    },
    {
        title: "Gold Foil Chunky Leather Sneakers",
        price: "$52.00",
        images: {
            default: pr3,
            hover: pr4
        },
        discount: "-29%",
    },
    {
        title: "Deluxe Brand Donna Super Star Scarpe",
        price: "$52.00",
        images: {
            default: pr15,
            hover: pr16
        },
    },
    {
        title: "Gold Foil Chunky Leather Sneakers",
        price: "$500.00",
        images: {
            default: pr13,
            hover: pr14
        },
    },
    {
        title: "Adidas Zapatillas Calcetin",
        price: "$122.00",
        images: {
            default: pr4,
            hover: pr13
        },
    },
    {
        title: "Gold Foil Chunky Leather Sneakers",
        price: "$52.00",
        images: {
            default: pr3,
            hover: pr4
        },
        discount: "-29%",
    },
    {
        title: "Deluxe Brand Donna Super Star Scarpe",
        price: "$52.00",
        images: {
            default: pr15,
            hover: pr16
        },
    },
    {
        title: "Gold Foil Chunky Leather Sneakers",
        price: "$500.00",
        images: {
            default: pr13,
            hover: pr14
        },
    }
]

export { tabsection, firstTab }