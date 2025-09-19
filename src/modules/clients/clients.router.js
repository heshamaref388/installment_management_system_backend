import express from "express";
import {
  getAllClients,
  getArchivedClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  addPayment,
  updatePayment,
  deletePayment
} from "./clients.controller.js";

const router = express.Router();

router.get("/", getAllClients);
router.get("/archived", getArchivedClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
router.post("/:id/payments", addPayment);
router.put("/:id/payments/:paymentId", updatePayment);
router.delete("/:id/payments/:paymentId", deletePayment);

export default router;
