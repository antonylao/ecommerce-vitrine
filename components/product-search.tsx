"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "@/components/product-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { useMediaQuery } from "@/hooks/use-mobile"

// Product type definition
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

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Minimalist Ceramic Vase",
    description: "Handcrafted ceramic vase with a modern minimalist design",
    price: 39.99,
    rating: 4.5,
    image: "/images/vase.png",
    category: "Home Decor",
    colors: ["white", "black", "beige"],
    isNew: true,
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    description: "Soft, breathable organic cotton t-shirt for everyday wear",
    price: 24.99,
    rating: 4.2,
    image: "/images/tshirt.png",
    category: "Clothing",
    colors: ["white", "black", "navy", "gray"],
    isNew: false,
  },
  {
    id: 3,
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium wireless headphones with active noise cancellation",
    price: 199.99,
    rating: 4.8,
    image: "/images/headphones.png",
    category: "Electronics",
    colors: ["black", "silver"],
    isNew: true,
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    description: "Genuine leather crossbody bag with adjustable strap",
    price: 89.99,
    rating: 4.3,
    image: "/images/bag.png",
    category: "Accessories",
    colors: ["brown", "black", "tan"],
    isNew: false,
  },
  {
    id: 5,
    name: "Smart Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    price: 129.99,
    rating: 4.6,
    image: "/images/fitness-tracker.png",
    category: "Electronics",
    colors: ["black", "blue", "pink"],
    isNew: true,
  },
  {
    id: 6,
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours",
    price: 34.99,
    rating: 4.7,
    image: "/images/water-bottle.png",
    category: "Kitchen",
    colors: ["silver", "black", "green", "blue"],
    isNew: false,
  },
  {
    id: 7,
    name: "Handwoven Wool Throw Blanket",
    description: "Cozy handwoven wool throw blanket for your home",
    price: 79.99,
    rating: 4.4,
    image: "/images/blanket.png",
    category: "Home Decor",
    colors: ["gray", "cream", "navy"],
    isNew: false,
  },
  {
    id: 8,
    name: "Ceramic Pour-Over Coffee Maker",
    description: "Elegant ceramic pour-over coffee maker for the perfect brew",
    price: 49.99,
    rating: 4.1,
    image: "/images/coffee-maker.png",
    category: "Kitchen",
    colors: ["white", "black"],
    isNew: true,
  },
  {
    id: 9,
    name: "Linen Bed Sheets Set",
    description: "Luxurious 100% linen bed sheet set for a comfortable sleep",
    price: 149.99,
    rating: 4.9,
    image: "/images/sheets.png",
    category: "Bedding",
    colors: ["white", "gray", "sage", "blush"],
    isNew: false,
  },
  {
    id: 10,
    name: "Bamboo Cutting Board Set",
    description: "Sustainable bamboo cutting board set, includes 3 sizes",
    price: 44.99,
    rating: 4.0,
    image: "/images/cutting-board.png",
    category: "Kitchen",
    colors: ["natural"],
    isNew: false,
  },
  {
    id: 11,
    name: "Leather Wallet",
    description: "Slim leather wallet with RFID protection",
    price: 59.99,
    rating: 4.5,
    image: "/images/wallet.png",
    category: "Accessories",
    colors: ["brown", "black"],
    isNew: false,
  },
  {
    id: 12,
    name: "Scented Soy Candle",
    description: "Hand-poured soy candle with essential oil fragrances",
    price: 29.99,
    rating: 4.3,
    image: "/images/candle.png",
    category: "Home Decor",
    colors: ["white"],
    isNew: true,
  },
]

// Available categories
const categories = Array.from(new Set(products.map((product) => product.category)))

// Available colors
const availableColors = Array.from(new Set(products.flatMap((product) => product.colors)))

export default function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [minRating, setMinRating] = useState(0)
  const [sortOption, setSortOption] = useState("featured")
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const isMobile = useMediaQuery("(max-width: 768px)")

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter((product) => product.colors.some((color) => selectedColors.includes(color)))
    }

    // Price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Rating filter
    if (minRating > 0) {
      result = result.filter((product) => product.rating >= minRating)
    }

    // New only filter
    if (showNewOnly) {
      result = result.filter((product) => product.isNew)
    }

    // Sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default: // featured - no specific sort
        break
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategories, selectedColors, priceRange, minRating, sortOption, showNewOnly])

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange([0, 200])
    setMinRating(0)
    setShowNewOnly(false)
    setSortOption("featured")
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const activeFilterCount =
    (selectedCategories.length > 0 ? 1 : 0) +
    (selectedColors.length > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (showNewOnly ? 1 : 0)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Shop All Products</h1>

        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {isMobile ? (
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex gap-2 whitespace-nowrap">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your product search</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <FilterSidebar
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    colors={availableColors}
                    selectedColors={selectedColors}
                    onColorChange={handleColorChange}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    minRating={minRating}
                    onRatingChange={setMinRating}
                    showNewOnly={showNewOnly}
                    onNewOnlyChange={setShowNewOnly}
                    sortOption={sortOption}
                    onSortOptionChange={setSortOption}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <select
              className="border rounded-md px-3 py-2 bg-white"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar - desktop only */}
        {!isMobile && (
          <div className="w-64 shrink-0">
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              colors={availableColors}
              selectedColors={selectedColors}
              onColorChange={handleColorChange}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              minRating={minRating}
              onRatingChange={setMinRating}
              showNewOnly={showNewOnly}
              onNewOnlyChange={setShowNewOnly}
              sortOption={sortOption}
              onSortOptionChange={setSortOption}
              onClearFilters={clearFilters}
            />
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
