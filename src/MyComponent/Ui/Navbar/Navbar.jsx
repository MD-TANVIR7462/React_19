"use client";

import { useState } from "react";
import TopBar from "./top-bar";
import NavigationBar from "./navigation-bar";
import CartSidebar from "./cart-sidebar";
import MobileMenu from "./mobile-menu";
import Usernav from "./User-nav";

const cartItems = [
  { id: 1, name: "iPhone 15 Pro", price: 999, quantity: 1, image: "/assets/Bid2-min.png" },
  { id: 2, name: "AirPods Pro", price: 249, quantity: 2, image: "/assets/Bid4-min.png" },
  { id: 3, name: "MacBook Air", price: 1299, quantity: 1, image: "/assets/Bid3-min.png" },
  { id: 11, name: "iPhone 15 Pro", price: 999, quantity: 1, image: "/assets/Bid2-min.png" },
  { id: 22, name: "AirPods Pro", price: 249, quantity: 2, image: "/assets/Bid4-min.png" },
  { id: 33, name: "MacBook Air", price: 1299, quantity: 1, image: "/assets/Bid3-min.png" },
  { id: 144, name: "iPhone 15 Pro", price: 999, quantity: 1, image: "/assets/Bid2-min.png" },
  { id: 25, name: "AirPods Pro", price: 249, quantity: 2, image: "/assets/Bid4-min.png" },
  { id: 36, name: "MacBook Air", price: 1299, quantity: 1, image: "/assets/Bid3-min.png" },
  { id: 15, name: "iPhone 15 Pro", price: 999, quantity: 1, image: "/assets/Bid2-min.png" },
  { id: 24, name: "AirPods Pro", price: 249, quantity: 2, image: "/assets/Bid4-min.png" },
  { id: 33, name: "MacBook Air", price: 1299, quantity: 1, image: "/assets/Bid3-min.png" },
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
        <Usernav/>
        <TopBar
          isLoggedIn={isLoggedIn}
          onLoginToggle={() => setIsLoggedIn(!isLoggedIn)}
          cartCount={cartCount}
          onCartClick={() => setShowCartSidebar(true)}
          onMobileMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          isMobileMenuOpen={isMenuOpen}
        />

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
