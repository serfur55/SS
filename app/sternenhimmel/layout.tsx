import type React from "react"
import ShopifyLayout from "@/components/shopify-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sternenhimmel | S&S Tuning",
  description:
    "Exklusiver Sternenhimmel-Umbau für Ihr Fahrzeug - Erleben Sie ein völlig neues Raumgefühl mit unserer hochwertigen LED-Technik.",
}

export default function SternenhimmelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ShopifyLayout>{children}</ShopifyLayout>
}
