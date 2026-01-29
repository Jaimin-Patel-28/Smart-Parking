import { Heart } from "lucide-react";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full border-t border-slate-900/50 mt-8 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
        {/* Copyright Text */}
        <div className="flex items-center gap-1.5">
          <span>&copy; {currentYear}</span>
          <span className="text-white font-bold tracking-tight">
            Smart<span className="text-cyan-400">Park</span>
          </span>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span>All rights reserved.</span>
        </div>

        {/* Credit Text with Lucide Icon */}
        <div className="flex items-center gap-1.5 group">
          <span>Made with</span>
          <Heart
            size={16}
            className="text-red-500 fill-red-500 animate-pulse group-hover:scale-125 transition-transform duration-300"
          />
          <span>by</span>
          <span className="text-slate-300 font-semibold hover:text-cyan-400 transition-colors cursor-default">
            Jaimin
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
