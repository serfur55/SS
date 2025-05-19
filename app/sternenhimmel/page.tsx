"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Check, ChevronRight, Star, Sparkles, Clock, Euro, MessageSquare, Calendar, Phone } from "lucide-react"

// Canvas component for the starry sky animation
const StarrySkyCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Star properties
    const stars: {
      x: number
      y: number
      radius: number
      color: string
      alpha: number
      direction: number
      speed: number
    }[] = []

    // Create stars
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 1.5
      const hue = 210 + Math.random() * 40 // Blue to purple hues
      const saturation = 80 + Math.random() * 20
      const lightness = 70 + Math.random() * 30
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 1)`
      const alpha = Math.random() * 0.8 + 0.2
      const direction = Math.random() * Math.PI * 2
      const speed = Math.random() * 0.05 + 0.01

      stars.push({ x, y, radius, color, alpha, direction, speed })
    }

    // Create shooting stars
    const shootingStars: {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      opacity: number
      active: boolean
      trail: { x: number; y: number }[]
    }[] = []

    for (let i = 0; i < 3; i++) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3), // Start in top third
        length: 50 + Math.random() * 100,
        speed: 5 + Math.random() * 10,
        angle: Math.PI / 4 + Math.random() * (Math.PI / 2), // Angle between 45 and 135 degrees
        opacity: 0,
        active: false,
        trail: [],
      })
    }

    // Create nebula clouds
    const nebulae: {
      x: number
      y: number
      radius: number
      color: string
      alpha: number
    }[] = []

    for (let i = 0; i < 5; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = 50 + Math.random() * 150
      const hue = 200 + Math.random() * 60 // Blue to purple hues
      const color = `hsla(${hue}, 70%, 50%, 0.03)`
      const alpha = 0.02 + Math.random() * 0.05

      nebulae.push({ x, y, radius, color, alpha })
    }

    // Animation loop
    let animationFrameId: number
    let lastShootingStarTime = 0

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw nebulae
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        gradient.addColorStop(0, nebula.color.replace("0.03", `${nebula.alpha}`))
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw and update stars
      stars.forEach((star) => {
        // Twinkle effect
        star.alpha = 0.2 + Math.abs(Math.sin(time * 0.001 * star.speed) * 0.8)

        ctx.fillStyle = star.color.replace("1)", `${star.alpha})`)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        // Subtle movement
        star.x += Math.cos(star.direction) * star.speed
        star.y += Math.sin(star.direction) * star.speed

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0
      })

      // Handle shooting stars
      if (time - lastShootingStarTime > 3000 + Math.random() * 5000) {
        const inactiveStar = shootingStars.find((star) => !star.active)
        if (inactiveStar) {
          inactiveStar.x = Math.random() * canvas.width
          inactiveStar.y = Math.random() * (canvas.height / 3)
          inactiveStar.angle = Math.PI / 4 + Math.random() * (Math.PI / 2)
          inactiveStar.opacity = 1
          inactiveStar.active = true
          inactiveStar.trail = []
          lastShootingStarTime = time
        }
      }

      // Draw and update shooting stars
      shootingStars.forEach((star) => {
        if (!star.active) return

        // Update position
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed

        // Add to trail
        star.trail.unshift({ x: star.x, y: star.y })
        if (star.trail.length > 20) star.trail.pop()

        // Draw trail
        ctx.strokeStyle = `rgba(180, 210, 255, ${star.opacity})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)

        for (let i = 0; i < star.trail.length; i++) {
          const point = star.trail[i]
          const opacity = (1 - i / star.trail.length) * star.opacity
          ctx.strokeStyle = `rgba(180, 210, 255, ${opacity})`
          ctx.lineTo(point.x, point.y)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
        }

        // Check if out of bounds
        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
          star.active = false
          star.opacity = 0
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

// Feature card component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mb-4 text-blue-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

// Process step component
const ProcessStep = ({ number, title, description }) => {
  return (
    <motion.div
      className="flex gap-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center text-xl font-bold text-blue-400">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

// Main component
export default function SternenhimmelPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <StarrySkyCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-10"></div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium">
              PREMIUM INTERIEUR
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Exklusiver{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Sternenhimmel
            </span>{" "}
            für Ihr Fahrzeug
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Erleben Sie ein völlig neues Raumgefühl mit unserem exklusiven Sternenhimmel-Umbau. Hochwertige Glasfasern
            und LED-Technik verwandeln Ihren Dachhimmel in ein beeindruckendes Sternenzelt.
          </p>

          <div className="mt-8 mb-16">
            <p className="text-blue-400 font-medium mb-2">Preise ab</p>
            <p className="text-4xl md:text-5xl font-bold mb-8">749 €</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium text-lg hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
              >
                Jetzt anfragen <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#details"
                className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-400 rounded-full font-medium text-lg hover:bg-blue-900/20 transition-all flex items-center justify-center"
              >
                Mehr erfahren
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-black to-black"></div>
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
              LUXUS-UPGRADE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ihr persönlicher{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Sternenhimmel
              </span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Wir integrieren hochwertige Glasfasern und LED-Technik in den Dachhimmel Ihres Autos, sodass es bei
              Dunkelheit aussieht, als würden Sie unter einem echten Sternenzelt sitzen. Im Tageslicht kaum zu erkennen
              und kaum spürbar durch unsere professionelle Einbau-Technik!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image src="/images/starlight-interior-1.png" alt="Sternenhimmel im Auto" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                Erleben Sie ein{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  magisches Ambiente
                </span>
              </h3>
              <p className="text-gray-300">
                Unser exklusiver Sternenhimmel-Umbau verwandelt Ihr Fahrzeug in einen Ort der Entspannung und des Luxus.
                Die präzise eingearbeiteten Lichtpunkte erzeugen eine Atmosphäre, die Ihre Fahrt zu einem besonderen
                Erlebnis macht.
              </p>
              <ul className="space-y-4">
                {[
                  "Individuelle Planung und Farbwahl (auch mehrere Farben möglich)",
                  'Optionale „Funkel-Effekte" durch spezielle LED-Module',
                  "Hochwertige Verarbeitung und Original-Optik im Innenraum",
                  "Steuerung per App oder Fernbedienung",
                  "Komplett-Montage bei unserem Standort oder bei ausgewählten Partnern",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-blue-400" />
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="py-20 px-4 relative bg-gray-950">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
              UNSER SERVICE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Exklusive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Leistungen
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Individuelle Gestaltung"
              description="Wählen Sie aus verschiedenen Farben und Effekten für Ihren persönlichen Sternenhimmel. Mehrfarbige Designs und spezielle Muster sind möglich."
            />
            <FeatureCard
              icon={<Star className="h-6 w-6" />}
              title="Funkel-Effekte"
              description="Optionale dynamische Lichteffekte lassen Ihren Sternenhimmel wie echt erscheinen, mit funkelnden Sternen und sanften Übergängen."
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="Professioneller Einbau"
              description="Unsere Experten sorgen für eine perfekte Integration in Ihren Fahrzeugdachhimmel - im Tageslicht kaum zu erkennen."
            />
            <FeatureCard
              icon={<Euro className="h-6 w-6" />}
              title="Wertsteigerung"
              description="Ein Sternenhimmel-Umbau erhöht nicht nur den Komfort, sondern auch den Wert Ihres Fahrzeugs durch die exklusive Ausstattung."
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Persönliche Beratung"
              description="Wir beraten Sie ausführlich zu allen Möglichkeiten und finden gemeinsam die perfekte Lösung für Ihr Fahrzeug."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Schnelle Umsetzung"
              description="Je nach Fahrzeugtyp und gewünschter Ausstattung dauert der Umbau nur ca. 1–2 Tage für ein perfektes Ergebnis."
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
              ABLAUF
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Wie läuft der{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Einbau ab?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="space-y-12 relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-transparent"></div>

            <ProcessStep
              number="1"
              title="Beratung & Planung"
              description="Zunächst besprechen Sie mit unserem Team, wie viele Lichtpunkte und welche Farbvarianten Sie wünschen. Wir beraten Sie zu allen Möglichkeiten und erstellen ein individuelles Konzept."
            />

            <ProcessStep
              number="2"
              title="Demontage des Dachhimmels"
              description="Ihr Fahrzeugdachhimmel wird professionell und schonend demontiert, um die optimale Basis für die Installation zu schaffen."
            />

            <ProcessStep
              number="3"
              title="Installation der Glasfasern"
              description="Die hochwertigen Glasfasern werden präzise im Dachhimmel platziert und mit der LED-Technik verbunden, um ein gleichmäßiges und beeindruckendes Lichtbild zu erzeugen."
            />

            <ProcessStep
              number="4"
              title="Integration der Steuerungseinheit"
              description="Die Steuerungseinheit wird unauffällig im Fahrzeug integriert und mit der Stromversorgung verbunden. Je nach Wunsch installieren wir eine App-Steuerung oder Fernbedienung."
            />

            <ProcessStep
              number="5"
              title="Qualitätsprüfung & Übergabe"
              description="Nach einer gründlichen Qualitätsprüfung übergeben wir Ihnen Ihr Fahrzeug mit dem neuen Sternenhimmel. Sie erhalten eine ausführliche Einweisung zur Bedienung."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 relative bg-gray-950">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
              PREISE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Preisgestaltung
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6 mb-8"></div>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Die Kosten für Ihren individuellen Sternenhimmel richten sich nach der Anzahl der Lichtpunkte, der
              Farbwahl und weiteren Extras.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-blue-900/20 to-black backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Preise ab</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl md:text-6xl font-bold text-blue-400">749</span>
                  <span className="text-2xl md:text-3xl font-bold text-blue-400 ml-1">€</span>
                </div>
              </div>
              <div className="h-px w-full md:h-20 md:w-px bg-blue-500/20"></div>
              <div className="text-center md:text-left">
                <p className="text-lg text-gray-300">Individuell angepasst an Ihr Fahrzeug und Ihre Wünsche</p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Einflussfaktoren auf den Preis:</h4>
              <ul className="space-y-4">
                {[
                  "Anzahl der Lichtpunkte (Sterne)",
                  "Gewünschte Farboptionen (einfarbig oder mehrfarbig)",
                  "Spezialeffekte (z.B. Funkel-Effekt, Sternschnuppen)",
                  "Art der Steuerung (manuell, Fernbedienung oder App)",
                  "Fahrzeugtyp und Größe des Dachhimmels",
                ].map((factor, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-blue-400" />
                    </span>
                    <span className="text-gray-300">{factor}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-8 border-t border-blue-500/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-300">Für ein individuelles Angebot kontaktieren Sie uns:</p>
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 71, 204, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Kostenlose Beratung
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      {/* Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-black/80 to-black"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 blur-lg opacity-70 animate-pulse-slow"></div>
              <div className="relative w-full h-full rounded-full bg-black/50 border-2 border-blue-500 flex items-center justify-center">
                <Phone className="w-10 h-10 text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Bereit für Ihren{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Sternenhimmel?
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kontaktieren Sie uns jetzt für eine persönliche Beratung und ein individuelles Angebot. Wir freuen uns
            darauf, Ihr Fahrzeug mit einem exklusiven Sternenhimmel auszustatten.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium text-lg hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 71, 204, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              Termin vereinbaren
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-400 rounded-full font-medium text-lg hover:bg-blue-900/20 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 71, 204, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              +49 152 2188 2862
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
