import { useState } from "react";
import { motion } from "framer-motion";

const ProductImage = ({ src, alt, className, callForm = "swiper" }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {loading && !error && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-sm" />}

      {/* Error placeholder */}
      {error && (
        <div className={` flex items-center justify-center bg-red-100 rounded-sm ${callForm === "thumbnail" ? "inset-0 absolute" : "h-[400px]"}`}>
          <span className="text-red-500 font-semibold text-sm">
            {callForm === "thumbnail" ? "Broken" : "Image not available"}
          </span>
        </div>
      )}
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full mx-auto max-h-[400px] object-contain ${
            loading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onLoad={() => setLoading(false)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}
    </div>
  );
};
export default ProductImage;
