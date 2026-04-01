"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MenuWidgetConfig, MenuItem, AllergyFilter, DietaryFilter } from "@/lib/types"

interface MenuWidgetProps {
  config: MenuWidgetConfig
}

// Category → gradient + emoji mapping
const CATEGORY_VISUAL: Record<string, { gradient: string; emoji: string }> = {
  "Appetizers": { gradient: "linear-gradient(135deg, #FF6B35, #FF8F65)", emoji: "🍤" },
  "Soups & Salads": { gradient: "linear-gradient(135deg, #4CAF50, #66BB6A)", emoji: "🥗" },
  "Seafood": { gradient: "linear-gradient(135deg, #0288D1, #03A9F4)", emoji: "🦞" },
  "Steaks & Chops": { gradient: "linear-gradient(135deg, #8B4513, #A0522D)", emoji: "🥩" },
  "Pasta": { gradient: "linear-gradient(135deg, #FF8F00, #FFA000)", emoji: "🍝" },
  "Desserts": { gradient: "linear-gradient(135deg, #E91E63, #F06292)", emoji: "🍰" },
  "Drinks": { gradient: "linear-gradient(135deg, #9C27B0, #BA68C8)", emoji: "🍷" },
  "Sandwiches": { gradient: "linear-gradient(135deg, #FF7043, #FF8A65)", emoji: "🥪" },
  "Salads": { gradient: "linear-gradient(135deg, #66BB6A, #81C784)", emoji: "🥗" },
  "Sides": { gradient: "linear-gradient(135deg, #FFA726, #FFB74D)", emoji: "🍟" },
}

const ALLERGY_OPTIONS: { key: AllergyFilter; label: string; emoji: string }[] = [
  { key: "shellfish", label: "No Shellfish", emoji: "🦐" },
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
  const bg = isDark ? "#0F0F0F" : "#FAFAFA"
  const surface = isDark ? "#1A1A1A" : "#FFFFFF"
  const textPrimary = isDark ? "#F5F5F5" : "#111111"
  const textSecondary = isDark ? "#888888" : "#666666"
  const border = isDark ? "#2A2A2A" : "#E5E5E5"
  const inputBg = isDark ? "#1A1A1A" : "#FFFFFF"
  const tagBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"

  // Card styles
  const cardBoxShadow =
    theme.cardStyle === "elevated"
      ? isDark
        ? "0 4px 24px rgba(0,0,0,0.4)"
        : "0 4px 24px rgba(0,0,0,0.08)"
      : "none"
  const cardBorderStyle =
    theme.cardStyle === "bordered" ? `1px solid ${border}` : "none"

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

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const chatEndRef = useRef<HTMLDivElement>(null)

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
      const offset = 130
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

  const stepNames = ["Pick an Appetizer", "Pick an Entrée", "Pick a Dessert"]
  const stepKeys: ("appetizer" | "entree" | "dessert")[] = ["appetizer", "entree", "dessert"]

  // Placeholder image component
  const ItemPlaceholder = ({ item, height = 200 }: { item: MenuItem; height?: number }) => {
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
          fontSize: height > 150 ? 48 : 32,
          flexShrink: 0,
        }}
      >
        {visual.emoji}
      </div>
    )
  }

  // Item card
  const ItemCard = ({ item, index }: { item: MenuItem; index: number }) => {
    const isExpanded = expandedItem === item.id
    const isGrid = theme.layout === "grid"

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: index * 0.03, duration: 0.3 }}
        onClick={() => setExpandedItem(isExpanded ? null : item.id)}
        style={{
          background: surface,
          borderRadius: theme.borderRadius,
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: cardBoxShadow,
          border: cardBorderStyle,
          display: isGrid ? "block" : "flex",
          gap: isGrid ? undefined : 0,
        }}
        whileHover={{
          scale: 1.01,
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Image */}
        <div style={isGrid ? {} : { width: 96, flexShrink: 0 }}>
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: isGrid ? 180 : 96,
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <ItemPlaceholder item={item} height={isGrid ? 180 : 96} />
          )}
        </div>

        {/* Content */}
        <div style={{ padding: isGrid ? "16px" : "12px 12px 12px 12px", flex: 1 }}>
          {/* Top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", flex: 1 }}
            >
              <span
                style={{
                  fontFamily: theme.headerFont,
                  fontWeight: 700,
                  fontSize: 16,
                  color: textPrimary,
                  lineHeight: 1.3,
                }}
              >
                {item.name}
              </span>
              {item.popular && (
                <span
                  style={{
                    background: theme.primaryColor,
                    color: "#FFFFFF",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 99,
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
                fontWeight: 700,
                fontSize: 16,
                color: theme.primaryColor,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {item.price != null ? `$${item.price.toFixed(2)}` : ""}
            </span>
          </div>

          {/* Description */}
          {item.description ? (
            <p
              style={{
                color: textSecondary,
                fontSize: 13,
                lineHeight: 1.5,
                marginBottom: 8,
                overflow: isExpanded ? "visible" : "hidden",
                display: isExpanded ? "block" : "-webkit-box",
                WebkitLineClamp: isExpanded ? undefined : 2,
                WebkitBoxOrient: "vertical",
              } as React.CSSProperties}
            >
              {item.description}
            </p>
          ) : null}

          {/* No price note */}
          {item.price == null && (
            <p
              style={{
                color: textSecondary,
                fontSize: 12,
                marginBottom: 6,
                fontStyle: "italic",
              }}
            >
              Ask for pricing
            </p>
          )}

          {/* Tags row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
            {item.dietary.includes("vegetarian") && (
              <span
                style={{
                  background: "#4CAF5022",
                  color: "#4CAF50",
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 99,
                  fontWeight: 600,
                }}
              >
                🥦 Vegetarian
              </span>
            )}
            {item.dietary.includes("vegan") && (
              <span
                style={{
                  background: "#2D6A4F22",
                  color: "#2D6A4F",
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 99,
                  fontWeight: 600,
                }}
              >
                🌱 Vegan
              </span>
            )}
            {item.calories != null && (
              <span
                style={{
                  background: tagBg,
                  color: textSecondary,
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 99,
                }}
              >
                {item.calories} cal
              </span>
            )}
            {item.spicy > 0 && (
              <span
                style={{
                  background: "#FF6B3522",
                  color: "#FF6B35",
                  fontSize: 11,
                  padding: "2px 8px",
                  borderRadius: 99,
                }}
              >
                {"🌶️".repeat(item.spicy)}
              </span>
            )}
          </div>

          {/* Allergen warnings (expanded) */}
          {isExpanded && item.allergens.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
              {item.allergens.map((a) => (
                <span
                  key={a}
                  style={{
                    background: "#FF6B3522",
                    color: "#FF6B35",
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 99,
                    fontWeight: 500,
                  }}
                >
                  Contains {a}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ fontFamily: theme.fontFamily, background: bg, minHeight: "100vh", color: textPrimary }}>
      {/* ── Header ── */}
      <div
        style={{
          background: isDark ? "#0A0A0A" : theme.primaryColor,
          padding: "64px 24px 48px",
          textAlign: "center",
        }}
      >
        {restaurant.logo && (
          <img
            src={restaurant.logo}
            alt={restaurant.name}
            style={{ height: 64, marginBottom: 16, objectFit: "contain" }}
          />
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: theme.headerFont,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: isDark ? textPrimary : "#FFFFFF",
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}
        >
          {restaurant.name}
        </motion.h1>
        {restaurant.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              color: isDark ? textSecondary : "rgba(255,255,255,0.8)",
              fontSize: 17,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {restaurant.tagline}
          </motion.p>
        )}
      </div>

      {/* ── Search ── */}
      {features.search && (
        <div style={{ padding: "20px 24px 0", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 18,
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu items..."
              style={{
                width: "100%",
                padding: "12px 16px 12px 44px",
                background: inputBg,
                border: `1px solid ${border}`,
                borderRadius: theme.borderRadius,
                color: textPrimary,
                fontSize: 15,
                outline: "none",
                fontFamily: theme.fontFamily,
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Allergy / Dietary Filters ── */}
      {features.allergyFilters && (
        <div style={{ padding: "16px 24px 0", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ALLERGY_OPTIONS.map(({ key, label, emoji }) => {
              const active = activeAllergyFilters.has(key)
              return (
                <button
                  key={key}
                  onClick={() => toggleAllergen(key)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 99,
                    border: `1px solid ${active ? theme.primaryColor : border}`,
                    background: active ? theme.primaryColor : "transparent",
                    color: active ? "#FFFFFF" : textSecondary,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: theme.fontFamily,
                  }}
                >
                  {emoji} {label}
                </button>
              )
            })}
            {DIETARY_OPTIONS.map(({ key, label, emoji }) => {
              const active = activeDietaryFilters.has(key)
              return (
                <button
                  key={key}
                  onClick={() => toggleDietary(key)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 99,
                    border: `1px solid ${active ? theme.secondaryColor : border}`,
                    background: active ? theme.secondaryColor : "transparent",
                    color: active ? "#FFFFFF" : textSecondary,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: theme.fontFamily,
                  }}
                >
                  {emoji} {label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Sticky Category Nav ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: bg,
          borderBottom: `1px solid ${border}`,
          marginTop: 16,
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 24px",
            minWidth: "max-content",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            const count = itemsByCategory[cat]?.length ?? 0
            return (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                style={{
                  padding: "14px 20px",
                  border: "none",
                  borderBottom: isActive
                    ? `2px solid ${theme.primaryColor}`
                    : "2px solid transparent",
                  background: "transparent",
                  color: isActive ? theme.primaryColor : textSecondary,
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 14,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: theme.fontFamily,
                }}
              >
                {cat}
                {count > 0 && (
                  <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.6 }}>
                    ({count})
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Menu Sections ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 120px" }}>
        {categories.map((cat) => {
          const items = itemsByCategory[cat] ?? []
          if (items.length === 0 && searchQuery) return null
          return (
            <div
              key={cat}
              ref={(el) => {
                categoryRefs.current[cat] = el
              }}
              style={{ marginBottom: 48 }}
            >
              <h2
                style={{
                  fontFamily: theme.headerFont,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  fontWeight: 800,
                  color: textPrimary,
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: `2px solid ${theme.primaryColor}33`,
                  letterSpacing: "-0.01em",
                }}
              >
                {cat}
              </h2>
              {items.length === 0 ? (
                <p style={{ color: textSecondary, fontStyle: "italic" }}>
                  No items match your filters in this category.
                </p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      theme.layout === "grid"
                        ? "repeat(auto-fill, minmax(280px, 1fr))"
                        : "1fr",
                    gap: 16,
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
          <div style={{ textAlign: "center", padding: "80px 0", color: textSecondary }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: textPrimary,
                marginBottom: 8,
              }}
            >
              No items found
            </p>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* ── Build My Meal Button ── */}
      {features.mealBuilder && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMealBuilder(true)}
          style={{
            position: "fixed",
            bottom: features.aiChat && ai ? 88 : 24,
            right: 24,
            background: theme.secondaryColor,
            color: "#FFFFFF",
            border: "none",
            borderRadius: 99,
            padding: "14px 22px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            fontFamily: theme.fontFamily,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🍽️ Build My Meal
        </motion.button>
      )}

      {/* ── AI Chat Button ── */}
      {features.aiChat && ai && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAIChat(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: theme.primaryColor,
            color: "#FFFFFF",
            border: "none",
            borderRadius: 99,
            padding: "14px 22px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            fontFamily: theme.fontFamily,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          💬 Ask about our menu
        </motion.button>
      )}

      {/* ── AI Chat Panel ── */}
      <AnimatePresence>
        {showAIChat && (
          <motion.div
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
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              style={{
                width: "100%",
                maxWidth: 420,
                height: 520,
                background: surface,
                borderRadius: theme.borderRadius,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              }}
            >
              {/* Chat header */}
              <div
                style={{
                  padding: "16px 20px",
                  background: theme.primaryColor,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{ fontWeight: 700, color: "#FFFFFF", fontSize: 15 }}
                  >
                    💬 Ask about our menu
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                    Powered by AI
                  </div>
                </div>
                <button
                  onClick={() => setShowAIChat(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#FFFFFF",
                    fontSize: 22,
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {chatMessages.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "24px 0",
                      color: textSecondary,
                    }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 8 }}>👨‍🍳</div>
                    <p style={{ fontSize: 14 }}>
                      Ask me about ingredients, allergens, recommendations, or
                      pairings!
                    </p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "10px 14px",
                        borderRadius: theme.borderRadius,
                        background:
                          msg.role === "user"
                            ? theme.primaryColor
                            : isDark
                            ? "#2A2A2A"
                            : "#F0F0F0",
                        color:
                          msg.role === "user" ? "#FFFFFF" : textPrimary,
                        fontSize: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", gap: 4, padding: "8px 14px" }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          delay: i * 0.2,
                        }}
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: textSecondary,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div
                style={{
                  padding: 12,
                  borderTop: `1px solid ${border}`,
                  display: "flex",
                  gap: 8,
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
                    padding: "10px 14px",
                    background: inputBg,
                    border: `1px solid ${border}`,
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
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 18,
                    flexShrink: 0,
                    opacity: chatLoading || !chatInput.trim() ? 0.5 : 1,
                  }}
                >
                  ➤
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                width: "100%",
                maxWidth: 560,
                maxHeight: "80vh",
                background: surface,
                borderRadius: theme.borderRadius,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "20px 24px",
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
                      fontSize: 20,
                      color: textPrimary,
                      margin: 0,
                    }}
                  >
                    Build My Meal
                  </h3>
                  <p style={{ color: textSecondary, fontSize: 13, margin: "4px 0 0" }}>
                    Step {Math.min(mealStep + 1, 3)} of 3 —{" "}
                    {stepNames[mealStep] ?? "Complete!"}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  {mealTotal > 0 && (
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 20,
                        color: theme.primaryColor,
                      }}
                    >
                      ${mealTotal.toFixed(2)}
                    </div>
                  )}
                  <button
                    onClick={() => setShowMealBuilder(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: textSecondary,
                      fontSize: 22,
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Step content */}
              <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
                {mealStep < 3 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button
                      onClick={() => {
                        setMealSelections((prev) => ({
                          ...prev,
                          [stepKeys[mealStep]]: undefined,
                        }))
                        setMealStep((s) => Math.min(s + 1, 3))
                      }}
                      style={{
                        padding: "12px 16px",
                        background: "transparent",
                        border: `1px dashed ${border}`,
                        borderRadius: theme.borderRadius,
                        color: textSecondary,
                        cursor: "pointer",
                        fontSize: 14,
                        fontFamily: theme.fontFamily,
                        textAlign: "left",
                      }}
                    >
                      Skip this course →
                    </button>
                    {getStepItems(mealStep).map((item) => {
                      const selected =
                        mealSelections[stepKeys[mealStep]]?.id === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setMealSelections((prev) => ({
                              ...prev,
                              [stepKeys[mealStep]]: item,
                            }))
                            setTimeout(
                              () => setMealStep((s) => Math.min(s + 1, 3)),
                              150
                            )
                          }}
                          style={{
                            padding: "14px 16px",
                            background: selected
                              ? `${theme.primaryColor}22`
                              : "transparent",
                            border: `1px solid ${
                              selected ? theme.primaryColor : border
                            }`,
                            borderRadius: theme.borderRadius,
                            cursor: "pointer",
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: 700,
                                color: textPrimary,
                                fontSize: 15,
                                fontFamily: theme.headerFont,
                              }}
                            >
                              {item.name}
                            </div>
                            {item.description && (
                              <div
                                style={{
                                  color: textSecondary,
                                  fontSize: 12,
                                  marginTop: 2,
                                }}
                              >
                                {item.description.slice(0, 60)}...
                              </div>
                            )}
                          </div>
                          <span
                            style={{
                              fontWeight: 700,
                              color: theme.primaryColor,
                              flexShrink: 0,
                              marginLeft: 12,
                            }}
                          >
                            {item.price != null ? `$${item.price.toFixed(2)}` : ""}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                    <h4
                      style={{
                        fontFamily: theme.headerFont,
                        fontSize: 20,
                        color: textPrimary,
                        marginBottom: 16,
                      }}
                    >
                      Your Meal
                    </h4>
                    {(["appetizer", "entree", "dessert"] as const).map((key) => {
                      const item = mealSelections[key]
                      if (!item) return null
                      return (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                            borderBottom: `1px solid ${border}`,
                          }}
                        >
                          <span style={{ color: textPrimary, fontWeight: 600 }}>
                            {item.name}
                          </span>
                          <span
                            style={{ color: theme.primaryColor, fontWeight: 700 }}
                          >
                            {item.price != null ? `$${item.price.toFixed(2)}` : ""}
                          </span>
                        </div>
                      )
                    })}
                    {mealTotal > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "12px 0",
                          fontWeight: 800,
                          fontSize: 18,
                          color: textPrimary,
                        }}
                      >
                        <span>Total</span>
                        <span style={{ color: theme.primaryColor }}>
                          ${mealTotal.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div
                      style={{ display: "flex", gap: 12, marginTop: 20 }}
                    >
                      <button
                        onClick={() => {
                          setMealStep(0)
                          setMealSelections({})
                        }}
                        style={{
                          flex: 1,
                          padding: "12px",
                          background: "transparent",
                          border: `1px solid ${border}`,
                          borderRadius: theme.borderRadius,
                          color: textSecondary,
                          cursor: "pointer",
                          fontFamily: theme.fontFamily,
                          fontWeight: 600,
                        }}
                      >
                        Start Over
                      </button>
                      <button
                        onClick={() => setShowMealBuilder(false)}
                        style={{
                          flex: 1,
                          padding: "12px",
                          background: theme.primaryColor,
                          border: "none",
                          borderRadius: theme.borderRadius,
                          color: "#FFFFFF",
                          cursor: "pointer",
                          fontFamily: theme.fontFamily,
                          fontWeight: 700,
                        }}
                      >
                        Done ✓
                      </button>
                    </div>
                  </div>
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
                      padding: "10px 20px",
                      background: "transparent",
                      border: `1px solid ${border}`,
                      borderRadius: 99,
                      color: mealStep === 0 ? textSecondary : textPrimary,
                      cursor: mealStep === 0 ? "default" : "pointer",
                      fontFamily: theme.fontFamily,
                      fontWeight: 600,
                      opacity: mealStep === 0 ? 0.4 : 1,
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setMealStep((s) => Math.min(s + 1, 3))}
                    style={{
                      padding: "10px 20px",
                      background: theme.primaryColor,
                      border: "none",
                      borderRadius: 99,
                      color: "#FFFFFF",
                      cursor: "pointer",
                      fontFamily: theme.fontFamily,
                      fontWeight: 700,
                    }}
                  >
                    Skip →
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
