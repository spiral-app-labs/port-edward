import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact & Reservations | Port Edward Restaurant — Algonquin, IL",
  description:
    "Visit Port Edward Restaurant at 20 W Algonquin Rd, Algonquin, IL. Call (847) 658-5441 or reserve online via OpenTable. Open Tue–Sun.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-gold-400 text-xs tracking-[0.3em] uppercase mb-4">
            We&apos;d Love to See You
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl text-cream-100 mb-5">
            Contact & Reservations
          </h1>
          <p className="font-sans text-cream-300/60 leading-relaxed text-lg">
            The best way to reserve a table is via OpenTable or by giving us a call directly.
            Walk-ins are always welcome based on availability.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info cards */}
          <div className="space-y-6">
            {/* Reserve */}
            <div className="bg-navy-900 border border-gold-600/30 rounded-xl p-8">
              <h2 className="font-serif text-2xl text-cream-100 mb-5 flex items-center gap-3">
                <span className="text-2xl">🍽️</span> Make a Reservation
              </h2>
              <p className="font-sans text-cream-300/60 text-sm leading-relaxed mb-6">
                Reserve your table online through OpenTable for the fastest confirmation, or call us
                directly during business hours.
              </p>
              <div className="space-y-3">
                <a
                  href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold px-6 py-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/30 group"
                >
                  <span>Reserve on OpenTable</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="tel:8476585441"
                  className="flex items-center justify-between w-full border border-navy-700 hover:border-gold-600 text-cream-200 hover:text-gold-400 font-sans font-semibold px-6 py-4 rounded-lg transition-colors group"
                >
                  <span>(847) 658-5441</span>
                  <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-navy-900 border border-navy-800/50 rounded-xl p-8">
              <h2 className="font-serif text-2xl text-cream-100 mb-5 flex items-center gap-3">
                <span className="text-2xl">🕐</span> Hours
              </h2>
              <div className="space-y-3 font-sans text-sm">
                {[
                  { day: "Tuesday – Thursday", hours: "3:00pm – 10:00pm" },
                  { day: "Friday", hours: "3:00pm – 11:00pm" },
                  { day: "Saturday", hours: "11:00am – 11:00pm" },
                  { day: "Sunday", hours: "9:30am – 10:00pm" },
                  { day: "Sunday Champagne Brunch", hours: "9:30am – 2:00pm", highlight: true },
                  { day: "Monday", hours: "Closed" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2 border-b border-navy-800/30 last:border-0 ${
                      item.highlight ? "text-gold-400" : ""
                    }`}
                  >
                    <span className={item.highlight ? "text-gold-400 font-medium" : "text-cream-300/60"}>
                      {item.day}
                    </span>
                    <span className={item.highlight ? "text-gold-400 font-medium" : "text-cream-200"}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="bg-navy-900 border border-navy-800/50 rounded-xl p-8">
              <h2 className="font-serif text-2xl text-cream-100 mb-5 flex items-center gap-3">
                <span className="text-2xl">📍</span> Find Us
              </h2>
              <div className="space-y-4 font-sans text-sm text-cream-300/60">
                <div>
                  <p className="text-cream-200 font-medium">Port Edward Restaurant</p>
                  <p>20 W Algonquin Rd</p>
                  <p>Algonquin, IL 60102</p>
                </div>
                <p className="text-xs leading-relaxed">
                  Located on the Fox River in downtown Algonquin. Ample parking available on-site.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="https://maps.google.com/?q=Port+Edward+Restaurant+20+W+Algonquin+Rd+Algonquin+IL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Get Directions on Google Maps
                  </a>
                  <a
                    href="https://www.facebook.com/PortEdwardRestaurant/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Follow on Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex flex-col gap-6">
            <div className="rounded-xl overflow-hidden border border-navy-800/50 h-96 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.8!2d-88.2904!3d42.1564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880f0d14d49b7111%3A0x2b08b7b9ef91b5a2!2sPort%20Edward%20Restaurant!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Port Edward Restaurant Map"
              />
            </div>

            {/* Private dining */}
            <div className="bg-navy-900 border border-navy-800/50 rounded-xl p-8">
              <h2 className="font-serif text-2xl text-cream-100 mb-4">
                Private Events & Large Parties
              </h2>
              <p className="font-sans text-cream-300/60 text-sm leading-relaxed mb-5">
                Planning a special event? Port Edward is the perfect setting for rehearsal dinners,
                corporate events, birthdays, and milestone celebrations. Our team will work with you
                to create an unforgettable evening.
              </p>
              <a
                href="tel:8476585441"
                className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-sans font-semibold text-sm transition-colors group"
              >
                Call to inquire about private dining
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Rating badge */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 border border-gold-600/20 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-gold-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-4xl text-cream-100 font-bold mb-1">4.4</p>
              <p className="font-sans text-sm text-cream-300/60">410+ Google Reviews</p>
              <p className="font-sans text-xs text-cream-300/40 mt-2">607 reviews on Yelp · 321 photos</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
