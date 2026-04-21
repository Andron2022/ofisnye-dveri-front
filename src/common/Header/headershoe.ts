import pr3 from "@assets/images/home-shoes/pr-03.jpg"
import pr4 from "@assets/images/home-shoes/pr-04.jpg"
import pr13 from "@assets/images/home-shoes/pr-13.jpg"
import pr15 from "@assets/images/home-shoes/pr-15.jpg"

const shoeSwiper = [
    {
        imageUrl: pr4,
        hoverImageUrl: pr13,
        productName: "Adidas Zapatillas Calcetin",
        price: "$122.00",
    },
    {
        imageUrl: pr3,
        hoverImageUrl: pr4,
        productName: "Deluxe Brand Uomo Slide Hi Tops",
        price: "$452.00",
        discount: "-29%"
    },
    {
        imageUrl: pr15,
        hoverImageUrl: pr15,
        productName: "Deluxe Brand Donna Super Star Scarpe",
        price: "$52.00",
    },
    {
        imageUrl: pr13,
        hoverImageUrl: pr3,
        productName: "Gold Foil Chunky Leather Sneakers",
        price: "$309.00"
    },
    {
        imageUrl: pr3,
        hoverImageUrl: pr4,
        productName: "Deluxe Brand Uomo Slide Hi Tops",
        price: "$452.00",
        originalPrice: "$635.00",
        discount: "-29%"
    },
    {
        imageUrl: pr15,
        hoverImageUrl: pr15,
        productName: "Deluxe Brand Donna Super Star Scarpe",
        price: "$52.00",
        sizes: ["40", "41", "42", "43", "44", "45"]
    }
]

export { shoeSwiper }