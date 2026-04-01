import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxHero from "@/components/ParallaxHero";
import ReviewCarousel from "@/components/ReviewCarousel";
import AnimatedCounter from "@/components/AnimatedCounter";
import Link from "next/link";

const featuredDishes = [
  {
    name: "New England Lobster Roll",
    description: "Chilled, chunky lobster in a toasted brioche bun — the dish that defines Port Edward.",
    price: "$31",
    image: "https://images.unsplash.com/photo-1599740723030-bb64eb5ed956?auto=format&fit=crop&w=600&q=80",
    badge: "Guest Favorite",
  },
  {
    name: "Signature Shrimp DeJonghe",
    description: "Jumbo shrimp en casserole with garlic, compound herbed butter, and golden bread crumbs.",
    price: "$32.50",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
    badge: "Since 1964",
  },
  {
    name: "Maryland Classic Crab Cakes",
    description: "Alaskan King Crab and Lump Blue Crab with peppers, served with our house Port mustard sauce.",
    price: "Market",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
  {
    name: "Filet Mignon",
    description: "6oz center-cut Certified Angus beef, topped with crispy French fried onions.",
    price: "Market",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=600&q=80",
    badge: null,
  },
];

const stats = [
  { value: 60, suffix: "+", label: "Years of Excellence" },
  { value: 600, suffix: "+", label: "Guest Reviews" },
  { value: 4.4, suffix: "★", label: "Average Rating", isDecimal: true },
  { value: 321, suffix: "", label: "Yelp Photos" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero */}
      <ParallaxHero />

      {/* Quick info bar */}
      <section className="bg-navy-900 border-y border-navy-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm font-sans text-cream-200/80">
            <a href="tel:8476585441" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (847) 658-5441
            </a>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              20 W Algonquin Rd, Algonquin, IL
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tue–Thu 3–10pm · Fri 3–11pm · Sat 11am–11pm · Sun 9:30am–10pm
            </span>
            <span className="flex items-center gap-2 text-gold-300">
              <svg className="w-4 h-4 fill-gold-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              4.4 · 410+ Reviews
            </span>
          </div>
        </div>
      </section>

      {/* Stats / Counter Section */}
      <section className="py-20 px-4 sm:px-6 border-b border-navy-800/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="font-serif text-4xl sm:text-5xl font-bold text-gradient-gold mb-2">
                {stat.isDecimal ? (
                  <span>4.4★</span>
                ) : (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                )}
              </div>
              <p className="font-sans text-sm text-cream-300/60 tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-3">
              Signature Dishes
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream-100 mb-5">
              The Art of Exceptional Dining
            </h2>
            <p className="font-sans text-cream-300/60 max-w-2xl mx-auto leading-relaxed">
              From our legendary lobster rolls to hand-cut prime steaks, every plate is a testament
              to six decades of culinary excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish, i) => (
              <div
                key={i}
                className="group relative bg-navy-900 rounded-xl overflow-hidden border border-navy-800/50 hover:border-gold-600/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/50"
              >
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                  {dish.badge && (
                    <span className="absolute top-3 left-3 bg-gold-500/90 text-navy-950 font-sans font-semibold text-xs px-2.5 py-1 rounded">
                      {dish.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg text-cream-100 leading-tight">{dish.name}</h3>
                    <span className="font-sans text-gold-400 font-semibold text-sm whitespace-nowrap">{dish.price}</span>
                  </div>
                  <p className="font-sans text-sm text-cream-300/60 leading-relaxed">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-block border border-gold-600/50 hover:border-gold-400 text-gold-400 hover:text-gold-300 font-sans font-semibold px-8 py-3.5 rounded transition-all duration-200 hover:-translate-y-0.5"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Since 1964 Section */}
      <section className="py-24 px-4 sm:px-6 bg-navy-900/50 border-y border-navy-800/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80"
                alt="Port Edward elegant dining room"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold-500 text-navy-950 font-serif text-center px-8 py-6 rounded-xl shadow-xl hidden sm:block">
              <div className="text-4xl font-bold">60+</div>
              <div className="text-xs font-sans font-semibold tracking-wider uppercase mt-1">Years</div>
            </div>
          </div>
          <div>
            <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
              Our Heritage
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream-100 mb-6 leading-tight">
              A Tradition of Excellence
              <br />
              <span className="text-gradient-gold">Since 1964</span>
            </h2>
            <p className="font-sans text-cream-300/70 leading-relaxed mb-5">
              For over sixty years, Port Edward has been the destination restaurant on the Fox River —
              a place where generations of families have gathered to celebrate life&apos;s milestones.
              Our nautical setting, with its iconic indoor koi pond and windmill, creates an atmosphere
              unlike any other in the Chicagoland area.
            </p>
            <p className="font-sans text-cream-300/70 leading-relaxed mb-8">
              We source the finest ingredients — fresh catches from both coasts, Certified Angus beef,
              and seasonal produce — all prepared with the same care and skill that has defined us for
              more than six decades.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-sans font-semibold transition-colors group"
            >
              Read Our Full Story
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-4 sm:px-6 bg-navy-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-3">
              Guest Voices
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cream-100 mb-4">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-gold-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="font-sans text-cream-300/70 text-sm">4.4 average · 600+ reviews across platforms</span>
            </div>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      {/* Sunday Brunch Highlight */}
      <section className="relative py-28 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
            Every Sunday
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cream-100 mb-5">
            Sunday Champagne Brunch
          </h2>
          <p className="font-serif text-xl text-cream-200/80 italic mb-6">
            9:30am – 2:00pm
          </p>
          <p className="font-sans text-cream-300/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Start your Sunday with bubbles and elegance. Our champagne brunch features live carving
            stations, fresh seafood, made-to-order omelets, and a mimosa bar — all in our iconic
            Fox River setting.
          </p>
          <a
            href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold px-8 py-4 rounded transition-all duration-200 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
          >
            Reserve Brunch
          </a>
        </div>
      </section>

      {/* Map / Location */}
      <section className="py-20 px-4 sm:px-6 bg-navy-900/30 border-t border-navy-800/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
              Find Us
            </p>
            <h2 className="font-serif text-4xl text-cream-100 mb-6">
              On the Fox River
            </h2>
            <div className="space-y-4 font-sans text-cream-300/70">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-cream-200">20 W Algonquin Rd</p>
                  <p>Algonquin, IL 60102</p>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:8476585441" className="text-cream-200 hover:text-gold-400 transition-colors">
                  (847) 658-5441
                </a>
              </div>
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="space-y-1 text-sm">
                  <p><span className="text-cream-200">Tue – Thu:</span> 3:00pm – 10:00pm</p>
                  <p><span className="text-cream-200">Friday:</span> 3:00pm – 11:00pm</p>
                  <p><span className="text-cream-200">Saturday:</span> 11:00am – 11:00pm</p>
                  <p><span className="text-cream-200">Sunday:</span> 9:30am – 10:00pm</p>
                  <p className="text-gold-400">Sunday Champagne Brunch: 9:30am – 2:00pm</p>
                  <p><span className="text-cream-200">Monday:</span> Closed</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href="https://maps.google.com/?q=Port+Edward+Restaurant+20+W+Algonquin+Rd+Algonquin+IL"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold text-sm px-6 py-3 rounded transition-colors"
              >
                Get Directions
              </a>
              <a
                href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-navy-700 hover:border-gold-600 text-cream-200 hover:text-gold-400 font-sans text-sm px-6 py-3 rounded transition-colors"
              >
                Make a Reservation
              </a>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-navy-800/50 h-80 sm:h-96 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.8!2d-88.2904!3d42.1564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880f0d14d49b7111%3A0x2b08b7b9ef91b5a2!2sPort%20Edward%20Restaurant!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Port Edward Restaurant Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
