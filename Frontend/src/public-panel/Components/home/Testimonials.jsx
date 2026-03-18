import React from "react";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Daily Commuter",
      text: "SmartPark made parking stress-free and fast. I no longer have to circle the block for 20 minutes every morning.",
      stars: 5,
    },
    {
      name: "Sneha Patel",
      role: "Business Owner",
      text: "The Admin Dashboard is a game changer for my private parking lot. Managing slots has never been this easy.",
      stars: 5,
    },
    {
      name: "Amit Verma",
      role: "Weekend Traveler",
      text: "Love the digital payment feature. It's secure, transparent, and I get my e-receipt instantly on the app.",
      stars: 4,
    },
  ];

  return (
    <section className="relative w-full bg-[#222222] py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* SECTION HEADING */}
        <header className="text-center mb-20">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              Community
            </span>
          </aside>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAF3E1] leading-tight mb-4">
            User <span className="text-[#FA8112]">Feedback</span>
          </h2>
          <p className="text-[#FAF3E1]/50 text-lg max-w-2xl mx-auto leading-relaxed">
            See how SmartPark is changing the way people park in the city.
          </p>
        </header>

        {/* REVIEWS GRID */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
          {reviews.map((review, index) => (
            <li key={index} className="group">
              <article className="h-full flex flex-col justify-between bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 hover:bg-[#FAF3E1]/[0.04] hover:border-[#FA8112]/30 hover:-translate-y-2 shadow-xl">
                <div>
                  {/* DECORATIVE QUOTE ICON */}
                  <aside className="mb-6 flex justify-between items-start">
                    <div className="p-3 bg-[#FA8112]/10 rounded-2xl">
                      <Quote
                        className="text-[#FA8112]"
                        size={24}
                        fill="currentColor"
                      />
                    </div>
                    {/* STAR RATING */}
                    <figure className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < review.stars ? "#FA8112" : "transparent"}
                          className={
                            i < review.stars
                              ? "text-[#FA8112]"
                              : "text-[#FAF3E1]/20"
                          }
                        />
                      ))}
                    </figure>
                  </aside>

                  {/* TESTIMONIAL TEXT */}
                  <blockquote className="mb-8">
                    <p className="text-[#FAF3E1]/80 text-lg leading-relaxed italic">
                      “{review.text}”
                    </p>
                  </blockquote>
                </div>

                {/* USER METADATA */}
                <footer className="flex items-center gap-4 pt-6 border-t border-[#F5E7C6]/5">
                  <figure className="flex-shrink-0">
                    {/* AVATAR PLACEHOLDER */}
                    <div className="w-12 h-12 bg-[#FA8112] text-[#222222] rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(250,129,18,0.3)] group-hover:scale-110 transition-transform duration-500">
                      {review.name[0]}
                    </div>
                  </figure>
                  <hgroup>
                    <h4 className="text-[#FAF3E1] font-bold text-base leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-[#FAF3E1]/40 text-xs uppercase font-bold tracking-widest mt-1">
                      {review.role}
                    </p>
                  </hgroup>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Subtle Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#FA8112]/[0.02] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Testimonials;
