import { useState } from "react";
import { motion } from "framer-motion";
import BrokenSvg from "../../Svg/BrokenSvg";
import { LoaderIcon } from "lucide-react";

const ProductImage = ({ src, alt, className, callForm = "swiper" }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {loading && !error && (
        <div
          className={` bg-gray-200 animate-pulse rounded-sm ${
            callForm === "thumbnail" ? "inset-0 absolute" : "h-[400px]"
          }`}
        >
          {" "}
          <div className=" h-full flex justify-center items-center">
            <LoaderIcon className=" h-5 w-5 animate-spin" />
          </div>
        </div>
      )}

      {/* Error placeholder */}
      {error && (
        <div
          className={` flex items-center justify-center bg-red-100/60  rounded-sm ${
            callForm === "thumbnail" ? "inset-0 absolute" : "h-[400px]"
          }`}
        >
          <span className="text-red-500 font-semibold text-sm">
            {callForm === "thumbnail" ? "Broken" : <BrokenSvg />}
          </span>
        </div>
      )}
      {!error && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
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
