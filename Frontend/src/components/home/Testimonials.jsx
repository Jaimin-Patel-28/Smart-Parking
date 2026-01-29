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
    <section className="bg-slate-900 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            User <span className="text-cyan-400">Feedback</span>
          </h2>
          <p className="text-slate-400">
            See how SmartPark is changing the way people park in the city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative p-8 rounded-3xl bg-slate-800/40 border border-slate-700 hover:border-cyan-400/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 text-slate-700">
                <Quote size={40} />
              </div>

              <div className="relative z-10">
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-cyan-400 text-cyan-400"
                    />
                  ))}
                </div>

                <p className="text-slate-300 italic mb-8 leading-relaxed">
                  “{review.text}”
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-slate-900 font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
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
