import mongoose from "mongoose";

const WalletSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  balance: {
    type:Number,
    default: 0,
    required:true,
  },
  createdAt: {
    type:Date,
    default:Date.now,
  },
  updatedAt:{
    type:Date,
    default:Date.now,
  },
});

WalletSchema.methods.addMoney = function(amount) {
  if(amount > 0 ) {
    this.balance += amount;
    this.updatedAt = Date.now();
    return this.save();

  } else {
    throw new Error("Amount must be greater than 0");
  }
}

export const Wallet = mongoose.model("Wallet", WalletSchema);