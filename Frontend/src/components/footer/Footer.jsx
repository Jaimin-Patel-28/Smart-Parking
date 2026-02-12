import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterSupport from "./FooterSupport";
import FooterLegal from "./FooterLegal";
import FooterContact from "./FooterContact";
import FooterSocial from "./FooterSocial";
import FooterNewsletter from "./FooterNewsletter";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-[#F5E7C6] text-[#222222] border-t-2 border-[#222222]/5 pt-20 pb-10 px-6 md:px-12 mt-auto relative overflow-hidden">
      {/* HUMANIZED TOUCH: Subtle paper texture to keep the footer from looking flat */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        {/* Main Information Grid: Increased gaps for "Humanized" breathing room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-1">
            <FooterBrand />
          </div>
          <FooterLinks />
          <FooterSupport />
          <FooterLegal />
          <FooterContact />
        </div>

        {/* HUMANIZED DIVIDER: Using a subtle charcoal tint instead of hard slate */}
        <div className="border-t border-[#222222]/10 my-12 hidden lg:block"></div>

        {/* Newsletter Section: Styled as a clean, elevated "Card" on the beige background */}
        <div className="bg-white/40 backdrop-blur-sm p-10 md:p-12 rounded-[2.5rem] border-2 border-[#222222]/5 mb-16 shadow-sm">
          <FooterNewsletter />
        </div>

        {/* Bottom Section: Social & Legal Copy */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-[#222222]/10 gap-8">
          {/* Social Icons - Typically higher contrast in a humanized design */}
          <div className="footer-social-wrapper order-2 md:order-1 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <FooterSocial />
          </div>

          <div className="order-1 md:order-2 font-bold text-[#222222]/40 text-sm tracking-tight">
            <FooterBottom />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
