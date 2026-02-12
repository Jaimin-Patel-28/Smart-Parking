import { Mail, MapPin, Clock } from "lucide-react";

const FooterContact = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* SECTION HEADING: Bold Charcoal with wide tracking */}
      <h4 className="text-[#222222] font-black uppercase tracking-[0.2em] text-[11px] mb-2">
        Get In Touch
      </h4>

      {/* CONTACT LIST: Clean, vertical spacing for readability */}
      <ul className="flex flex-col gap-5">
        {/* EMAIL */}
        <li className="group flex items-center gap-4 cursor-pointer">
          <div className="p-2.5 rounded-xl bg-white border border-[#222222]/5 text-[#222222]/40 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] group-hover:border-[#FA8112] transition-all duration-300 shadow-sm">
            <Mail size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[#222222]/60 font-bold group-hover:text-[#222222] transition-colors text-[14px]">
            support@smartpark.com
          </span>
        </li>

        {/* LOCATION */}
        <li className="group flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-white border border-[#222222]/5 text-[#222222]/40 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] group-hover:border-[#FA8112] transition-all duration-300 shadow-sm">
            <MapPin size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[#222222]/60 font-bold group-hover:text-[#222222] transition-colors text-[14px]">
            Anand, Gujarat, India
          </span>
        </li>

        {/* HOURS */}
        <li className="group flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-white border border-[#222222]/5 text-[#222222]/40 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] group-hover:border-[#FA8112] transition-all duration-300 shadow-sm">
            <Clock size={18} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <p className="text-[#222222]/60 font-bold group-hover:text-[#222222] transition-colors text-[14px] leading-tight">
              9 AM – 6 PM
            </p>
            <p className="text-[10px] text-[#FA8112] uppercase mt-1 font-black tracking-widest">
              Mon — Sat
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FooterContact;
