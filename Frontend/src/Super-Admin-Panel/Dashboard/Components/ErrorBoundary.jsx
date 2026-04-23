import React from "react";
import { AlertTriangle, RefreshCcw, ShieldAlert, Cpu } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // In a real system, you'd send this to a logging service like Sentry or LogRocket
    console.error("Critical Engine Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full p-8 md:p-16 bg-[#FAF3E1]/[0.02] border border-rose-500/20 rounded-xl text-center flex flex-col items-center justify-center space-y-8 relative overflow-hidden shadow-2xl">
          {/* Subtle Background Technical Icon */}
          <div className="absolute -bottom-10 -right-10 text-[#FAF3E1]/[0.02] rotate-12">
            <Cpu size={240} />
          </div>

          {/* Icon Header */}
          <div className="relative">
            <div className="p-5 bg-rose-500/10 rounded-xl text-rose-500 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
              <ShieldAlert size={40} strokeWidth={1.5} />
            </div>
          </div>

          {/* Text Content */}
          <div className="relative z-10 space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#FAF3E1] tracking-tight uppercase">
              Module Execution Halted
            </h2>
            <p className="text-[#FAF3E1]/40 font-medium max-w-sm mx-auto text-[13px] leading-relaxed">
              An unhandled exception occurred within the interface logic. The
              system requires a re-initialization of the management stack.
            </p>
          </div>

          {/* Recovery Button */}
          <button
            onClick={() => window.location.reload()}
            className="group flex items-center gap-2 px-8 py-3 bg-[#FA8112] text-[#222222] rounded-lg text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#FAF3E1] transition-all shadow-lg shadow-[#FA8112]/10 active:scale-95"
          >
            <RefreshCcw
              size={14}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            Initialize Recovery
          </button>

          {/* System Metadata Hint */}
          <div className="pt-4 flex items-center gap-3 opacity-20">
            <span className="h-px w-8 bg-[#FAF3E1]" />
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]">
              Engine Log Recorded
            </p>
            <span className="h-px w-8 bg-[#FAF3E1]" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
