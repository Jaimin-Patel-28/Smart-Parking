import { useState } from "react";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react";
import walletService from "../Services/walletService";
import {
  loadRazorpayScript,
  openRazorpayCheckout,
  verifyPaymentWithBackend,
} from "../Utils/razorpayUtils";

const TopUpModal = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("razorpay"); // razorpay or wallet
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
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async (amount) => {
    try {
      // Step 1: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway. Please try again.");
      }

      // Step 2: Create order on backend
      const orderResponse = await walletService.createPaymentOrder(amount);

      if (!orderResponse.data?.data?.orderId) {
        throw new Error("Failed to create payment order");
      }

      const { orderId, keyId, userEmail, userPhone, name } = orderResponse.data.data;

      // Step 3: Open Razorpay checkout
      const paymentResponse = await openRazorpayCheckout({
        key: keyId,
        order_id: orderId,
        amount: Math.round(amount * 100), // in paise
        currency: "INR",
        name: name,
        description: "Wallet Top-up",
        prefill: {
          email: userEmail,
          contact: userPhone,
        },
      });

      // Step 4: Verify payment with backend
      const verificationResponse = await verifyPaymentWithBackend(
        paymentResponse,
        walletService
      );

      if (verificationResponse.data?.success) {
        setSuccess(true);
        setSuccessMessage(
          `Payment successful! ₹${amount} has been added to your wallet.`
        );
        setAmount("");

        // Call onSuccess callback after 2 seconds
        setTimeout(() => {
          if (onSuccess) {
            onSuccess(verificationResponse.data.data);
          }
          handleClose();
        }, 2000);
      } else {
        throw new Error(verificationResponse.data?.message || "Payment verification failed");
      }
    } catch (err) {
      // Handle payment failure
      if (err.message !== "Payment window closed") {
        setError(err.message);

        // Try to notify backend of failure
        try {
          const orderMatch = amount.toString();
          await walletService.handlePaymentFailure(orderMatch, {
            code: "USER_CANCELLED",
            description: err.message,
          }).catch(() => {
            // Silently fail - not critical
          });
        } catch (notifyErr) {
          console.warn("Could not notify payment failure:", notifyErr);
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

        // Call onSuccess callback after 2 seconds
        setTimeout(() => {
          if (onSuccess) {
            onSuccess(response.data.data);
          }
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Add Wallet Funds</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {!success && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  step="1"
                  disabled={loading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Select
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val.toString())}
                      disabled={loading}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                        amount === val.toString()
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === "razorpay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      disabled={loading}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Razorpay (Credit/Debit Card, UPI)
                      </p>
                      <p className="text-xs text-gray-500">Secure payment gateway</p>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      disabled={loading}
                      className="w-4 h-4"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Direct Credit
                      </p>
                      <p className="text-xs text-gray-500">
                        Manual admin approval required
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !amount}
                className={`w-full py-2 px-4 rounded-lg font-medium text-white transition flex items-center justify-center gap-2 ${
                  loading || !amount
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Processing..." : `Pay ₹${amount || "0"}`}
              </button>

              {/* Test Card Info */}
              {paymentMethod === "razorpay" && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Test Card:</strong> 4111 1111 1111 1111 (Any future date & CVV)
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopUpModal;
