import { ShieldAlert, ShieldCheck, ShieldEllipsis } from "lucide-react";

const PasswordStrength = ({ password }) => {
  let score = 0;

  // Professional Validation Logic for your MERN project
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (!password) return null;

  const getStrengthData = () => {
    if (score <= 2)
      return {
        label: "Weak Security",
        color: "bg-rose-500",
        text: "text-rose-500",
        width: "w-1/3",
        icon: ShieldAlert,
      };
    if (score <= 4)
      return {
        label: "Improving",
        color: "bg-[#FA8112]",
        text: "text-[#FA8112]",
        width: "w-2/3",
        icon: ShieldEllipsis,
      };
    return {
      label: "Strong & Secure",
      color: "bg-emerald-500",
      text: "text-emerald-500",
      width: "w-full",
      icon: ShieldCheck,
    };
  };

  const { label, color, text, width, icon: Icon } = getStrengthData();

  return (
    <div className="space-y-3 px-1">
      {/* 1. PROGRESS BAR TRACK: Clean & Tactile */}
      <div className="h-2 w-full bg-[#222222]/5 rounded-full overflow-hidden border border-[#222222]/5">
        <div
          className={`h-full ${color} ${width} transition-all duration-700 ease-in-out shadow-sm`}
        />
      </div>

      {/* 2. DYNAMIC FEEDBACK: Editorial Style */}
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-2 ${text} transition-colors duration-300`}
        >
          <Icon size={14} strokeWidth={3} />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            {label}
          </span>
        </div>

        {/* HINT FOR THE USER: Hand-drawn Note Style */}
        <p className="text-[10px] text-[#222222]/40 font-black uppercase tracking-widest">
          {score < 5 ? "Use symbols & numbers" : "Encryption ready"}
        </p>
      </div>

      {/* 3. VIVA DETAIL: SECURED SEGMENTS (Visual Logic) */}
      <div className="flex gap-1.5 pt-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 grow rounded-full transition-all duration-500 ${
              i < score ? color : "bg-[#222222]/10"
            } ${i < score ? "opacity-100" : "opacity-30"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
