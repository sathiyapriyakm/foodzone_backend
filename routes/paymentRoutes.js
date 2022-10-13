import express from "express";
import {
  createPaymnetOrder,
  savePaymentInfo,
} from "../controllers/PaymentController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default payment request");
});

router.post("/create-payment-order", verifyAuth, createPaymnetOrder);
router.post("/savePaymentInfo", verifyAuth, savePaymentInfo);

export const paymentrouter = router;
