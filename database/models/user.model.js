import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minlength: [2, "user name must be at least 2 characters long"],
      maxlength: [50, "user name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "user email is required"],
      unique: [true, "user email must be unique"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "user password is required"],
      minlength: [6, "user password must be at least 6 characters long"],
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      required: [true, "user phone is required"],
    },
    address: {
      type: [String],
      // required: [true, "user address is required"],
      trim: true,
    },
    profileImage: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 7);
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function(next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 7);
  }
  next();
});


export const userModel = mongoose.model("user", userSchema);
