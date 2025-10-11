"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Package,
  Ruler,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal/Modal";
import Thumbnail from "./Thumnail";
import ProductImage from "./ProductImage";

const ProductModal = ({ product, isOpen, onClose }) => {
  //!we can take one more onAddtoCart here.

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setCurrentImageIndex(0);
      setIsDescriptionOpen(false);
      setIsDetailsOpen(false);
      setQuantity(1);
    }
  }, [isOpen]);

  if (!product) return null;

  const hasMultipleImages = useMemo(() => product.images?.length > 1, [product]);

  const handleNext = useCallback(
    () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length),
    [product.images.length]
  );

  const handlePrev = useCallback(
    () => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length),
    [product.images.length]
  );

  const stockLabel = useMemo(() => {
    if (product.stock > 50) return "bg-green-100 text-green-700";
    if (product.stock > 20) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  }, [product.stock]);

  // Handle quantity changes
  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Unified add to cart function
  const handleAddToCart = (product) => {
    // if (onAddToCart) {
    //   onAddToCart({ ...product, quantity });
    // }
    onClose();
    console.log(product,quantity);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name} width="max-w-4xl" color="bg-white">
      <div className="grid lg:grid-cols-5 lg:gap-6">
        {/* 🖼 Image Gallery */}
        <div className="relative lg:col-span-3">
          <div className="relative bg-gray-100 rounded-sm overflow-hidden">
            <AnimatePresence mode="wait">
              <ProductImage
                key={currentImageIndex}
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full mx-auto max-h-[400px]"
                callForm="swiper"
              />
            </AnimatePresence>

            {hasMultipleImages && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {hasMultipleImages && (
            <>
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <Thumbnail
                    key={i}
                    image={img}
                    index={i}
                    isActive={i === currentImageIndex}
                    onClick={setCurrentImageIndex}
                  />
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImageIndex ? "bg-orange-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 🛒 Product Info */}
        <div className="space-y-2 md:space-y-4 lg:space-y-6 lg:col-span-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-orange-500/80">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  -{product.discount}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm mb-4">
              <span className={`px-2 py-1 rounded ${stockLabel}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{product.category}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex gap-4">
              <div className="flex items-center border border-gray-300 rounded-sm bg-white w-fit">
                <button
                  onClick={decreaseQuantity}
                  className="px-2 md:px-3 py-1 md:py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-150 rounded-l-sm cursor-pointer"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-2 md:px-3 py-1 md:py-2 text-sm font-medium text-gray-800 min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-2 md:px-3 py-1 md:py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-150 rounded-r-sm cursor-pointer"
                >
                  +
                </button>
              </div>
              <Button
                className=" bg-orange-500 hover:bg-orange-600/90 rounded-sm text-white md:py-6 py-5  md:text-lg"
                disabled={product.stock === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product)
                }}
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>

          {/* Description Dropdown */}
          <div className="border-t pt-2">
            <button
              onClick={() => setIsDescriptionOpen((prev) => !prev)}
              className="w-full flex justify-between items-center py-2 text-left"
            >
              <h3 className="font-semibold text-lg">Description</h3>
              {isDescriptionOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {isDescriptionOpen && <p className="text-gray-400 text-sm mt-1">{product.description}</p>}
          </div>

          {/* Product Details Dropdown */}
          <div className="border-t py-2">
            <button
              onClick={() => setIsDetailsOpen((prev) => !prev)}
              className="w-full flex justify-between items-center py-2 text-left"
            >
              <h3 className="font-semibold text-lg">Product Details</h3>
              {isDetailsOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {isDetailsOpen && (
              <div className="mt-1 space-y-3">
                <div className="flex gap-8 items-center">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-orange-500/80 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-200">Product Code</p>
                      <p className="text-gray-400 text-sm">{product.code}</p>
                    </div>
                  </div>

                  {product.sizes && (
                    <div className="flex items-start gap-3">
                      <Ruler className="w-5 h-5 text-orange-500/80 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-200">Dimensions</p>
                        <p className="text-gray-400 text-sm">{product.sizes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(ProductModal);
