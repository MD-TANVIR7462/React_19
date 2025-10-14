import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Edit, MapPin, ArrowLeft, ShoppingCart } from "lucide-react";
import { AddressEditModal } from "@/components/SalesPersonDashboard/Checkout/AddressEditModal";
import { Link, useNavigate } from "react-router-dom";
import Confirm from "@/components/Shared/ConfirmationModal/Confirm";
import { customers } from "@/data/CustomerData";
import { toast } from "sonner";

export default function CheckoutPage() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoiceAddress, setInvoiceAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(false);
  const [editingShipping, setEditingShipping] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  // Mock cart data - in real app, this would come from context/state management
  const subtotal = 252.87;
  const estimatedTax = subtotal * 0.08;
  const orderTotal = subtotal + estimatedTax;

  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);
    const customer = customers?.find((c) => c.id === customerId);
    if (customer) {
      setInvoiceAddress(customer.invoiceAddress);
      setShippingAddress(customer.shippingAddress);
    }
  };

  const handleSaveOrder = () => {
    if (!selectedCustomer) return;
    setConfirmModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setConfirmModalOpen(false);
    toast.success("Order Confirmed");
    navigate("/");
  };

  return (
    <>
      <div className=" mx-auto my-4">
        {/* Header */}

        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Selection */}
            <Card className="shadow-sm rounded-none">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-xl">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="w-full ">
                <div className="space-y-2">
                  <Label htmlFor="checkout-customer" className="text-base font-semibold">
                    Select Customer
                  </Label>
                  <Select value={selectedCustomer} onValueChange={handleCustomerChange}>
                    <SelectTrigger id="checkout-customer" className="h-12 w-full max-w-lg rounded-sm ">
                      <SelectValue placeholder="Choose a customer..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm">
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {selectedCustomer && (
              <>
                {/* Addresses */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Invoice Address */}
                  <Card className="shadow-sm rounded-none">
                    <CardHeader className="pb-3 border-b bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          Invoice Address
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingInvoice(true)}
                          className="h-8 cursor-pointer"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm space-y-1">
                      <p className="font-semibold text-foreground">{invoiceAddress?.name}</p>
                      <p className="text-muted-foreground">{invoiceAddress?.street}</p>
                      <p className="text-muted-foreground">
                        {invoiceAddress?.city}, {invoiceAddress?.state} {invoiceAddress?.zip}
                      </p>
                      <p className="text-muted-foreground">{invoiceAddress?.phone}</p>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card className="shadow-sm rounded-none">
                    <CardHeader className="pb-3 border-b bg-muted/30">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-secondary" />
                          Shipping Address
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingShipping(true)}
                          className="h-8 cursor-pointer"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 text-sm space-y-1">
                      <p className="font-semibold text-foreground">{shippingAddress?.name}</p>
                      <p className="text-muted-foreground">{shippingAddress?.street}</p>
                      <p className="text-muted-foreground">
                        {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zip}
                      </p>
                      <p className="text-muted-foreground">{shippingAddress?.phone}</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-md rounded-none">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-xl flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Cart Subtotal:</span>
                    <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Estimated Tax (8%):</span>
                    <span className="font-semibold text-foreground">${estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between">
                    <span className="font-bold text-foreground text-lg">Order Total:</span>
                    <span className="font-bold text-primary text-2xl">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600/90 hover:bg-green-700/80 text-white transition-all duration-200 cursor-pointer"
                  size="lg"
                  onClick={handleSaveOrder}
                  disabled={!selectedCustomer}
                >
                  Save Sales Order
                </Button>

                {!selectedCustomer && (
                  <p className="text-sm text-muted-foreground text-center">Please select a customer to continue</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {invoiceAddress && (
        <AddressEditModal
          open={editingInvoice}
          onOpenChange={setEditingInvoice}
          address={invoiceAddress}
          onSave={setInvoiceAddress}
          title="Edit Invoice Address"
        />
      )}

      {shippingAddress && (
        <AddressEditModal
          open={editingShipping}
          onOpenChange={setEditingShipping}
          address={shippingAddress}
          onSave={setShippingAddress}
          title="Edit Shipping Address"
        />
      )}

      <Confirm
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        onConfirm={handleConfirmOrder}
        text={"sales order"}
      />
    </>
  );
}
