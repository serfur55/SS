"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import ShopifyCollection from "@/components/shopify-collection"
import { getProductsByCategory } from "@/services/product-service-client"
import type { Product } from "@/services/product-service"

export default function AmbientebeleuchtungPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    async function loadProducts() {
      try {
        // Produkte der Kategorie "Ambientebeleuchtung" laden
        const ambienteProducts = await getProductsByCategory("Ambientebeleuchtung")
        setProducts(ambienteProducts)
      } catch (error) {
        console.error("Fehler beim Laden der Produkte:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window
        canvas.width = width * ratio
        canvas.height = height * ratio
        ctx.scale(ratio, ratio)
        return true
      }
      return false
    }
    setCanvasDimensions()

    // Create ambient light lines
    const lines: {
      x: number
      y: number
      length: number
      angle: number
      speed: number
      width: number
      hue: number
      saturation: number
      lightness: number
      alpha: number
      direction: number
    }[] = []

    const createLines = () => {
      const lineCount = Math.floor(canvas.width / 40)

      for (let i = 0; i < lineCount; i++) {
        lines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 150 + 100,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.5 + 0.1,
          width: Math.random() * 3 + 1,
          hue: Math.random() * 60 + 200, // Blue to purple range
          saturation: 100,
          lightness: 50,
          alpha: Math.random() * 0.5 + 0.2,
          direction: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }
    createLines()

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw car interior silhouette
      drawCarInterior(ctx, canvas.width, canvas.height)

      // Update and draw lines
      lines.forEach((line) => {
        // Update position
        line.angle += line.speed * 0.01 * line.direction

        // Draw line
        const startX = line.x
        const startY = line.y
        const endX = startX + Math.cos(line.angle) * line.length
        const endY = startY + Math.sin(line.angle) * line.length

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
        gradient.addColorStop(0, `hsla(${line.hue}, ${line.saturation}%, ${line.lightness}%, ${line.alpha})`)
        gradient.addColorStop(1, `hsla(${line.hue + 30}, ${line.saturation}%, ${line.lightness}%, 0)`)

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.lineWidth = line.width
        ctx.strokeStyle = gradient
        ctx.lineCap = "round"
        ctx.stroke()

        // Reset if out of bounds
        if (
          startX < -line.length ||
          startX > canvas.width + line.length ||
          startY < -line.length ||
          startY > canvas.height + line.length
        ) {
          line.x = Math.random() * canvas.width
          line.y = Math.random() * canvas.height
          line.hue = Math.random() * 60 + 200 // Blue to purple range
        }
      })

      // Add glow effect
      addGlowEffect(ctx, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    // Draw car interior silhouette
    const drawCarInterior = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.save()

      // Dashboard
      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.6)
      ctx.lineTo(width * 0.9, height * 0.6)
      ctx.lineTo(width * 0.85, height * 0.4)
      ctx.lineTo(width * 0.15, height * 0.4)
      ctx.closePath()
      ctx.fillStyle = "rgba(20, 20, 20, 0.7)"
      ctx.fill()

      // Center console
      ctx.beginPath()
      ctx.moveTo(width * 0.45, height * 0.6)
      ctx.lineTo(width * 0.55, height * 0.6)
      ctx.lineTo(width * 0.55, height * 0.9)
      ctx.lineTo(width * 0.45, height * 0.9)
      ctx.closePath()
      ctx.fillStyle = "rgba(25, 25, 25, 0.7)"
      ctx.fill()

      // Steering wheel
      ctx.beginPath()
      ctx.arc(width * 0.3, height * 0.7, width * 0.08, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(40, 40, 40, 0.8)"
      ctx.lineWidth = 5
      ctx.stroke()

      // Dashboard display
      ctx.beginPath()
      ctx.rect(width * 0.35, height * 0.45, width * 0.3, height * 0.1)
      ctx.fillStyle = "rgba(10, 10, 10, 0.9)"
      ctx.fill()

      ctx.restore()
    }

    // Add glow effect
    const addGlowEffect = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Dashboard glow
      const dashboardGradient = ctx.createLinearGradient(width * 0.1, height * 0.4, width * 0.9, height * 0.4)
      dashboardGradient.addColorStop(0, "rgba(0, 80, 255, 0)")
      dashboardGradient.addColorStop(0.5, "rgba(0, 80, 255, 0.15)")
      dashboardGradient.addColorStop(1, "rgba(0, 80, 255, 0)")

      ctx.beginPath()
      ctx.moveTo(width * 0.1, height * 0.6)
      ctx.lineTo(width * 0.9, height * 0.6)
      ctx.lineTo(width * 0.85, height * 0.4)
      ctx.lineTo(width * 0.15, height * 0.4)
      ctx.closePath()
      ctx.fillStyle = dashboardGradient
      ctx.fill()

      // Door panel glow (left)
      ctx.beginPath()
      ctx.moveTo(width * 0.05, height * 0.3)
      ctx.lineTo(width * 0.05, height * 0.8)
      ctx.lineTo(width * 0.15, height * 0.7)
      ctx.lineTo(width * 0.15, height * 0.4)
      ctx.closePath()
      ctx.fillStyle = "rgba(80, 0, 255, 0.1)"
      ctx.fill()

      // Door panel glow (right)
      ctx.beginPath()
      ctx.moveTo(width * 0.95, height * 0.3)
      ctx.lineTo(width * 0.95, height * 0.8)
      ctx.lineTo(width * 0.85, height * 0.7)
      ctx.lineTo(width * 0.85, height * 0.4)
      ctx.closePath()
      ctx.fillStyle = "rgba(0, 120, 255, 0.1)"
      ctx.fill()
    }

    // Handle resize
    const handleResize = () => {
      if (setCanvasDimensions()) {
        lines.length = 0
        createLines()
      }
    }

    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Canvas Animation */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black z-10" />

        {/* Floating particles */}
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-blue-500 opacity-70 animate-float"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(59, 130, 246, 0.8)`,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 blur-xl opacity-70 animate-pulse-slow"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-12 h-12 text-blue-400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 18.5V19.5M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5M12 18.5C10.6193 18.5 9.5 17.3807 9.5 16C9.5 14.6193 10.6193 13.5 12 13.5M12 13.5V12.5M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Ambientebeleuchtung
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl max-w-3xl"
          >
            Professionelle Nachrüstung für ein einzigartiges Fahrerlebnis
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium text-lg hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30">
              JETZT ENTDECKEN
            </button>
          </motion.div>
        </div>
      </div>

      {/* Product Collection */}
      <ShopifyCollection
        products={products}
        title="Ambientebeleuchtung Produkte"
        description="Entdecken Sie unsere professionellen Nachrüstlösungen für Ambientebeleuchtung in verschiedenen Fahrzeugmodellen."
        isLoading={isLoading}
      />
    </div>
  )
}
