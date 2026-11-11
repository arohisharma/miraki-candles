# Product photos

Drop each product photo in this folder, then set the product's `image` field in
`src/data/products.ts`, for example:

    image: "/products/amber-dusk.jpg",

- Portrait or square photos work best (cards crop to 4:5, the product page to 1:1).
- Aim for about 1600px on the longest side. Next.js resizes and compresses them automatically.
- Products without an `image` keep showing the illustrated candle.
