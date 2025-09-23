import React from "react";

const ProductItemBanner = ({ product }) => {
  // Ensure discount percentage is rounded down to the nearest integer
  const discountPercentage = Math.floor(product.discount_percentage || 0);

  // Format price and price_without_reduction to always show 2 decimal places
  const formattedPrice = product.price
    ? parseFloat(product.price).toFixed(2)
    : null;
  const formattedPriceWithoutReduction = product.price_without_reduction
    ? parseFloat(product.price_without_reduction).toFixed(2)
    : null;

  return (
    <div
      className="relative bg-white rounded-lg  overflow-hidden flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg my-2"
      role="article"
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-full shadow-md z-50">
          -{discountPercentage}%
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-40 sm:h-48 flex items-center justify-center overflow-hidden">
        <img
          loading="lazy"
          className="object-contain w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name || "Product"}
          onClick={() => window.open(product.link, "_blank")}
        />
      </div>

      {/* Product Details */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Title */}
        <div
          className="text-gray-900 font-semibold text-base sm:text-lg mb-2 text-center uppercase cursor-pointer hover:text-blue-600 transition-colors duration-300 overflow-hidden text-ellipsis"
          style={{
            height: "48px", // Adjusted height for better fit on mobile
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          onClick={() => window.open(product.link, "_blank")}
        >
          {product.name}
        </div>

        {/* Price Information */}
        <div className="w-full flex flex-col items-center justify-center space-y-1 mb-3">
          {/* Sale Price */}
          <h1 className="text-xl font-bold text-red-500">
            {formattedPrice ? `${formattedPrice}€` : "Price Unavailable"}
          </h1>

          {/* Original Price (if available) */}
          {formattedPriceWithoutReduction && (
            <h3 className="text-sm font-medium text-gray-500 line-through">
              {`${formattedPriceWithoutReduction}€`}
            </h3>
          )}
        </div>

        {/* Buy Button */}
        <div className="mt-auto">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={product.link}
            className="inline-block w-full text-center font-semibold uppercase px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Comprar
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItemBanner;
