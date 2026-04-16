import api from "../../../Shared/Services/api";

const walletService = {
  // Existing wallet methods
  getWallet: () => api.get("/wallet"),
  getSummary: () => api.get("/wallet/summary"),
  getTransactions: (params = {}) => api.get("/wallet/transactions", { params }),
  
  // Direct wallet top-up (manual credit, no payment gateway)
  topUpWallet: (amount) => api.post("/wallet/top-up", { amount }),

  // Razorpay payment methods
  createPaymentOrder: (amount) => api.post("/payment/create-order", { amount }),
  verifyPayment: (orderId, paymentId, signature) =>
    api.post("/payment/verify-payment", { orderId, paymentId, signature }),
  getPaymentStatus: (orderId) => api.get(`/payment/status/${orderId}`),
  handlePaymentFailure: (orderId, error) =>
    api.post("/payment/failed", { orderId, error }),
  refundPayment: (orderId, reason) =>
    api.post("/payment/refund", { orderId, reason }),
};

export default walletService;

