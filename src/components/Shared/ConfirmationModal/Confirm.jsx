import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

const Confirm = ({ open, onOpenChange, onConfirm, text }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span className="capitalize">Confirm {text}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <span className="block ">Are you sure you want to save this {text}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Yes, Confirm Order
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default Confirm;
