import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-cream-100 mb-2">Port Edward</h3>
            <p className="text-gold-400 text-xs tracking-[0.2em] uppercase font-sans mb-4">
              Restaurant
            </p>
            <p className="text-cream-300/70 font-sans text-sm leading-relaxed">
              A unique dining experience on the Fox River. Serving Algonquin and the greater
              Chicagoland area since 1964.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/PortEdwardRestaurant/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-300/50 hover:text-gold-400 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-gold-400 text-lg mb-5">Hours</h4>
            <div className="space-y-2 font-sans text-sm text-cream-300/70">
              <div className="flex justify-between gap-8">
                <span>Tuesday – Thursday</span>
                <span className="text-cream-200">3 – 10pm</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Friday</span>
                <span className="text-cream-200">3 – 11pm</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Saturday</span>
                <span className="text-cream-200">11am – 11pm</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Sunday</span>
                <span className="text-cream-200">9:30am – 10pm</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Sunday Brunch</span>
                <span className="text-cream-200">9:30am – 2pm</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>Monday</span>
                <span className="text-cream-200">Closed</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-gold-400 text-lg mb-5">Visit Us</h4>
            <div className="space-y-3 font-sans text-sm text-cream-300/70">
              <div>
                <p className="text-cream-200">20 W Algonquin Rd</p>
                <p>Algonquin, IL 60102</p>
              </div>
              <a href="tel:8476585441" className="block text-cream-200 hover:text-gold-400 transition-colors">
                (847) 658-5441
              </a>
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-sm px-5 py-2.5 rounded text-center transition-colors"
                >
                  Make a Reservation
                </a>
                <a
                  href="https://maps.google.com/?q=Port+Edward+Restaurant+20+W+Algonquin+Rd+Algonquin+IL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-navy-700 hover:border-gold-600 text-cream-200 hover:text-gold-400 font-sans text-sm px-5 py-2.5 rounded text-center transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-navy-800/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-cream-300/40 text-center sm:text-left">
            © {new Date().getFullYear()} Port Edward Restaurant. All rights reserved. Est. 1964.
          </p>
          <div className="flex gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "/menu", label: "Menu" },
              { href: "/about", label: "Our Story" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs text-cream-300/40 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
