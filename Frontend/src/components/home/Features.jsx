import {
  Map,
  History,
  UserCheck,
  LayoutDashboard,
  Wallet,
  Zap,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Live Parking Map",
      description:
        "Real-time Google Maps integration showing available slots with color-coded markers.",
      icon: Map,
      color: "text-blue-400",
    },
    {
      title: "Booking History",
      description:
        "Keep track of all your past parkings, invoices, and duration with a clean digital log.",
      icon: History,
      color: "text-purple-400",
    },
    {
      title: "Verified Users",
      description:
        "Enhanced security with OTP-verified profiles and trusted parking space providers.",
      icon: UserCheck,
      color: "text-green-400",
    },
    {
      title: "Admin Dashboard",
      description:
        "Powerful management tools for owners to track revenue and slot occupancy.",
      icon: LayoutDashboard,
      color: "text-orange-400",
    },
    {
      title: "Smart Wallet",
      description:
        "Seamlessly pay for parking using a built-in wallet with quick recharge options.",
      icon: Wallet,
      color: "text-cyan-400",
    },
    {
      title: "Quick Booking",
      description:
        "Book a slot in under 30 seconds with our optimized one-tap reservation system.",
      icon: Zap,
      color: "text-yellow-400",
    },
  ];

  return (
    <section className="bg-slate-900 py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Advanced <span className="text-cyan-400">Features</span>
            </h2>
            <p className="text-slate-400">
              Everything you need to manage city parking, built with the power
              of the MERN stack.
            </p>
          </div>
          <div className="hidden md:block h-px grow bg-slate-800 mx-8 mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-slate-800/20 border border-slate-800 hover:bg-slate-800/40 hover:border-slate-700 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
                >
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
