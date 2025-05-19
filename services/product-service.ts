import productsData from "@/data/products.json"
import fs from "fs"
import path from "path"

export type Product = {
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
  gallery?: string[]
  options?: Record<string, Array<{ name: string; price: number }>>
  info?: {
    Funktionen?: string[]
    "Grundpaket-Inhalt"?: string[]
    Hinweise?: string[]
    [key: string]: string[] | undefined
  }
}

// Diese Funktion lädt alle Produkte aus der products.json und den einzelnen Dateien
export async function getAllProducts(): Promise<Product[]> {
  // Produkte aus der products.json laden
  const productsFromJson = productsData.products

  // Produkte aus einzelnen Dateien laden
  const productsFromFiles: Product[] = []

  try {
    // Prüfen, ob der Ordner existiert (für die Entwicklungsumgebung)
    const productsDir = path.join(process.cwd(), "data/products")
    if (fs.existsSync(productsDir)) {
      const files = fs.readdirSync(productsDir)

      for (const file of files) {
        if (file.endsWith(".json")) {
          const filePath = path.join(productsDir, file)
          const fileContent = fs.readFileSync(filePath, "utf8")
          const product = JSON.parse(fileContent) as Product
          productsFromFiles.push(product)
        }
      }
    }
  } catch (error) {
    console.error("Fehler beim Laden der Produktdateien:", error)
  }

  // Alle Produkte zusammenführen
  return [...productsFromJson, ...productsFromFiles]
}

// Diese Funktion lädt ein einzelnes Produkt anhand der ID
export async function getProductById(id: number): Promise<Product | null> {
  // Zuerst in der products.json suchen
  const productFromJson = productsData.products.find((product) => product.id === id)
  if (productFromJson) {
    return productFromJson
  }

  // Wenn nicht gefunden, in den einzelnen Dateien suchen
  try {
    const productsDir = path.join(process.cwd(), "data/products")
    if (fs.existsSync(productsDir)) {
      const files = fs.readdirSync(productsDir)

      for (const file of files) {
        if (file.endsWith(".json")) {
          const filePath = path.join(productsDir, file)
          const fileContent = fs.readFileSync(filePath, "utf8")
          const product = JSON.parse(fileContent) as Product

          if (product.id === id) {
            return product
          }
        }
      }
    }
  } catch (error) {
    console.error("Fehler beim Laden der Produktdatei:", error)
  }

  return null
}

// Diese Funktion lädt alle Produkte einer bestimmten Kategorie
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await getAllProducts()
  return allProducts.filter((product) => product.categories === category)
}
