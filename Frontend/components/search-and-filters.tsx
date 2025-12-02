"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProductSearchResult {
  title: string
  price: string
  source: string
  thumbnail: string
  productApiId: string
  link: string
  snippet: string
  rating: string
}

interface SearchAndFiltersProps {
  onFiltered: (products: ProductSearchResult[]) => void
}

export default function SearchAndFilters({ onFiltered }: SearchAndFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (value: string) => {
    setSearchTerm(value)

    if (!value.trim()) {
      onFiltered([]) // si el input está vacío, limpiar resultados
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `https://desarrollo-web-integrado-back.onrender.com/api/search?query=${encodeURIComponent(
          value
        )}`
      )

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`)
      }

      const data: ProductSearchResult[] = await res.json()
      onFiltered(data)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Error desconocido")
      onFiltered([])
    } finally {
      setLoading(false)
    }
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setError(null)
    onFiltered([])
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar productos (ej: celulares, laptops...)"
            className="pl-12 py-3 rounded-lg transition-all duration-300 ease-out focus:shadow-lg"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {loading && <p>Cargando resultados...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="space-y-2">
          <Button variant="outline" onClick={handleClearFilters}>
            Limpiar búsqueda
          </Button>
        </div>
      </div>
    </section>
  )
}
