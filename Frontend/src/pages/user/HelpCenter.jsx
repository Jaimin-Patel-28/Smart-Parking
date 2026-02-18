import HelpHeader from "./Help-Center/HelpHeader";
import HelpSearch from "./Help-Center/HelpSearch";
import HelpCategories from "./Help-Center/HelpCategories";
import FAQSection from "./Help-Center/FAQSection";
import BookingSupport from "./Help-Center/BookingSupport";
import WalletSupport from "./Help-Center/WalletSupport";
import AccountSupport from "./Help-Center/AccountSupport";
import ReportIssueForm from "./Help-Center/ReportIssueForm";
import TicketStatus from "./Help-Center/TicketStatus";
import ContactSupport from "./Help-Center/ContactSupport";
import HelpPolicies from "./Help-Center/HelpPolicies";
import HelpEmptyState from "./Help-Center/HelpEmptyState";
import HelpErrorState from "./Help-Center/HelpErrorState";

const HelpCenter = () => {
  // Mock state for Viva demonstration
  const isLoading = false;
  const hasError = false;

  return (
    <main className="min-h-screen bg-[#FAF3E1] p-4 md:p-8 lg:p-12 antialiased selection:bg-[#FA8112] selection:text-[#FAF3E1]">
      <div className="max-w-screen-2xl mx-auto space-y-12">
        {/* 1. HERO SECTION: Branding & Search */}
        <section className="space-y-8">
          <HelpHeader />
          <div className="max-w-3xl mx-auto -mt-16 relative z-20">
            <HelpSearch />
          </div>
        </section>

        {/* 2. DISCOVERY: Categories & Quick Links */}
        <div className="bg-white rounded-[3rem] border-2 border-[#222222]/5 p-8 shadow-sm">
          <HelpCategories />
        </div>

        {/* 3. MAIN INTERACTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN: Deep Support Modules (8/12 units) */}
          <div className="lg:col-span-8 space-y-12">
            {hasError ? (
              <HelpErrorState />
            ) : isLoading ? (
              <HelpEmptyState />
            ) : (
              <>
                <div className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm">
                  <FAQSection />
                </div>

                {/* Specialized Support Cards Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BookingSupport />
                  <WalletSupport />
                </div>

                <div className="bg-[#F5E7C6]/30 rounded-[2.5rem] border-2 border-dashed border-[#222222]/10 p-10">
                  <ReportIssueForm />
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN: Utility & Tracking (4/12 units) */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-8 space-y-8">
              <TicketStatus />
              <AccountSupport />
              <ContactSupport />

              <div className="px-6 border-t-2 border-[#222222]/5 pt-8">
                <HelpPolicies />
              </div>
            </div>
          </aside>
        </div>

        {/* 4. FOOTER: Project Identity */}
        <footer className="pt-12 text-center">
          <p className="text-[#222222]/20 text-[10px] font-black uppercase tracking-[0.4em]">
            SmartPark Help Center &bull; Anand Smart City &bull; Service Node
            2026
          </p>
        </footer>
      </div>
    </main>
  );
};

export default HelpCenter;
