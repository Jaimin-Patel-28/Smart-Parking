import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

const ContactCards = () => {
  const contactData = [
    {
      title: "Email Support",
      value: "support@smartpark.com",
      desc: "Response within 24 hours",
      icon: Mail,
      action: "mailto:support@smartpark.com",
    },
    {
      title: "Phone & WhatsApp",
      value: "+91 98765 43210",
      desc: "Direct support line",
      icon: Phone,
      action: "tel:+919876543210",
    },
    {
      title: "Headquarters",
      value: "Anand, Gujarat",
      desc: "Smart City Hub",
      icon: MapPin,
      action: "#map",
    },
    {
      title: "Operational Hours",
      value: "9 AM – 6 PM",
      desc: "Monday to Saturday",
      icon: Clock,
      action: null,
    },
  ];

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group relative p-10 rounded-[2.5rem] bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F5E7C6] flex items-center justify-center mb-8 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all duration-500 shadow-sm">
                <Icon className="w-7 h-7 stroke-[2px]" />
              </div>
              <h3 className="text-[#222222] font-black text-xl mb-3 flex items-center gap-2 tracking-tight">
                {item.title}
                {item.action && (
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FA8112]"
                  />
                )}
              </h3>
              <p className="text-[#FA8112] font-black text-sm mb-2 wrap-break-words">
                {item.value}
              </p>
              <p className="text-[#222222]/40 text-[10px] uppercase tracking-[0.2em] font-black">
                {item.desc}
              </p>
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
