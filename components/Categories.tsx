import { Button } from "@/components/ui/button"
import { Code, Image, Music, Video } from 'lucide-react'

const categories = [
  { name: "Graphics & Design", icon: Image },
  { name: "Programming & Tech", icon: Code },
  { name: "Video & Animation", icon: Video },
  { name: "Music & Audio", icon: Music },
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Button key={category.name} variant="outline" className="h-auto py-8 flex flex-col items-center justify-center">
              <category.icon className="h-8 w-8 mb-2" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

