export type Allergen = "Shellfish" | "Gluten" | "Dairy" | "Nuts" | "Soy";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
  allergens: Allergen[];
}

export interface MenuSection {
  title: string;
  icon: string;
  items: MenuItem[];
}

export const allergenList: Allergen[] = [
  "Shellfish",
  "Gluten",
  "Dairy",
  "Nuts",
  "Soy",
];

export const menuSections: MenuSection[] = [
  {
    title: "Appetizers",
    icon: "🦀",
    items: [
      {
        name: "Classic Calamari",
        description:
          "Flash fried and served with our chef's special magic sauce.",
        price: "$16",
        image:
          "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80",
        allergens: ["Shellfish", "Gluten"],
      },
      {
        name: "Seafood Stuffed Mushrooms",
        description:
          "A fan favorite for over 55 years. Stuffed with seasoned seafood.",
        price: "$13",
        image:
          "https://images.unsplash.com/photo-1572441710668-e4a0a66d4e12?auto=format&fit=crop&w=400&q=80",
        allergens: ["Shellfish", "Gluten", "Dairy"],
      },
      {
        name: "Crispy Duck Wings",
        description:
          "Six tender Maple Leaf Farms duck drumettes with a sweet chili glaze.",
        price: "$17.75",
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=400&q=80",
        allergens: ["Soy", "Gluten"],
      },
      {
        name: "Maryland Classic Crab Cakes",
        description:
          "Alaskan King Crab and Lump Blue Crab with green & red peppers, served with Port mustard sauce.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Gluten", "Dairy"],
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
        image:
          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Dairy", "Gluten"],
      },
      {
        name: "New England Clam Chowder",
        description:
          "Classic creamy chowder with tender clams and potatoes.",
        price: "Cup / Bowl",
        image:
          "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=400&q=80",
        allergens: ["Shellfish", "Dairy", "Gluten"],
      },
      {
        name: "Soup Trio",
        description:
          "Three petite cups of your choice from the day's rotating soup selection.",
        price: "$7",
        image:
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80",
        allergens: ["Dairy"],
      },
      {
        name: "Port Edward House Salad",
        description:
          "Our legendary old-school salad — crisp greens, house-made dressings and elegant presentation.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Dairy"],
      },
    ],
  },
  {
    title: "Oysters & Mussels",
    icon: "🦪",
    items: [
      {
        name: "Fresh Oysters on the Half Shell",
        description:
          "Premium, briny oysters served on ice with mignonette and cocktail sauce.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1565299543923-37dd37887442?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish"],
      },
      {
        name: "Steamed Mussels",
        description:
          "Prince Edward Island mussels steamed in white wine, garlic, and herbs.",
        price: "$17",
        image:
          "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=400&q=80",
        allergens: ["Shellfish", "Dairy"],
      },
      {
        name: "Baked Stuffed Clams",
        description:
          "Tender clams stuffed with a savory herbed breadcrumb mixture, baked golden.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1611507067882-01e72cefac9e?auto=format&fit=crop&w=400&q=80",
        allergens: ["Shellfish", "Gluten", "Dairy"],
      },
    ],
  },
  {
    title: "Sandwiches & Handhelds",
    icon: "🥪",
    items: [
      {
        name: "New England Lobster Roll",
        description:
          "The dish that defines Port Edward — chunky cold lobster in a toasted brioche bun.",
        price: "$31",
        image:
          "https://images.unsplash.com/photo-1599740723030-bb64eb5ed956?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Gluten", "Dairy"],
      },
      {
        name: "The Port Burger",
        description:
          "A half-pound Certified Angus chuck patty with house-made toppings on a brioche bun.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
        allergens: ["Gluten", "Dairy", "Soy"],
      },
      {
        name: "Fish Sandwich",
        description:
          "Beer-battered fresh catch of the day, served with tartar sauce and house slaw.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=400&q=80",
        allergens: ["Gluten", "Dairy"],
      },
    ],
  },
  {
    title: "Specialty Bowls",
    icon: "🍜",
    items: [
      {
        name: "Gift of the Ocean Pasta",
        description:
          "Creamy sauce with scallops, clams, mussels, shrimp, and squid over linguine.",
        price: "$34",
        image:
          "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Gluten", "Dairy"],
      },
      {
        name: "Seafood Rice Bowl",
        description:
          "Seasoned rice topped with the day's fresh catch and chef's signature sauce.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80",
        allergens: ["Shellfish", "Soy"],
      },
    ],
  },
  {
    title: "Fresh Fish & Seafood",
    icon: "🐟",
    items: [
      {
        name: "Signature Shrimp DeJonghe",
        description:
          "Jumbo shrimp en casserole with garlic, compound herbed butter, and golden bread crumbs. A house classic.",
        price: "$32.50",
        image:
          "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Gluten", "Dairy"],
      },
      {
        name: "Broiled Atlantic Salmon",
        description:
          "Atlantic salmon filet served with dill champagne cream sauce.",
        price: "$31.50",
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80",
        allergens: ["Dairy"],
      },
      {
        name: "Grouper",
        description:
          "Seasoned flour, sautéed filet of Grouper topped with a Basil Lime Beurre Blanc.",
        price: "$33.50",
        image:
          "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=400&q=80",
        allergens: ["Gluten", "Dairy"],
      },
      {
        name: "JUMBO Sea Scallops",
        description: "Grilled jumbo sea scallops in lemon Beurre Blanc.",
        price: "$36.50",
        image:
          "https://images.unsplash.com/photo-1611171711791-b34e43f64e2d?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Dairy"],
      },
      {
        name: "Walleye Pike",
        description:
          "Freshwater walleye prepared your way — pan fried or pretzel crusted.",
        price: "$27.50 / $31.50",
        image:
          "https://images.unsplash.com/photo-1614977645540-7abd88ba5fa2?auto=format&fit=crop&w=400&q=80",
        allergens: ["Gluten", "Dairy"],
      },
      {
        name: "Alaskan King Crab Legs",
        description: "Steamed in the shell and served with drawn butter.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Dairy"],
      },
      {
        name: "Swordfish",
        description:
          "Grilled fresh swordfish steak with seasonal accompaniments.",
        price: "$30",
        image:
          "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=400&q=80",
        allergens: [],
      },
      {
        name: "Cold Water Lobster Tail",
        description:
          "Premium cold water lobster tail, simply prepared to highlight the natural sweetness.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Dairy"],
      },
    ],
  },
  {
    title: "Steaks, Chops & Poultry",
    icon: "🥩",
    items: [
      {
        name: "Filet Mignon",
        description:
          "6oz center-cut Certified Angus beef topped with crispy French fried onions.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Gluten"],
      },
      {
        name: "Bone-In Ribeye",
        description:
          "20oz premium cut of Ribeye charbroiled to perfection, served with au jus.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: [],
      },
      {
        name: "Porterhouse Pork Chop",
        description:
          "Thick-cut Porterhouse pork chop prepared with Port Edward's signature house rub.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=400&q=80",
        allergens: [],
      },
    ],
  },
  {
    title: "Sides",
    icon: "🥔",
    items: [
      {
        name: "Loaf of Bread & Crab Spread",
        description:
          "Warm fresh-baked bread loaf with our signature crab spread.",
        price: "$2.75",
        image:
          "https://images.unsplash.com/photo-1549931319-a545dcf3bc7f?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Shellfish", "Gluten", "Dairy"],
      },
      {
        name: "Homemade Chips",
        description:
          "House-made crispy potato chips — a guest obsession since forever.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: [],
      },
      {
        name: "Side Dishes",
        description:
          "Seasonal sides including vegetables, potatoes, and house accompaniments.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=400&q=80",
        allergens: ["Dairy"],
      },
    ],
  },
  {
    title: "Desserts",
    icon: "🍮",
    items: [
      {
        name: "Seasonal Dessert Selection",
        description:
          "House-made desserts rotate with the season. Ask your server for today's offerings.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80",
        allergens: ["Gluten", "Dairy", "Nuts"],
      },
      {
        name: "Key Lime Pie",
        description:
          "Tart and creamy key lime filling in a buttery graham crust.",
        price: "Market",
        image:
          "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?auto=format&fit=crop&w=400&q=80",
        featured: true,
        allergens: ["Gluten", "Dairy"],
      },
    ],
  },
];

/** Map section titles to the Build My Meal course type */
export type MealCourse = "appetizer" | "entree" | "side" | "dessert";

export const courseSections: Record<MealCourse, string[]> = {
  appetizer: ["Appetizers", "Soups & Salads", "Oysters & Mussels"],
  entree: [
    "Sandwiches & Handhelds",
    "Specialty Bowls",
    "Fresh Fish & Seafood",
    "Steaks, Chops & Poultry",
  ],
  side: ["Sides"],
  dessert: ["Desserts"],
};

export const courseLabels: Record<MealCourse, string> = {
  appetizer: "Appetizer",
  entree: "Entree",
  side: "Side",
  dessert: "Dessert",
};

export const courseOrder: MealCourse[] = [
  "appetizer",
  "entree",
  "side",
  "dessert",
];
