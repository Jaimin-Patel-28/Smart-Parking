import HelpHeader from "../Modules/Help-Center/HelpHeader";
import HelpSearch from "../Modules/Help-Center/HelpSearch";
import HelpCategories from "../Modules/Help-Center/HelpCategories";
import FAQSection from "../Modules/Help-Center/FAQSection";
import BookingSupport from "../Modules/Help-Center/BookingSupport";
import WalletSupport from "../Modules/Help-Center/WalletSupport";
import AccountSupport from "../Modules/Help-Center/AccountSupport";
import ReportIssueForm from "../Modules/Help-Center/ReportIssueForm";
import TicketStatus from "../Modules/Help-Center/TicketStatus";
import ContactSupport from "../Modules/Help-Center/ContactSupport";
import HelpPolicies from "../Modules/Help-Center/HelpPolicies";
import HelpEmptyState from "../Modules/Help-Center/HelpEmptyState";
import HelpErrorState from "../Modules/Help-Center/HelpErrorState";

const HelpCenter = () => {
  const isLoading = false;
  const hasError = false;

  return (
    <main className="min-h-screen bg-[#FAF3E1] px-4 sm:px-6 md:px-8 lg:px-12 py-8 selection:bg-[#FA8112] selection:text-[#FAF3E1]">
      <div className="max-w-screen-2xl mx-auto space-y-16">
        {/* ================= HERO SECTION ================= */}
        <section className="space-y-8 text-center lg:text-left">
          <HelpHeader />

          <div className="max-w-3xl mx-auto lg:mx-0 relative lg:-mt-10 z-20">
            <HelpSearch />
          </div>
        </section>

        {/* ================= DISCOVERY SECTION ================= */}
        <section className="bg-white rounded-3xl border border-[#222222]/5 p-6 sm:p-8 shadow-sm">
          <HelpCategories />
        </section>

        {/* ================= MAIN GRID ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-10">
            {hasError ? (
              <HelpErrorState />
            ) : isLoading ? (
              <HelpEmptyState />
            ) : (
              <>
                {/* FAQ */}
                <div className="bg-white rounded-3xl border border-[#222222]/5 p-6 md:p-8 shadow-sm">
                  <FAQSection />
                </div>

                {/* Support Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <BookingSupport />
                  <WalletSupport />
                </div>

                {/* Report Issue */}
                <div className="bg-[#F5E7C6] rounded-3xl border-2 border-dashed border-[#222222]/10 p-6 md:p-10">
                  <ReportIssueForm />
                </div>
              </>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#222222]/5">
                <TicketStatus />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#222222]/5">
                <AccountSupport />
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#222222]/5">
                <ContactSupport />
              </div>

              <div className="pt-6 border-t border-[#222222]/10">
                <HelpPolicies />
              </div>
            </div>
          </aside>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="pt-12 text-center">
          <p className="text-[#222222]/30 text-xs font-semibold uppercase tracking-widest">
            SmartPark Help Center • Anand Smart City • Service Node 2026
          </p>
        </footer>
      </div>
    </main>
  );
};

export default HelpCenter;
