"use client"

import { useState, useEffect } from "react"
import { Filter, Search, ChevronDown, X } from "lucide-react"
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import { useCart } from "./cart-context"
import type { Product } from "@/services/product-service"

type ShopifyCollectionProps = {
  products: Product[]
  title: string
  description?: string
  isLoading?: boolean
}

export default function ShopifyCollection({ products, title, description, isLoading = false }: ShopifyCollectionProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [sortOption, setSortOption] = useState("featured")
  const { addToCart } = useCart()

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    let result = [...products]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply brand filter
    if (selectedBrand) {
      result = result.filter((product) => product.tags === selectedBrand)
    }

    // Apply sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOption === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name))
    }

    setFilteredProducts(result)
  }, [products, searchTerm, selectedBrand, sortOption])

  // Get unique brands from products
  const brands = Array.from(new Set(products.map((product) => product.tags)))

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Collection Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        {description && <p className="text-gray-400 max-w-3xl mx-auto">{description}</p>}
      </div>

      {/* Filters and Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Filter size={18} />
              Filter
              <ChevronDown size={16} className={`transform transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 w-full md:w-64"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="w-full md:w-auto">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full md:w-auto px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="featured">Empfohlen</option>
              <option value="price-asc">Preis: Aufsteigend</option>
              <option value="price-desc">Preis: Absteigend</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-lg p-4 mb-6"
          >
            <h3 className="text-lg font-medium mb-4">Marke</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedBrand === null ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Alle
              </button>
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedBrand === brand ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden animate-pulse">
              <div className="h-64 bg-gray-800"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">Keine Produkte gefunden</h3>
          <p className="text-gray-400 mb-6">Versuchen Sie es mit anderen Suchbegriffen oder Filtern.</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedBrand(null)
              setSortOption("featured")
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  )
}
