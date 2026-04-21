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

  // --- LOGIC REMAINS EXACTLY AS PROVIDED ---
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setError("Please enter a valid amount");
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
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async (amount) => {
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Failed to load payment gateway.");
      const orderResponse = await walletService.createPaymentOrder(amount);
      if (!orderResponse.data?.data?.orderId)
        throw new Error("Failed to create payment order");
      const { orderId, keyId, userEmail, userPhone, name } =
        orderResponse.data.data;
      const paymentResponse = await openRazorpayCheckout({
        key: keyId,
        order_id: orderId,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: name,
        description: "Wallet Top-up",
        prefill: { email: userEmail, contact: userPhone },
        method: razorpayMethod,
      });
      const verificationResponse = await verifyPaymentWithBackend(
        paymentResponse,
        walletService,
      );
      if (verificationResponse.data?.success) {
        setSuccess(true);
        setSuccessMessage(`Payment successful! ₹${amount} has been added.`);
        setAmount("");
        setTimeout(() => {
          if (onSuccess) onSuccess(verificationResponse.data.data);
          handleClose();
        }, 2000);
      } else {
        throw new Error(
          verificationResponse.data?.message || "Verification failed",
        );
      }
    } catch (err) {
      if (err.message !== "Payment window closed") {
        setError(err.message);
        try {
          await walletService.handlePaymentFailure(amount.toString(), {
            code: "USER_CANCELLED",
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
        setSuccessMessage(`₹${amount} has been added to your wallet.`);
        setAmount("");
        setTimeout(() => {
          if (onSuccess) onSuccess(response.data.data);
          handleClose();
        }, 2000);
      } else {
        throw new Error(response.data?.message || "Failed to add funds");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/90 backdrop-blur-md px-4 animate-in fade-in duration-300">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FA8112] to-transparent opacity-50" />

        {/* 1. Header Area */}
        <div className="flex items-center justify-between border-b border-[#F5E7C6]/5 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#FA8112]/10 p-3 rounded-2xl text-[#FA8112]">
              <Wallet size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter italic text-[#FAF3E1]">
                Wallet <span className="text-[#FA8112]">Reload</span>
              </h2>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/20">
                Secure Transaction Terminal
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2.5 rounded-xl bg-[#FAF3E1]/5 text-[#FAF3E1]/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* 2. Main Content Container */}
        <div className="p-8 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
              <div className="h-24 w-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                <CheckCircle size={48} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#FAF3E1] italic uppercase tracking-tight">
                  Funds Secured
                </h3>
                <p className="text-sm font-bold text-[#FAF3E1]/40 mt-2 uppercase tracking-widest">
                  {successMessage}
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handlePaymentSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Column: Amount Entry (5 Cols) */}
              <div className="lg:col-span-5 space-y-8">
                {error && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-xs font-bold animate-in slide-in-from-top-2">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
                    Reload Amount
                  </label>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 rounded-2xl py-6 pl-14 pr-6 text-3xl font-black text-[#FAF3E1] italic focus:border-[#FA8112]/50 focus:outline-none transition-all placeholder:text-[#FAF3E1]/5"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FAF3E1]/20 ml-1">
                    Quick Presets
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {quickAmounts.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmount(val.toString())}
                        className={`py-4 rounded-2xl text-xs font-black transition-all border ${
                          amount === val.toString()
                            ? "bg-[#FA8112] border-[#FA8112] text-[#222222] shadow-xl shadow-[#FA8112]/20"
                            : "bg-[#FAF3E1]/5 border-[#F5E7C6]/5 text-[#FAF3E1]/60 hover:bg-[#FAF3E1]/10"
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
                  className="w-full py-5 rounded-2xl bg-[#FA8112] text-[#222222] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 shadow-2xl shadow-[#FA8112]/20"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Zap size={18} fill="currentColor" />
                  )}
                  {loading
                    ? "Syncing Ledger..."
                    : `Authorize ₹${amount || "0"}`}
                </button>
              </div>

              {/* Right Column: Gateway Selection (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FA8112] ml-1">
                    Payment Protocol
                  </label>

                  {/* Razorpay Option */}
                  <div
                    onClick={() => setPaymentMethod("razorpay")}
                    className={`p-6 rounded-[2rem] border transition-all cursor-pointer relative overflow-hidden ${
                      paymentMethod === "razorpay"
                        ? "bg-[#FA8112]/5 border-[#FA8112]/30"
                        : "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/5 hover:bg-[#FAF3E1]/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl ${paymentMethod === "razorpay" ? "bg-[#FA8112] text-[#222222]" : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40"}`}
                        >
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#FAF3E1] uppercase italic">
                            Online Gateway
                          </p>
                          <p className="text-[9px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest mt-1 italic">
                            Instant Processing via Razorpay
                          </p>
                        </div>
                      </div>
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "razorpay" ? "border-[#FA8112]" : "border-[#FAF3E1]/10"}`}
                      >
                        {paymentMethod === "razorpay" && (
                          <div className="h-2.5 w-2.5 bg-[#FA8112] rounded-full" />
                        )}
                      </div>
                    </div>

                    {/* Razorpay Sub-methods */}
                    {paymentMethod === "razorpay" && (
                      <div className="mt-6 grid grid-cols-3 gap-3 animate-in slide-in-from-top-2">
                        {[
                          {
                            id: "card",
                            icon: <CreditCard size={14} />,
                            label: "CARD",
                          },
                          {
                            id: "upi",
                            icon: <Smartphone size={14} />,
                            label: "UPI",
                          },
                          {
                            id: "netbanking",
                            icon: <Banknote size={14} />,
                            label: "BANK",
                          },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRazorpayMethod(m.id);
                            }}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-[9px] font-black tracking-widest transition-all ${
                              razorpayMethod === m.id
                                ? "bg-[#FA8112]/10 border-[#FA8112] text-[#FA8112]"
                                : "bg-[#222] border-[#F5E7C6]/5 text-[#FAF3E1]/20 hover:text-[#FAF3E1]/40"
                            }`}
                          >
                            {m.icon} {m.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Manual Wallet Option */}
                  <div
                    onClick={() => setPaymentMethod("wallet")}
                    className={`p-6 rounded-[2rem] border transition-all cursor-pointer ${
                      paymentMethod === "wallet"
                        ? "bg-[#FA8112]/5 border-[#FA8112]/30"
                        : "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/5 hover:bg-[#FAF3E1]/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl ${paymentMethod === "wallet" ? "bg-[#FA8112] text-[#222222]" : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40"}`}
                        >
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#FAF3E1] uppercase italic">
                            Admin Direct
                          </p>
                          <p className="text-[9px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest mt-1 italic">
                            Manual Verification (24h Sync)
                          </p>
                        </div>
                      </div>
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "wallet" ? "border-[#FA8112]" : "border-[#FAF3E1]/10"}`}
                      >
                        {paymentMethod === "wallet" && (
                          <div className="h-2.5 w-2.5 bg-[#FA8112] rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Test Console (Test Credentials) */}
                {paymentMethod === "razorpay" && (
                  <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#FA8112]">
                      <Zap size={12} fill="currentColor" /> Test Environment
                      Credentials
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[10px] font-bold">
                      {razorpayMethod === "card" && (
                        <>
                          <div className="space-y-1">
                            <p className="text-[#FAF3E1]/20">NUMBER</p>
                            <p className="text-[#FAF3E1]">
                              4111 1111 1111 1111
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[#FAF3E1]/20">EXP/CVV</p>
                            <p className="text-[#FAF3E1]">12/28 • 123</p>
                          </div>
                        </>
                      )}
                      {razorpayMethod === "upi" && (
                        <div className="col-span-2 space-y-1">
                          <p className="text-[#FAF3E1]/20">TEST VPA</p>
                          <p className="text-[#FAF3E1]">
                            testuser@upi{" "}
                            <span className="ml-2 text-[#FA8112]/40">
                              (OTP: 123456)
                            </span>
                          </p>
                        </div>
                      )}
                      {razorpayMethod === "netbanking" && (
                        <div className="col-span-2 space-y-1">
                          <p className="text-[#FAF3E1]/20">USER / PASS</p>
                          <p className="text-[#FAF3E1]">
                            testuser / Test@123{" "}
                            <span className="ml-2 text-[#FA8112]/40">
                              (OTP: 123456)
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
