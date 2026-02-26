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
  // Ensures user starts at the top of the page on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#FAF3E1] min-h-screen font-sans text-[#222222] antialiased selection:bg-[#FA8112] selection:text-[#FAF3E1]">
      {/* 1. Header & Introduction: Clean airy hero section */}
      <ContactHero />

      {/* 2. Direct Contact Channels: Using the warmer Beige background for contrast */}
      <section className="py-20 bg-[#F5E7C6] border-y border-[#222222]/5">
        <ContactCards />
      </section>

      {/* 3. Main Interaction Area: Balanced Grid with generous whitespace */}
      <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 py-24">
        {/* Form Side */}
        <div className="order-2 lg:order-1">
          <ContactForm />
        </div>

        {/* Content Side */}
        <div className="order-1 lg:order-2 space-y-16">
          <WhyContact />

          {/* Social Links Box: Styled like a high-end card on beige */}
          <div className="p-10 bg-white rounded-[2.5rem] border-2 border-[#222222]/5 shadow-sm hover:border-[#222222] transition-all duration-500">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* 4. Visual Location Integration: Simple Map Container */}
      <section className="py-12 border-t border-[#222222]/5">
        <ContactMap />
      </section>

      {/* 5. Support & Conversion: Minimalist FAQ teaser */}
      <section className="py-24 bg-[#F5E7C6]/30 border-t border-[#222222]/5">
        <div className="container mx-auto max-w-4xl px-6">
          <FAQShortcut />
        </div>
      </section>

      {/* 6. Final Call to Action: Bold signature orange footer */}
      <ContactCTA />
    </main>
  );
};

export default Contact;
