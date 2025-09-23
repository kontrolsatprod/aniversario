// src/components/Mobile/Product/ProductList.jsx
import ProductItem from "./ProductItem";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {useConfig} from "../../../config/configContext.jsx";

export default function ProductList({title, products = []}) {
    const cfg = useConfig();
    // compat: aceita ProductList OU ProductListConfig
    const ui = cfg?.ProductList || cfg?.ProductListConfig || {};
    const titleColor = ui.titleColor || "#000000";
    const arrowBg = ui.arrowBg || ui.arrowBgColor || "#fa3a3a";
    const arrowText = ui.arrowText || ui.arrowTextColor || "#ffffff";

    return (
        <div className="py-8 container mx-auto">
            {title ? (
                <h2 className="text-2xl md:text-3xl font-bold text-center uppercase">
                    <span style={{color: titleColor}}>{title}</span>
                </h2>
            ) : null}

            {products.length > 0 ? (
                <div className="relative mt-6">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={1}
                        navigation={{
                            nextEl: ".swiper-button-next-custom",
                            prevEl: ".swiper-button-prev-custom",
                        }}
                        loop
                        breakpoints={{
                            480: {slidesPerView: 2},
                            768: {slidesPerView: 2},
                            1024: {slidesPerView: 4},
                        }}
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id_product} className="flex justify-center">
                                <ProductItem product={product}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Prev */}
                    <button
                        className="swiper-button-prev-custom absolute top-1/2 -left-3 md:-left-6 -translate-y-1/2 rounded-md py-2 px-2 text-2xl md:text-3xl z-10 hover:scale-105"
                        style={{backgroundColor: arrowBg, color: arrowText}}
                        aria-label="Anterior"
                    >
                        <MdArrowBackIos/>
                    </button>

                    {/* Next */}
                    <button
                        className="swiper-button-next-custom absolute top-1/2 -right-3 md:-right-6 -translate-y-1/2 rounded-md py-2 px-2 text-2xl md:text-3xl z-10 hover:scale-105"
                        style={{backgroundColor: arrowBg, color: arrowText}}
                        aria-label="Seguinte"
                    >
                        <MdArrowForwardIos/>
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-6">Nenhum produto encontrado.</p>
            )}
        </div>
    );
}
