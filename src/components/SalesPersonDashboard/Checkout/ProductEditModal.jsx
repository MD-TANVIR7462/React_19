import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Modal } from "@/components/ui/Modal/Modal";

export function ProductEditModal({ open, onOpenChange, product, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);

  // Update local state when product prop changes
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleSave = () => {
    onSave(editedProduct);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset to original product when closing without saving
    setEditedProduct(product);
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title="Edit Product Details"
      width="max-w-3xl"
      color="bg-white"
      bgcolor="bg-black/50"
    >
      <div className="space-y-6">
        {/* Product Image */}
        <div className="flex justify-center">
          <div className="relative h-40 w-40 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 shadow-md">
            <img
              src={editedProduct.image || "/placeholder.svg"}
              alt={editedProduct.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <Label htmlFor="product-name" className="text-base font-semibold text-gray-700">
            Product Name
          </Label>
          <Input
            id="product-name"
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            className="h-11 border-gray-300 focus:border-blue-500"
          />
        </div>

        {/* SKU */}
        <div className="space-y-2">
          <Label htmlFor="product-sku" className="text-base font-semibold text-gray-700">
            SKU
          </Label>
          <Input
            id="product-sku"
            value={editedProduct.sku || ""}
            onChange={(e) => setEditedProduct({ ...editedProduct, sku: e.target.value })}
            className="h-11 border-gray-300 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="product-description" className="text-base font-semibold text-gray-700">
            Description
          </Label>
          <textarea
            id="product-description"
            value={editedProduct.description || ""}
            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
            rows={3}
            className="w-full resize-none border border-gray-300 rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unit Price */}
          <div className="space-y-2">
            <Label htmlFor="product-price" className="text-base font-semibold text-gray-700">
              Unit Price ($)
            </Label>
            <Input
              id="product-price"
              type="number"
              step="0.01"
              min="0"
              value={editedProduct.unitPrice}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, unitPrice: Number.parseFloat(e.target.value) || 0 })
              }
              className="h-11 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="product-quantity" className="text-base font-semibold text-gray-700">
              Quantity
            </Label>
            <Input
              id="product-quantity"
              type="number"
              min="1"
              value={editedProduct.quantity}
              onChange={(e) => setEditedProduct({ ...editedProduct, quantity: Number.parseInt(e.target.value) || 1 })}
              className="h-11 border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unit */}
          <div className="space-y-2">
            <Label htmlFor="product-unit" className="text-base font-semibold text-gray-700">
              Unit
            </Label>
            <Input
              id="product-unit"
              value={editedProduct.unit}
              onChange={(e) => setEditedProduct({ ...editedProduct, unit: e.target.value })}
              className="h-11 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* Packaging */}
          <div className="space-y-2">
            <Label htmlFor="product-packaging" className="text-base font-semibold text-gray-700">
              Packaging
            </Label>
            <Select
              value={editedProduct.packaging}
              onValueChange={(value) => setEditedProduct({ ...editedProduct, packaging: value })}
            >
              <SelectTrigger id="product-packaging" className="h-11 border-gray-300 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CTN">CTN (Carton)</SelectItem>
                <SelectItem value="BOX">BOX</SelectItem>
                <SelectItem value="CASE">CASE</SelectItem>
                <SelectItem value="PALLET">PALLET</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Total Display */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${(editedProduct.unitPrice * editedProduct.quantity).toFixed(2)}
            </span>
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
            className="flex-1 bg-blue-800/80 hover:bg-blue-800/90 text-white transition-all duration-200 cursor-pointer"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}