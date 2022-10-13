import express from "express";
import {
  addProduct,
  editProduct,
  getProductList,
  deleteProduct,
} from "../controllers/ProductController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("default product request");
});

router.post("/add", verifyAuth, addProduct);
router.post("/edit", verifyAuth, editProduct);

router.get("/getAllProducts", verifyAuth, getProductList);
router.post("/delete", verifyAuth, deleteProduct);

export const productrouter = router;
