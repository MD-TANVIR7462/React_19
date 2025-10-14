"use client";

import { useState } from "react";
import TopBar from "./top-bar";
import NavigationBar from "./navigation-bar";
import CartSidebar from "./cart-sidebar";
import MobileMenu from "./mobile-menu";
import Usernav from "./User-nav";

const cartItems = [
  { id: 1,  name: "85-859", price: 999, quantity: 1, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 2,  name: "45-853", price: 249, quantity: 2, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 3,  name: "75-855", price: 1299, quantity: 1, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 11, name: "34-857", price: 999, quantity: 1, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 22, name: "35-859", price: 249, quantity: 2, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 33, name: "45-855", price: 1299, quantity: 1, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 144,name: "65-85e", price: 999, quantity: 1, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 25, name: "25-855", price: 249, quantity: 2, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 36, name: "75-852", price: 1299, quantity: 1, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 15, name: "95-851", price: 999, quantity: 1, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 24, name: "65-878", price: 249, quantity: 2, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
  { id: 333,name: "22-953", price: 1299, quantity: 1, image: "https://demomirtextrading.siscotech.com/admin/views/product/documents/86-186.png" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartItemsState, setCartItemsState] = useState(cartItems);

  const cartCount = cartItemsState.reduce((sum, item) => sum + item.quantity, 0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItemsState((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeItem = (id) => {
    setCartItemsState((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        {/* Top Bar - Logo, Search, Cart, Login/Profile */}
        <Usernav />
        {/* <div className="sticky top-0 z-50 bg-background border-b border-border"> */}
          <TopBar
            isLoggedIn={isLoggedIn}
            onLoginToggle={() => setIsLoggedIn(!isLoggedIn)}
            cartCount={cartCount}
            onCartClick={() => setShowCartSidebar(true)}
            onMobileMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            isMobileMenuOpen={isMenuOpen}
          />
        {/* </div> */}
        {/* Navigation Bar - Menu Items (Desktop Only) */}
        <NavigationBar />
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCartSidebar}
        onClose={() => setShowCartSidebar(false)}
        items={cartItemsState}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        onLoginToggle={() => setIsLoggedIn(!isLoggedIn)}
      />
    </>
  );
}
