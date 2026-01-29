import { ShieldCheck, Lock, MailCheck, Fingerprint } from "lucide-react";

const SecurityNotes = () => {
  const notes = [
    {
      icon: ShieldCheck,
      text: "AES-256 Encryption",
      color: "text-emerald-400",
    },
    {
      icon: Lock,
      text: "Secure JWT Session",
      color: "text-cyan-400",
    },
    {
      icon: MailCheck,
      text: "Anti-Spam Filter",
      color: "text-blue-400",
    },
  ];

  return (
    <div className="mt-6 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {notes.map((note, index) => {
          const Icon = note.icon;
          return (
            <div key={index} className="flex items-center gap-2 group">
              <div
                className={`p-1.5 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform ${note.color}`}
              >
                <Icon size={14} />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">
                {note.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Branding for your Viva */}
      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-center gap-2">
        <Fingerprint size={12} className="text-slate-700" />
        <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">
          Certified SmartPark Node Instance
        </p>
      </div>
    </div>
  );
};

export default SecurityNotes;
