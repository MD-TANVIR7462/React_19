"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ShoppingCart, Package, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "../ui/Modal/Modal";

const ProductModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const hasMultipleImages = product.images?.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={product.name} width="max-w-4xl" color="bg-white">
      <div className="grid lg:grid-cols-5 lg:gap-6">
        {/* 🖼 Image Gallery */}
        <div className="relative lg:col-span-3">
          <div className="relative   bg-gray-100 rounded-sm overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={product.images[currentImageIndex]}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full  mx-auto max-h-[400px] object-contain"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </>
            )}
          </div>

          {hasMultipleImages && (
            <>
              <div className="flex gap-2 mt-4   overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-sm hidden sm:block  border-2 transition-all cursor-pointer ${
                      currentImageIndex === index
                        ? "border-orange-400  border-[2px]"
                        : "border-gray-100 hover:border-gray-300 transition-colors duration-200"
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full" />
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === index ? "bg-orange-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
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
              <span className="text-3xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                  {product.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      -{product.discount}%
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`px-2 py-1 rounded ${
                  product.stock > 50
                    ? "bg-green-100 text-green-700"
                    : product.stock > 20
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{product.category}</span>
            </div>
          </div>

          <div className="border-t pt-2">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-400 text-sm">{product.description}</p>
          </div>

          <div className="border-t pt-2 space-y-3">
            <h3 className="font-semibold text-lg mb-2">Product Details</h3>

            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-200">Product Code</p>
                <p className="text-gray-400 text-sm">{product.code}</p>
              </div>
            </div>

            {product.sizes && (
              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-200">Dimensions</p>
                  <p className="text-gray-400 text-sm">{product.sizes}</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
