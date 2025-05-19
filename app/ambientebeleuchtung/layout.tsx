import type React from "react"
import ShopifyLayout from "@/components/shopify-layout"

export default function AmbientebeleuchtungLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ShopifyLayout>{children}</ShopifyLayout>
}
