"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Settings, PenToolIcon as Tool, Zap, Shield, Gauge } from "lucide-react"

// Komponente für die Codierungskategorie
const CodingCategory = ({ title, icon, description, items, color = "blue" }) => {
  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 md:p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${color}-600/10 rounded-full blur-3xl`}></div>
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div
            className={`w-12 h-12 rounded-lg bg-${color}-900/50 flex items-center justify-center mr-4 text-${color}-400`}
          >
            {icon}
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>

        <p className="text-gray-300 mb-6">{description}</p>

        <ul className="space-y-3">
          {items.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full bg-${color}-900/50 border border-${color}-500 flex items-center justify-center mr-3 mt-0.5`}
              >
                <Check className="h-3 w-3 text-blue-400" />
              </span>
              <span className="text-gray-300">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function CodierungenPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Codierungsdaten
  const codingData = {
    vag: {
      title: "VW / VAG Codierungen",
      description: "Professionelle Codierungen für VW, Seat, Skoda, Audi und Porsche Fahrzeuge",
      items: [
        "Apple CarPlay / Android Auto Freischaltung (Wireless & Kabel)",
        "Start-Stopp Automatik dauerhaft deaktivieren",
        "Sicherheitsgurt-Warnung deaktivieren",
        "Navigationsupdate für neueste Karten & Funktionen",
        "USA-zu-Europa-Umstellung (Radiofrequenz, Temp, Ganganzeige, Meilen/km)",
        "Firmware-Updates für Multimediasysteme",
        "Virtual Cockpit Aktivierung (Sport & RS-Ansichten)",
        "Easy Entry (Lenkrad & Sitz fahren automatisch zurück)",
        "Diverse Anpassungen & Komfortfunktionen",
      ],
    },
    mercedes: {
      title: "Mercedes Codierungen",
      description: "Maßgeschneiderte Codierungen und Freischaltungen für alle Mercedes-Benz Modelle",
      items: [
        "AMG Tacho-Menü Aktivierung",
        "Apple CarPlay / Android Auto Freischaltung",
        "Start-Stopp Automatik dauerhaft deaktivieren",
        "Sicherheitsgurt-Warnung deaktivieren",
        "VIM (Video in Motion) – Video während der Fahrt freischalten",
        "Ambiente-Farben erweitern (mehr Farben statt Werkseinstellung)",
        "USA-zu-Europa-Umstellung (Radiofrequenz, Temp-Anzeige, Navigation, Meilen in km)",
        "Launch Control Freischaltung (bei bestimmten AMG-Modellen)",
        "Ganganzeige im Tacho aktivieren (D1, D2, usw.)",
        "Komfortschließen der Fenster & Schiebedach über Schlüssel",
        "Lenkradheizung dauerhaft aktivierbar machen",
        "Sport-Sound-Modifikationen für Auspuffklappensteuerung",
      ],
    },
    bmw: {
      title: "BMW Codierungen",
      description: "Umfassende Codierungslösungen für alle BMW Baureihen und Modelle",
      items: [
        "Apple CarPlay / Android Auto Freischaltung (Wireless & Kabel)",
        "Start-Stopp Automatik dauerhaft deaktivieren",
        "M Performance Tacho / Sport-Anzeigen freischalten",
        "Video in Motion (VIM) – Video während der Fahrt freischalten",
        "US-Standlicht / Blinker als Begrenzungslicht",
        "Launch Control Aktivierung (bei bestimmten Modellen)",
        "Sportlenkung & Servolenkung-Modifikation",
        "Klappensteuerung für Auspuffsteuerung freischalten",
        "Gurtwarner deaktivieren",
        "Ambiente-Beleuchtung mit mehr Farben aktivieren",
        "MirrorLink für App-Streaming auf dem Display aktivieren",
        "Easy Entry für Sitze & Lenkrad freischalten",
      ],
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          {/* Background with tech pattern */}
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

          {/* Code-like animated elements */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="absolute text-blue-500/30 text-xs md:text-sm font-mono"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.2,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animation: `fadeIn ${Math.random() * 5 + 3}s infinite alternate ${Math.random() * 2}s`,
                }}
              >
                {
                  ["01001", "10110", "function()", "coding", "activate()", "{config}", "<enable>", "0xFF"][
                    Math.floor(Math.random() * 8)
                  ]
                }
              </div>
            ))}
          </div>

          {/* Animated lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
                style={{
                  top: `${10 + index * 10}%`,
                  left: 0,
                  right: 0,
                  animationDuration: `${8 + index * 2}s`,
                  animationDelay: `${index * 0.5}s`,
                  animation: "glow-line-animation 8s infinite",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-10"></div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium">
              SOFTWARE UPGRADE
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Professionelle{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Codierungen
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Wir bieten professionelle Codierungen und Freischaltungen für eine Vielzahl von Funktionen. Ob
            Komfortfeatures, Multimedia-Updates oder Anpassungen an deinem Fahrzeug – wir machen es möglich!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="#coding-options"
              className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium text-lg hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("coding-options")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Alle Optionen <ChevronRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-400 rounded-full font-medium text-lg hover:bg-blue-900/20 transition-all flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Anfrage stellen
            </a>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 relative" id="coding-options">
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
              UNSERE LEISTUNGEN
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Fahrzeug{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Codierungen
              </span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Mit unseren professionellen Codierungen schalten wir versteckte Funktionen frei und passen Ihr Fahrzeug
              individuell an Ihre Wünsche an. Wir nutzen Originaldiagnosegeräte und modernste Software für optimale
              Ergebnisse.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sicher & Professionell</h3>
                <p className="text-gray-400">
                  Alle Codierungen werden mit Originaldiagnosegeräten und professioneller Software durchgeführt. Keine
                  Schäden am Steuergerät oder der Elektronik.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mb-4 text-blue-400">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Schnell & Unkompliziert</h3>
                <p className="text-gray-400">
                  Die meisten Codierungen sind innerhalb von 30-60 Minuten abgeschlossen. Kein langwieriger
                  Werkstattaufenthalt notwendig.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mb-4 text-blue-400">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Individuell Anpassbar</h3>
                <p className="text-gray-400">
                  Wir beraten Sie zu allen verfügbaren Optionen für Ihr Fahrzeugmodell und erstellen ein
                  maßgeschneidertes Paket nach Ihren Wünschen.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Coding Categories */}
          <div className="space-y-12">
            <CodingCategory
              title={codingData.mercedes.title}
              icon={<Gauge className="h-6 w-6" />}
              description={codingData.mercedes.description}
              items={codingData.mercedes.items}
              color="blue"
            />

            <CodingCategory
              title={codingData.bmw.title}
              icon={<Settings className="h-6 w-6" />}
              description={codingData.bmw.description}
              items={codingData.bmw.items}
              color="blue"
            />

            <CodingCategory
              title={codingData.vag.title}
              icon={<Tool className="h-6 w-6" />}
              description={codingData.vag.description}
              items={codingData.vag.items}
              color="blue"
            />
          </div>

          {/* Additional Info */}
          <motion.div
            className="mt-16 bg-blue-900/20 border border-blue-600/30 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Und vieles mehr...</h3>
            <p className="text-gray-300">
              Die oben aufgeführten Codierungen sind nur eine Auswahl unserer häufigsten Leistungen. Für viele
              Fahrzeugmodelle bieten wir weitere spezifische Anpassungen und Freischaltungen an. Kontaktieren Sie uns
              mit Ihrem konkreten Wunsch – wir finden die passende Lösung für Ihr Fahrzeug!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
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
              ABLAUF
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              So läuft eine{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                Codierung ab
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center mb-4 text-blue-400 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Beratung & Auswahl</h3>
                <p className="text-gray-400">
                  Wir besprechen Ihre Wünsche und prüfen die verfügbaren Optionen für Ihr spezifisches Fahrzeugmodell.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center mb-4 text-blue-400 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Diagnose & Codierung</h3>
                <p className="text-gray-400">
                  Mit professionellen Diagnosegeräten führen wir die gewünschten Codierungen und Freischaltungen durch.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center mb-4 text-blue-400 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Test & Übergabe</h3>
                <p className="text-gray-400">
                  Wir testen alle aktivierten Funktionen und erklären Ihnen die Bedienung der neuen Features.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Häufig gestellte{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Fragen</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Ist die Codierung für mein Fahrzeug geeignet?",
                answer:
                  "Wir bieten Codierungen für die meisten Mercedes, BMW und VAG-Fahrzeuge an. Die Verfügbarkeit bestimmter Funktionen hängt vom Modell, Baujahr und der vorhandenen Ausstattung ab. Kontaktieren Sie uns mit Ihren Fahrzeugdaten für eine individuelle Beratung.",
              },
              {
                question: "Verliere ich die Garantie durch eine Codierung?",
                answer:
                  "Die meisten unserer Codierungen sind nicht-invasiv und hinterlassen keine dauerhaften Spuren. Bei Garantiefällen können wir die Codierungen rückgängig machen. Bei leistungssteigernden Modifikationen sollten Sie jedoch beachten, dass diese die Herstellergarantie beeinflussen können.",
              },
              {
                question: "Wie lange dauert eine Codierung?",
                answer:
                  "Die meisten Codierungen können innerhalb von 30-60 Minuten durchgeführt werden. Bei umfangreicheren Paketen oder mehreren Fahrzeugen planen wir entsprechend mehr Zeit ein.",
              },
              {
                question: "Kann ich mehrere Codierungen gleichzeitig durchführen lassen?",
                answer:
                  "Ja, wir bieten auch Codierungspakete an, bei denen mehrere Funktionen gleichzeitig freigeschaltet werden. Dies ist oft kostengünstiger als einzelne Codierungen.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden" id="contact">
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
                <Settings className="w-10 h-10 text-blue-400" />
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
            Bereit für Ihr{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Fahrzeug-Upgrade?
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kontaktieren Sie uns jetzt für eine persönliche Beratung und ein individuelles Angebot. Wir prüfen die
            Kompatibilität mit Ihrem Fahrzeug und beraten Sie zu allen verfügbaren Optionen.
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
          <p className="text-sm text-gray-300">Telefon: +49 152 2188 2862</p>
        </div>
      </section>
    </div>
  )
}
