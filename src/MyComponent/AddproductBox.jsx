import { useState } from "react";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const Addproduct = ({ products = [] }) => {
//   const productData = use(products);

  const [searchTerm, setSearchTerm] = useState("");

//   const filteredProducts = productData?.data.data.filter((product) =>
//     product?.category.toLowerCase().startsWith(searchTerm.toLowerCase())
//   );

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px] mt-12 max-w-[700px] mx-auto">
      <CommandInput placeholder="Search by product code" value={searchTerm} onValueChange={setSearchTerm} />
      <CommandList>
        {/* {searchTerm ? (
          <>
            {filteredProducts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No products found.</div>
            ) : ( */}
              <CommandGroup heading="Results">
                {/* {productData?.data.data.map((product) => ( */}
                  <CommandItem key={1} className="flex items-center gap-3">
                    <img src={""} alt={""} className="w-10 h-10 rounded border" />
                    <div>
                      <p className="font-medium">Apple</p>
                    </div>
                  </CommandItem>
                {/* ))} */}
              </CommandGroup>
            {/* )}
          </>
        ) : null} */}
      </CommandList>
    </Command>
  );
};

export default Addproduct;
