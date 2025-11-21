"use client"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  rating: number
  image: string
  category: string
  onSale: boolean
  discount?: number
}

interface ProductsGridProps {
  products: Product[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter()

  const displayProducts =
    products.length > 0
      ? products
      : [
          {
            id: 1,
            name: "iPhone 15 Pro Max",
            price: 1299,
            rating: 4.8,
            image: "/placeholder.svg?height=200&width=200",
            category: "Celulares",
            onSale: true,
            discount: 15,
          },
          {
            id: 2,
            name: "Samsung Galaxy S24",
            price: 999,
            rating: 4.7,
            image: "/placeholder.svg?height=200&width=200",
            category: "Celulares",
            onSale: false,
          },
          {
            id: 3,
            name: "MacBook Pro M3",
            price: 1999,
            rating: 4.9,
            image: "/placeholder.svg?height=200&width=200",
            category: "Laptops",
            onSale: true,
            discount: 10,
          },
          {
            id: 4,
            name: "Dell XPS 15",
            price: 1499,
            rating: 4.6,
            image: "/placeholder.svg?height=200&width=200",
            category: "Laptops",
            onSale: false,
          },
          {
            id: 5,
            name: "iPad Air",
            price: 599,
            rating: 4.6,
            image: "/placeholder.svg?height=200&width=200",
            category: "Tablets",
            onSale: true,
            discount: 20,
          },
          {
            id: 6,
            name: "AirPods Pro",
            price: 249,
            rating: 4.5,
            image: "/placeholder.svg?height=200&width=200",
            category: "Accesorios",
            onSale: false,
          },
        ]

  const handleProductClick = (productId: number) => {
    router.push(`/product?id=${productId}`)
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 text-foreground">
        {products.length > 0 ? "Resultados" : "Productos Destacados"}
      </h2>

      {displayProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">No se encontraron productos</p>
          <Button variant="default">Ver todos los productos</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="group cursor-pointer h-full"
            >
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 ease-out h-full flex flex-col">
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-muted overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Sale Badge */}
                  {product.onSale && product.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs font-medium text-muted-foreground mb-2">{product.category}</p>

                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-grow">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-lg font-bold text-primary">${product.price}</p>
                    {product.onSale && product.discount && (
                      <p className="text-xs text-muted-foreground line-through">
                        ${Math.round(product.price / (1 - product.discount / 100))}
                      </p>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Button
                    size="sm"
                    className="w-full transition-all duration-300 ease-out hover:shadow-md hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleProductClick(product.id)
                    }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ver detalles
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
