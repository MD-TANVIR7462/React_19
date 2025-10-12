import { Home, User, Settings, LogOut, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Gift", href: "/gift", icon: ShoppingCart },
  { name: "Everyday", href: "/everyday", icon: Home },
  { name: "Clock Lamps", href: "/clocks", icon: Home },
  { name: "Islamic", href: "/islamic", icon: Home },
  { name: "Contact", href: "/contact", icon: Home },
];

export default function MobileMenu({ isOpen, onClose, isLoggedIn, onLoginToggle }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 w-80 bg-background border-l border-border shadow-xl transform transition-transform duration-300 ease-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Mirtex</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2 mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Navigation</h3>
              {navigationItems.map((item) => (
                <Link
                  to={item.href}
                  key={item.name}
                  variant="ghost"
                  className="justify-start w-full h-8 hover:text-orange-500 text-left hover:bg-muted/50 transition-colors flex items-center"
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
              <div className="space-y-2">
                {isLoggedIn ? (
                  <>
                    <Button variant="ghost" className="justify-start w-full h-12 hover:bg-muted/50 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start w-full h-12 hover:bg-muted/50 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="justify-start w-full h-12 hover:bg-muted/50 transition-colors">
                      <ShoppingCart className="w-4 h-4 mr-3" />
                      My Orders
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start w-full h-12 hover:bg-muted/50 transition-colors"
                      onClick={onLoginToggle}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="justify-start w-full h-12 hover:bg-muted/50 transition-colors"
                      onClick={onLoginToggle}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Login
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start w-full h-12 bg-background hover:bg-muted/50 transition-colors"
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
