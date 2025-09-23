// src/components/Desktop/Product/ProductList.jsx
import ProductItem from "./ProductItem";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import {useConfig} from "../../../config/configContext";

export default function ProductList({title, products}) {
    const cfg = useConfig();
    const ui = cfg?.ProductList || {};
    const titleColor = ui.titleColor || "#000000";
    const arrowBg = ui.arrowBg || ui.arrowBgColor || "#fa3a3a";
    const arrowText = ui.arrowText || ui.arrowTextColor || "#ffffff";

    return (
        <div className="py-8 container mx-auto">
            {title ? (
                <h2 className="text-3xl font-bold text-center uppercase">
                    <span style={{color: titleColor}}>{title}</span>
                </h2>
            ) : null}

            {products.length > 0 ? (
                <div className="relative mt-8">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation={{
                            nextEl: ".swiper-button-next-custom",
                            prevEl: ".swiper-button-prev-custom",
                        }}
                        loop
                        breakpoints={{
                            640: {slidesPerView: 1},
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

                    <button
                        className="swiper-button-prev-custom absolute top-1/2 -left-10 -translate-y-1/2 rounded-md py-2 px-2 text-3xl z-10 hover:scale-105"
                        style={{backgroundColor: arrowBg, color: arrowText}}
                        aria-label="Anterior"
                    >
                        <MdArrowBackIos/>
                    </button>

                    <button
                        className="swiper-button-next-custom absolute top-1/2 -right-10 -translate-y-1/2 rounded-md py-2 px-2 text-3xl z-10 hover:scale-105"
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
