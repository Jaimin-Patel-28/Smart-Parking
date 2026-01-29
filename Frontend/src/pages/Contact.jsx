import React, { useEffect } from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactCards from "../components/contact/ContactCards";
import ContactForm from "../components/contact/ContactForm";
import WhyContact from "../components/contact/WhyContact";
import ContactMap from "../components/contact/ContactMap";
import FAQShortcut from "../components/contact/FAQShortcut";
import SocialLinks from "../components/contact/SocialLinks";
import ContactCTA from "../components/contact/ContactCTA";

const Contact = () => {
  // Scroll to top when page loads - good UX for React Router
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-slate-900 min-h-screen overflow-x-hidden">
      {/* 1. Header & Introduction */}
      <ContactHero />

      {/* 2. Direct Contact Channels (Email, Phone, Location) */}
      <section className="py-12 bg-linear-to-b from-slate-900 to-slate-800/50">
        <ContactCards />
      </section>

      {/* 3. Main Interaction Area */}
      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 py-20">
        <div className="order-2 lg:order-1">
          <ContactForm />
        </div>
        <div className="order-1 lg:order-2 space-y-12">
          <WhyContact />
          <div className="p-8 bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
             <SocialLinks />
          </div>
        </div>
      </div>

      {/* 4. Visual Location Integration */}
      <ContactMap />

      {/* 5. Support & Conversion */}
      <section className="py-24 bg-slate-950/50">
        <div className="container mx-auto max-w-4xl px-6">
          <FAQShortcut />
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};

export default Contact;