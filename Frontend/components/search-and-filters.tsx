"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const MOCK_PRODUCTS = [
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

interface SearchAndFiltersProps {
  onFiltered: (products: any[]) => void
}

export default function SearchAndFilters({ onFiltered }: SearchAndFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [showSaleOnly, setShowSaleOnly] = useState(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    applyFilters(value, sortBy, selectedCategory, showSaleOnly)
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    applyFilters(searchTerm, value, selectedCategory, showSaleOnly)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    applyFilters(searchTerm, sortBy, category, showSaleOnly)
  }

  const handleSaleFilter = (checked: boolean) => {
    setShowSaleOnly(checked)
    applyFilters(searchTerm, sortBy, selectedCategory, checked)
  }

  const applyFilters = (search: string, sort: string, category: string, saleOnly: boolean) => {
    let filtered = MOCK_PRODUCTS

    if (search) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category !== "todos") {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (saleOnly) {
      filtered = filtered.filter((p) => p.onSale)
    }

    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "relevance":
      default:
        break
    }

    onFiltered(filtered)
  }

  const categories = ["todos", "Celulares", "Laptops", "Tablets", "Accesorios"]

  const handleClearFilters = () => {
    setSearchTerm("")
    setSortBy("relevance")
    setSelectedCategory("todos")
    setShowSaleOnly(false)
    onFiltered(MOCK_PRODUCTS)
  }

  return (
    <section className="mb-12">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar productos (ej: celulares, laptops, mouses...)"
            className="pl-12 py-3 rounded-lg transition-all duration-300 ease-out focus:shadow-lg"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Categoría</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out hover:shadow-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Ordenar por</label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-out hover:shadow-md"
          >
            <option value="relevance">Relevancia</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="rating">Mejor calificados</option>
          </select>
        </div>

        {/* Sale Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Filtros</label>
          <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted cursor-pointer transition-all duration-300 ease-out hover:shadow-md">
            <input
              type="checkbox"
              checked={showSaleOnly}
              onChange={(e) => handleSaleFilter(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm font-medium text-foreground">Solo en oferta</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground invisible">.</label>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="w-full transition-all duration-300 ease-out hover:shadow-md hover:scale-105 bg-transparent"
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    </section>
  )
}
