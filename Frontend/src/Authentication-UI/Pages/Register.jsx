import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../Components/RegisterForm";
import { ShieldCheck } from "lucide-react";

const Register = () => {
  return (
    <div className="flex min-h-[90vh] flex-col justify-center py-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FA8112]/10 text-[#FA8112]">
            <ShieldCheck size={28} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-[#FAF3E1]">
            Create Account
          </h2>
          <p className="mt-2 text-[#FAF3E1]/60">
            Join us and simplify your parking experience today.
          </p>
        </div>
        {/* Card Container */}
        <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.02] p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          <RegisterForm />
        </div>
        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-[#FAF3E1]/40">
          Already using ParkEase?
          <Link
            to="/auth/login"
            className="font-semibold text-[#FAF3E1] hover:text-[#FA8112] transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
