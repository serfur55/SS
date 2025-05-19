import productsData from "@/data/products.json"
import type { Product } from "./product-service"

// Funktion zum Laden aller Produkte (Client-seitig)
export async function getAllProducts(): Promise<Product[]> {
  try {
    // Produkte aus der products.json
    const productsFromJson = productsData.products

    // Produkte aus einzelnen Dateien laden (über API-Route)
    const response = await fetch("/api/products")
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Produkte")
    }

    const productsFromFiles = await response.json()

    // Alle Produkte zusammenführen
    return [...productsFromJson, ...productsFromFiles]
  } catch (error) {
    console.error("Fehler beim Laden der Produkte:", error)
    // Im Fehlerfall zumindest die Produkte aus der JSON zurückgeben
    return productsData.products
  }
}

// Funktion zum Laden eines Produkts anhand der ID (Client-seitig)
export async function getProductById(id: number): Promise<Product | null> {
  try {
    // Zuerst in der products.json suchen
    const productFromJson = productsData.products.find((product) => product.id === id)
    if (productFromJson) {
      return productFromJson
    }

    // Wenn nicht gefunden, über API-Route suchen
    const response = await fetch(`/api/products/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error("Fehler beim Laden des Produkts")
    }

    return await response.json()
  } catch (error) {
    console.error("Fehler beim Laden des Produkts:", error)
    return null
  }
}

// Funktion zum Laden aller Produkte einer bestimmten Kategorie (Client-seitig)
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts()
    return allProducts.filter((product) => product.categories === category)
  } catch (error) {
    console.error("Fehler beim Laden der Produkte nach Kategorie:", error)
    // Im Fehlerfall zumindest die Produkte aus der JSON zurückgeben, die zur Kategorie passen
    return productsData.products.filter((product) => product.categories === category)
  }
}
