import { memo } from "react";
import { motion } from "framer-motion";
import ProductImage from "./ProductImage";

const Thumbnail = memo(({ image, index, isActive, onClick }) => (
  <motion.button
    key={index}
    onClick={() => onClick(index)}
    className={`flex-shrink-0 w-20 h-20 rounded-sm hidden sm:block border-2 transition-all cursor-pointer ${
      isActive ? "border-orange-400" : "border-gray-100 hover:border-gray-300"
    }`}
  >
    <ProductImage src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full" callForm="thumbnail" />
  </motion.button>
));
export default Thumbnail;
