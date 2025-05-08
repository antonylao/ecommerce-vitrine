import Image from "next/image"
import { Star, StarHalf } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Product = {
  id: number
  name: string
  description: string
  price: number
  rating: number
  image: string
  category: string
  colors: string[]
  isNew: boolean
}

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // Generate star rating display
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-amber-400 text-amber-400" />}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.isNew && <Badge className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600">New</Badge>}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          {renderRating(product.rating)}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color === "natural" ? "#e9d8c4" : color }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>}
          </div>

          <Button size="sm" className="text-xs">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
