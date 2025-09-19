import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { AppError } from "./src/modules/utils/AppError.js";
import { errorHandlingMiddleware } from "./src/modules/utils/errorHandelingMiddleware.js";
import morgan from "morgan";
import authRouter from "./src/modules/auth/auth.router.js";
import userRouter from "./src/modules/user/user.router.js";
import clientsRouter from "./src/modules/clients/clients.router.js";
import inventoryRouter from "./src/modules/inventory/inventory.router.js";
import categoriesRouter from "./src/modules/categories/categories.router.js";
import brandsRouter from "./src/modules/brands/brands.router.js";
import suppliersRouter from "./src/modules/suppliers/suppliers.router.js";
import purchaseInvoicesRouter from "./src/modules/purchaseInvoices/purchaseInvoices.router.js";
import adminContactsRouter from "./src/modules/adminContacts/adminContacts.router.js";

const app = express();
const port = 3000;
await dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/clients", clientsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/suppliers", suppliersRouter);
app.use("/api/v1/purchase-invoices", purchaseInvoicesRouter);
app.use("/api/v1/admin-contacts", adminContactsRouter);

app.use((req, res, next) =>
  next(new AppError(`can't find this route ${req.originalUrl}`, 404))
);
//Error handling middleware
app.use(errorHandlingMiddleware);

// Export the app for testing
export default app;

app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`));

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);
});
