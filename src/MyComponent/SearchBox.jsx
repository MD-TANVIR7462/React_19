import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { getAllProductsFromDB } from "@/lib/customeFunc";
import { CommandLoading } from "cmdk";
import { useState, useEffect } from "react";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});

  // fetch products with debounce
  useEffect(() => {
    if (!searchTerm) return setProducts([]);

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      const result = await getAllProductsFromDB(searchTerm);
      setProducts(result.data.data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // increase quantity
  const increaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // decrease quantity
  const decreaseQty = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // add to cart function
  const addToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    const cartItem = { ...product, quantity };
    console.log("Added to Cart:", cartItem);
  };

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px] mt-12 max-w-[900px] mx-auto">
      <CommandInput placeholder="Search by brand or title" value={searchTerm} onValueChange={setSearchTerm} />
      {searchTerm && (
        <CommandList>
          {loading ? (
            <div className="p-4 text-center text-blue-500 animate-pulse">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No products found.</div>
          ) : (
            <CommandGroup heading="Results">
              {products?.map((product) => {
                const qty = quantities[product._id] || 1;

                return (
                  <CommandItem
                    key={product._id}
                    value={product.brand + " " + product.title}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    {/* Left Section - Product Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={product.displayImage}
                        alt={product.brand}
                        className="w-12 h-12 rounded border object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{product.brand}</p>
                        <p className="text-sm text-gray-500">{product.title}</p>
                        <p className="text-sm text-green-600 font-semibold">${product.price}</p>
                      </div>
                    </div>

                    {/* Right Section - Quantity + Cart */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(product._id)}
                        className="px-2 py-1 border rounded hover:bg-gray-100  cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{qty}</span>
                      <button
                        onClick={() => increaseQty(product._id)}
                        className="px-2 py-1 border rounded hover:bg-gray-100  cursor-pointer"
                      >
                        +
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBox;
