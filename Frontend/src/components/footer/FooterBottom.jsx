import { Heart } from "lucide-react";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full border-t border-[#222222]/10 mt-8 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] font-bold text-[#222222]/40 uppercase tracking-widest">
        {/* Copyright Text: Clean and Minimalist */}
        <div className="flex items-center gap-2">
          <span>&copy; {currentYear}</span>
          <span className="text-[#222222] font-black tracking-tighter normal-case text-base">
            Smart<span className="text-[#FA8112]">Park</span>
          </span>
          <span className="hidden sm:inline text-[#222222]/10 mx-1">/</span>
          <span className="normal-case font-medium tracking-tight">
            All rights reserved.
          </span>
        </div>

        {/* Credit Text: Hand-crafted signature feel */}
        <div className="flex items-center gap-2 group normal-case tracking-tight font-medium text-[#222222]/60">
          <span>Made with</span>
          <Heart
            size={16}
            className="text-[#FA8112] fill-[#FA8112] transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
          />
          <span>by</span>
          <span className="text-[#222222] font-black hover:text-[#FA8112] transition-colors cursor-pointer underline underline-offset-4 decoration-[#FA8112]/20 group-hover:decoration-[#FA8112]">
            Jaimin
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
