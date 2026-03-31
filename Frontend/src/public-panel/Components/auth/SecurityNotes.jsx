import { ShieldCheck, Lock, MailCheck, Fingerprint } from "lucide-react";

const SecurityNotes = () => {
  const notes = [
    {
      icon: ShieldCheck,
      text: "AES-256 Encryption",
    },
    {
      icon: Lock,
      text: "Secure JWT Session",
    },
    {
      icon: MailCheck,
      text: "Anti-Spam Filter",
    },
  ];

  return (
    <div className="mt-8 p-6 rounded-4xl bg-[#F5E7C6]/50 border-2 border-dashed border-[#222222]/5">
      <div className="flex flex-wrap items-center justify-around gap-6">
        {notes.map((note, index) => {
          const Icon = note.icon;
          return (
            <div key={index} className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-white text-[#222222]/40 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] group-hover:-rotate-6 transition-all duration-500 shadow-sm">
                <Icon size={16} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-black text-[#222222]/40 uppercase tracking-[0.2em] group-hover:text-[#222222] transition-colors">
                {note.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Branding for your Viva: Professional & Grounded */}
      <div className="mt-6 pt-4 border-t border-[#222222]/5 flex items-center justify-center gap-3">
        <Fingerprint size={14} className="text-[#222222]/20" />
        <p className="text-[9px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
          Certified SmartPark Node Instance
        </p>
      </div>
    </div>
  );
};

export default SecurityNotes;
