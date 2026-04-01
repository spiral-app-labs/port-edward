import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Menu | Port Edward Restaurant — Algonquin, IL",
  description:
    "Explore Port Edward's full menu: fresh seafood, lobster rolls, Shrimp DeJonghe, prime steaks, oysters, Sunday Champagne Brunch and more. Algonquin, IL since 1964.",
};

const menuSections = [
  {
    title: "Appetizers",
    icon: "🦀",
    items: [
      {
        name: "Classic Calamari",
        description: "Flash fried and served with our chef's special magic sauce.",
        price: "$16",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Seafood Stuffed Mushrooms",
        description: "A fan favorite for over 55 years. Stuffed with seasoned seafood.",
        price: "$13",
        image: "https://images.unsplash.com/photo-1572441710668-e4a0a66d4e12?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Crispy Duck Wings",
        description: "Six tender Maple Leaf Farms duck drumettes with a sweet chili glaze.",
        price: "$17.75",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Maryland Classic Crab Cakes",
        description: "Alaskan King Crab and Lump Blue Crab with green & red peppers, served with Port mustard sauce.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
    ],
  },
  {
    title: "Soups & Salads",
    icon: "🥗",
    items: [
      {
        name: "Signature Lobster Bisque",
        description: "Rich, velvety lobster bisque — a Port Edward classic.",
        price: "Cup / Bowl",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "New England Clam Chowder",
        description: "Classic creamy chowder with tender clams and potatoes.",
        price: "Cup / Bowl",
        image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Soup Trio",
        description: "Three petite cups of your choice from the day's rotating soup selection.",
        price: "$7",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Port Edward House Salad",
        description: "Our legendary old-school salad — crisp greens, house-made dressings and elegant presentation.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
    ],
  },
  {
    title: "Oysters & Mussels",
    icon: "🦪",
    items: [
      {
        name: "Fresh Oysters on the Half Shell",
        description: "Premium, briny oysters served on ice with mignonette and cocktail sauce.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1565299543923-37dd37887442?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Steamed Mussels",
        description: "Prince Edward Island mussels steamed in white wine, garlic, and herbs.",
        price: "$17",
        image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Baked Stuffed Clams",
        description: "Tender clams stuffed with a savory herbed breadcrumb mixture, baked golden.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1611507067882-01e72cefac9e?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    title: "Sandwiches & Handhelds",
    icon: "🥪",
    items: [
      {
        name: "New England Lobster Roll",
        description: "The dish that defines Port Edward — chunky cold lobster in a toasted brioche bun.",
        price: "$31",
        image: "https://images.unsplash.com/photo-1599740723030-bb64eb5ed956?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "The Port Burger",
        description: "A half-pound Certified Angus chuck patty with house-made toppings on a brioche bun.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Fish Sandwich",
        description: "Beer-battered fresh catch of the day, served with tartar sauce and house slaw.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    title: "Specialty Bowls",
    icon: "🍜",
    items: [
      {
        name: "Gift of the Ocean Pasta",
        description: "Creamy sauce with scallops, clams, mussels, shrimp, and squid over linguine.",
        price: "$34",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Seafood Rice Bowl",
        description: "Seasoned rice topped with the day's fresh catch and chef's signature sauce.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    title: "Fresh Fish & Seafood",
    icon: "🐟",
    items: [
      {
        name: "Signature Shrimp DeJonghe",
        description: "Jumbo shrimp en casserole with garlic, compound herbed butter, and golden bread crumbs. A house classic.",
        price: "$32.50",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Broiled Atlantic Salmon",
        description: "Atlantic salmon filet served with dill champagne cream sauce.",
        price: "$31.50",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Grouper",
        description: "Seasoned flour, sautéed filet of Grouper topped with a Basil Lime Beurre Blanc.",
        price: "$33.50",
        image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "JUMBO Sea Scallops",
        description: "Grilled jumbo sea scallops in lemon Beurre Blanc.",
        price: "$36.50",
        image: "https://images.unsplash.com/photo-1611171711791-b34e43f64e2d?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Walleye Pike",
        description: "Freshwater walleye prepared your way — pan fried or pretzel crusted.",
        price: "$27.50 / $31.50",
        image: "https://images.unsplash.com/photo-1614977645540-7abd88ba5fa2?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Alaskan King Crab Legs",
        description: "Steamed in the shell and served with drawn butter.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Swordfish",
        description: "Grilled fresh swordfish steak with seasonal accompaniments.",
        price: "$30",
        image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Cold Water Lobster Tail",
        description: "Premium cold water lobster tail, simply prepared to highlight the natural sweetness.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
    ],
  },
  {
    title: "Steaks, Chops & Poultry",
    icon: "🥩",
    items: [
      {
        name: "Filet Mignon",
        description: "6oz center-cut Certified Angus beef topped with crispy French fried onions.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Bone-In Ribeye",
        description: "20oz premium cut of Ribeye charbroiled to perfection, served with au jus.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Porterhouse Pork Chop",
        description: "Thick-cut Porterhouse pork chop prepared with Port Edward's signature house rub.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    title: "Sides",
    icon: "🥔",
    items: [
      {
        name: "Loaf of Bread & Crab Spread",
        description: "Warm fresh-baked bread loaf with our signature crab spread.",
        price: "$2.75",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7f?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Homemade Chips",
        description: "House-made crispy potato chips — a guest obsession since forever.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
      {
        name: "Side Dishes",
        description: "Seasonal sides including vegetables, potatoes, and house accompaniments.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    title: "Desserts",
    icon: "🍮",
    items: [
      {
        name: "Seasonal Dessert Selection",
        description: "House-made desserts rotate with the season. Ask your server for today's offerings.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Key Lime Pie",
        description: "Tart and creamy key lime filling in a buttery graham crust.",
        price: "Market",
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?auto=format&fit=crop&w=400&q=80",
        featured: true,
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
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
            Fresh seafood, prime steaks, and American classics — prepared with care and served with
            pride. Specials and pricing subject to market fluctuations.
          </p>
          <p className="font-sans text-sm text-cream-300/40 mt-3">
            <span className="text-gold-400">★</span> denotes guest favorites and chef&apos;s recommendations
          </p>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {menuSections.map((section, si) => (
            <div key={si} id={section.title.toLowerCase().replace(/[^a-z]+/g, "-")}>
              {/* Section header */}
              <div className="flex items-center gap-4 mb-10">
                <span className="text-3xl">{section.icon}</span>
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-cream-100">{section.title}</h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gold-600/30 to-transparent ml-4" />
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {section.items.map((item, ii) => (
                  <div
                    key={ii}
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
                        <span className="absolute top-2 right-2 text-gold-400 text-sm">★</span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-serif text-base text-cream-100 leading-tight">{item.name}</h3>
                        <span className="font-sans text-gold-400 text-sm font-semibold whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="font-sans text-xs text-cream-300/55 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Drinks note */}
        <div className="max-w-7xl mx-auto mt-16 border border-navy-800/50 rounded-xl p-8 text-center">
          <h3 className="font-serif text-2xl text-cream-100 mb-3">Cocktails, Beer & Wine</h3>
          <p className="font-sans text-cream-300/60 mb-5 max-w-xl mx-auto">
            Full cocktail menu including the Jalapeño Margarita (Don Julio Blanco, Agave Nectar, Fresh Jalapeños),
            Port Ed Paloma, specialty frozen drinks, craft beer selection, and wine list.
          </p>
          <p className="font-sans text-sm text-gold-400">
            Ask your server for today&apos;s cocktail and drink specials.
          </p>
        </div>

        {/* Reservation CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h3 className="font-serif text-3xl text-cream-100 mb-4">Ready to Join Us?</h3>
          <p className="font-sans text-cream-300/60 mb-8">
            Reserve your table online or call us directly. Walk-ins welcome based on availability.
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
            * Specials & pricing subject to change due to market fluctuations. No coupons or discounts on specials or holidays.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
