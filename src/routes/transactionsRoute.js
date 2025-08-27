import express from "express";
import { sql } from "../config/db.js";
import {
  createTransactions,
  getSummaryByUserId,
  getTransactionsByUserId,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.post("/", createTransactions);

router.delete("/:id");

router.get("/summary/:userId", getSummaryByUserId);

export default router;
