import { Mail, Lock, LogIn } from "lucide-react";
import SecurityNotes from "./SecurityNotes";

const LoginForm = () => (
  <form className="space-y-5">
    <div className="relative group">
      <Mail
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400"
        size={18}
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl py-3.5 pl-12 pr-4 focus:border-cyan-400/50 outline-none"
        required
      />
    </div>
    <div className="relative group">
      <Lock
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400"
        size={18}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-xl py-3.5 pl-12 pr-4 focus:border-cyan-400/50 outline-none"
        required
      />
    </div>
    <button className="w-full bg-blue-600 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-500 transition-all">
      <LogIn size={20} /> Authorize & Enter
    </button>
    <SecurityNotes />
  </form>
);

export default LoginForm;
