import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "Our Story | Port Edward Restaurant — 60 Years on the Fox River",
  description:
    "Discover the story of Port Edward Restaurant — a 60-year dining institution on the Fox River in Algonquin, IL. From humble beginnings in 1964 to a Chicagoland institution.",
};

const milestones = [
  {
    year: "1964",
    title: "Founded on the Fox River",
    description:
      "Port Edward opens its doors on the banks of the Fox River in Algonquin, Illinois — bringing fine seafood dining to the greater Chicagoland area.",
  },
  {
    year: "1970s",
    title: "The Iconic Koi Pond",
    description:
      "The famous indoor koi pond and windmill become centerpiece features of the dining room — creating an atmosphere unlike any restaurant in the region.",
  },
  {
    year: "1980s",
    title: "Shrimp DeJonghe Becomes Legend",
    description:
      "The Signature Shrimp DeJonghe — jumbo shrimp en casserole with garlic herbed butter — becomes one of the most beloved dishes in McHenry County.",
  },
  {
    year: "1990s",
    title: "Sunday Champagne Brunch",
    description:
      "The Sunday Champagne Brunch tradition begins, offering guests a luxurious weekend experience on the Fox River with live carving stations and flowing mimosas.",
  },
  {
    year: "2000s",
    title: "A Destination for Celebrations",
    description:
      "Port Edward becomes the go-to venue for anniversaries, birthdays, and milestone celebrations across Algonquin and neighboring communities.",
  },
  {
    year: "Today",
    title: "Still Going Strong",
    description:
      "With 4.4 stars across 600+ reviews, Port Edward continues to delight a new generation of diners while honoring the traditions and recipes that made it an institution.",
  },
];

const values = [
  {
    icon: "⚓",
    title: "Sourced Fresh, Daily",
    description:
      "We partner with premier suppliers to ensure our seafood arrives fresh every day — from Pacific king crab to Atlantic lobster tails.",
  },
  {
    icon: "🍾",
    title: "Celebratory by Nature",
    description:
      "Every meal at Port Edward is an occasion. From our champagne brunch to weeknight dinners, we make every visit feel special.",
  },
  {
    icon: "👨‍🍳",
    title: "Craft Without Compromise",
    description:
      "Our chefs bring decades of experience and a passion for precise technique — whether it's a simple broiled salmon or a full seafood feast.",
  },
  {
    icon: "🌊",
    title: "River Heritage",
    description:
      "Situated on the Fox River, our nautical setting isn't just decor — it's a living reminder of our connection to the water and the food it provides.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-0 overflow-hidden">
        <div className="relative h-72 sm:h-96 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
            alt="Port Edward dining room — elegant nautical atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-950/50 to-navy-950" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
              Our Heritage
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-cream-100 font-bold">
              Our Story
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-5">
              A Unique Dining Experience
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream-100 mb-6 leading-tight">
              60+ Years on the
              <br />
              <span className="text-gradient-gold">Fox River</span>
            </h2>
            <p className="font-sans text-cream-300/70 leading-relaxed mb-5">
              In 1964, Port Edward opened its doors on the banks of the Fox River in Algonquin,
              Illinois — with a simple but audacious idea: bring world-class seafood and fine dining
              to the heart of the Chicagoland suburbs.
            </p>
            <p className="font-sans text-cream-300/70 leading-relaxed mb-5">
              More than six decades later, that idea has become a living institution. Generations of
              families have made Port Edward the backdrop for their most important moments —
              anniversaries, graduations, first dates, and Sunday mornings with champagne.
            </p>
            <p className="font-sans text-cream-300/70 leading-relaxed">
              Our famous indoor koi pond, the windmill that greets you at the entrance, the smell of
              lobster bisque drifting through the dining room — these aren&apos;t just features of a
              restaurant. They&apos;re touchstones of memory for thousands of Algonquin families.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80"
                alt="Fine seafood dining"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80"
                alt="Lobster dish"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1611171711791-b34e43f64e2d?auto=format&fit=crop&w=600&q=80"
                alt="Scallops dish"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
                alt="Elegant dining room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 bg-navy-900/40 border-y border-navy-800/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { end: 1964, label: "Year Founded", suffix: "" },
            { end: 60, label: "Years of Excellence", suffix: "+" },
            { end: 600, label: "Guest Reviews", suffix: "+" },
            { end: 321, label: "Yelp Photos", suffix: "" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-gradient-gold mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2000} />
              </div>
              <p className="font-sans text-sm text-cream-300/60 tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-3">
              Six Decades
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream-100">
              A Living Timeline
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold-600/50 via-gold-600/20 to-transparent" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-3 h-3 bg-gold-500 rounded-full ring-2 ring-gold-500/30 mt-1.5" />

                  {/* Content */}
                  <div className={`ml-16 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="bg-navy-900 border border-navy-800/50 hover:border-gold-600/30 rounded-xl p-6 transition-colors">
                      <span className="font-sans text-gold-400 text-sm font-semibold tracking-wide">
                        {milestone.year}
                      </span>
                      <h3 className="font-serif text-xl text-cream-100 mt-1 mb-2">{milestone.title}</h3>
                      <p className="font-sans text-sm text-cream-300/60 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 bg-navy-900/30 border-y border-navy-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream-100">
              The Port Edward Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-navy-900 border border-navy-800/50 hover:border-gold-600/30 rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="font-serif text-xl text-cream-100 mb-3">{value.title}</h3>
                <p className="font-sans text-sm text-cream-300/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
            Join Us
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream-100 mb-6">
            Be Part of the Story
          </h2>
          <p className="font-sans text-cream-300/60 leading-relaxed mb-10">
            Every table at Port Edward is a seat in 60 years of history. Come for the lobster rolls.
            Stay for the memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold px-8 py-4 rounded transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/30"
            >
              Make a Reservation
            </a>
            <a
              href="tel:8476585441"
              className="border border-navy-700 hover:border-gold-600 text-cream-200 hover:text-gold-400 font-sans font-semibold px-8 py-4 rounded transition-colors"
            >
              Call (847) 658-5441
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
