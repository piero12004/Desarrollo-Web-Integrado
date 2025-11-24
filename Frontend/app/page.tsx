'use client'

import { useState } from 'react'
import Header from '@/components/header'
import CarouselProducts from '@/components/carousel-products'
import SearchAndFilters from '@/components/search-and-filters'
import ProductsGrid from '@/components/products-grid'
import LoginForm from '@/components/login-form'
import RegisterForm from '@/components/register-form'

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick auth forms for local testing */}
        <div className="mb-6">
          <LoginForm />
          <RegisterForm />
        </div>

        <CarouselProducts />
        <SearchAndFilters onFiltered={setFilteredProducts} />
        <ProductsGrid products={filteredProducts} />
      </div>
    </main>
  )
}
