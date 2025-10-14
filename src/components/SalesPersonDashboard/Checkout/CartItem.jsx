import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Package, Edit } from "lucide-react";

export function CartItem({ product, onUpdateQuantity, onRemove, onEdit, tableLayout = false }) {
  const total = product.unitPrice * product.quantity;

  if (tableLayout) {
    return (
      <tr className=" hover:bg-gray-100/40 ">
        {/* Product Details */}
        <td className=" whitespace-nowrap  border p-2">
          <div className="flex gap-4 items-center">
            <div className="h-16 w-16  rounded-sm  bg-muted border shadow-sm">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1.5  text-base">{product.name}</h3>
      
            </div>
          </div>
        </td>

        {/* Quantity */}
        <td className=" whitespace-nowrap p-2 text-center border">
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8  hover:bg-gray-500/80 hover:text-white transition-colors duration-200 cursor-pointer "
              onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="w-12 text-center bg-muted/50 rounded-sm py-1.5 px-2 border border-border">
              <span className="font-bold text-foreground text-base">{product.quantity}</span>
              {/* <span className="text-xs text-muted-foreground ml-1 font-medium">{product.unit}</span> */}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8  hover:bg-gray-500/80 hover:text-white transition-colors duration-200 cursor-pointer "
              onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </td>

        {/* Unit Price */}
        <td className=" whitespace-nowrap   text-center border">
          <p className="text-sm">${product.unitPrice.toFixed(2)}</p>
        </td>

        {/* Total */}
        <td className=" whitespace-nowrap   text-center border">
          <p className="text-sm text-primary">${total.toFixed(2)}</p>
        </td>

        {/* Actions */}
        <td className=" whitespace-nowrap  border">
          <div className="flex  gap-2 justify-center items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8  hover:bg-blue-500/80 hover:text-white transition-colors duration-200 cursor-pointer "
              onClick={() => onEdit(product)}
              title="Edit product"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 hover:bg-red-500/80 hover:text-white transition-colors duration-200 cursor-pointer "
              onClick={() => onRemove(product.id)}
              title="Remove product"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </td>
      </tr>
    );
  }
}
