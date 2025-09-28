"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, User, ChevronDown, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBox from "./search-box";

export default function TopBar({
  isLoggedIn,
  onLoginToggle,
  cartCount,
  onCartClick,
  onMobileMenuToggle,
  isMobileMenuOpen,
}) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;

      if (profileRef.current && !profileRef.current.contains(target)) {
        setShowProfileDropdown(false);
      }

      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8  ">
      <div className="flex items-center justify-between my-2 md:my-4 ">
        {/* Left side - Logo and Company Name */}
        <div className="flex items-center space-x-3 ">
          <div className="flex-shrink-0">
            <img src="\brand_logo.png" alt="" className="h-14 md:h-20" />
          </div>
        </div>

        {/* Center - Desktop Search */}
        <div className="hidden lg:block flex-1 max-w-2xl mx-6">
          <SearchBox compact={true} />
        </div>

        {/* Right side - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center  space-x-2">
            {isLoggedIn && (
              <div className="relative" ref={profileRef}>
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary transition-colors cursor-pointer"
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <User className="w-6 h-6 " />

                  <Badge
                    variant="ghost "
                    className="absolute -top-0.5 -right-0.5  w-5 h-5 border-none flex items-center justify-center p-0 text-xs "
                  >
                    <ChevronDown className="w-2 h-2" />
                  </Badge>
                </Button>

                {showProfileDropdown && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg py-1 z-50 animate-in slide-in-from-top-2 duration-200"
                    onMouseLeave={() => setShowProfileDropdown(false)}
                  >
                    <a
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </a>
                    <a
                      href="/orders"
                      className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      My Orders
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </a>
                    <hr className="my-1 border-border" />
                    <button
                      onClick={onLoginToggle}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
                      <Button variant="ghost" size="icon" className={"cursor-pointer"}  onClick={() => setShowMobileSearch(false)}>
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
            <div className="relative" ref={profileRef}>
              {/* <Button variant="ghost" size="icon" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <User className="w-5 h-5" />
              </Button> */}
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <User className="w-4 h-4 " />

                <Badge
                  variant="ghost "
                  className="absolute -top-0.5 -right-0.5  w-5 h-5 border-none flex items-center justify-center p-0 text-xs "
                >
                  <ChevronDown className="w-2 h-2" />
                </Badge>
              </Button>
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg py-1 z-50 animate-in slide-in-from-top-2 duration-200">
                  <a
                    href="/dashboard"
                    className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </a>
                  <a
                    href="/orders"
                    className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    My Orders
                  </a>
                  <button
                    onClick={onLoginToggle}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
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
