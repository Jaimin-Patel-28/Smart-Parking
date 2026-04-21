/**
 * Load Razorpay Script dynamically
 * @returns {Promise<boolean>} - True if script loaded successfully
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      resolve(false);
    };
    document.head.appendChild(script);
  });
};

/**
 * Initialize and open Razorpay checkout
 * @param {object} options - Razorpay checkout options
 * @returns {Promise<object>} - Payment response
 */
export const openRazorpayCheckout = (options) => {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error("Razorpay is not loaded"));
      return;
    }

    const defaultOptions = {
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          reject(new Error("Payment window closed"));
        },
      },
    };

    // Build method option if specified
    const methodOptions = {};
    if (options.method) {
      // Razorpay supports 'card', 'upi', 'netbanking', 'wallet', etc.
      methodOptions.method = {
        [options.method]: 1, // Enable only selected method
      };
    }

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      ...methodOptions,
      handler: function (response) {
        resolve(response);
      },
    };

    // Remove custom method key as it's not a valid Razorpay option
    delete mergedOptions.method;

    try {
      const rzp = new window.Razorpay(mergedOptions);
      rzp.open();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Verify payment with backend
 * @param {object} paymentData - Payment response from Razorpay
 * @param {function} walletService - Wallet service function
 * @returns {Promise<object>} - Verification response
 */
export const verifyPaymentWithBackend = async (paymentData, walletService) => {
  try {
    const response = await walletService.verifyPayment(
      paymentData.razorpay_order_id,
      paymentData.razorpay_payment_id,
      paymentData.razorpay_signature
    );
    return response;
  } catch (error) {
    throw new Error(`Payment verification failed: ${error.message}`);
  }
};
