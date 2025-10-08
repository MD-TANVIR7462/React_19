const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Gift", href: "/gift" },
  { name: "Everyday", href: "/about" },
  { name: "Clock Lamps", href: "/gift" },
  { name: "Islamic", href: "/islamic" },
  { name: "Flowers", href: "/contact" },
  { name: "Wall", href: "/contact" },
  { name: "50% Off", href: "/contact" },
]

export default function NavigationBar() {
  return (
    <div className="hidden lg:block bg-muted/30 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4 ">
        <div className="flex items-center space-x-8 h-12">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-ms font-medium text-muted-foreground  transition-colors duration-200 relative group  ${item.name==="Home"?"green-background text-white px-24 flex items-center h-full ":"hover:text-[#61a741]"}`}
            >
             <span className="my-auto"> {item.name}</span>
              {
                item.name !== "Home" && <span className="absolute -bottom-3 left-0 w-0 h-0.5  transition-all duration-200 group-hover:w-full green-background"></span>
              }
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
