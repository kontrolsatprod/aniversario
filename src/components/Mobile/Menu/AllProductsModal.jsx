import {useState, useRef, useEffect} from "react";
import {useConfig} from "../../../config/configContext.jsx";
import ProductItem from "../Product/ProductItem";

const PRODUCTS_PER_LOAD = 12;

export default function AllProductsModal({products, onClose}) {
    const cfg = useConfig() || {};
    const modalCfg = cfg.AllProductsModalConfig || {};
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const modalContentRef = useRef(null);

    useEffect(() => {
        setVisibleProducts((products || []).slice(0, PRODUCTS_PER_LOAD));
    }, [products]);

    const loadMoreProducts = () => {
        if (isLoading) return;
        if (visibleProducts.length >= (products?.length || 0)) return;
        setIsLoading(true);
        setTimeout(() => {
            const next = products.slice(visibleProducts.length, visibleProducts.length + PRODUCTS_PER_LOAD);
            setVisibleProducts((prev) => [...prev, ...next]);
            setIsLoading(false);
        }, 400);
    };

    const handleScroll = () => {
        const el = modalContentRef.current;
        if (!el) return;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
            loadMoreProducts();
        }
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true"
             onClick={onClose}>
            <div
                className="w-11/12 sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 rounded-lg shadow-lg relative max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
                style={{backgroundColor: modalCfg.bgColor || "#fff"}}
            >
                <div className="flex justify-between items-center px-4 py-2">
                    <h2 className="text-2xl font-bold" style={{color: modalCfg.titleColor || "#000"}}>
                        {modalCfg.titleText || "Todos os Produtos"} {modalCfg.icon || "🎁"}
                    </h2>
                    <button className="text-gray-500 text-2xl font-bold" onClick={onClose} aria-label="Fechar">
                        &times;
                    </button>
                </div>

                <div
                    ref={modalContentRef}
                    onScroll={handleScroll}
                    className="p-4 grid grid-cols-2 gap-4 flex-1 overflow-y-auto"
                >
                    {visibleProducts.map((p) => (
                        <div key={p.id_product} className="mb-4">
                            <ProductItem product={p}/>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="col-span-2 flex justify-center items-center py-4">
                            <svg className="animate-spin h-6 w-6 text-green-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                            </svg>
                        </div>
                    )}

                    {!isLoading && !visibleProducts.length && (
                        <div className="col-span-2 text-center text-gray-500">Nenhum produto encontrado.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
