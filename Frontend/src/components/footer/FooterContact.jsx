import { Mail, MapPin, Clock, Phone } from "lucide-react";

const FooterContact = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* SECTION HEADING */}
      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">
        Get In Touch
      </h4>

      {/* CONTACT LIST */}
      <ul className="flex flex-col gap-4">
        {/* EMAIL */}
        <li className="group flex items-center gap-3 cursor-pointer">
          <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all duration-300">
            <Mail size={18} />
          </div>
          <span className="text-slate-400 group-hover:text-white transition-colors text-sm">
            support@smartpark.com
          </span>
        </li>

        {/* LOCATION */}
        <li className="group flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all duration-300">
            <MapPin size={18} />
          </div>
          <span className="text-slate-400 group-hover:text-white transition-colors text-sm">
            Anand, Gujarat, India
          </span>
        </li>

        {/* HOURS */}
        <li className="group flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-900 transition-all duration-300">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-slate-400 group-hover:text-white transition-colors text-sm leading-none">
              9 AM – 6 PM
            </p>
            <p className="text-[10px] text-slate-600 uppercase mt-1 font-bold">
              Mon — Sat
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FooterContact;