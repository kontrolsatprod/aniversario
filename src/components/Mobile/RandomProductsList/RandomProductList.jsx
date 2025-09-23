// src/components/RandomProductList.js

import {useState, useEffect} from "react";
import getSalesData from "../../../api/get_sales";
import ProductItem from "../Product/ProductItem";

import {Swiper, SwiperSlide} from "swiper/react"; // Import Swiper components
import "swiper/css"; // Swiper styles
import "swiper/css/navigation"; // Navigation styles
import {Navigation} from "swiper/modules"; // Correct module import

import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {RandomProductListConfig} from "../../../api/config.jsx"; // Icons for custom buttons

const RandomProductList = () => {
    const [products, setProducts] = useState([]); // All products

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSalesData();
                const {products} = data;

                // Check if products exist
                if (products && products.length > 0) {
                    // Shuffle the products
                    const shuffled = [...products].sort(() => 0.5 - Math.random());

                    // Optionally, fetch more products for multiple slides
                    // For example, fetch 8 products for 2 slides
                    setProducts(shuffled.slice(0, 4)); // Adjust the number as needed
                }
            } catch (error) {
                console.error("Error fetching sales data:", error);
                // Handle error state if needed
            }
        };

        fetchData();
    }, []);

    // Function to chunk products into groups of 4 (for 2x2 grid per slide)
    const chunkProducts = (products, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < products.length; i += chunkSize) {
            chunks.push(products.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const productChunks = chunkProducts(products, 4); // Chunk the products into groups of 4

    return (
        <div className="container mx-auto px-4 mt-[-20px]">
            {products.length > 0 ? (
                <div className="relative mt-8">
                    {/* Swiper Carousel */}
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1} // 1 slide per view since each slide contains a 2x2 grid
                        navigation={{
                            nextEl: ".swiper-button-next-custom",
                            prevEl: ".swiper-button-prev-custom",
                        }}
                        loop={productChunks.length > 1} // Enable loop only if more than one slide
                        breakpoints={{
                            640: {slidesPerView: 1}, // 1 slide per view on small screens
                            768: {slidesPerView: 1}, // 1 slide per view on medium screens
                            1024: {slidesPerView: 1}, // 1 slide per view on large screens
                        }}
                    >
                        {productChunks.map((chunk, index) => (
                            <SwiperSlide key={index} className="flex justify-center">
                                <div className="grid grid-cols-2 gap-6 w-full">
                                    {chunk.map((product) => (
                                        <ProductItem key={product.id_product} product={product}/>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-6">
                    Nenhum produto encontrado.
                </p>
            )}
        </div>
    );
};

export default RandomProductList;
