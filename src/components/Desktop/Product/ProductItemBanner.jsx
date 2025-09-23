// src/components/Desktop/Product/ProductItemBanner.jsx
import {useState} from "react";
import {useConfig} from "../../../config/configContext";

export default function ProductItemBanner({product}) {
    const cfg = useConfig();
    const ui = cfg?.ProductItem || {}; // vem do adapter (ProductItem.*)

    const discountPercentage = Math.floor(product.discount_percentage || 0);
    const [hover, setHover] = useState(false);

    const btnBg = hover ? (ui.btnBgHover || ui.btnComprarBgColorHover) : (ui.btnBg || ui.btnComprarBgColor);
    const btnFg = ui.btnText || ui.btnComprarTextColor;
    const icon = ui.icon || "🎁";

    const formattedPrice = product.price ? parseFloat(product.price).toFixed(2) : null;
    const formattedPriceWithoutReduction = product.price_without_reduction
        ? parseFloat(product.price_without_reduction).toFixed(2)
        : null;

    return (
        <div
            className="relative bg-white rounded-lg overflow-hidden flex flex-col transition-transform duration-300 ease-in-out flex-grow w-full md:w-1/3 hover:scale-105">
            {/* Desconto */}
            {discountPercentage > 0 && (
                <div
                    className="absolute top-2 right-2 bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded-full z-50">
                    -{discountPercentage}%
                </div>
            )}

            {/* Imagem */}
            <div className="w-full h-60 bg-white flex items-center justify-center overflow-hidden">
                <img
                    className="object-contain w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                    src={product.image || "https://via.placeholder.com/300"}
                    alt={product.name || "Product"}
                    onClick={() => window.open(product.link, "_blank")}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300";
                    }}
                />
            </div>

            {/* Detalhes */}
            <div className="p-6 flex flex-col flex-grow">
                <div
                    className="z-50 text-zinc-900 font-semibold text-lg mb-4 text-center uppercase cursor-pointer hover:text-blue-600 transition-colors duration-300 overflow-hidden text-ellipsis"
                    style={{
                        height: "60px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                    onClick={() => window.open(product.link, "_blank")}
                >
                    {product.name || "Product Name"}
                </div>

                {/* Preços */}
                <div className="w-full flex flex-col items-center justify-center space-y-1 mb-4">
                    <h1 className="text-2xl font-bold text-red-500">
                        {formattedPrice ? `${formattedPrice}€` : "Preço indisponível"}
                    </h1>
                    {formattedPriceWithoutReduction && (
                        <h3 className="text-lg font-medium text-gray-500 line-through">{`${formattedPriceWithoutReduction}€`}</h3>
                    )}
                </div>

                {/* Botão */}
                <div className="mt-auto" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <a
                        target="_blank"
                        href={product.link}
                        className="inline-block w-full text-center font-semibold uppercase mt-4 px-6 py-3 rounded-full transition-colors duration-300"
                        style={{backgroundColor: btnBg || "#fa3a3a", color: btnFg || "#ffffff"}}
                    >
                        Comprar {icon}
                    </a>
                </div>
            </div>
        </div>
    );
}
