const express = require("express");

const router = express.Router();
const walletController = require("../controllers/walletController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/", authMiddleware, walletController.getWallet);
router.get("/summary", authMiddleware, walletController.getWalletSummary);
router.get(
  "/transactions",
  authMiddleware,
  walletController.getWalletTransactions,
);
router.post("/top-up", authMiddleware, walletController.topUpWallet);

module.exports = router;
