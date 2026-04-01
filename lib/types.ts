export interface MenuItem {
  id: string
  name: string
  category: string
  price: number | null
  description: string | null
  allergens: string[]  // shellfish, gluten, dairy, nuts, soy
  dietary: string[]    // vegetarian, vegan
  calories: number | null
  spicy: number        // 0-3
  popular: boolean
  image: string | null
}

export interface RestaurantConfig {
  name: string
  tagline?: string
  logo?: string
}

export interface ThemeConfig {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  headerFont: string
  borderRadius: string
  cardStyle: "elevated" | "flat" | "bordered"
  layout: "grid" | "list"
  mode: "light" | "dark"
}

export interface FeaturesConfig {
  search: boolean
  allergyFilters: boolean
  mealBuilder: boolean
  aiChat: boolean
}

export interface AIConfig {
  provider: "gemini"
  apiKey: string
  model?: string
}

export interface MenuWidgetConfig {
  restaurant: RestaurantConfig
  theme: ThemeConfig
  menu: MenuItem[]
  features: FeaturesConfig
  ai?: AIConfig
}

export type AllergyFilter = "shellfish" | "gluten" | "dairy" | "nuts" | "soy"
export type DietaryFilter = "vegetarian" | "vegan"
