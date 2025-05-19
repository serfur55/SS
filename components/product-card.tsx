"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, Send } from "lucide-react"
import { motion } from "framer-motion"

type ProductCardProps = {
  product: {
    id: number
    name: string
    price: number
    rating: number
    image: string
    sale?: boolean
    requiresInstallation?: boolean
    description: string
    categories?: string
    tags?: string
  }
  onAddToCart?: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Prüfen, ob das Produkt eine Einbau-Dienstleistung ist
  const requiresInstallation =
    product.requiresInstallation ||
    product.categories === "Ambientebeleuchtung" ||
    product.categories === "Sternenhimmel"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
    >
      <Link href={`/ambientebeleuchtung/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.sale && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">SALE</div>
          )}
          {requiresInstallation && (
            <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
              MIT EINBAU
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-blue-400">{product.tags}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                />
              ))}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">{product.price.toFixed(2)} €</span>

            {requiresInstallation ? (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  // Direkt zur Produktdetailseite navigieren
                }}
                className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <Send size={18} />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (onAddToCart) onAddToCart()
                }}
                className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <ShoppingCart size={18} />
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
