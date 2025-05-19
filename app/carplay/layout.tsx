import type React from "react"
import ShopifyLayout from "@/components/shopify-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CarPlay & Android Auto | S&S Tuning",
  description:
    "Professionelle CarPlay & Android Auto Nachrüstung für Ihr Fahrzeug - Ohne Austausch des originalen Displays oder Systems.",
}

export default function CarPlayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ShopifyLayout>{children}</ShopifyLayout>
}
