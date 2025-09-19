import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from "./categories.controller.js";

const router = express.Router();

// Allow OPTIONS requests for preflight without authentication
// router.options('*', (req, res) => res.sendStatus(200));

router.use(protectedRoutes);

router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
