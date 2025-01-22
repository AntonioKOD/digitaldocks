import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Digital Products</h1>
        <p className="text-xl mb-8 max-w-2xl">Find the best digital assets, software, and services to boost your projects.</p>
        <Button size="lg" variant="secondary">Explore Marketplace</Button>
      </div>
    </section>
  )
}

