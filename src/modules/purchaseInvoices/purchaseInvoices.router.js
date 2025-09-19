import express from "express";
import {
  getAllPurchaseInvoices,
  getPurchaseInvoice,
  createPurchaseInvoice,
  updatePurchaseInvoice,
  deletePurchaseInvoice
} from "./purchaseInvoices.controller.js";

const router = express.Router();

router.get("/", getAllPurchaseInvoices);
router.get("/:id", getPurchaseInvoice);
router.post("/", createPurchaseInvoice);
router.put("/:id", updatePurchaseInvoice);
router.delete("/:id", deletePurchaseInvoice);

export default router;
