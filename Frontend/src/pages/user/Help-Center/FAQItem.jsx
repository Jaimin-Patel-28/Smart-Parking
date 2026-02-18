import React, { useState } from "react";
import { ChevronDown, ExternalLink, HelpCircle } from "lucide-react";

const FAQItem = ({ question, answer, linkLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`group rounded-4xl transition-all duration-500 border-2 
      ${isOpen ? "bg-[#FAF3E1] border-[#FA8112]/20 shadow-lg" : "bg-white border-[#222222]/5 hover:border-[#222222]/10"}`}
    >
      {/* 1. QUESTION TRIGGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-2.5 rounded-xl transition-colors duration-500 
            ${isOpen ? "bg-[#FA8112] text-[#FAF3E1]" : "bg-[#F5E7C6] text-[#222222]"}`}
          >
            <HelpCircle size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-sm md:text-base font-black text-[#222222] uppercase tracking-tight">
            {question || "Question Title"}
          </h3>
        </div>
        <ChevronDown
          size={20}
          className={`text-[#222222]/30 transition-transform duration-500 ${isOpen ? "rotate-180 text-[#FA8112]" : ""}`}
        />
      </button>

      {/* 2. EXPANDABLE CONTENT */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 md:px-8 pb-8 space-y-6">
          <div className="h-0.5 bg-[#222222]/5 w-12" />

          <p className="text-sm font-medium text-[#222222]/60 leading-relaxed">
            {answer ||
              "Expandable Answer: Detailed explanation of the query goes here to help the user navigate the SmartPark platform effectively."}
          </p>

          <button className="flex items-center gap-2 text-[10px] font-black text-[#FA8112] uppercase tracking-[0.2em] group/btn hover:text-[#222222] transition-colors">
            {linkLabel || "View Related Page"}
            <ExternalLink
              size={14}
              strokeWidth={3}
              className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
