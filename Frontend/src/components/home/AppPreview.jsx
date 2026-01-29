import {
  Layout,
  MousePointer2,
  Sparkles,
  PieChart,
  BarChart3,
  Activity,
} from "lucide-react";

const AppPreview = () => {
  return (
    <section className="bg-slate-900 py-24 px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-sm font-medium">
              <Sparkles size={16} />
              Admin Insights
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Real-time <span className="text-cyan-400">Analytics</span>
          </h2>
        </div>

        {/* Browser Frame Window */}
        <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
          {/* Header Bar */}
          <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-600"></div>
              <div className="w-3 h-3 rounded-full bg-slate-600"></div>
              <div className="w-3 h-3 rounded-full bg-slate-600"></div>
            </div>
            <div className="bg-slate-900/50 px-4 py-1 rounded text-[10px] text-slate-500 font-mono">
              HTTPS://ADMIN.SMARTPARK.IO/DASHBOARD
            </div>
          </div>

          {/* Dashboard UI Body */}
          <div className="p-6 grid grid-cols-12 gap-4 bg-slate-900/50 min-h-100">
            {/* Sidebar Skeleton */}
            <div className="col-span-3 space-y-4 hidden md:block border-r border-slate-800 pr-4">
              <div className="h-4 w-20 bg-slate-800 rounded"></div>
              <div className="h-10 w-full bg-cyan-400/10 rounded-lg border border-cyan-400/20"></div>
              <div className="h-10 w-full bg-slate-800 rounded-lg"></div>
              <div className="h-10 w-full bg-slate-800 rounded-lg"></div>
            </div>

            {/* Main Stats Skeleton */}
            <div className="col-span-12 md:col-span-9 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-slate-800 rounded-xl flex items-center justify-center">
                  <PieChart className="text-slate-600" />
                </div>
                <div className="h-24 bg-slate-800 rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-slate-600" />
                </div>
                <div className="h-24 bg-slate-800 rounded-xl flex items-center justify-center">
                  <Activity className="text-slate-600" />
                </div>
              </div>

              {/* "Live Image" Container */}
              <div className="relative h-64 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                <img
                  src="https://placehold.co/1200x600/1e293b/22d3ee?text=Live+Parking+Status+Analytics"
                  alt="Dashboard"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-slate-900/80 px-6 py-3 rounded-full border border-cyan-500/30 backdrop-blur-sm">
                    <p className="text-cyan-400 font-bold flex items-center gap-2 uppercase tracking-tighter">
                      <Layout size={18} /> View Interactive Demo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
