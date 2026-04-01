"use client";

import { useState, useEffect } from "react";

const reviews = [
  {
    quote:
      "My absolute favorite are their lobster rolls. I have traveled the world and I have never had such excellent lobster rolls.",
    author: "David M.",
    source: "TripAdvisor",
    stars: 5,
  },
  {
    quote:
      "They still have a great old school salad, I have always loved their dressings and presentation. I had the walleye, which was perfectly cooked.",
    author: "Sarah K.",
    source: "Yelp",
    stars: 5,
  },
  {
    quote:
      "Food was amazing!! Definitely pricey but well worth it. The atmosphere is unlike anything else in the area.",
    author: "Jennifer R.",
    source: "Yelp",
    stars: 5,
  },
  {
    quote:
      "Add a side of homemade chips and you are in heaven. The servings are so large — we always leave stuffed.",
    author: "Michael T.",
    source: "TripAdvisor",
    stars: 5,
  },
  {
    quote:
      "Great service with a great price especially for the cocktails. Always a pleasure to have the owner out walking around shaking hands.",
    author: "Chicago Bob",
    source: "Yelp",
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-gold-400 fill-gold-400" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
      setAnimating(false);
    }, 300);
  };

  const goPrev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
      setAnimating(false);
    }, 300);
  };

  const review = reviews[current];

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <div className="text-center max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-5">
            <StarRating count={review.stars} />
          </div>
          <blockquote className="font-serif text-xl sm:text-2xl text-cream-100 leading-relaxed mb-6 italic">
            &ldquo;{review.quote}&rdquo;
          </blockquote>
          <div className="flex flex-col items-center gap-1">
            <span className="font-sans font-semibold text-gold-400 text-sm">
              — {review.author}
            </span>
            <span className="font-sans text-xs text-cream-300/50 tracking-wide uppercase">
              {review.source}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={goPrev}
          className="w-10 h-10 rounded-full border border-navy-700 hover:border-gold-500 flex items-center justify-center text-cream-300 hover:text-gold-400 transition-colors"
          aria-label="Previous review"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-gold-400 w-6" : "bg-navy-700 hover:bg-navy-600"
              }`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="w-10 h-10 rounded-full border border-navy-700 hover:border-gold-500 flex items-center justify-center text-cream-300 hover:text-gold-400 transition-colors"
          aria-label="Next review"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
