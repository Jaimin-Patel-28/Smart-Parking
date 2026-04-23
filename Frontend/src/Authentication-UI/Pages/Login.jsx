import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../Components/LoginForm";
import { MapPin } from "lucide-react";

const Login = () => {
  return (
    <div className="flex min-h-[80vh] flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo Branding */}
        <div className="mb-10 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FA8112] shadow-lg shadow-[#FA8112]/20">
            <MapPin size={32} className="text-[#222222]" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#FAF3E1]">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-[#FAF3E1]/40">
            Enter your credentials to access your account
          </p>
        </div>
        {/* Card Container */}
        <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-8 backdrop-blur-xl shadow-2xl">
          <LoginForm />
          <div className="mt-8 text-center">
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-[#FA8112] hover:text-[#FA8112]/80 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-[#FAF3E1]/40">
          Don't have an account?
          <Link
            to="/auth/register"
            className="font-semibold text-[#FAF3E1] hover:text-[#FA8112] transition-colors"
          >
            Create one for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
