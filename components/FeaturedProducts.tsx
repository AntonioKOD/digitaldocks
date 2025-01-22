import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const featuredProducts = [
  { id: 1, name: "Premium WordPress Theme", price: 59, image: "/placeholder.svg" },
  { id: 2, name: "Social Media Marketing Course", price: 99, image: "/placeholder.svg" },
  { id: 3, name: "Professional Logo Design", price: 149, image: "/placeholder.svg" },
  { id: 4, name: "SEO Optimization Package", price: 199, image: "/placeholder.svg" },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
