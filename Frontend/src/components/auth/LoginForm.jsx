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

  // RULE 2: Autofill after register
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

      // RULE 3: login success → dashboard
      localStorage.setItem("token", res.data.token);

      // cleanup autofill data
      sessionStorage.removeItem("loginPrefill");

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* EMAIL */}
      <div className="relative group">
        <Mail
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400"
          size={18}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl py-3.5 pl-12 pr-4 focus:border-cyan-400/50 outline-none"
          required
        />
      </div>

      {/* PASSWORD */}
      <div className="relative group">
        <Lock
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400"
          size={18}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl py-3.5 pl-12 pr-4 focus:border-cyan-400/50 outline-none"
          required
        />
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="text-rose-400 text-sm">{error}</p>}

      {/* SUBMIT */}
      <button
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-500 transition-all disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <>
            <LogIn size={20} /> Authorize & Enter
          </>
        )}
      </button>

      <SecurityNotes />
    </form>
  );
};

export default LoginForm;
