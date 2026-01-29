import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

const ContactCards = () => {
  const contactData = [
    {
      title: "Email Support",
      value: "support@smartpark.com",
      desc: "Response within 24 hours",
      icon: Mail,
      action: "mailto:support@smartpark.com",
      color: "text-cyan-400",
    },
    {
      title: "Phone & WhatsApp",
      value: "+91 98765 43210",
      desc: "Direct support line",
      icon: Phone,
      action: "tel:+919876543210",
      color: "text-emerald-400",
    },
    {
      title: "Main Headquarters",
      value: "Anand, Gujarat",
      desc: "Smart City Network Hub",
      icon: MapPin,
      action: "#map",
      color: "text-blue-400",
    },
    {
      title: "Operational Hours",
      value: "9 AM – 6 PM",
      desc: "Monday to Saturday",
      icon: Clock,
      action: null,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl bg-slate-800/40 border border-slate-700/50 hover:border-cyan-400/30 hover:bg-slate-800/60 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>

              {/* Text Content */}
              <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                {item.title}
                {item.action && (
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                )}
              </h3>
              
              <p className="text-cyan-400 font-semibold text-sm mb-1">
                {item.value}
              </p>
              
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                {item.desc}
              </p>

              {/* Clickable Overlay for Links */}
              {item.action && (
                <a 
                  href={item.action} 
                  className="absolute inset-0 z-10" 
                  aria-label={item.title}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactCards;