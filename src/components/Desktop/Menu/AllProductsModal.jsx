// src/components/Desktop/Menu/AllProductsModal.jsx
import {useState, useRef} from "react";
import ProductItem from "../Product/ProductItem";
import {useConfig} from "../../../config/configContext";

export default function AllProductsModal({products, onClose}) {
    const cfg = useConfig();
    const ui = cfg?.AllProducts || {}; // bg, titleColor, icon
    const [iframeProducts, setIframeProducts] = useState(products.slice(0, 12));
    const iframeContainerRef = useRef(null);

    const loadMore = () => {
        if (iframeProducts.length < products.length) {
            const next = products.slice(iframeProducts.length, iframeProducts.length + 12);
            setIframeProducts((prev) => [...prev, ...next]);
        }
    };

    const handleScroll = () => {
        const el = iframeContainerRef.current;
        if (el && el.scrollTop + el.clientHeight >= el.scrollHeight) loadMore();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div
                className="p-8 w-11/12 sm:w-3/4 md:w-2/3 relative max-h-[95vh] overflow-y-auto"
                style={{backgroundColor: ui.bg || "#ffffff"}}
            >
                <button
                    className="absolute top-4 right-4 text-gray-200 hover:text-white text-3xl font-bold"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    &times;
                </button>

                <h2
                    className="text-center text-3xl font-bold mb-4"
                    style={{color: ui.titleColor || "#000000"}}
                >
                    Todos os Produtos {ui.icon || "🎁"}
                </h2>

                <div
                    ref={iframeContainerRef}
                    onScroll={handleScroll}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto"
                >
                    {iframeProducts.map((product) => (
                        <div key={product.id_product} className="mb-4">
                            <ProductItem product={product}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
