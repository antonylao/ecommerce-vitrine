

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star } from "lucide-react"

type FilterSidebarProps = {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (category: string) => void
  colors: string[]
  selectedColors: string[]
  onColorChange: (color: string) => void
  priceRange: number[]
  onPriceRangeChange: (range: number[]) => void
  minRating: number
  onRatingChange: (rating: number) => void
  showNewOnly: boolean
  onNewOnlyChange: (value: boolean) => void
  sortOption: string
  onSortOptionChange: (option: string) => void
  onClearFilters: () => void
}

export function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  colors,
  selectedColors,
  onColorChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onRatingChange,
  showNewOnly,
  onNewOnlyChange,
  sortOption,
  onSortOptionChange,
  onClearFilters,
}: FilterSidebarProps) {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 200 ||
    minRating > 0 ||
    showNewOnly

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filtres</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Tout effacer
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "colors", "rating"]}>
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">Catégories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => onCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Prix</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[0, 200]}
                min={0}
                max={200}
                step={5}
                value={priceRange}
                onValueChange={onPriceRangeChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">{priceRange[0]} $</span>
                <span className="text-sm">{priceRange[1]} $</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem value="colors">
          <AccordionTrigger className="text-sm font-medium">Couleurs</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={selectedColors.includes(color)}
                    onCheckedChange={() => onColorChange(color)}
                  />
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color === "natural" ? "#e9d8c4" : color }}
                    />
                    <Label htmlFor={`color-${color}`} className="text-sm font-normal capitalize cursor-pointer">
                      {color}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">Note</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={minRating === rating}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onRatingChange(rating)
                      } else if (minRating === rating) {
                        onRatingChange(0)
                      }
                    }}
                  />
                  <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer flex items-center">
                    <div className="flex">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                    <span className="ml-1">et plus</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Mobile-only sort options */}
        <AccordionItem value="sort" className="md:hidden">
          <AccordionTrigger className="text-sm font-medium">Trier par</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {[
                { value: "featured", label: "En vedette" },
                { value: "price-asc", label: "Prix : croissant" },
                { value: "price-desc", label: "Prix : décroissant" },
                { value: "rating", label: "Mieux notés" },
                { value: "newest", label: "Nouveautés" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sort-${option.value}`}
                    checked={sortOption === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onSortOptionChange(option.value)
                      }
                    }}
                  />
                  <Label htmlFor={`sort-${option.value}`} className="text-sm font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* New arrivals toggle */}
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="new-only" checked={showNewOnly} onCheckedChange={(checked) => onNewOnlyChange(!!checked)} />
        <Label htmlFor="new-only" className="text-sm font-normal cursor-pointer">
          Nouveautés uniquement
        </Label>
      </div>
    </div>
  )
}
