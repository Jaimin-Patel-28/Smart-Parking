// import React, { useEffect, useRef, useState } from "react";
// import {
//   Map,
//   History,
//   UserCheck,
//   LayoutDashboard,
//   Wallet,
//   Zap,
// } from "lucide-react";

// const Features = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   const features = [
//     {
//       title: "Live Parking Map",
//       description:
//         "Real-time Google Maps integration showing available slots with color-coded markers.",
//       icon: Map,
//       bgImg:
//         "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600",
//     },
//     {
//       title: "Booking History",
//       description:
//         "Keep track of all your past parkings, invoices, and duration with a clean digital log.",
//       icon: History,
//       bgImg:
//         "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600",
//     },
//     {
//       title: "Verified Users",
//       description:
//         "Enhanced security with OTP-verified profiles and trusted parking space providers.",
//       icon: UserCheck,
//       bgImg:
//         "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600",
//     },
//     {
//       title: "Admin Dashboard",
//       description:
//         "Powerful management tools for owners to track revenue and slot occupancy.",
//       icon: LayoutDashboard,
//       bgImg:
//         "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
//     },
//     {
//       title: "Smart Wallet",
//       description:
//         "Seamlessly pay for parking using a built-in wallet with quick recharge options.",
//       icon: Wallet,
//       bgImg:
//         "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600",
//     },
//     {
//       title: "Quick Booking",
//       description:
//         "Book a slot in under 30 seconds with our optimized one-tap reservation system.",
//       icon: Zap,
//       bgImg:
//         "https://images.unsplash.com/photo-1503221043305-f7498f8b7888?q=80&w=600",
//     },
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setIsVisible(true);
//       },
//       { threshold: 0.1 },
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="bg-[#FAF3E1] py-12 px-3 md:px-12 lg:px-24 overflow-hidden"
//     >
//       <div className="container mx-auto max-w-screen-2xl">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12">
//           <div
//             className={`max-w-2xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
//           >
//             <span className="text-[#FA8112] font-black tracking-[0.3em] text-xs uppercase mb-2 block">
//               PREMIUM MODULES
//             </span>
//             <h2 className="text-5xl md:text-8xl font-black text-[#222222] mb-4 tracking-tighter leading-[0.9]">
//               Advanced <br />
//               <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
//                 Features
//               </span>
//             </h2>
//             <p className="text-[#222222]/60 text-base font-medium leading-relaxed">
//               Everything you need to manage city parking, built with the power
//               of the MERN stack for high-performance real-time updates.
//             </p>
//           </div>
//           <div
//             className={`hidden md:block h-0.5 grow bg-[#222222]/5 mx-12 mb-4 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
//           ></div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {features.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={index}
//                 className="group relative p-10 rounded-2xl bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 overflow-hidden flex flex-col items-start shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:shadow-[#222222]/5"
//                 style={{
//                   transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
//                   opacity: isVisible ? 1 : 0,
//                   transform: isVisible ? "translateY(0)" : "translateY(40px)",
//                 }}
//               >
//                 {/* RELATABLE BACKGROUND: Soft grayscale reveal */}
//                 <div className="absolute inset-0 z-0 pointer-events-none">
//                   <img
//                     src={item.bgImg}
//                     alt=""
//                     className="w-full h-full object-cover opacity-0 group-hover:opacity-[0.07] transition-all duration-[1.5s] grayscale group-hover:scale-110"
//                   />
//                 </div>

//                 <div className="relative z-10 w-full">
//                   {/* ICON BOX: Beige to Orange transition */}
//                   <div className="w-14 h-14 rounded-xl bg-[#F5E7C6] border-2 border-[#222222]/5 flex items-center justify-center mb-10 group-hover:bg-[#FA8112] group-hover:border-[#FA8112] group-hover:-rotate-6 transition-all duration-500 shadow-sm">
//                     <Icon className="w-7 h-7 text-[#222222] group-hover:text-[#FAF3E1] transition-colors duration-300 stroke-[1.5px]" />
//                   </div>

//                   <h3 className="text-xl font-black text-[#222222] mb-5 tracking-tight group-hover:text-[#FA8112] transition-colors">
//                     {item.title}
//                   </h3>

//                   <p className="text-[#222222]/50 text-base md:text-sm font-medium leading-relaxed group-hover:text-[#222222]/70 transition-colors">
//                     {item.description}
//                   </p>
//                 </div>

//                 {/* CORNER ORNAMENT: Clean design signal */}
//                 <div className="absolute bottom-8 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
//                   <div className="w-12 h-1.5 bg-[#FA8112] rounded-full"></div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;


import React from "react";
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
      description: "Real-time Google Maps integration showing available slots with color-coded markers.",
      icon: Map,
    },
    {
      title: "Booking History",
      description: "Keep track of all your past parkings, invoices, and duration with a clean digital log.",
      icon: History,
    },
    {
      title: "Verified Users",
      description: "Enhanced security with OTP-verified profiles and trusted parking space providers.",
      icon: UserCheck,
    },
    {
      title: "Admin Dashboard",
      description: "Powerful management tools for owners to track revenue and slot occupancy.",
      icon: LayoutDashboard,
    },
    {
      title: "Smart Wallet",
      description: "Seamlessly pay for parking using a built-in wallet with quick recharge options.",
      icon: Wallet,
    },
    {
      title: "Quick Booking",
      description: "Book a slot in under 30 seconds with our optimized one-tap reservation system.",
      icon: Zap,
    },
  ];

  return (
    <section className="relative w-full bg-[#222222] py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <header className="mb-16 md:mb-20">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              Premium Modules
            </span>
          </aside>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold text-[#FAF3E1] leading-tight mb-4">
                Advanced <br />
                <span className="text-[#FA8112]">Features</span>
              </h2>
              <p className="text-[#FAF3E1]/50 text-lg leading-relaxed">
                Everything you need to manage city parking, built with the power
                of the MERN stack for high-performance real-time updates.
              </p>
            </div>
            
            {/* VISUAL SEPARATOR LINE */}
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-[#F5E7C6]/10 to-transparent mb-4 mx-8" />
          </div>
        </header>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <article 
              key={index} 
              className="group relative p-8 rounded-[2.5rem] bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 hover:border-[#FA8112]/30 transition-all duration-500 overflow-hidden"
            >
              {/* DECORATIVE BACKGROUND GRADIENT */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FA8112]/[0.03] blur-3xl group-hover:bg-[#FA8112]/10 transition-all duration-500" />

              {/* ICON BOX */}
              <header className="mb-8 relative">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#2a2a2a] border border-[#F5E7C6]/5 text-[#FAF3E1] group-hover:text-[#FA8112] group-hover:border-[#FA8112]/20 group-hover:bg-[#222222] transition-all duration-500">
                  <item.icon size={26} strokeWidth={1.5} />
                </div>
              </header>

              {/* CONTENT */}
              <section className="relative z-10">
                <h3 className="text-[#FAF3E1] text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-[#FAF3E1]/40 text-sm leading-relaxed group-hover:text-[#FAF3E1]/60 transition-colors duration-300">
                  {item.description}
                </p>
              </section>

              {/* BOTTOM DECORATIVE ELEMENT */}
              <footer className="mt-8">
                <div className="h-1 w-0 group-hover:w-12 bg-[#FA8112] rounded-full transition-all duration-500 opacity-40 group-hover:opacity-100" />
              </footer>
            </article>
          ))}
        </div>
      </div>

      {/* Background Subtle Accent Glow */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FA8112]/[0.02] blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Features;