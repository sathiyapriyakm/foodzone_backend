import express from "express";
import {
  saveOrder,
  getAllOrders,
  updateOrder,
  getCustomerOrder,
} from "../controllers/OrderController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default Order request");
});

router.post("/save", verifyAuth, saveOrder);
router.get("/getAll", verifyAuth, getAllOrders);
router.post("/update", verifyAuth, updateOrder);
router.post("/getCustomerOrder", verifyAuth, getCustomerOrder);

export const orderrouter = router;
