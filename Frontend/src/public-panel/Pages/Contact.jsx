import React, { useEffect } from "react";
// Sub-component imports
import ContactHero from "../components/contact/ContactHero";
import ContactCards from "../components/contact/ContactCards";
import ContactForm from "../components/contact/ContactForm";
import WhyContact from "../components/contact/WhyContact";
import ContactMap from "../components/contact/ContactMap";
import FAQShortcut from "../components/contact/FAQShortcut";
import SocialLinks from "../components/contact/SocialLinks";
import ContactCTA from "../components/contact/ContactCTA";

const Contact = () => {
  // Reset scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#222222] min-h-screen selection:bg-[#FA8112] selection:text-[#222222] overflow-x-hidden antialiased">
      {/* 1. INTRODUCTION - Lightweight Hero */}
      <header className="relative">
        <ContactHero />
      </header>

      {/* 2. CHANNELS - Quick Action Cards (Email, Phone, WhatsApp) */}
      <section className="relative z-20 -mt-12 md:-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <ContactCards />
        </div>
      </section>

      {/* 3. INTERACTION AREA - The Main Hub */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Contact Form (Taking up more space) */}
          <article className="lg:col-span-7">
            <ContactForm />
          </article>

          {/* RIGHT: Supportive Info & Socials */}
          <aside className="lg:col-span-5 flex flex-col gap-10">
            <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 p-8 rounded-[2.5rem]">
              <WhyContact />
            </div>

            <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 p-8 rounded-[2.5rem]">
              <SocialLinks />
            </div>
          </aside>
        </div>
      </section>

      {/* 4. LOCATION - Full Width Map with Glass Overlay */}
      <section className="py-24 bg-[#222222] ">
        <div className="max-w-6xl mx-auto px-6">
          <ContactMap />
        </div>
      </section>

      {/* 5. SUPPORT - FAQ Quick Links */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FAQShortcut />
        </div>
      </section>

      {/* 6. CONCLUSION - Final Engagement */}
      <footer className="relative ">
        <div className="max-w-6xl mx-auto py-20 px-6">
          <ContactCTA />
        </div>
      </footer>

      {/* GLOBAL DECORATIVE GLOWS */}
      <div className="fixed top-[10%] right-[-5%] w-[400px] h-[400px] bg-[#FA8112]/[0.03] blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-[#FA8112]/[0.05] blur-[120px] rounded-full pointer-events-none z-0" />
    </main>
  );
};

export default Contact;
