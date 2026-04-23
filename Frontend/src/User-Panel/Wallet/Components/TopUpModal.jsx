import { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  X,
  Wallet,
  ShieldCheck,
  Zap,
  CreditCard,
  Smartphone,
  Banknote,
  Terminal,
  Activity,
  Fingerprint,
} from "lucide-react";
import walletService from "../Services/walletService";
import {
  loadRazorpayScript,
  openRazorpayCheckout,
  verifyPaymentWithBackend,
} from "../Utils/razorpayUtils";

const TopUpModal = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [razorpayMethod, setRazorpayMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleClose = () => {
    setAmount("");
    setError("");
    setSuccess(false);
    setSuccessMessage("");
    onClose();
  };

  // Logic remains exactly as provided
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setError("VALIDATION_ERROR: Provide positive integer");
      return;
    }
    setLoading(true);
    try {
      if (paymentMethod === "razorpay") {
        await handleRazorpayPayment(parsedAmount);
      } else {
        await handleWalletTopup(parsedAmount);
      }
    } catch (err) {
      setError(err.message || "SEQUENCE_FAULT: Link interrupted");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async (amount) => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("GATEWAY_LOAD_FAILURE");
      const orderResponse = await walletService.createPaymentOrder(amount);
      if (!orderResponse.data?.data?.orderId)
        throw new Error("ORDER_GEN_FAILED");
      const { orderId, keyId, userEmail, userPhone, name } =
        orderResponse.data.data;
      const paymentResponse = await openRazorpayCheckout({
        key: keyId,
        order_id: orderId,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: name,
        description: "Vault Reload Sequence",
        prefill: { email: userEmail, contact: userPhone },
        method: razorpayMethod,
      });
      const verificationResponse = await verifyPaymentWithBackend(
        paymentResponse,
        walletService,
      );
      if (verificationResponse.data?.success) {
        setSuccess(true);
        setSuccessMessage(`Reload_Successful: ₹${amount} authorized.`);
        setAmount("");
        setTimeout(() => {
          if (onSuccess) onSuccess(verificationResponse.data.data);
          handleClose();
        }, 2000);
      } else {
        throw new Error(
          verificationResponse.data?.message || "VERIFICATION_FAILURE",
        );
      }
    } catch (err) {
      if (err.message !== "Payment window closed") {
        setError(err.message);
        try {
          await walletService.handlePaymentFailure(amount.toString(), {
            code: "USER_ABORT",
            description: err.message,
          });
        } catch (notifyErr) {
          console.warn(notifyErr);
        }
      }
    }
  };

  const handleWalletTopup = async (amount) => {
    try {
      const response = await walletService.topUpWallet(amount);
      if (response.data?.success) {
        setSuccess(true);
        setSuccessMessage(`Registry_Update: ₹${amount} injected.`);
        setAmount("");
        setTimeout(() => {
          if (onSuccess) onSuccess(response.data.data);
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data?.message || "LEDGER_SYNC_FAILED");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/95 backdrop-blur-xl px-4 animate-in fade-in duration-500">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-[#F5E7C6]/5 bg-[#1a1a1a] shadow-[0_0_100px_rgba(0,0,0,0.8)] relative">
        {/* Glow Scanning Accent */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FA8112]/50 to-transparent" />

        {/* 1. TERMINAL HEADER */}
        <div className="flex items-center justify-between border-b border-[#F5E7C6]/5 px-10 py-8 bg-[#222222]/50">
          <div className="flex items-center gap-5">
            <div className="bg-[#FA8112]/5 border border-[#FA8112]/20 p-3.5 rounded-lg text-[#FA8112] shadow-[0_0_15px_rgba(250,129,18,0.1)]">
              <Wallet size={22} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-[#FAF3E1]">
                Vault <span className="text-[#FA8112]">Reload</span>
              </h2>
              <div className="flex items-center gap-3">
                <Terminal size={12} className="text-[#FAF3E1]/20" />
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20">
                  Transaction_Terminal_v4.0
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-3 rounded-lg bg-[#1a1a1a] border border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-rose-500 hover:border-rose-500/20 transition-all active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. OPERATIONAL VIEWPORT */}
        <div className="px-10 py-3 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {success ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-700">
              <div className="relative">
                <div className="h-24 w-24 bg-emerald-500/5 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                  <ShieldCheck size={48} strokeWidth={1.5} />
                </div>
                <Activity
                  size={16}
                  className="absolute -bottom-2 -right-2 text-emerald-500 animate-pulse"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                  Reload_Confirmed
                </h3>
                <p className="text-[10px] font-mono font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em]">
                  {successMessage}
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handlePaymentSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* LEFT: QUANTITY CONFIGURATION */}
              <div className="lg:col-span-5 space-y-10">
                {error && (
                  <div className="flex items-center gap-4 bg-rose-500/5 border border-rose-500/20 p-5 rounded-lg text-rose-400 text-[10px] font-bold uppercase tracking-widest animate-in slide-in-from-top-4">
                    <AlertCircle size={16} className="shrink-0" /> {error}
                  </div>
                )}

                <div className="space-y-4">
                  <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FA8112]/60 ml-1">
                    Injection_Amount
                  </label>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#FAF3E1]/10 group-focus-within:text-[#FA8112] transition-colors tabular-nums">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#222222] border border-[#F5E7C6]/5 rounded-lg py-7 pl-16 pr-8 text-4xl font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 focus:outline-none transition-all placeholder:text-[#FAF3E1]/5 tabular-nums shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10 ml-1">
                    Preset_Modules
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {quickAmounts.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmount(val.toString())}
                        className={`py-4 rounded-lg text-[10px] font-bold tracking-[0.2em] transition-all duration-500 border ${
                          amount === val.toString()
                            ? "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-xl shadow-[#FA8112]/10"
                            : "bg-[#1a1a1a] border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FAF3E1]/50 hover:bg-[#222222]"
                        }`}
                      >
                        ₹{val}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !amount}
                  className="w-full py-6 rounded-lg bg-[#FA8112] text-[#222222] font-bold uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-4 hover:bg-[#FAF3E1] transition-all disabled:opacity-10 shadow-2xl shadow-[#FA8112]/5 active:scale-[0.98] group"
                >
                  {loading ? (
                    <Loader2
                      className="animate-spin"
                      size={20}
                      strokeWidth={3}
                    />
                  ) : (
                    <Fingerprint
                      size={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  )}
                  {loading
                    ? "SYNCING_LEDGER..."
                    : `AUTHORIZE_₹${amount || "0"}`}
                </button>
              </div>

              {/* RIGHT: PROTOCOL SELECTION */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FA8112]/60 ml-1">
                    Gateway_Protocol
                  </label>

                  {/* Razorpay Channel */}
                  <div
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`p-8 rounded-xl border transition-all duration-500 cursor-pointer relative overflow-hidden group/opt ${
                      paymentMethod === "razorpay"
                        ? "bg-[#FA8112]/[0.03] border-[#FA8112]/30 shadow-2xl"
                        : "bg-[#1a1a1a] border-[#F5E7C6]/5 hover:border-[#FA8112]/20"
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-5">
                        <div
                          className={`p-3.5 rounded-lg border transition-all duration-500 ${paymentMethod === "razorpay" ? "bg-[#FA8112] border-[#FA8112] text-[#222222]" : "bg-[#222222] border-[#F5E7C6]/5 text-[#FAF3E1]/10"}`}
                        >
                          <CreditCard size={20} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[#FAF3E1] uppercase tracking-wider">
                            Online_Gateway
                          </p>
                          <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.25em]">
                            Instant_Sync_Protocol
                          </p>
                        </div>
                      </div>
                      <div
                        className={`h-6 w-6 rounded border transition-all duration-500 flex items-center justify-center ${paymentMethod === "razorpay" ? "border-[#FA8112] bg-[#FA8112]/10" : "border-[#F5E7C6]/10"}`}
                      >
                        {paymentMethod === "razorpay" && (
                          <div className="h-2 w-2 bg-[#FA8112] rounded-sm shadow-[0_0_8px_#FA8112]" />
                        )}
                      </div>
                    </div>

                    {paymentMethod === "razorpay" && (
                      <div className="mt-8 grid grid-cols-3 gap-4 animate-in slide-in-from-top-4 duration-500">
                        {[
                          { id: "card", icon: CreditCard, label: "CARD" },
                          { id: "upi", icon: Smartphone, label: "UPI" },
                          { id: "netbanking", icon: Banknote, label: "BANK" },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRazorpayMethod(m.id);
                            }}
                            className={`flex flex-col items-center gap-3 p-4 rounded-lg border text-[9px] font-bold tracking-[0.3em] transition-all duration-500 ${
                              razorpayMethod === m.id
                                ? "bg-[#FA8112]/10 border-[#FA8112] text-[#FA8112]"
                                : "bg-[#222222] border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FAF3E1]/50"
                            }`}
                          >
                            <m.icon size={16} strokeWidth={1.5} /> {m.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Wallet Channel */}
                  <div
                    onClick={() => setPaymentMethod("wallet")}
                    className={`p-8 rounded-xl border transition-all duration-500 cursor-pointer relative group/opt ${
                      paymentMethod === "wallet"
                        ? "bg-[#FA8112]/[0.03] border-[#FA8112]/30 shadow-2xl"
                        : "bg-[#1a1a1a] border-[#F5E7C6]/5 hover:border-[#FA8112]/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div
                          className={`p-3.5 rounded-lg border transition-all duration-500 ${paymentMethod === "wallet" ? "bg-[#FA8112] border-[#FA8112] text-[#222222]" : "bg-[#222222] border-[#F5E7C6]/5 text-[#FAF3E1]/10"}`}
                        >
                          <ShieldCheck size={20} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-[#FAF3E1] uppercase tracking-wider">
                            Direct_Ledger
                          </p>
                          <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.25em]">
                            Manual_Sync (24H Latency)
                          </p>
                        </div>
                      </div>
                      <div
                        className={`h-6 w-6 rounded border transition-all duration-500 flex items-center justify-center ${paymentMethod === "wallet" ? "border-[#FA8112] bg-[#FA8112]/10" : "border-[#F5E7C6]/10"}`}
                      >
                        {paymentMethod === "wallet" && (
                          <div className="h-2 w-2 bg-[#FA8112] rounded-sm shadow-[0_0_8px_#FA8112]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* TEST CREDENTIALS HUD */}
                {paymentMethod === "razorpay" && (
                  <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                      <Zap size={60} />
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-[#FA8112]">
                      <Zap size={14} className="fill-current" />{" "}
                      Simulation_Mode_Metadata
                    </div>

                    <div className="grid grid-cols-2 gap-8 relative z-10">
                      {razorpayMethod === "card" && (
                        <>
                          <div className="space-y-2">
                            <p className="text-[8px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                              Entry_Code
                            </p>
                            <p className="text-xs font-mono font-bold text-[#FAF3E1]/40 tracking-[0.1em]">
                              4111 1111 1111 1111
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-[8px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                              EXP_CVV
                            </p>
                            <p className="text-xs font-mono font-bold text-[#FAF3E1]/40 tracking-[0.1em]">
                              12/28 • 123
                            </p>
                          </div>
                        </>
                      )}
                      {razorpayMethod === "upi" && (
                        <div className="col-span-2 space-y-2">
                          <p className="text-[8px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                            Virtual_Private_Addr
                          </p>
                          <p className="text-xs font-mono font-bold text-[#FAF3E1]/40 tracking-[0.1em]">
                            testuser@upi{" "}
                            <span className="text-[#FA8112]/20 font-bold ml-4">
                              BYPASS_OTP: 123456
                            </span>
                          </p>
                        </div>
                      )}
                      {razorpayMethod === "netbanking" && (
                        <div className="col-span-2 space-y-2">
                          <p className="text-[8px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                            Auth_Key_Pair
                          </p>
                          <p className="text-xs font-mono font-bold text-[#FAF3E1]/40 tracking-[0.1em]">
                            testuser / Test@123{" "}
                            <span className="text-[#FA8112]/20 font-bold ml-4">
                              BYPASS_OTP: 123456
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopUpModal;
