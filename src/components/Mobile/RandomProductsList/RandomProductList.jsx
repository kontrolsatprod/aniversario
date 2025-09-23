// src/components/Mobile/RandomProductList.jsx
import { useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../config/configContext";
import getSalesData from "../../../api/get_sales";
import ProductItem from "../Product/ProductItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// util: parte em grupos de n
const chunk = (arr, n) => {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
};

export default function RandomProductList({ title }) {
  const cfg = useConfig();
  const ui = cfg?.RandomProducts || {};
  const titleColor = ui.textColor || "#000000";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let abort = false;

    (async () => {
      try {
        const { products: all = [] } = await getSalesData();
        if (abort) return;

        const shuffled = [...all].sort(() => 0.5 - Math.random());
        // mostra 8 para dar 2 slides (2x2 cada)
        setProducts(shuffled.slice(0, 8));
      } catch (e) {
        console.error(e);
        setError("Falha ao carregar produtos.");
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, []);

  const chunks = useMemo(() => chunk(products, 4), [products]);

  if (loading) {
    return (
      <div className="py-8 container mx-auto flex justify-center">
        <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      </div>
    );
  }
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!products.length)
    return (
      <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
    );

  return (
    <div className="container mx-auto px-4 mt-[-12px]">
      {title ? (
        <h2 className="text-2xl font-bold text-center uppercase">
          <span style={{ color: titleColor }}>{title}</span>
        </h2>
      ) : null}

      <div className="relative mt-6">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1} // 1 slide, cada slide contém grelha 2×2
          navigation // botões default do Swiper (opcional)
          loop={chunks.length > 1}
        >
          {chunks.map((group, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                {group.map((p) => (
                  <ProductItem key={p.id_product} product={p} />
                ))}
                {/* se a última página tiver <4 itens, completa a grelha */}
                {group.length < 4 &&
                  Array.from({ length: 4 - group.length }).map((_, i) => (
                    <div key={`empty-${i}`} className="opacity-0" />
                  ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
