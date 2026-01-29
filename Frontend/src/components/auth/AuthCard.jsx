import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { UserPlus, LogIn, ShieldCheck, Zap, Globe } from "lucide-react";

const AuthCard = ({ isLogin, setIsLogin }) => {
  return (
    /* Removed scale-95 and added max-w-7xl to ensure it stretches */
    <div className="relative w-full max-w-7xl min-h-137.5 mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-700">
      {/* LEFT PANEL (1/3 RATIO - Glassy Blue) */}
      <div
        className={`hidden md:flex md:w-1/3 p-12 flex-col justify-between relative transition-all duration-700 ease-in-out z-20 ${
          isLogin ? "order-1 bg-blue-600/10" : "order-2 bg-blue-500/10"
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-400/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-blue-400/20">
            <Zap className="text-blue-400" size={24} />
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4 tracking-tighter">
            {isLogin
              ? "Welcome Back to \nAnand Smart City."
              : "Join the \nDigital Network."}
          </h2>
          <p className="text-blue-100/40 text-sm leading-relaxed font-medium">
            MERN-secured hub for real-time slot management in Gujarat.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full py-4 bg-blue-500/20 backdrop-blur-xl text-white font-black rounded-xl hover:bg-blue-500 transition-all active:scale-95 text-[10px] uppercase tracking-[0.2em] border border-blue-400/20"
          >
            {isLogin ? "Create Account" : "Sign In Now"}
          </button>
        </div>
      </div>

      {/* RIGHT PANEL (2/3 RATIO - Form Area) */}
      <div
        className={`w-full md:w-2/3 p-12 md:px-24 transition-all duration-700 flex flex-col justify-center bg-slate-950/40 z-10 ${
          isLogin ? "order-2" : "order-1"
        }`}
      >
        <div className="w-full">
          {" "}
          {/* Removed max-w-xl to allow full 2:1 width usage */}
          <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-6">
            <div>
              <h3 className="text-4xl font-black text-white tracking-tight">
                {isLogin ? "Sign In" : "Register"}
              </h3>
              <p className="text-blue-200/20 text-sm font-medium mt-1">
                {isLogin ? "MERN Secured Hub" : "Vehicle Entry Registration"}
              </p>
            </div>
            <div className="hidden sm:block p-4 rounded-2xl bg-blue-500/5 border border-blue-400/10 text-blue-400">
              {isLogin ? <LogIn size={28} /> : <UserPlus size={28} />}
            </div>
          </div>
          {/* Form logic - No scaling, just raw layout */}
          <div className="w-full">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
