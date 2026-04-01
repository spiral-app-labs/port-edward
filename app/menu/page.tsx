"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuWidget from "@/components/MenuWidget";
import rawMenu from "@/data/widget/port-edward.json";
import type { MenuWidgetConfig, MenuItem } from "@/lib/types";

const items = (rawMenu.items as MenuItem[]);

const config: MenuWidgetConfig = {
  restaurant: {
    name: rawMenu.restaurant.name,
    tagline: rawMenu.restaurant.tagline ?? undefined,
  },
  theme: {
    primaryColor: "#1a2744",
    secondaryColor: "#c9a84c",
    accentColor: "#faf8f0",
    fontFamily: "Georgia, serif",
    headerFont: "'Playfair Display', Georgia, serif",
    borderRadius: "0.75rem",
    cardStyle: "elevated",
    layout: "grid",
    mode: "light",
  },
  menu: items,
  features: {
    search: true,
    allergyFilters: true,
    mealBuilder: true,
    aiChat: false,
  },
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <MenuWidget config={config} />
      <Footer />
    </>
  );
}
