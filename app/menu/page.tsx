"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  menuSections,
  allergenList,
  courseSections,
  courseLabels,
  courseOrder,
  type Allergen,
  type MenuItem,
  type MealCourse,
} from "@/data/menu";

/* ─── helpers ─── */

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z]+/g, "-");
}

function parsePrice(price: string): number | null {
  const m = price.match(/\$(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
}

const allergenIcons: Record<Allergen, string> = {
  Shellfish: "🦐",
  Gluten: "🌾",
  Dairy: "🥛",
  Nuts: "🥜",
  Soy: "🫘",
};

/* ─── component ─── */

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [hiddenAllergens, setHiddenAllergens] = useState<Set<Allergen>>(
    new Set()
  );
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Build My Meal
  const [mealOpen, setMealOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<MealCourse>("appetizer");
  const [mealSelections, setMealSelections] = useState<
    Partial<Record<MealCourse, MenuItem>>
  >({});

  /* ─── derived data ─── */

  const filteredSections = useMemo(() => {
    const q = search.toLowerCase().trim();
    return menuSections
      .filter((s) => !activeTab || s.title === activeTab)
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          // allergen filter
          if (
            hiddenAllergens.size > 0 &&
            item.allergens.some((a) => hiddenAllergens.has(a))
          )
            return false;
          // search filter
          if (q) {
            const haystack =
              `${item.name} ${item.description}`.toLowerCase();
            return haystack.includes(q);
          }
          return true;
        }),
      }))
      .filter((s) => s.items.length > 0);
  }, [search, hiddenAllergens, activeTab]);

  const toggleAllergen = useCallback((a: Allergen) => {
    setHiddenAllergens((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  }, []);

  const scrollToSection = useCallback((title: string) => {
    setActiveTab(null);
    setTimeout(() => {
      sectionRefs.current[title]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }, []);

  /* meal builder helpers */
  const mealTotal = useMemo(() => {
    let total = 0;
    let hasMarket = false;
    for (const item of Object.values(mealSelections)) {
      if (!item) continue;
      const p = parsePrice(item.price);
      if (p !== null) total += p;
      else hasMarket = true;
    }
    return { total, hasMarket };
  }, [mealSelections]);

  const selectForMeal = useCallback(
    (item: MenuItem) => {
      setMealSelections((prev) => ({ ...prev, [currentCourse]: item }));
      // advance to next unfilled course
      const idx = courseOrder.indexOf(currentCourse);
      for (let i = idx + 1; i < courseOrder.length; i++) {
        if (!mealSelections[courseOrder[i]]) {
          setCurrentCourse(courseOrder[i]);
          return;
        }
      }
    },
    [currentCourse, mealSelections]
  );

  const resetMeal = useCallback(() => {
    setMealSelections({});
    setCurrentCourse("appetizer");
    setMealOpen(false);
  }, []);

  /* items available for current meal course */
  const mealCourseItems = useMemo(() => {
    const allowedSections = courseSections[currentCourse];
    return menuSections
      .filter((s) => allowedSections.includes(s.title))
      .flatMap((s) => s.items)
      .filter(
        (item) =>
          hiddenAllergens.size === 0 ||
          !item.allergens.some((a) => hiddenAllergens.has(a))
      );
  }, [currentCourse, hiddenAllergens]);

  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-950" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
            Serving Algonquin Since 1964
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream-100 mb-5">
            Our Menu
          </h1>
          <p className="font-sans text-cream-300/60 leading-relaxed text-lg">
            Fresh seafood, prime steaks, and American classics — prepared with
            care and served with pride. Specials and pricing subject to market
            fluctuations.
          </p>
          <p className="font-sans text-sm text-cream-300/40 mt-3">
            <span className="text-gold-400">★</span> denotes guest favorites
            and chef&apos;s recommendations
          </p>
        </div>
      </section>

      {/* ─── CONTROLS BAR ─── */}
      <section className="sticky top-0 z-40 bg-navy-950/95 backdrop-blur-md border-b border-navy-800/50 px-4 sm:px-6 py-4 space-y-3">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-300/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or ingredient..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-navy-900 border border-navy-700 text-cream-100 placeholder:text-cream-300/40 font-sans text-sm focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-500/30 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-300/40 hover:text-cream-100 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Allergy Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="font-sans text-xs text-cream-300/50 self-center mr-1">
              Hide allergens:
            </span>
            {allergenList.map((a) => {
              const active = hiddenAllergens.has(a);
              return (
                <button
                  key={a}
                  onClick={() => toggleAllergen(a)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 ${
                    active
                      ? "bg-red-500/20 border border-red-400/50 text-red-300"
                      : "bg-navy-900 border border-navy-700 text-cream-300/60 hover:border-cream-300/30"
                  }`}
                >
                  <span>{allergenIcons[a]}</span>
                  {a}
                  {active && (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
            <button
              onClick={() => setActiveTab(null)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 ${
                activeTab === null
                  ? "bg-gold-500 text-navy-950"
                  : "bg-navy-900 border border-navy-700 text-cream-300/60 hover:border-gold-600/40 hover:text-gold-400"
              }`}
            >
              All
            </button>
            {menuSections.map((s) => (
              <button
                key={s.title}
                onClick={() => {
                  if (activeTab === s.title) {
                    setActiveTab(null);
                  } else {
                    setActiveTab(s.title);
                    scrollToSection(s.title);
                  }
                }}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === s.title
                    ? "bg-gold-500 text-navy-950"
                    : "bg-navy-900 border border-navy-700 text-cream-300/60 hover:border-gold-600/40 hover:text-gold-400"
                }`}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MENU SECTIONS ─── */}
      <section className="pb-24 px-4 sm:px-6 pt-8">
        <div className="max-w-7xl mx-auto space-y-20">
          <AnimatePresence mode="popLayout">
            {filteredSections.map((section) => (
              <motion.div
                key={section.title}
                ref={(el) => {
                  sectionRefs.current[section.title] = el;
                }}
                id={sectionId(section.title)}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-3xl">{section.icon}</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-cream-100">
                    {section.title}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold-600/30 to-transparent ml-4" />
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  <AnimatePresence mode="popLayout">
                    {section.items.map((item) => (
                      <motion.div
                        key={item.name}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className={`group relative bg-navy-900 rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-950/50 ${
                          item.featured
                            ? "border-gold-600/30 hover:border-gold-500/60"
                            : "border-navy-800/50 hover:border-navy-700"
                        }`}
                      >
                        <div className="relative h-40 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                          {item.featured && (
                            <span className="absolute top-2 right-2 text-gold-400 text-sm">
                              ★
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h3 className="font-serif text-base text-cream-100 leading-tight">
                              {item.name}
                            </h3>
                            <span className="font-sans text-gold-400 text-sm font-semibold whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                          <p className="font-sans text-xs text-cream-300/55 leading-relaxed">
                            {item.description}
                          </p>
                          {item.allergens.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {item.allergens.map((a) => (
                                <span
                                  key={a}
                                  title={a}
                                  className="text-xs opacity-60"
                                >
                                  {allergenIcons[a]}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Add to Meal button (visible when building) */}
                        {mealOpen &&
                          courseSections[currentCourse].includes(
                            menuSections.find((s) =>
                              s.items.some((i) => i.name === item.name)
                            )?.title ?? ""
                          ) && (
                            <button
                              onClick={() => selectForMeal(item)}
                              className="absolute inset-0 bg-navy-950/70 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                            >
                              <span className="bg-gold-500 text-navy-950 font-sans font-semibold text-sm px-4 py-2 rounded-lg shadow-lg">
                                + Add as {courseLabels[currentCourse]}
                              </span>
                            </button>
                          )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredSections.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-serif text-2xl text-cream-300/40">
                No items match your filters
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setHiddenAllergens(new Set());
                  setActiveTab(null);
                }}
                className="mt-4 font-sans text-gold-400 text-sm underline underline-offset-4 hover:text-gold-300 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Drinks note */}
        <div className="max-w-7xl mx-auto mt-16 border border-navy-800/50 rounded-xl p-8 text-center">
          <h3 className="font-serif text-2xl text-cream-100 mb-3">
            Cocktails, Beer & Wine
          </h3>
          <p className="font-sans text-cream-300/60 mb-5 max-w-xl mx-auto">
            Full cocktail menu including the Jalapeno Margarita (Don Julio
            Blanco, Agave Nectar, Fresh Jalapenos), Port Ed Paloma, specialty
            frozen drinks, craft beer selection, and wine list.
          </p>
          <p className="font-sans text-sm text-gold-400">
            Ask your server for today&apos;s cocktail and drink specials.
          </p>
        </div>

        {/* Reservation CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h3 className="font-serif text-3xl text-cream-100 mb-4">
            Ready to Join Us?
          </h3>
          <p className="font-sans text-cream-300/60 mb-8">
            Reserve your table online or call us directly. Walk-ins welcome
            based on availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold px-8 py-4 rounded transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/30"
            >
              Reserve on OpenTable
            </a>
            <a
              href="tel:8476585441"
              className="border border-navy-700 hover:border-gold-600 text-cream-200 hover:text-gold-400 font-sans font-semibold px-8 py-4 rounded transition-colors"
            >
              Call (847) 658-5441
            </a>
          </div>
          <p className="font-sans text-xs text-cream-300/40 mt-6">
            * Specials & pricing subject to change due to market fluctuations.
            No coupons or discounts on specials or holidays.
          </p>
        </div>
      </section>

      <Footer />

      {/* ─── BUILD MY MEAL ─── */}
      <AnimatePresence>
        {!mealOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setMealOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-bold px-6 py-3 rounded-full shadow-xl shadow-gold-500/30 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Build My Meal
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mealOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900 border-t-2 border-gold-500/40 rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-navy-900 px-4 sm:px-6 py-4 border-b border-navy-800/50 flex items-center justify-between">
              <h3 className="font-serif text-xl text-cream-100">
                Build My Meal
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetMeal}
                  className="font-sans text-xs text-cream-300/50 hover:text-red-400 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMealOpen(false)}
                  className="text-cream-300/50 hover:text-cream-100 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Course Steps */}
            <div className="px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
              {courseOrder.map((course, i) => {
                const selected = mealSelections[course];
                const isCurrent = currentCourse === course;
                return (
                  <button
                    key={course}
                    onClick={() => setCurrentCourse(course)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all duration-200 ${
                      isCurrent
                        ? "bg-gold-500/20 border border-gold-500/50 text-gold-400"
                        : selected
                          ? "bg-navy-800 border border-green-500/30 text-green-400"
                          : "bg-navy-800 border border-navy-700 text-cream-300/50"
                    }`}
                  >
                    <span className="font-bold text-xs opacity-50">
                      {i + 1}
                    </span>
                    {courseLabels[course]}
                    {selected && (
                      <svg
                        className="w-3.5 h-3.5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected items summary */}
            <div className="px-4 sm:px-6 pb-2">
              {courseOrder.map((course) => {
                const item = mealSelections[course];
                if (!item) return null;
                return (
                  <div
                    key={course}
                    className="flex items-center justify-between py-1.5 text-sm"
                  >
                    <span className="font-sans text-cream-300/50">
                      {courseLabels[course]}:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-cream-100">
                        {item.name}
                      </span>
                      <span className="font-sans text-gold-400 text-xs font-semibold">
                        {item.price}
                      </span>
                      <button
                        onClick={() =>
                          setMealSelections((prev) => {
                            const next = { ...prev };
                            delete next[course];
                            return next;
                          })
                        }
                        className="text-cream-300/30 hover:text-red-400 transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Course picker */}
            <div className="px-4 sm:px-6 py-3">
              <p className="font-sans text-xs text-cream-300/40 mb-3">
                Choose your{" "}
                <span className="text-gold-400">
                  {courseLabels[currentCourse].toLowerCase()}
                </span>{" "}
                — or click items on the menu above
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto scrollbar-hide">
                {mealCourseItems.map((item) => {
                  const isSelected =
                    mealSelections[currentCourse]?.name === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => selectForMeal(item)}
                      className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all duration-200 ${
                        isSelected
                          ? "bg-gold-500/20 border border-gold-500/50"
                          : "bg-navy-800/50 border border-navy-700/50 hover:border-gold-600/30"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded object-cover shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-sans text-xs text-cream-100 truncate">
                          {item.name}
                        </p>
                        <p className="font-sans text-xs text-gold-400 font-semibold">
                          {item.price}
                        </p>
                      </div>
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-gold-400 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total */}
            <div className="sticky bottom-0 bg-navy-900 border-t border-navy-800/50 px-4 sm:px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-sans text-sm text-cream-300/50">
                  Running Total
                </p>
                <p className="font-serif text-2xl text-gold-400">
                  ${mealTotal.total.toFixed(2)}
                  {mealTotal.hasMarket && (
                    <span className="text-sm text-cream-300/40 ml-2">
                      + market price items
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={resetMeal}
                  className="font-sans text-sm text-cream-300/50 hover:text-cream-100 px-4 py-2 rounded-lg border border-navy-700 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
