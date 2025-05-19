"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import ShopifyLayout from "@/components/shopify-layout"
import ShopifyCollection from "@/components/shopify-collection"

// Beispiel-Shop-Produkte (später durch Shopify-Daten ersetzen)
const shopProducts = [
  {
    id: 101,
    name: "LED Ambientebeleuchtung Nachrüstsatz",
    price: 49.99,
    rating: 4,
    image: "/placeholder.svg?key=7238o",
    description: "Universal LED Ambientebeleuchtung zum Selbsteinbau mit Fernbedienung und USB-Anschluss",
    categories: "Shop",
    tags: "Zubehör",
  },
  {
    id: 102,
    name: "Sternenhimmel LED Fasern Set",
    price: 129.99,
    rating: 5,
    image: "/placeholder.svg?key=42m1i",
    description: "300 Glasfasern mit LED-Lichtquelle für DIY Sternenhimmel-Projekte",
    categories: "Shop",
    tags: "Zubehör",
  },
  {
    id: 103,
    name: "RGB Controller für Ambientebeleuchtung",
    price: 29.99,
    rating: 4,
    image: "/placeholder.svg?key=k1uf1",
    description: "Bluetooth RGB Controller mit Smartphone App für individuelle Lichtsteuerung",
    categories: "Shop",
    tags: "Elektronik",
  },
  {
    id: 104,
    name: "Kabelbaum für Mercedes W205",
    price: 39.99,
    rating: 5,
    image: "/placeholder.svg?key=t125o",
    description: "Plug & Play Kabelbaum für die Nachrüstung der Ambientebeleuchtung im Mercedes W205",
    categories: "Shop",
    tags: "Mercedes",
  },
]

export default function ShopPage() {
  return (
    <ShopifyLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
          <Image src="/placeholder.svg?key=52bub" alt="Shop" fill className="object-cover" priority />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Shop</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-3xl"
            >
              Hochwertige Produkte für Ihr Fahrzeug zum Selbsteinbau
            </motion.p>
          </div>
        </div>

        {/* Product Collection */}
        <ShopifyCollection
          products={shopProducts}
          title="Shop Produkte"
          description="Entdecken Sie unsere Auswahl an hochwertigen Produkten zum Selbsteinbau und Zubehör für Ihr Fahrzeug."
        />
      </div>
    </ShopifyLayout>
  )
}
