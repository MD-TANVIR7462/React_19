"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, memo } from "react";
import { LoaderIcon, ShoppingCart, Package, Ruler, ChevronDown, ChevronUp } from "lucide-react";
import BrokenSvg from "../../Svg/BrokenSvg";
import { Button } from "@/components/ui/button";

const BookViewCard = ({ product, onAddToCart }) => {
  const [imageStatus, setImageStatus] = useState({ loading: true, error: false });
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ ...product, quantity });
    }
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-md lg:shadow-lg overflow-hidden max-w-5xl mx-auto  cursor-grab">
      <div className="grid lg:grid-cols-3 gap-6 p-2 sm:p-3 md:p-4 ">
        {/* ✅ Product Image Section with overlay controls */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden lg:col-span-2">
          {imageStatus.loading && !imageStatus.error && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-100">
              <LoaderIcon className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          )}
          {imageStatus.error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-red-500">
              <BrokenSvg />
              <div className="text-red-500 animate-pulse font-semibold">Broken</div>
            </div>
          )}

          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full max-h-[600px] object-contain"
            loading="lazy"
            decoding="async"
            onLoad={() => setImageStatus({ loading: false, error: false })}
            onError={() => setImageStatus({ loading: false, error: true })}
          />

          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
              -{product.discount}%
            </div>
          )}

          {/* 🛒 Add to Cart Controls Overlay */}
        </div>
        {/* ✅ Product Info Section */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-row lg:flex-col justify-between">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 capitalize">{product.name}</h2>

              <div className="flex items-center gap-3 mb-3 ">
                <span className="text-md sm:text-xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
            <div className="flex flex-row md:items-center  lg:justify-between gap-3  border-t py-2">
              <div className="flex items-center border border-gray-300 rounded-md bg-white w-fit">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-4 py-2 text-gray-800 font-medium min-w-[2.5rem] text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md text-sm md:text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
            {/* Description Dropdown */}
            <div className="border-t border-gray-200  lg:pt-2">
              <button
                onClick={() => setIsDescriptionOpen((p) => !p)}
                className="flex justify-between items-center w-full py-2"
              >
                <h3 className="font-semibold text-gray-800 text-md  sm:text-lg">Description</h3>
                {isDescriptionOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <AnimatePresence>
                {isDescriptionOpen && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-gray-600 text-sm leading-relaxed"
                  >
                    {product.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Product Details Dropdown */}
            <div className="border-t border-gray-200 lg:pt-2 lg:mt-2">
              <button
                onClick={() => setIsDetailsOpen((p) => !p)}
                className="flex justify-between items-center w-full py-2"
              >
                <h3 className="font-semibold text-gray-800 text-md sm:text-xl">Product Details</h3>
                {isDetailsOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <AnimatePresence>
                {isDetailsOpen && (
                  <motion.div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-orange-500/80" />
                      <span>
                        <strong>Product Code:</strong> {product.code}
                      </span>
                    </div>
                    {product.sizes && (
                      <div className="flex items-center gap-3">
                        <Ruler className="w-5 h-5 text-orange-500/80" />
                        <span>
                          <strong>Dimensions:</strong> {product.sizes}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BookViewCard);
