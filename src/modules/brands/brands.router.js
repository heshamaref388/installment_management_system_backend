import express from "express";
import {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand
} from "./brands.controller.js";

const router = express.Router();

router.get("/", getAllBrands);
router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;
