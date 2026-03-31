import React from "react";
import { MapPin, Navigation } from "lucide-react";

const ContactMap = () => {
  return (
    <article className="relative w-full rounded-[3rem] overflow-hidden border border-[#F5E7C6]/10 shadow-2xl group">
      {/* MAP OVERLAY (GLASS CARD) */}
      <aside className="absolute top-6 left-6 z-20 max-w-[280px] bg-[#2a2a2a]/80 backdrop-blur-xl border border-[#F5E7C6]/10 p-6 rounded-3xl shadow-2xl group-hover:border-[#FA8112]/30 transition-all duration-500">
        <header className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#FA8112] rounded-lg text-[#222222]">
            <MapPin size={20} />
          </div>
          <h3 className="text-[#FAF3E1] font-bold text-sm tracking-tight">
            SmartPark HQ
          </h3>
        </header>

        <p className="text-[#FAF3E1]/50 text-xs leading-relaxed mb-6">
          Phase 3, IT Tower, <br />
          Near Vallabh Vidyanagar, <br />
          Anand, Gujarat 388120
        </p>

        <a
          href="https://goo.gl/maps/example"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 rounded-xl text-[#FAF3E1] text-[10px] font-bold uppercase tracking-widest hover:bg-[#FA8112] hover:text-[#222222] transition-all duration-500 group/btn"
        >
          <Navigation
            size={14}
            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
          />
          Get Directions
        </a>
      </aside>

      {/* ACTUAL GOOGLE MAP IFRAME */}
      <div className="relative w-full h-[450px] grayscale contrast-[1.2] invert-[0.9] brightness-[0.8] opacity-60 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition-all duration-1000">
        <iframe
          title="SmartPark Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58957.56847424606!2d72.8894178333221!3d22.54737213824101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e2c647b719b%3A0xc3f6294d1385f096!2sAnand%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* TOP & BOTTOM VIGNETTES */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(34,34,34,0.8)]" />
    </article>
  );
};

export default ContactMap;
