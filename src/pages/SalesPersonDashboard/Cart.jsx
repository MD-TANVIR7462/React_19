import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, CreditCard, ShoppingBag, Package, Truck, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { initialProducts } from "@/data/CustomerData";
import { ProductEditModal } from "@/components/SalesPersonDashboard/Checkout/ProductEditModal";
import { EmailCustomerModal } from "@/components/SalesPersonDashboard/Checkout/EmailOrderModal";
import { CartItem } from "@/components/SalesPersonDashboard/Checkout/CartItem";

const CartPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p)));
  };

  const removeProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const subtotal = products.reduce((sum, p) => sum + p.unitPrice * p.quantity, 0);

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      <div className="py-4 ">
        <div className=" mx-auto ">
          {/* Layout */}
          <div className="lg:grid lg:grid-cols-8 lg:gap-4 ">
            {/* Left Section: Items */}
            <div className="lg:col-span-6">
              {products.length === 0 ? (
                <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-white">
                  <CardContent className="flex flex-col items-center justify-center py-20 px-6">
                    <div className="rounded-full bg-gray-100 p-8 mb-6 border border-gray-200">
                      <ShoppingBag className="h-16 w-16 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your cart is empty</h2>
                    <p className="text-gray-500 text-center mb-8 max-w-md">
                      Start adding products to your cart. Explore our catalog to find what you need.
                    </p>
                    <Link to="/">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg transition-all duration-200"
                      >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Browse Products
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="overflow-x-auto w-full">
                  <table className=" bg-white w-full ">
                    {/* Table Header */}
                    <thead>
                      <tr className="bg-gray-100 border">
                        <th className="text-left py-3 px-4 font-medium   whitespace-nowrap">Product Details</th>
                        <th className="text-left py-3 px-4 font-medium   whitespace-nowrap border">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium   whitespace-nowrap border">Unit Price</th>
                        <th className="text-left py-3 px-4 font-medium   whitespace-nowrap border">Total</th>
                        <th className="text-left py-3 px-4 font-medium   whitespace-nowrap border">Actions</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {products.map((product) => (
                        <CartItem
                          key={product.id}
                          product={product}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeProduct}
                          onEdit={setEditingProduct}
                          tableLayout={true}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Right Section: Summary */}

            <div className="lg:col-span-2 my-5 lg:my-0">
              <div className=" border  bg-white ">
                {products.length > 0 && (
                  <div className="flex justify-center">
                    <Link to="/">
                      <button className="w-full border-gray-300 text-gray-700 text-sm  hover:bg-g rounded-sm border px-2 py-2 m-2 hover:bg-gray-200/60 transition-colors duration-200 cursor-pointer">
                        ← Continue Shopping
                      </button>
                    </Link>
                  </div>
                )}
                <p className="p-4 text-center bg-gray-100 border-y font-semiboldsd">Summary</p>
                <CardContent className="space-y-4 my-4">
                  {/* Total */}

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cart Total:</span>
                      <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 py-6">
                  <Button
                    className="btn-confirm"
                    size="lg"
                    onClick={() => setEmailModalOpen(true)}
                    disabled={products.length === 0}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Email Quote
                  </Button>

                  <Link to="/checkout" className="w-full">
                    <Button className="btn-primary" size="lg" disabled={products.length === 0}>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EmailCustomerModal open={emailModalOpen} onOpenChange={setEmailModalOpen} cartTotal={subtotal} />

      {editingProduct && (
        <ProductEditModal
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          product={editingProduct}
          onSave={updateProduct}
        />
      )}
    </>
  );
};
export default CartPage;
