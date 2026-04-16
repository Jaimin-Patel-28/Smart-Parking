const StatsCard = ({ icon: Icon, label, value, subtext, trend, color = "#FA8112" }) => {
  return (
    <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#FAF3E1]/70 text-sm font-semibold uppercase tracking-widest">{label}</h3>
        {Icon && (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        )}
      </div>

      {/* Main Value */}
      <div className="space-y-2">
        <div className="text-3xl font-black text-[#FAF3E1]">{value}</div>
        {subtext && <p className="text-[#FAF3E1]/50 text-sm">{subtext}</p>}
      </div>

      {/* Trend Indicator */}
      {trend && (
        <div
          className="text-sm font-semibold py-2 px-3 rounded-lg w-fit"
          style={{
            color,
            backgroundColor: `${color}20`,
          }}
        >
          {trend}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
