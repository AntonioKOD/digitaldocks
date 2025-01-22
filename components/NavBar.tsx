"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, User } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { signOut, useSession } from "next-auth/react";

// Categories Data
const categories = [
  {
    title: "Electronics",
    items: ["Laptops", "Smartphones", "Tablets"],
  },
  {
    title: "Clothing",
    items: ["Shirts", "Pants", "Shoes"],
  },
  {
    title: "Home Goods",
    items: ["Furniture", "Decor", "Kitchenware"],
  },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get user session
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-background"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Left Section: Mobile Menu & Logo */}
          <div className="flex items-center">
            <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
            <Link href="/" className="text-2xl font-bold ml-2 md:ml-0">
              DigitalMarket
            </Link>
          </div>
          
          {/* Middle Section: Navigation Menu (Desktop Only) */}
          <NavigationMenu className="hidden lg:flex flex-1 justify-center">
            <NavigationMenuList className="flex gap-x-12"> {/* Increased gap for spacing */}
              
              {/* Categories Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <li key={category.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/category/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {category.items.join(", ")}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Sellers & About */}
              <NavigationMenuItem>
                <NavigationMenuLink href="/sellers" className="px-2">Start Selling</NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/about" className="px-2">About</NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar (Desktop Only) */}
          <div className="hidden lg:flex flex-grow mx-4 max-w-md">
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <Input type="search" placeholder="Search products..." className="w-full" />
            </form>
          </div>

          {/* Right Section: User Menu & Shopping Cart */}
          <nav className="flex items-center gap-4">
            
            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>

            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User Menu">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={`/profile/${userId}`}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      Log out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/auth">Sign In</Link>
                  </DropdownMenuItem>
                )}

              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sign In Button (Hidden if logged in) */}
            {!session && (
              <Link href="/auth">
                <Button className="hidden sm:inline-flex">Sign In</Button>
              </Link>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
}