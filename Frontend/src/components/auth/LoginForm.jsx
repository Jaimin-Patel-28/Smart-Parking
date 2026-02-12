import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import SecurityNotes from "./SecurityNotes";

const LoginForm = () => {
  const navigate = useNavigate();
  const saved = JSON.parse(sessionStorage.getItem("loginPrefill"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Logic Preserved: Autofill after register
  useEffect(() => {
    if (saved) {
      setEmail(saved.email || "");
      setPassword(saved.password || "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Logic Preserved: Auth success handling
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAuth", "true");
      sessionStorage.removeItem("loginPrefill");

      navigate("/user/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* EMAIL INPUT: Clean Paper Style */}
      <div className="relative group">
        <Mail
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#222222]/30 group-focus-within:text-[#FA8112] transition-colors"
          size={20}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#FAF3E1] border-2 border-transparent text-[#222222] font-bold rounded-2xl py-4 pl-12 pr-4 focus:border-[#222222] outline-none transition-all placeholder:text-[#222222]/20"
          required
        />
      </div>

      {/* PASSWORD INPUT: High Contrast */}
      <div className="relative group">
        <Lock
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#222222]/30 group-focus-within:text-[#FA8112] transition-colors"
          size={20}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#FAF3E1] border-2 border-transparent text-[#222222] font-bold rounded-2xl py-4 pl-12 pr-4 focus:border-[#222222] outline-none transition-all placeholder:text-[#222222]/20"
          required
        />
      </div>

      {/* ERROR MESSAGE: Subtle but clear */}
      {error && (
        <div className="px-4 py-2 bg-red-50 border-l-4 border-red-500 text-red-600 text-xs font-black uppercase tracking-widest">
          {error}
        </div>
      )}

      {/* SUBMIT BUTTON: Signature Action */}
      <button
        disabled={isLoading}
        className="w-full bg-[#FA8112] text-[#FAF3E1] font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#222222] transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-[#FA8112]/20 text-xs uppercase tracking-[0.2em]"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            <LogIn size={20} strokeWidth={3} /> Authorize & Enter
          </>
        )}
      </button>

      {/* Security Notes: Hand-drawn look */}
      <div className="pt-4 border-t border-[#222222]/5">
        <SecurityNotes />
      </div>
    </form>
  );
};

export default LoginForm;
