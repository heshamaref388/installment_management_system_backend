import express from "express";
import multer from "multer";

import {
  getAllInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  addInventoryEntry,
  updateInventoryEntry,
  deleteInventoryEntry,
  addSaleRecord,
  updateSaleRecord,
  deleteSaleRecord,
  getFilteredInventoryItems,
  getTotalRealizedProfit
} from "./inventory.controller.js";

const router = express.Router();
const upload = multer();

router.get("/", getAllInventoryItems);
router.get("/filtered", getFilteredInventoryItems);
router.get("/total-profit", getTotalRealizedProfit);
router.post("/", createInventoryItem);
router.put("/:id",upload.none(), updateInventoryItem);
router.delete("/:id", deleteInventoryItem);




// Inventory entries routes
router.post("/:id/entries", addInventoryEntry);
router.put("/:id/entries/:entryId", updateInventoryEntry);
router.delete("/:id/entries/:entryId", deleteInventoryEntry);

// Inventory sales routes
router.post("/:id/sales", addSaleRecord);
router.put("/:id/sales/:saleId", updateSaleRecord);
router.delete("/:id/sales/:saleId", deleteSaleRecord);

export default router;
