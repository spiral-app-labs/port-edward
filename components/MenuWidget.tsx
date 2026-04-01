"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MenuWidgetConfig, MenuItem, AllergyFilter, DietaryFilter } from "@/lib/types"

interface MenuWidgetProps {
  config: MenuWidgetConfig
}

const CATEGORY_VISUAL: Record<string, { gradient: string; emoji: string; icon: string }> = {
  "Appetizers": { gradient: "linear-gradient(135deg, #FF6B35, #FF8F65)", emoji: "🍤", icon: "🍤" },
  "Soups & Salads": { gradient: "linear-gradient(135deg, #4CAF50, #66BB6A)", emoji: "🥗", icon: "🥗" },
  "Seafood": { gradient: "linear-gradient(135deg, #0288D1, #03A9F4)", emoji: "🦞", icon: "🦞" },
  "Steaks & Chops": { gradient: "linear-gradient(135deg, #8B4513, #A0522D)", emoji: "🥩", icon: "🥩" },
  "Pasta": { gradient: "linear-gradient(135deg, #FF8F00, #FFA000)", emoji: "🍝", icon: "🍝" },
  "Desserts": { gradient: "linear-gradient(135deg, #E91E63, #F06292)", emoji: "🍰", icon: "🍰" },
  "Drinks": { gradient: "linear-gradient(135deg, #9C27B0, #BA68C8)", emoji: "🍷", icon: "🍷" },
  "Sandwiches": { gradient: "linear-gradient(135deg, #FF7043, #FF8A65)", emoji: "🥪", icon: "🥪" },
  "Salads": { gradient: "linear-gradient(135deg, #66BB6A, #81C784)", emoji: "🥗", icon: "🥗" },
  "Sides": { gradient: "linear-gradient(135deg, #FFA726, #FFB74D)", emoji: "🍟", icon: "🍟" },
}

const ALLERGY_OPTIONS: { key: AllergyFilter; label: string; emoji: string }[] = [
  { key: "shellfish", label: "Shellfish-Free", emoji: "🦐" },
  { key: "gluten", label: "Gluten-Free", emoji: "🌾" },
  { key: "dairy", label: "Dairy-Free", emoji: "🥛" },
  { key: "nuts", label: "Nut-Free", emoji: "🥜" },
  { key: "soy", label: "Soy-Free", emoji: "🫘" },
]

const DIETARY_OPTIONS: { key: DietaryFilter; label: string; emoji: string }[] = [
  { key: "vegetarian", label: "Vegetarian", emoji: "🥦" },
  { key: "vegan", label: "Vegan", emoji: "🌱" },
]

export default function MenuWidget({ config }: MenuWidgetProps) {
  const { restaurant, theme, menu, features, ai } = config
  const isDark = theme.mode === "dark"

  // Colors derived from theme
  const bg = isDark ? "#0F0F0F" : "#F8F6F3"
  const surface = isDark ? "#1A1A1A" : "#FFFFFF"
  const textPrimary = isDark ? "#F5F5F5" : "#1A1A1A"
  const textSecondary = isDark ? "#999999" : "#6B7280"
  const border = isDark ? "#2A2A2A" : "#E8E4DF"
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)"
  const tagBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)"

  // Card shadow based on style
  const cardShadow =
    theme.cardStyle === "elevated"
      ? isDark
        ? "0 4px 20px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)"
        : "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)"
      : "none"
  const cardHoverShadow = isDark
    ? "0 20px 60px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)"
    : "0 20px 60px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.06)"
  const cardBorderStyle =
    theme.cardStyle === "bordered" ? `1px solid ${border}` : theme.cardStyle === "flat" ? `1px solid ${border}` : "none"

  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [activeAllergyFilters, setActiveAllergyFilters] = useState<Set<AllergyFilter>>(new Set())
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<Set<DietaryFilter>>(new Set())
  const [showAIChat, setShowAIChat] = useState(false)
  const [showMealBuilder, setShowMealBuilder] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [mealSelections, setMealSelections] = useState<{
    appetizer?: MenuItem
    entree?: MenuItem
    dessert?: MenuItem
  }>({})
  const [mealStep, setMealStep] = useState(0)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const chatEndRef = useRef<HTMLDivElement>(null)
  const categoryNavRef = useRef<HTMLDivElement>(null)

  // Derived categories
  const categories = useMemo(() => {
    return Array.from(new Set(menu.map((i) => i.category)))
  }, [menu])

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0])
    }
  }, [categories, activeCategory])

  // Filtered items
  const filteredItems = useMemo(() => {
    return menu.filter((item) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matches =
          item.name.toLowerCase().includes(q) ||
          (item.description?.toLowerCase().includes(q) ?? false) ||
          item.category.toLowerCase().includes(q)
        if (!matches) return false
      }
      for (const allergen of activeAllergyFilters) {
        if (item.allergens.includes(allergen)) return false
      }
      for (const diet of activeDietaryFilters) {
        if (!item.dietary.includes(diet)) return false
      }
      return true
    })
  }, [menu, searchQuery, activeAllergyFilters, activeDietaryFilters])

  const itemsByCategory = useMemo(() => {
    const map: Record<string, MenuItem[]> = {}
    for (const cat of categories) {
      map[cat] = filteredItems.filter((i) => i.category === cat)
    }
    return map
  }, [filteredItems, categories])

  const toggleAllergen = (key: AllergyFilter) => {
    setActiveAllergyFilters((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const toggleDietary = (key: DietaryFilter) => {
    setActiveDietaryFilters((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat)
    const el = categoryRefs.current[cat]
    if (el) {
      const offset = 140
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  // AI Chat
  const sendChatMessage = async () => {
    if (!chatInput.trim() || !ai || chatLoading) return
    const userMsg = chatInput.trim()
    setChatInput("")
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setChatLoading(true)

    const menuContext = menu
      .map(
        (i) =>
          `${i.name} (${i.category}): ${i.description ?? "No description"}. Allergens: ${
            i.allergens.join(", ") || "none"
          }. Price: ${i.price != null ? "$" + i.price : "Ask for pricing"}`
      )
      .join("\n")

    const systemPrompt = `You are a helpful, friendly menu assistant for ${restaurant.name}. ${
      restaurant.tagline ? restaurant.tagline + "." : ""
    } Answer questions about the menu, ingredients, allergens, recommendations, and pairings. Be concise and warm.\n\nMENU:\n${menuContext}`

    try {
      const model = ai.model ?? "gemini-2.0-flash"
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${ai.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: systemPrompt + "\n\nUser: " + userMsg }],
              },
            ],
          }),
        }
      )
      const data = await res.json()
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Sorry, I couldn't get a response. Please try again."
      setChatMessages((prev) => [...prev, { role: "assistant", text: reply }])
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again." },
      ])
    } finally {
      setChatLoading(false)
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Meal total
  const mealTotal = useMemo(() => {
    const items = [
      mealSelections.appetizer,
      mealSelections.entree,
      mealSelections.dessert,
    ].filter(Boolean) as MenuItem[]
    return items.reduce((sum, i) => sum + (i.price ?? 0), 0)
  }, [mealSelections])

  const getStepItems = (step: number): MenuItem[] => {
    if (step === 0) return menu.filter((i) => i.category === "Appetizers").slice(0, 6)
    if (step === 1)
      return menu
        .filter((i) => !["Appetizers", "Desserts", "Drinks", "Soups & Salads"].includes(i.category))
        .slice(0, 8)
    if (step === 2) return menu.filter((i) => i.category === "Desserts").slice(0, 6)
    return []
  }

  const stepNames = ["Pick an Appetizer", "Choose Your Entrée", "Select a Dessert"]
  const stepKeys: ("appetizer" | "entree" | "dessert")[] = ["appetizer", "entree", "dessert"]

  // Image placeholder with gradient
  const ItemPlaceholder = ({ item, height = 240 }: { item: MenuItem; height?: number }) => {
    const visual = CATEGORY_VISUAL[item.category] ?? {
      gradient: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
      emoji: "🍽️",
    }
    return (
      <div
        style={{
          width: "100%",
          height,
          background: visual.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: height > 150 ? 56 : 36,
          flexShrink: 0,
          position: "relative",
        }}
      >
        <div style={{ opacity: 0.9 }}>{visual.emoji}</div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>
    )
  }

  // Food image with fallback
  const FoodImage = ({ item, height = 240 }: { item: MenuItem; height?: number }) => {
    if (!item.image || imageErrors.has(item.id)) {
      return <ItemPlaceholder item={item} height={height} />
    }
    return (
      <div style={{ width: "100%", height, overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <img
          className="menu-item-image"
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={() => setImageErrors((prev) => new Set(prev).add(item.id))}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    )
  }

  // Item card — premium design with large photo
  const ItemCard = ({ item, index }: { item: MenuItem; index: number }) => {
    const isExpanded = expandedItem === item.id
    const isGrid = theme.layout === "grid"
    const imageHeight = isGrid ? 220 : 110

    return (
      <motion.div
        className="menu-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: index * 0.04, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => setExpandedItem(isExpanded ? null : item.id)}
        style={{
          background: surface,
          borderRadius: parseInt(theme.borderRadius) + 4 + "px",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: cardShadow,
          border: cardBorderStyle,
          display: isGrid ? "flex" : "flex",
          flexDirection: isGrid ? "column" : "row",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = cardHoverShadow
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = cardShadow
        }}
      >
        {/* Image section */}
        <div style={isGrid ? {} : { width: 140, flexShrink: 0 }}>
          <FoodImage item={item} height={imageHeight} />
        </div>

        {/* Popular badge overlay on image */}
        {item.popular && isGrid && (
          <div
            className="popular-badge"
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(255, 215, 0, 0.95)",
              color: "#1A1A1A",
              fontSize: 11,
              fontWeight: 800,
              padding: "4px 12px",
              borderRadius: 99,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backdropFilter: "blur(4px)",
              zIndex: 2,
            }}
          >
            Popular
          </div>
        )}

        {/* Market price badge */}
        {item.price == null && isGrid && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "rgba(0,0,0,0.7)",
              color: "#FFFFFF",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 99,
              backdropFilter: "blur(4px)",
              zIndex: 2,
            }}
          >
            Market Price
          </div>
        )}

        {/* Content */}
        <div style={{ padding: isGrid ? "18px 20px 20px" : "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Name + Price */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
              marginBottom: 6,
            }}
          >
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: theme.headerFont,
                  fontWeight: 700,
                  fontSize: isGrid ? 18 : 15,
                  color: textPrimary,
                  lineHeight: 1.3,
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.name}
              </h3>
              {!isGrid && item.popular && (
                <span
                  style={{
                    display: "inline-block",
                    background: "rgba(255, 215, 0, 0.15)",
                    color: "#B8860B",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 99,
                    marginTop: 4,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Popular
                </span>
              )}
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: isGrid ? 20 : 16,
                color: theme.primaryColor,
                whiteSpace: "nowrap",
                flexShrink: 0,
                fontFamily: theme.fontFamily,
                letterSpacing: "-0.02em",
              }}
            >
              {item.price != null ? `$${item.price}` : ""}
            </span>
          </div>

          {/* Description */}
          {item.description && (
            <p
              style={{
                color: textSecondary,
                fontSize: 14,
                lineHeight: 1.6,
                marginBottom: 10,
                overflow: isExpanded ? "visible" : "hidden",
                display: isExpanded ? "block" : "-webkit-box",
                WebkitLineClamp: isExpanded ? undefined : 2,
                WebkitBoxOrient: "vertical",
                fontFamily: theme.fontFamily,
              } as React.CSSProperties}
            >
              {item.description}
            </p>
          )}

          {item.price == null && (
            <p
              style={{
                color: theme.secondaryColor,
                fontSize: 13,
                marginBottom: 8,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Ask your server for today&apos;s price
            </p>
          )}

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
            {item.dietary.includes("vegetarian") && (
              <span
                style={{
                  background: isDark ? "rgba(76, 175, 80, 0.15)" : "rgba(76, 175, 80, 0.1)",
                  color: isDark ? "#81C784" : "#2E7D32",
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 99,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                Vegetarian
              </span>
            )}
            {item.dietary.includes("vegan") && (
              <span
                style={{
                  background: isDark ? "rgba(45, 106, 79, 0.2)" : "rgba(45, 106, 79, 0.1)",
                  color: isDark ? "#52B788" : "#1B5E20",
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 99,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                Vegan
              </span>
            )}
            {item.calories != null && (
              <span
                style={{
                  background: tagBg,
                  color: textSecondary,
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 99,
                  fontWeight: 500,
                }}
              >
                {item.calories} cal
              </span>
            )}
            {item.spicy > 0 && (
              <span
                style={{
                  background: isDark ? "rgba(255, 107, 53, 0.15)" : "rgba(255, 107, 53, 0.1)",
                  color: isDark ? "#FF8A65" : "#E64A19",
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 99,
                  fontWeight: 500,
                }}
              >
                {"🌶️".repeat(item.spicy)}
              </span>
            )}
          </div>

          {/* Expanded: allergen warnings */}
          <AnimatePresence>
            {isExpanded && item.allergens.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}
              >
                <span style={{ fontSize: 11, color: textSecondary, fontWeight: 600, width: "100%", marginBottom: 2 }}>
                  Allergens:
                </span>
                {item.allergens.map((a) => (
                  <span
                    key={a}
                    style={{
                      background: isDark ? "rgba(239, 68, 68, 0.15)" : "rgba(239, 68, 68, 0.08)",
                      color: isDark ? "#FCA5A5" : "#B91C1C",
                      fontSize: 11,
                      padding: "3px 10px",
                      borderRadius: 99,
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    {a}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ fontFamily: theme.fontFamily, background: bg, minHeight: "100vh", color: textPrimary }}>
      {/* ── Hero Header ── */}
      <div
        style={{
          position: "relative",
          background: isDark
            ? `linear-gradient(180deg, ${theme.primaryColor}40 0%, #0F0F0F 100%)`
            : `linear-gradient(180deg, ${theme.primaryColor} 0%, ${theme.primaryColor}DD 60%, ${bg} 100%)`,
          padding: "80px 24px 60px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Decorative background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: isDark ? 0.05 : 0.08,
            backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${theme.secondaryColor} 0%, transparent 50%)`,
          }}
        />

        {restaurant.logo && (
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={restaurant.logo}
            alt={restaurant.name}
            style={{ height: 72, marginBottom: 20, objectFit: "contain", position: "relative" }}
          />
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: theme.headerFont,
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 800,
            color: isDark ? textPrimary : "#FFFFFF",
            margin: "0 0 12px",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            position: "relative",
          }}
        >
          {restaurant.name}
        </motion.h1>
        {restaurant.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              color: isDark ? textSecondary : "rgba(255,255,255,0.85)",
              fontSize: 18,
              margin: 0,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "0.01em",
              position: "relative",
            }}
          >
            {restaurant.tagline}
          </motion.p>
        )}

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            width: 60,
            height: 2,
            background: isDark ? theme.secondaryColor : "rgba(255,255,255,0.5)",
            margin: "24px auto 0",
            borderRadius: 1,
            position: "relative",
          }}
        />
      </div>

      {/* ── Search Bar — Glassmorphism ── */}
      {features.search && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ padding: "24px 24px 0", maxWidth: 720, margin: "0 auto" }}
        >
          <div style={{ position: "relative" }}>
            <svg
              style={{
                position: "absolute",
                left: 18,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                opacity: 0.4,
              }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={textPrimary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              className="glass-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              style={{
                width: "100%",
                padding: "16px 20px 16px 50px",
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}`,
                borderRadius: parseInt(theme.borderRadius) + 8 + "px",
                color: textPrimary,
                fontSize: 15,
                fontFamily: theme.fontFamily,
                boxSizing: "border-box",
                boxShadow: isDark
                  ? "0 4px 16px rgba(0,0,0,0.3)"
                  : "0 4px 16px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)",
                outline: "none",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  color: textSecondary,
                  padding: 4,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* ── Filter Pills ── */}
      {features.allergyFilters && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ padding: "16px 24px 0", maxWidth: 720, margin: "0 auto" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {ALLERGY_OPTIONS.map(({ key, label, emoji }) => {
              const active = activeAllergyFilters.has(key)
              return (
                <button
                  key={key}
                  className="filter-pill"
                  onClick={() => toggleAllergen(key)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 99,
                    border: active
                      ? `2px solid ${theme.primaryColor}`
                      : `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                    background: active
                      ? isDark ? `${theme.primaryColor}30` : `${theme.primaryColor}12`
                      : isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                    color: active ? (isDark ? "#FFFFFF" : theme.primaryColor) : textSecondary,
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    fontFamily: theme.fontFamily,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  {emoji} {label}
                </button>
              )
            })}
            <div style={{ width: 1, height: 32, background: border, margin: "0 4px", alignSelf: "center" }} />
            {DIETARY_OPTIONS.map(({ key, label, emoji }) => {
              const active = activeDietaryFilters.has(key)
              return (
                <button
                  key={key}
                  className="filter-pill"
                  onClick={() => toggleDietary(key)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 99,
                    border: active
                      ? `2px solid ${theme.secondaryColor}`
                      : `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
                    background: active
                      ? isDark ? `${theme.secondaryColor}30` : `${theme.secondaryColor}12`
                      : isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                    color: active ? (isDark ? "#FFFFFF" : theme.secondaryColor) : textSecondary,
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    fontFamily: theme.fontFamily,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  {emoji} {label}
                </button>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* ── Sticky Category Nav ── */}
      <div
        className="menu-category-nav"
        ref={categoryNavRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: isDark ? "rgba(15,15,15,0.9)" : "rgba(248,246,243,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          marginTop: 20,
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 24px",
            minWidth: "max-content",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            const count = itemsByCategory[cat]?.length ?? 0
            const visual = CATEGORY_VISUAL[cat]
            return (
              <button
                key={cat}
                className={`category-tab ${isActive ? "active" : ""}`}
                onClick={() => scrollToCategory(cat)}
                style={{
                  padding: "16px 22px",
                  border: "none",
                  borderBottom: isActive
                    ? `3px solid ${theme.primaryColor}`
                    : "3px solid transparent",
                  background: "transparent",
                  color: isActive ? theme.primaryColor : textSecondary,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 14,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: theme.fontFamily,
                  letterSpacing: "0.01em",
                  transition: "color 0.25s ease, border-color 0.25s ease",
                }}
              >
                {visual?.emoji && <span style={{ marginRight: 6 }}>{visual.emoji}</span>}
                {cat}
                {count > 0 && searchQuery && (
                  <span
                    style={{
                      marginLeft: 8,
                      fontSize: 11,
                      opacity: 0.5,
                      background: tagBg,
                      padding: "1px 7px",
                      borderRadius: 99,
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Menu Sections ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 140px" }}>
        {categories.map((cat) => {
          const items = itemsByCategory[cat] ?? []
          if (items.length === 0 && searchQuery) return null
          const visual = CATEGORY_VISUAL[cat]
          return (
            <div
              key={cat}
              ref={(el) => {
                categoryRefs.current[cat] = el
              }}
              style={{ marginBottom: 56 }}
            >
              {/* Category header */}
              <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
                <div>
                  <h2
                    style={{
                      fontFamily: theme.headerFont,
                      fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                      fontWeight: 800,
                      color: textPrimary,
                      margin: 0,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {cat}
                  </h2>
                  <div
                    style={{
                      width: 40,
                      height: 3,
                      background: visual?.gradient ?? theme.primaryColor,
                      borderRadius: 2,
                      marginTop: 8,
                    }}
                  />
                </div>
              </div>

              {items.length === 0 ? (
                <p style={{ color: textSecondary, fontStyle: "italic", fontSize: 15 }}>
                  No items match your filters in this category.
                </p>
              ) : (
                <div
                  className="menu-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      theme.layout === "grid"
                        ? "repeat(auto-fill, minmax(320px, 1fr))"
                        : "1fr",
                    gap: 20,
                  }}
                >
                  <AnimatePresence>
                    {items.map((item, i) => (
                      <ItemCard key={item.id} item={item} index={i} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )
        })}

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", padding: "80px 0", color: textSecondary }}
          >
            <div style={{ fontSize: 56, marginBottom: 20, opacity: 0.6 }}>🔍</div>
            <p
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: textPrimary,
                marginBottom: 8,
                fontFamily: theme.headerFont,
              }}
            >
              No items found
            </p>
            <p style={{ fontSize: 15, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
              Try adjusting your search or removing some filters to see more options.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveAllergyFilters(new Set())
                setActiveDietaryFilters(new Set())
              }}
              style={{
                marginTop: 20,
                padding: "12px 24px",
                background: theme.primaryColor,
                color: "#FFFFFF",
                border: "none",
                borderRadius: 99,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: theme.fontFamily,
              }}
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Build My Meal FAB ── */}
      {features.mealBuilder && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMealBuilder(true)}
          style={{
            position: "fixed",
            bottom: features.aiChat && ai ? 88 : 24,
            right: 24,
            background: `linear-gradient(135deg, ${theme.secondaryColor}, ${theme.secondaryColor}DD)`,
            color: "#FFFFFF",
            border: "none",
            borderRadius: 99,
            padding: "16px 28px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: `0 8px 32px ${theme.secondaryColor}50`,
            fontFamily: theme.fontFamily,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: 10,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2h18l-1 16H4L3 2z" />
            <path d="M8 22h8" />
            <path d="M12 18v4" />
          </svg>
          Build My Meal
        </motion.button>
      )}

      {/* ── AI Chat FAB ── */}
      {features.aiChat && ai && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAIChat(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}DD)`,
            color: "#FFFFFF",
            border: "none",
            borderRadius: 99,
            padding: "16px 28px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: `0 8px 32px ${theme.primaryColor}50`,
            fontFamily: theme.fontFamily,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: 10,
            letterSpacing: "0.02em",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Ask About Our Menu
        </motion.button>
      )}

      {/* ── AI Chat Panel ── */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 300,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 24,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowAIChat(false)
            }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                width: "100%",
                maxWidth: 420,
                height: 560,
                background: surface,
                borderRadius: parseInt(theme.borderRadius) + 8 + "px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* Chat header */}
              <div
                style={{
                  padding: "20px 24px",
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}CC)`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: "#FFFFFF", fontSize: 16, letterSpacing: "-0.01em" }}>
                    Menu Concierge
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                    Ask about dishes, allergens &amp; pairings
                  </div>
                </div>
                <button
                  onClick={() => setShowAIChat(false)}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "none",
                    color: "#FFFFFF",
                    fontSize: 18,
                    cursor: "pointer",
                    lineHeight: 1,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {chatMessages.length === 0 && (
                  <div style={{ textAlign: "center", padding: "32px 0", color: textSecondary }}>
                    <div style={{ fontSize: 44, marginBottom: 12, opacity: 0.7 }}>👨‍🍳</div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: textPrimary, marginBottom: 6 }}>
                      How can I help?
                    </p>
                    <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 260, margin: "0 auto" }}>
                      Ask me about ingredients, dietary options, wine pairings, or our chef&apos;s recommendations.
                    </p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "82%",
                        padding: "12px 16px",
                        borderRadius: parseInt(theme.borderRadius) + 4 + "px",
                        background:
                          msg.role === "user"
                            ? theme.primaryColor
                            : isDark
                              ? "#2A2A2A"
                              : "#F0EDEA",
                        color: msg.role === "user" ? "#FFFFFF" : textPrimary,
                        fontSize: 14,
                        lineHeight: 1.6,
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", gap: 5, padding: "10px 16px" }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: theme.primaryColor,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat input */}
              <div
                style={{
                  padding: 16,
                  borderTop: `1px solid ${border}`,
                  display: "flex",
                  gap: 10,
                }}
              >
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendChatMessage()
                  }}
                  placeholder="Ask about ingredients, pairings..."
                  style={{
                    flex: 1,
                    padding: "12px 18px",
                    background: isDark ? "rgba(255,255,255,0.06)" : "#F5F3F0",
                    border: "none",
                    borderRadius: 99,
                    color: textPrimary,
                    fontSize: 14,
                    outline: "none",
                    fontFamily: theme.fontFamily,
                  }}
                />
                <button
                  onClick={sendChatMessage}
                  disabled={chatLoading || !chatInput.trim()}
                  style={{
                    background: theme.primaryColor,
                    border: "none",
                    borderRadius: "50%",
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    opacity: chatLoading || !chatInput.trim() ? 0.4 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Build My Meal Modal ── */}
      <AnimatePresence>
        {showMealBuilder && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowMealBuilder(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                width: "100%",
                maxWidth: 580,
                maxHeight: "85vh",
                background: surface,
                borderRadius: parseInt(theme.borderRadius) + 8 + "px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "24px 28px",
                  background: `linear-gradient(135deg, ${theme.secondaryColor}15, transparent)`,
                  borderBottom: `1px solid ${border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: theme.headerFont,
                      fontWeight: 800,
                      fontSize: 22,
                      color: textPrimary,
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Build Your Meal
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                    {[0, 1, 2].map((step) => (
                      <div key={step} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div
                          style={{
                            width: mealStep > step ? 20 : mealStep === step ? 24 : 20,
                            height: mealStep > step ? 20 : mealStep === step ? 24 : 20,
                            borderRadius: "50%",
                            background: mealStep > step
                              ? theme.secondaryColor
                              : mealStep === step
                                ? theme.primaryColor
                                : tagBg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 700,
                            color: mealStep >= step ? "#FFFFFF" : textSecondary,
                            transition: "all 0.3s ease",
                          }}
                        >
                          {mealStep > step ? "✓" : step + 1}
                        </div>
                        {step < 2 && (
                          <div
                            style={{
                              width: 24,
                              height: 2,
                              background: mealStep > step ? theme.secondaryColor : border,
                              borderRadius: 1,
                              transition: "background 0.3s ease",
                            }}
                          />
                        )}
                      </div>
                    ))}
                    <span style={{ fontSize: 13, color: textSecondary, marginLeft: 8, fontWeight: 500 }}>
                      {stepNames[mealStep] ?? "Review"}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 16 }}>
                  {mealTotal > 0 && (
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 22,
                        color: theme.primaryColor,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      ${mealTotal.toFixed(2)}
                    </div>
                  )}
                  <button
                    onClick={() => setShowMealBuilder(false)}
                    style={{
                      background: tagBg,
                      border: "none",
                      color: textSecondary,
                      fontSize: 16,
                      cursor: "pointer",
                      lineHeight: 1,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Step content */}
              <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
                {mealStep < 3 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button
                      className="meal-option"
                      onClick={() => {
                        setMealSelections((prev) => ({
                          ...prev,
                          [stepKeys[mealStep]]: undefined,
                        }))
                        setMealStep((s) => Math.min(s + 1, 3))
                      }}
                      style={{
                        padding: "14px 18px",
                        background: "transparent",
                        border: `1px dashed ${border}`,
                        borderRadius: parseInt(theme.borderRadius) + 2 + "px",
                        color: textSecondary,
                        cursor: "pointer",
                        fontSize: 14,
                        fontFamily: theme.fontFamily,
                        textAlign: "left",
                        fontWeight: 500,
                      }}
                    >
                      Skip this course →
                    </button>
                    {getStepItems(mealStep).map((item) => {
                      const selected = mealSelections[stepKeys[mealStep]]?.id === item.id
                      return (
                        <button
                          key={item.id}
                          className="meal-option"
                          onClick={() => {
                            setMealSelections((prev) => ({
                              ...prev,
                              [stepKeys[mealStep]]: item,
                            }))
                            setTimeout(() => setMealStep((s) => Math.min(s + 1, 3)), 200)
                          }}
                          style={{
                            padding: 0,
                            background: selected ? `${theme.primaryColor}08` : surface,
                            border: `${selected ? 2 : 1}px solid ${selected ? theme.primaryColor : border}`,
                            borderRadius: parseInt(theme.borderRadius) + 2 + "px",
                            cursor: "pointer",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                            overflow: "hidden",
                          }}
                        >
                          {/* Thumbnail */}
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{
                                width: 72,
                                height: 72,
                                objectFit: "cover",
                                flexShrink: 0,
                              }}
                            />
                          )}
                          {!item.image && (
                            <div
                              style={{
                                width: 72,
                                height: 72,
                                background: CATEGORY_VISUAL[item.category]?.gradient ?? theme.primaryColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 28,
                                flexShrink: 0,
                              }}
                            >
                              {CATEGORY_VISUAL[item.category]?.emoji ?? "🍽️"}
                            </div>
                          )}
                          <div style={{ padding: "12px 16px", flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontWeight: 700,
                                color: textPrimary,
                                fontSize: 15,
                                fontFamily: theme.headerFont,
                                marginBottom: 2,
                              }}
                            >
                              {item.name}
                            </div>
                            {item.description && (
                              <div
                                style={{
                                  color: textSecondary,
                                  fontSize: 12,
                                  lineHeight: 1.4,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.description}
                              </div>
                            )}
                          </div>
                          <span
                            style={{
                              fontWeight: 700,
                              color: theme.primaryColor,
                              flexShrink: 0,
                              padding: "0 18px",
                              fontSize: 15,
                            }}
                          >
                            {item.price != null ? `$${item.price}` : "MP"}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: "center", padding: "20px 0" }}
                  >
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                    <h4
                      style={{
                        fontFamily: theme.headerFont,
                        fontSize: 22,
                        color: textPrimary,
                        marginBottom: 24,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Your Perfect Meal
                    </h4>
                    <div style={{ textAlign: "left", maxWidth: 400, margin: "0 auto" }}>
                      {(["appetizer", "entree", "dessert"] as const).map((key, idx) => {
                        const item = mealSelections[key]
                        const labels = ["Appetizer", "Entrée", "Dessert"]
                        if (!item) return null
                        return (
                          <div
                            key={key}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "14px 0",
                              borderBottom: `1px solid ${border}`,
                            }}
                          >
                            <div>
                              <div style={{ fontSize: 11, color: textSecondary, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                                {labels[idx]}
                              </div>
                              <span style={{ color: textPrimary, fontWeight: 600, fontSize: 15 }}>
                                {item.name}
                              </span>
                            </div>
                            <span style={{ color: theme.primaryColor, fontWeight: 700, fontSize: 16 }}>
                              {item.price != null ? `$${item.price}` : "MP"}
                            </span>
                          </div>
                        )
                      })}
                      {mealTotal > 0 && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "16px 0",
                            fontWeight: 800,
                            fontSize: 20,
                            color: textPrimary,
                          }}
                        >
                          <span>Total</span>
                          <span style={{ color: theme.primaryColor }}>
                            ${mealTotal.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "center" }}>
                      <button
                        onClick={() => {
                          setMealStep(0)
                          setMealSelections({})
                        }}
                        style={{
                          padding: "14px 28px",
                          background: "transparent",
                          border: `1px solid ${border}`,
                          borderRadius: 99,
                          color: textSecondary,
                          cursor: "pointer",
                          fontFamily: theme.fontFamily,
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        Start Over
                      </button>
                      <button
                        onClick={() => setShowMealBuilder(false)}
                        style={{
                          padding: "14px 28px",
                          background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}DD)`,
                          border: "none",
                          borderRadius: 99,
                          color: "#FFFFFF",
                          cursor: "pointer",
                          fontFamily: theme.fontFamily,
                          fontWeight: 700,
                          fontSize: 14,
                          boxShadow: `0 4px 16px ${theme.primaryColor}40`,
                        }}
                      >
                        Looks Great ✓
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer nav */}
              {mealStep < 3 && (
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: `1px solid ${border}`,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <button
                    onClick={() => setMealStep((s) => Math.max(s - 1, 0))}
                    disabled={mealStep === 0}
                    style={{
                      padding: "12px 24px",
                      background: "transparent",
                      border: `1px solid ${border}`,
                      borderRadius: 99,
                      color: mealStep === 0 ? textSecondary : textPrimary,
                      cursor: mealStep === 0 ? "default" : "pointer",
                      fontFamily: theme.fontFamily,
                      fontWeight: 600,
                      opacity: mealStep === 0 ? 0.3 : 1,
                      fontSize: 14,
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setMealStep((s) => Math.min(s + 1, 3))}
                    style={{
                      padding: "12px 24px",
                      background: theme.primaryColor,
                      border: "none",
                      borderRadius: 99,
                      color: "#FFFFFF",
                      cursor: "pointer",
                      fontFamily: theme.fontFamily,
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
