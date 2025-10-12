import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, ChevronDown, ShoppingCart, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom"; // or "next/link" if using Next.js

export function ProfileDropdown({ isLoggedIn, onLoginToggle }) {
  if (!isLoggedIn) return null;

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-foreground hover:text-primary transition-colors cursor-pointer">
            <User className="w-6 h-6" />

          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 ">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/salesman-dashboard" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              My Orders
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer flex items-center gap-2" onSelect={onLoginToggle}>
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
