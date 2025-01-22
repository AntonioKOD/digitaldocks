'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Menu, ShoppingCart, User, X } from 'lucide-react'

const categories = [
  {
    title: "Graphics & Design",
    items: ["Logo Design", "Web Design", "Illustration", "Brand Identity", "Print Design"]
  },
  {
    title: "Programming & Tech",
    items: ["Web Development", "Mobile Apps", "Desktop Software", "Game Development", "AI Services"]
  },
  {
    title: "Video & Animation",
    items: ["Video Editing", "Animation", "Motion Graphics", "Visual Effects", "Voice Over"]
  },
  {
    title: "Music & Audio",
    items: ["Voice Over", "Mixing & Mastering", "Producers & Composers", "Singer-Songwriters", "Sound Effects"]
  }
]

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open Menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Browse our digital marketplace
          </SheetDescription>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-4" aria-label="Close Menu">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="py-4 flex flex-col h-full">
          <div className="flex-grow overflow-y-auto">
            <form onSubmit={(e) => { e.preventDefault(); /* Add search logic here */ }} className="mb-4">
              <Input type="search" placeholder="Search products..." />
            </form>
            <Accordion type="single" collapsible className="w-full">
              {categories.map((category, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{category.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="py-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <SheetClose asChild>
                            <Link 
                              href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block py-2 px-4 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                            >
                              {item}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-4 space-y-2">
              <SheetClose asChild>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/sellers">Sellers</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href="/about">About</Link>
                </Button>
              </SheetClose>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="User Menu">
              <User className="h-5 w-5" />
              <span className="sr-only">User Menu</span>
            </Button>
            <SheetClose asChild>
              <Button>Sign In</Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

