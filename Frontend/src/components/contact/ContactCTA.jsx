import { Headset, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className="bg-[#FAF3E1] py-24 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto max-w-6xl">
        <div className="relative p-12 md:p-24 rounded-[3.5rem] bg-[#222222] text-center shadow-2xl overflow-hidden">
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-[#FAF3E1] mb-8 tracking-tighter leading-[0.9]">
              Your parking experience <br />
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                matters to us.
              </span>
            </h2>
            <p className="text-[#FAF3E1]/60 text-xl md:text-2xl mb-16 font-medium leading-relaxed">
              Still have questions? Our support team in{" "}
              <strong className="text-[#FAF3E1]">Anand</strong> is just a
              message away.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-12 py-5 bg-[#FA8112] text-[#FAF3E1] font-black rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-[#FAF3E1] hover:text-[#222222] active:scale-95 shadow-xl shadow-[#FA8112]/20 text-xs uppercase tracking-[0.2em]">
                <Headset size={22} />
                Get Support Now
                <ArrowRight size={20} />
              </button>

              <Link
                to="/"
                className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-[#FAF3E1]/20 text-[#FAF3E1] font-black rounded-2xl flex items-center justify-center gap-3 hover:border-[#FAF3E1] hover:bg-[#FAF3E1]/5 transition-all text-xs uppercase tracking-[0.2em]"
              >
                <Home size={22} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
