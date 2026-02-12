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
    <section className="bg-[#FAF3E1] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* HUMANIZED BACKGROUND: Subtle paper texture for a premium tactile feel */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-[#222222] mb-6 tracking-tighter">
            User{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Feedback
            </span>
          </h2>
          <p className="text-[#222222]/60 text-xl font-medium max-w-2xl mx-auto">
            See how SmartPark is changing the way people park in the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative p-10 rounded-[2.5rem] bg-white border-2 border-[#222222]/5 transition-all duration-500 hover:border-[#222222] hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(34,34,34,0.1)] flex flex-col justify-between"
            >
              {/* Decorative Quote Icon: Subtle and integrated */}
              <div className="absolute top-8 right-10 text-[#222222]/5">
                <Quote size={56} fill="currentColor" stroke="none" />
              </div>

              <div className="relative z-10">
                {/* Star Rating: Using Brand Orange */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`transition-colors duration-300 ${
                        i < review.stars
                          ? "fill-[#FA8112] text-[#FA8112]"
                          : "fill-[#222222]/10 text-[#222222]/10"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-[#222222] text-xl font-medium italic mb-10 leading-relaxed tracking-tight">
                  “{review.text}”
                </p>
              </div>

              {/* User Info: Humanized with Beige background and Charcoal text */}
              <div className="flex items-center gap-5 border-t-2 border-[#FAF3E1] pt-8">
                <div className="w-14 h-14 rounded-2xl bg-[#F5E7C6] border border-[#222222]/5 flex items-center justify-center text-[#222222] font-black text-xl shadow-sm">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="text-[#222222] font-black text-lg tracking-tight">
                    {review.name}
                  </h4>
                  <p className="text-[#FA8112] text-[11px] font-black uppercase tracking-[0.2em]">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
