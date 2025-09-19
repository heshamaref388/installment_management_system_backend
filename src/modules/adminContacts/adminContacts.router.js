import express from "express";
import {
  getAllAdminContacts,
  getAdminContact,
  createAdminContact,
  updateAdminContact,
  deleteAdminContact
} from "./adminContacts.controller.js";

const router = express.Router();

router.get("/", getAllAdminContacts);
router.get("/:id", getAdminContact);
router.post("/", createAdminContact);
router.put("/:id", updateAdminContact);
router.delete("/:id", deleteAdminContact);

export default router;
