const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Gift", href: "/gift" },
  { name: "Islamic", href: "/islamic" },
  { name: "Contact", href: "/contact" },
]

export default function NavigationBar() {
  return (
    <div className="hidden md:block bg-muted/30 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 h-16">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-ms font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute -bottom-3 left-0 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
