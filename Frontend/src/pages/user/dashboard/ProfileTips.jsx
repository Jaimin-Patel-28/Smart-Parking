import React from "react";
import { Sparkles, Car, BellRing, UserCheck, ArrowRight } from "lucide-react";

const ProfileTips = () => {
  const tips = [
    {
      icon: UserCheck,
      title: "Complete Profile",
      desc: "Add your name and photo for verification.",
    },
    {
      icon: Car,
      title: "Add Vehicle Details",
      desc: "Save license plate numbers for faster entry.",
    },
    {
      icon: BellRing,
      title: "Enable Alerts",
      desc: "Get reminders before your session ends.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#222222]">
            Profile Boosters
          </h2>
          <p className="text-sm text-[#6B6B6B]">
            Improve your experience and unlock benefits
          </p>
        </div>
      </div>

      {/* Tips List */}
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-xl border border-[#F5E7C6] hover:bg-[#FAF3E1] transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
              <tip.icon size={16} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-[#222222]">
                  {tip.title}
                </h4>
                <ArrowRight size={16} className="text-[#6B6B6B]" />
              </div>

              <p className="text-sm text-[#6B6B6B] mt-1">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="mt-8 bg-[#FAF3E1] rounded-xl p-5 border border-[#F5E7C6]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-[#6B6B6B]">Verification Progress</span>
          <span className="text-sm font-medium text-[#FA8112]">65%</span>
        </div>

        <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#F5E7C6]">
          <div
            className="h-full bg-[#FA8112] rounded-full transition-all duration-500"
            style={{ width: "65%" }}
          />
        </div>

        <p className="text-xs text-[#6B6B6B] mt-3 text-center">
          Complete 1 more task to reach Level 2
        </p>
      </div>
    </section>
  );
};

export default ProfileTips;
 