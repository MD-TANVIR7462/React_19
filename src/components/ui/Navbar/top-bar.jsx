"use client";

import { useState, useRef } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBox from "./search-box";
import { ProfileDropdown } from "./ProfileDropdown";
import { Link } from "react-router-dom";

export default function TopBar({
  isLoggedIn,
  onLoginToggle,
  cartCount,
  onCartClick,
  onMobileMenuToggle,
  isMobileMenuOpen,
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null);

  return (
    <div className="max-w-[1400px] mx-auto px-4  ">
      <div className="flex items-center justify-between py-2 md:py-4 ">
        {/* Left side - Logo and Company Name */}
        <div className="flex items-center space-x-3 ">
          <Link to={"/"}>
            <div className="flex-shrink-0">
              <img src="\brand_logo.png" alt="" className="h-14 md:h-20" />
            </div>
          </Link>
        </div>

        {/* Center - Desktop Search */}
        <div className="hidden lg:block flex-1 max-w-2xl mx-6">
          <SearchBox compact={true} />
        </div>

        {/* Right side - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center  space-x-2">
            <ProfileDropdown isLoggedIn={isLoggedIn} onLoginToggle={onLoginToggle} />
          </div>

          {/* Desktop Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative transition-colors hover:bg-muted cursor-pointer"
            onClick={onCartClick}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs green-background"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center space-x-1 ">
          {/* Mobile Search */}
          <div className="flex-1 max-w-xs" ref={searchRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="w-10 h-10 transition-colors"
            >
              <Search className="w-4 h-4" />
            </Button>

            {showMobileSearch && (
              <>
                <div
                  className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
                  onClick={() => setShowMobileSearch(false)}
                />
                <div className="fixed inset-x-4 top-20 bg-background border border-border rounded-xl shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4 w-full ">
                    <div className="ms-auto w-fit mb-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={"cursor-pointer"}
                        onClick={() => setShowMobileSearch(false)}
                      >
                        <X className="w-4 h-4 " />
                      </Button>
                    </div>
                    <SearchBox compact={true} className="" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Profile */}
          {isLoggedIn ? (
            <ProfileDropdown isLoggedIn={isLoggedIn} onLoginToggle={onLoginToggle} />
          ) : (
            <Button variant="ghost" size="icon" onClick={onLoginToggle}>
              <User className="w-5  h-5" />
            </Button>
          )}

          {/* Mobile Cart */}
          <Button variant="ghost" size="icon" className="relative transition-colors" onClick={onCartClick}>
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs green-background "
              >
                {cartCount}
              </Badge>
            )}
          </Button>

          {/* Mobile Hamburger Menu */}
          <Button variant="ghost" size="icon" onClick={onMobileMenuToggle}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
