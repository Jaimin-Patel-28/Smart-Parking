const walletService = require("../Services/wallet.service");
const {
  sendNotification,
} = require("../../Shared/services/notification.service");

const getWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const summary = await walletService.getWalletSummary(userId);

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWalletSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const summary = await walletService.getWalletSummary(userId);

    res.json({
      success: true,
      data: {
        balance: summary.balance,
        totalSpent: summary.totalSpent,
        totalTopUps: summary.totalTopUps,
        totalRefunds: summary.totalRefunds,
        transactionCount: summary.transactionCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWalletTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page, limit, type, status } = req.query;

    const transactions = await walletService.getWalletTransactions(userId, {
      page,
      limit,
      type,
      status,
    });

    res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const topUpWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;

    const result = await walletService.topUpWallet(userId, amount);

    void sendNotification({
      user: userId,
      type: "wallet",
      title: "Wallet top-up successful",
      message: `Your wallet has been credited with ${Number(amount)}.`,
      entityType: "wallet",
      entityId: result.transaction?._id,
      metadata: {
        amount: Number(amount),
        balance: result.wallet?.balance,
      },
    }).catch((notificationError) => {
      console.error("Wallet notification error:", notificationError);
    });

    res.status(201).json({
      success: true,
      message: "Money added successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getWallet,
  getWalletSummary,
  getWalletTransactions,
  topUpWallet,
};
