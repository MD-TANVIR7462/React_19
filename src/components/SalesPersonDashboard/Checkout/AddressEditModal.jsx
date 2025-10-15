import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/Modal/Modal";

export function AddressEditModal({ open, onOpenChange, address, onSave, title }) {
  const [editedAddress, setEditedAddress] = useState(address || {});

  // Update local state when address prop changes
  useEffect(() => {
    setEditedAddress(address || {});
  }, [address]);

  const handleSave = () => {
    onSave(editedAddress);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset to original address when closing without saving
    setEditedAddress(address || {});
  };

  const handleChange = (field, value) => {
    setEditedAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={title || "Edit Address"}
      width="max-w-md"
      color="bg-white"
      bgcolor="bg-black/50"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input 
              id="name" 
              value={editedAddress.name || ""} 
              onChange={(e) => handleChange("name", e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street" className="text-sm font-medium text-gray-700">
              Street Address
            </Label>
            <Input 
              id="street" 
              value={editedAddress.street || ""} 
              onChange={(e) => handleChange("street", e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                City
              </Label>
              <Input 
                id="city" 
                value={editedAddress.city || ""} 
                onChange={(e) => handleChange("city", e.target.value)}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                State
              </Label>
              <Input 
                id="state" 
                value={editedAddress.state || ""} 
                onChange={(e) => handleChange("state", e.target.value)}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip" className="text-sm font-medium text-gray-700">
                ZIP Code
              </Label>
              <Input 
                id="zip" 
                value={editedAddress.zip || ""} 
                onChange={(e) => handleChange("zip", e.target.value)}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone
              </Label>
              <Input 
                id="phone" 
                value={editedAddress.phone || ""} 
                onChange={(e) => handleChange("phone", e.target.value)}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
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
          <Button 
            onClick={handleSave} 
            className="flex-1 btn-confirm"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}