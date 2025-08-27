import express from "express";
import {
  createTransactions,
  getSummaryByUserId,
  getTransactionsByUserId,
  deleteTransactions,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransactions);

router.delete("/:id", deleteTransactions);

router.get("/summary/:userId", getSummaryByUserId);

export default router;
