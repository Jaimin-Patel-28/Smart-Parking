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
        color: "bg-amber-500",
        text: "text-amber-500",
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
    <div className="space-y-2 px-1">
      {/* 1. PROGRESS BAR TRACK */}
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} ${width} transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
        />
      </div>

      {/* 2. DYNAMIC FEEDBACK */}
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-1.5 ${text} transition-colors duration-300`}
        >
          <Icon size={12} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            {label}
          </span>
        </div>

        {/* HINT FOR THE USER */}
        <p className="text-[9px] text-slate-600 font-medium">
          {score < 5 ? "Use symbols & numbers" : "Encryption ready"}
        </p>
      </div>

      {/* 3. VIVA DETAIL: REGEX REQUIREMENTS (Shows your technical depth) */}
      <div className="flex gap-1 pt-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1 grow rounded-full transition-colors duration-500 ${
              i < score ? color : "bg-slate-900"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
