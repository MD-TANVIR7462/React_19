import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal/Modal";

const customers = [
  { id: "1", name: "Acme Corporation", email: "orders@acme.com" },
  { id: "2", name: "Global Traders Inc", email: "purchasing@globaltraders.com" },
  { id: "3", name: "Premium Retailers LLC", email: "sales@premiumretailers.com" },
  { id: "4", name: "Wholesale Partners", email: "contact@wholesalepartners.com" },
];

export function EmailCustomerModal({ open, onOpenChange, cartTotal }) {
  console.log(cartTotal);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const handleSendEmail = () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    const customer = customers.find((c) => c.id === selectedCustomer);

    toast.success(`Cart details sent to ${customer?.name}`);
    onOpenChange(false);
    setSelectedCustomer("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedCustomer("");
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title="Email Cart to Customer"
      width="max-w-md"
      color="bg-white"
      bgcolor="bg-black/50"
    >
      <div className="space-y-6">
        {/* Customer Selection */}
        <div className="space-y-3">
          <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
            <SelectTrigger id="customer" className="w-full">
              <SelectValue placeholder="Choose a customer..." />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{customer.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={handleSendEmail} className="flex-1 w-full rounded-sm bg-blue-800/80 hover:bg-blue-800/90 text-white transition-all duration-200 cursor-pointer">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </div>
      </div>
    </Modal>
  );
}
