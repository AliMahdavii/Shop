export const superOfferProducts = [
    {
        name: " کاپشن زنانه Toronto ",
        price: 4340000,
        percent: 40,
        mainImage: "images/5/IMG_1933.AVIF",
        gallery: [
            "images/5/IMG_1934.AVIF",
            "images/5/IMG_1935.AVIF"
        ],
        stars: 5,
        id: "5"
    }
];

superOfferProducts.forEach(p => {
    p.discountPrice = p.price * (1-p.percent/100);
});

export default superOfferProducts;