import { CarFront } from "lucide-react";
import { Link } from "react-router-dom";

const FooterBrand = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* BRAND LOGO */}
      <Link to="/" className="flex items-center gap-2 group w-fit">
        <div className="p-2 rounded-lg bg-cyan-400 text-slate-900 group-hover:scale-110 transition-transform duration-300">
          <CarFront size={24} strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Smart<span className="text-cyan-400">Park</span>
        </h3>
      </Link>

      {/* DESCRIPTION */}
      <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
        Revolutionizing urban mobility with a smart parking management web app
        designed for a faster, safer, and stress-free parking experience.
      </p>

      {/* STATUS INDICATOR (Optional but good for MERN projects) */}
      <div className="flex items-center gap-2 mt-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Service Live in Anand
        </span>
      </div>
    </div>
  );
};

export default FooterBrand;
