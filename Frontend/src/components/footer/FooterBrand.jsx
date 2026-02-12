import { CarFront } from "lucide-react";
import { Link } from "react-router-dom";

const FooterBrand = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* BRAND LOGO: Aligned with the 'hand-written' identity */}
      <Link to="/" className="flex items-center gap-3 group w-fit">
        <div className="p-2.5 rounded-xl bg-[#FA8112] text-[#FAF3E1] group-hover:-rotate-6 transition-all duration-500 shadow-lg shadow-[#FA8112]/20">
          <CarFront size={26} strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-black text-[#222222] tracking-tighter">
          Smart<span className="text-[#FA8112]">Park</span>
        </h3>
      </Link>

      {/* DESCRIPTION: Using high-readability spacing and charcoal tints */}
      <p className="text-[#222222]/60 text-base font-medium leading-relaxed max-w-xs">
        Revolutionizing urban mobility with a smart parking management system
        designed for a faster, safer, and stress-free city experience.
      </p>

      {/* STATUS INDICATOR: Customized for the Beige/Orange theme */}
      <div className="flex items-center gap-3 mt-2 bg-white/50 w-fit px-4 py-2 rounded-lg border border-[#222222]/5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-40"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA8112]"></span>
        </span>
        <span className="text-[10px] font-black text-[#222222]/40 uppercase tracking-[0.2em]">
          Service Live in Anand
        </span>
      </div>
    </div>
  );
};

export default FooterBrand;
