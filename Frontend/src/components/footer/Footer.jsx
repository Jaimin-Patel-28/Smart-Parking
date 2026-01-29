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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8 px-6 mt-auto">
      <div className="container mx-auto max-w-7xl">
        {/* Main Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <FooterBrand />
          </div>
          <FooterLinks />
          <FooterSupport />
          <FooterLegal />
          <FooterContact />
        </div>

        {/* Divider for Premium Section */}
        <div className="border-t border-slate-900 my-10 hidden lg:block"></div>

        {/* Optional premium section - Centered or Split */}
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 mb-12">
          <FooterNewsletter />
        </div>

        {/* Bottom Section: Social & Legal Copy */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-900 gap-6">
          <div className="footer-social-wrapper order-2 md:order-1">
            <FooterSocial />
          </div>
          <div className="order-1 md:order-2">
            <FooterBottom />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
