const Transaction = require("../../Super-Admin-Panel/models/Transaction");
const {
  createWalletIfNotExists,
} = require("../../Super-Admin-Panel/Services/walletService");
const transactionService = require("../../Super-Admin-Panel/Services/transactionService");

const getWalletSummary = async (userId) => {
  const wallet = await createWalletIfNotExists(userId);

  const [totalSpentResult, totalTopUpsResult, totalRefundsResult, transactionCount, recentTransactions] =
    await Promise.all([
      Transaction.aggregate([
        { $match: { user: wallet.user, type: "debit", status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Transaction.aggregate([
        { $match: { user: wallet.user, type: "credit", booking: { $eq: null }, status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Transaction.aggregate([
        { $match: { user: wallet.user, type: "credit", booking: { $ne: null }, status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Transaction.countDocuments({ user: wallet.user }),
      Transaction.find({ user: wallet.user })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("booking", "startTime endTime status paymentStatus totalAmount")
        .select("type amount status description booking createdAt"),
    ]);

  return {
    wallet,
    balance: wallet.balance,
    totalSpent: totalSpentResult[0]?.total || 0,
    totalTopUps: totalTopUpsResult[0]?.total || 0,
    totalRefunds: totalRefundsResult[0]?.total || 0,
    transactionCount,
    recentTransactions,
  };
};

const getWalletTransactions = async (
  userId,
  { page = 1, limit, type, status } = {},
) => {
  const query = { user: userId };

  if (type) {
    query.type = type;
  }

  if (status) {
    query.status = status;
  }

  const hasLimit = Number.isFinite(Number(limit)) && Number(limit) > 0;
  const safeLimit = hasLimit ? Number(limit) : null;
  const safePage = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const skip = hasLimit ? (safePage - 1) * safeLimit : 0;

  const transactionsQuery = Transaction.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .populate("booking", "startTime endTime status paymentStatus totalAmount")
    .select("type amount status description booking createdAt");

  if (hasLimit) {
    transactionsQuery.limit(safeLimit);
  }

  const [transactions, total] = await Promise.all([
    transactionsQuery,
    Transaction.countDocuments(query),
  ]);

  return {
    transactions,
    total,
    page: safePage,
    limit: hasLimit ? safeLimit : total,
    totalPages: hasLimit ? Math.max(1, Math.ceil(total / safeLimit)) : 1,
  };
};

const topUpWallet = async (userId, amount) => {
  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    throw new Error("amount must be greater than 0");
  }

  return transactionService.addMoney(userId, parsedAmount);
};

module.exports = {
  getWalletSummary,
  getWalletTransactions,
  topUpWallet,
};
