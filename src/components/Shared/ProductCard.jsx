import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-sm transition-shadow cursor-pointer group "
      onClick={() => onClick(product)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    
    >
      <div className="relative aspect-square  overflow-hidden">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full "
        />

        {product.discount && (
          <motion.div
            className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold "
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            -{product.discount}%
          </motion.div>
        )}

        <motion.button
          className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg  cursor-pointer  transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 1 }}
        >
          <ShoppingCart className="w-5 h-5" />
        </motion.button>

        {product.stock < 20 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Only {product.stock} left
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-500 mb-2   transition-colors">
          {product.category}
        </h3>
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-orange-500 font-semibold text-lg">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-1 line-clamp-1 font-semibold"><span className="text-orange-500 ">Pack:</span> {product.code}</p>
        {product.sizes && <p className="text-xs  line-clamp-1 font-semibold text-gray-600"><span className="text-orange-500 ">Dim:</span>  {product.sizes}</p>}
      </div>
    </motion.div>
  );
};
export default ProductCard;
