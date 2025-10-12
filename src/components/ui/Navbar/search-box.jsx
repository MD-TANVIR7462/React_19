import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { getAllProductsFromDB } from "@/utils/customeFunc";

import { useState, useEffect } from "react";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log(selectedProduct);
  // fetch products with debounce
  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await getAllProductsFromDB(searchTerm);
        setProducts(result?.data?.data || []);
        console.log(result);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // quantity handlers
  const increaseQty = (id, e) => {
    e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id, e) => {
    e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // add to cart function
  const addToCart = (product, e) => {
    e.stopPropagation();
    const quantity = quantities[product._id] || 1;
    const cartItem = { ...product, quantity };
    console.log("Added to Cart:", cartItem);
    // Reset quantity after adding to cart
    setQuantities((prev) => ({ ...prev, [product._id]: 1 }));
  };

  // handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    console.log("Selected Product:", product);
  };

  // Beautiful loader component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-6 ">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-green-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
      </div>
      <span className="ml-3 text-sm text-gray-600">Searching products...</span>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center ">
      <div className="w-16 h-16 mb-4 text-gray-300">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <p className="text-gray-500 text-sm">
        No products found for the product code <span className="font-medium text-gray-700">{searchTerm}</span>.
      </p>
    </div>
  );

  return (
    <div className="mx-auto  px-4  relative">
      <Command className="rounded-sm border   bg-white">
        <CommandInput
          placeholder="Search by brand or title..."
          value={searchTerm}
          onValueChange={setSearchTerm}
          className="text-base py-4 px-4 border-b border-gray-100 "
        />

        {searchTerm && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-sm shadow-lg z-50">
            <CommandList className="max-h-96 overflow-auto ">
              {loading ? (
                <LoadingSpinner />
              ) : products.length === 0 ? (
                <EmptyState />
              ) : (
                <CommandGroup heading="Products" className="p-2">
                  {products.map((product) => {
                    const qty = quantities[product._id] || 1;

                    return (
                      <CommandItem
                        key={product._id}
                        value={`${product.brand} ${product.name} ${product.type} ${product.category}`}
                        onSelect={() => handleProductSelect(product)}
                        className="flex items-center justify-between p-3 rounded-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        {/* Product Information */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <img
                            src={product.thumbImage}
                            alt={product.brand}
                            className="w-14 h-14 rounded-sm border border-gray-200 object-cover "
                            onError={(e) => {
                              e.target.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iOCIgZmlsbD0iI0ZGRiIgc3Ryb2tlPSIjRTVFNUU1Ii8+CjxwYXRoIGQ9Ik0yOCAzMkMzMC4yMDkxIDMyIDMyIDMwLjIwOTEgMzIgMjhDMzIgMjUuNzkwOSAzMC4yMDkxIDI0IDI4IDI0QzI1Ljc5MDkgMjQgMjQgMjUuNzkwOSAyNCAyOEMyNCAzMC4yMDkxIDI1Ljc5MDkgMzIgMjggMzJaIiBmaWxsPSIjOTk5Ii8+CjxwYXRoIGQ9Ik0zNSAyOEMzNSAzMi45NzA2IDMxLjQxODMgMzcgMjggMzdDMjQuNTgxNyAzNyAyMSAzMi45NzA2IDIxIDI4QzIxIDIzLjAyOTQgMjQuNTgxNyAxOSAyOCAxOUMzMS40MTgzIDE5IDM1IDIzLjAyOTQgMzUgMjhaIiBmaWxsPSIjRTlFOUU5Ii8+Cjwvc3ZnPgo=";
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold text-gray-900 truncate">{product.brand}</p>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-[10px] rounded-full font-normal">
                                #{product.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{product.name}</p>
                            <p className="text-sm text-gray-600 truncate">{product.type}</p>
                          </div>
                        </div>

                        {/* Quantity Controls and Add to Cart */}
                        <div className="flex items-center gap-2 ml-4">
                          <div className="flex items-center border border-gray-300 rounded-sm bg-white">
                            <button
                              onClick={(e) => decreaseQty(product._id, e)}
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-150 rounded-l-sm cursor-pointer"
                              disabled={qty <= 1}
                            >
                              −
                            </button>
                            <span className="px-3 py-2 text-sm font-medium text-gray-800 min-w-[2rem] text-center">
                              {qty}
                            </span>
                            <button
                              onClick={(e) => increaseQty(product._id, e)}
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-150 rounded-r-sm cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation(), addToCart(product, e);
                            }}
                            className="px-4 py-2  text-white rounded-sm green-background active:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm cursor-pointer active:scale-95 hover:scale-100"
                          >
                            Cart
                          </button>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
};

export default SearchBox;
