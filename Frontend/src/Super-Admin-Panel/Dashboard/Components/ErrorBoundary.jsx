import React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("System Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        // Card BG: #FAF3E1 at 2% opacity | Border: #FA8112 at 20% opacity for visibility
        <div className="p-16 bg-[#FAF3E1]/[0.02] border border-[#FA8112]/20 rounded-[2.5rem] text-center flex flex-col items-center justify-center space-y-6">
          <div className="p-4 bg-[#FA8112]/10 rounded-2xl text-[#FA8112]">
            <AlertTriangle size={48} />
          </div>

          <div>
            <h2 className="text-2xl font-black text-[#FAF3E1] tracking-tight uppercase">
              System Interface Error
            </h2>
            <p className="text-[#FAF3E1]/40 mt-2 font-medium max-w-md mx-auto text-sm leading-relaxed">
              An unexpected error occurred while rendering the management
              module. The session data may need to be re-synchronized.
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            // Button: Accent #FA8112 | Text: #222222
            className="flex items-center gap-2 px-8 py-3 bg-[#FA8112] text-[#222222] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#FAF3E1] transition-all shadow-lg shadow-[#FA8112]/20 active:scale-95"
          >
            <RefreshCcw size={16} />
            Initialize Recovery
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
