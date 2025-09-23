import {useEffect, useMemo, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";

import ProductItem from "../Product/ProductItem";
import getSalesData from "../../../api/get_sales";
import {useConfig} from "../../../config/configContext";

/**
 * Props:
 *  - count?: número de produtos a mostrar (default: do config ou 4)
 */
export default function RandomProductList({count}) {
    const cfg = useConfig();
    const rp = cfg?.RandomProducts || {}; // { textColor?: string }
    const pl = cfg?.ProductList || {};    // podes reutilizar setas do ProductList se quiseres

    // quantos produtos apresentar
    const total = useMemo(() => {
        if (typeof count === "number" && count > 0) return count;
        if (typeof rp.count === "number" && rp.count > 0) return rp.count;
        return 4;
    }, [count, rp.count]);

    // estilos (com fallbacks seguros)
    const textColor = rp.textColor || "#000000";
    const arrowBg = pl.arrowBgColor || "#fa3a3a";
    const arrowText = pl.arrowTextColor || "#ffffff";

    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const {products: all} = await getSalesData();
            if (Array.isArray(all) && all.length) {
                const shuffled = [...all].sort(() => 0.5 - Math.random());
                setProducts(shuffled.slice(0, total));
            } else {
                setProducts([]);
            }
        })();
    }, [total]);

    if (!products.length) {
        return <p className="text-center text-gray-600 mt-6">Nenhum produto encontrado.</p>;
    }

    return (
        <div className="container mx-auto mt-[-60px] px-4">
            <div className="relative">
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

                {/* Prev */}
                <button
                    className="swiper-button-prev-custom absolute top-1/2 -left-10 -translate-y-1/2 rounded-md py-2 px-2 text-3xl transition hover:scale-105 z-10"
                    style={{backgroundColor: arrowBg, color: arrowText}}
                    aria-label="Anterior"
                >
                    <MdArrowBackIos/>
                </button>

                {/* Next */}
                <button
                    className="swiper-button-next-custom absolute top-1/2 -right-10 -translate-y-1/2 rounded-md py-2 px-2 text-3xl transition hover:scale-105 z-10"
                    style={{backgroundColor: arrowBg, color: arrowText}}
                    aria-label="Seguinte"
                >
                    <MdArrowForwardIos/>
                </button>
            </div>

            {/* opcional, se quiseres um título/linha de cor herdado do config */}
            <div className="mt-4 text-center" style={{color: textColor}}>
                {/* Ex.: <span>Recomendações para ti</span> */}
            </div>
        </div>
    );
}
