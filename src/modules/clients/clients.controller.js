import { clientModel } from "../../../database/models/client.model.js";

export const getAllClients = async (req, res, next) => {
  try {
    const clients = await clientModel.find();
    res.status(200).json({ status: "success", data: clients });
  } catch (error) {
    next(error);
  }
};

export const getArchivedClients = async (req, res, next) => {
  try {
    const archivedClients = await clientModel.find({ archivedDate: { $exists: true } });
    res.status(200).json({ status: "success", data: archivedClients });
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (req, res, next) => {
  try {
    const client = await clientModel.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ status: "error", message: "Client not found" });
    }
    res.status(200).json({ status: "success", data: client });
  } catch (error) {
    next(error);
  }
};

export const createClient = async (req, res, next) => {
  try {
    const client = await clientModel.create(req.body);
    res.status(201).json({ status: "success", data: client });
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req, res, next) => {
  try {
    const client = await clientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) {
      return res.status(404).json({ status: "error", message: "Client not found" });
    }
    res.status(200).json({ status: "success", data: client });
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req, res, next) => {
  try {
    const client = await clientModel.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ status: "error", message: "Client not found" });
    }
    res.status(200).json({ status: "success", message: "Client deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const addPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = { ...req.body, date: new Date() };
    const client = await clientModel.findById(id);
    if (!client) {
      return res.status(404).json({ status: "error", message: "Client not found" });
    }
    client.payments.push(payment); 
    client.installmentPrice -= payment.amount / client.monthlyInstallment || 1;
    await client.save();
    res.status(200).json({ status: "success", data: client });
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (req, res, next) => {
  try {
    const { id, paymentId } = req.params;
    const updateData = req.body;
    const client = await clientModel.findById(id);
    if (!client) {
      return res.status(404).json({ status: "error", message: "Client not found" });
    }
    const payment = client.payments.id(paymentId);
    if (!payment) {
      return res.status(404).json({ status: "error", message: "Payment not found" });
    }
    const oldAmount = payment.amount;
    Object.assign(payment, updateData);
    const newAmount = payment.amount;
    client.installmentPrice += oldAmount - newAmount;
    await client.save();
    res.status(200).json({ status: "success", data: client });
  } catch (error) {
    next(error);
  }
};

export const deletePayment = async (req, res, next) => {
  try {
    const { id, paymentId } = req.params;
    const client = await clientModel.findById(id);
    if (!client) {
      return res.status(404).json({ status: "error", message: "Client not found" });
    }
    const payment = client.payments.id(paymentId);
    if (!payment) {
      return res.status(404).json({ status: "error", message: "Payment not found" });
    }
    client.installmentPrice += payment.amount;
    client.payments.pull(paymentId);
    await client.save();
    res.status(200).json({ status: "success", data: client });
  } catch (error) {
    next(error);
  }
};
