import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isApology: {
    type: Boolean,
    default: false,
  },
  recordedBy: {
    type: String,
  },
});

paymentSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

const clientSchema = mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    whatsappNumber: {
      type: String,
      required: [true, "WhatsApp number is required"],
    },
    deviceName: {
      type: String,
      required: [true, "Device name is required"],
    },
    devicePrice: {
      type: Number,
      required: [true, "Device price is required"],
    },
    interestPercentage: {
      type: Number,
      required: [true, "Interest percentage is required"],
    },
    priceAfterInterest: {
      type: Number,
      required: [true, "Price after interest is required"],
    },
    downPayment: {
      type: Number,
      required: [true, "Down payment is required"],
    },
    installmentPrice: {
      type: Number,
      required: [true, "Installment price is required"],
    },
    monthlyInstallment: {
      type: Number,
      required: [true, "Monthly installment is required"],
    },
    note: {
      type: String,
    },
    payments: [paymentSchema],
    archivedDate: {
      type: Date,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

clientSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export const clientModel = mongoose.model("client", clientSchema);
