// src/components/Desktop/Product/ProductItem.jsx
import { useState } from "react";
import { useConfig } from "../../../config/configContext";

export default function ProductItem({ product }) {
  const cfg = useConfig();
  const ui = cfg?.ProductItem || {};
  const [hover, setHover] = useState(false);

  const discountPercentage = Math.floor(product.discount_percentage || 0);
  const formattedPrice = product.price
    ? parseFloat(product.price).toFixed(2)
    : null;
  const formattedBase = product.price_without_reduction
    ? parseFloat(product.price_without_reduction).toFixed(2)
    : null;

  const btnStyle = {
    color: ui.btnText || "#ffffff",
    backgroundColor: hover ? ui.btnBgHover || "#ff1409" : ui.btnBg || "#fa3a3a",
  };

  return (
    <div className="relative max-w-sm bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-md my-4">
      {discountPercentage > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-full shadow-md">
          -{discountPercentage}%
        </div>
      )}

      <div className="w-full h-48 overflow-hidden">
        <img
          className="object-contain w-full h-full transition-transform duration-300 hover:scale-110 cursor-pointer"
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name || "Product"}
          onClick={() => window.open(product.link, "_blank")}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div
          className="text-zinc-900 font-semibold text-lg mb-4 text-center uppercase overflow-hidden text-ellipsis"
          style={{
            height: "60px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          onClick={() => window.open(product.link, "_blank")}
        >
          {product.name}
        </div>

        <div className="w-full flex flex-col items-center justify-center space-y-1">
          <h1 className="text-2xl font-bold text-red-500">
            {formattedPrice ? `${formattedPrice}€` : "Preço indisponível"}
          </h1>
          {formattedBase && (
            <h3 className="text-lg font-medium text-gray-500 line-through">{`${formattedBase}€`}</h3>
          )}
        </div>

        <div
          className="mt-auto"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href={product.link}
            className="inline-block w-full text-center font-semibold uppercase mt-4 px-6 py-3 rounded-full transition-colors duration-300"
            style={btnStyle}
          >
            Comprar {ui.icon || "🎁"}
          </a>
        </div>
      </div>
    </div>
  );
}
