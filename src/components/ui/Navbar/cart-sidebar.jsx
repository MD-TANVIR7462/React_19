import { X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) {
  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const handleCart = () => {
    onClose();
    navigate("/cart");
  };
  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-background border-l border-border shadow-2xl z-50 transform transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/10">
          <h3 className="text-lg font-semibold">Shopping Cart ({cartCount})</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-250px)] lg:max-h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 mb-4 text-muted-foreground">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 hover:bg-muted/30 rounded-xl transition-all duration-200 mb-2 border border-border/30 bg-muted/5"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-sm border border-border "
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">${item.price.toLocaleString()}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-background hover:bg-muted transition-colors cursor-pointer"
                      data-cart-control="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(item.id, item.quantity - 1);
                      }}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm font-medium min-w-[2rem] text-center bg-muted/50 px-2 py-1 rounded">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 bg-background hover:bg-muted transition-colors cursor-pointer"
                      data-cart-control="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(item.id, item.quantity + 1);
                      }}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-semibold text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors cursor-pointer"
                    data-cart-control="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(item.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 bg-muted/5 border pb-12 h-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-primary">
                <span className="green-color">$</span>
                {cartTotal.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCart}
                variant="outline"
                className="w-full bg-background hover:bg-muted transition-colors cursor-pointer"
              >
                View Cart
              </Button>

              <Button onClick={handleCheckout} className="w-full cursor-pointer green-background">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
