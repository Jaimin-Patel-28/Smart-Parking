import React from "react";
import {
  AlertCircle,
  Paperclip,
  Send,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

const ReportIssueForm = () => {
  return (
    <section className="bg-white rounded-[3rem] border-2 border-[#222222]/5 p-8 md:p-12 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. SECTION HEADER: Editorial Branding */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-[#FAF3E1] pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#F5E7C6] border border-[#222222]/5 text-[#222222] text-[10px] font-black uppercase tracking-[0.2em]">
            <AlertCircle size={14} className="text-[#FA8112]" />
            Direct Support Line
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#222222] tracking-tighter leading-none">
            Report an{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Issue
            </span>
          </h2>
          <p className="text-[#222222]/50 text-sm font-medium max-w-md">
            Encountered a problem in{" "}
            <strong className="text-[#222222]">Anand Smart City</strong>?
            Describe it below and our team will resolve it.
          </p>
        </div>
        <div className="hidden md:block p-4 rounded-full bg-[#FAF3E1] text-[#222222]/10">
          <MessageSquare size={30} strokeWidth={1.5} />
        </div>
      </div>

      {/* 2. FORM INTERFACE */}
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CATEGORY SELECT */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#222222]/40 ml-2">
              Category
            </label>
            <div className="relative group">
              <select className="w-full appearance-none bg-[#F5E7C6]/30 border-2 border-transparent focus:border-[#FA8112]/20 rounded-2xl px-6 py-5 text-[#222222] font-black text-xs uppercase tracking-widest outline-none transition-all cursor-pointer">
                <option>Select Issue Category</option>
                <option>Parking Slot Fault</option>
                <option>Payment/Wallet Error</option>
                <option>App Technical Bug</option>
                <option>Other Feedback</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#222222]/20 pointer-events-none group-hover:text-[#FA8112] transition-colors"
              />
            </div>
          </div>

          {/* SUBJECT INPUT */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#222222]/40 ml-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="E.g., Slot P-102 Sensor Error"
              className="w-full bg-[#F5E7C6]/30 border-2 border-transparent focus:border-[#FA8112]/20 rounded-2xl px-6 py-5 text-[#222222] font-black text-xs uppercase tracking-widest outline-none transition-all placeholder:text-[#222222]/20"
            />
          </div>
        </div>

        {/* DESCRIPTION TEXTAREA */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#222222]/40 ml-2">
            Description
          </label>
          <textarea
            rows="5"
            placeholder="Please describe your issue in detail..."
            className="w-full bg-[#F5E7C6]/30 border-2 border-transparent focus:border-[#FA8112]/20 rounded-4xl px-8 py-6 text-[#222222] font-medium text-sm outline-none transition-all placeholder:text-[#222222]/20 resize-none"
          ></textarea>
        </div>

        {/* FILE UPLOAD & SUBMIT ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className="p-4 rounded-2xl bg-[#FAF3E1] text-[#222222]/40 group-hover:bg-[#222222] group-hover:text-[#FAF3E1] transition-all duration-300">
              <Paperclip size={20} strokeWidth={2.5} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#222222]">
                Attach Proof
              </p>
              <p className="text-[9px] font-bold text-[#222222]/30 uppercase tracking-widest">
                JPG, PNG (Max 5MB)
              </p>
            </div>
            <input type="file" className="hidden" />
          </label>

          <button className="w-full md:w-auto flex items-center justify-center gap-4 px-12 py-5 bg-[#222222] text-[#FAF3E1] rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-[#222222]/10 hover:bg-[#FA8112] transition-all active:scale-95 group/btn">
            Submit Ticket
            <Send
              size={18}
              strokeWidth={2.5}
              className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </form>

      {/* 3. VIVA FOOTER */}
      <p className="mt-12 text-center text-[9px] font-black text-[#222222]/20 uppercase tracking-[0.5em]">
        MERN Helpdesk Instance &bull; Secure Submission Protocol
      </p>
    </section>
  );
};

export default ReportIssueForm;
