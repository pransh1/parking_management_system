import { Wallet } from "../models/walletModel";
import asyncHandler from "express-async-handler";



const CheckBalance = asyncHandler(async(req, res) => {
  const {userId} = req.params;
  
  const wallet = await Wallet.findOne({userId});

  if(!wallet) {
    return res.status(404).json({message:"Wallet not found for this user"});
  }
  return res.status(200).json({ balance: wallet.balance });

});

const addMoney = asyncHandler(async(req, res) => {
  const {userId, amount} = req.body;

  if(!amount || amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than 0" });
  }

  const wallet = await Wallet.findOne({ userId });
  if(!wallet) {
    return res.status(404).json({message:"Wallet not found for this user" });
  }
  await wallet.addMoney(amount);

  return res.status(200).json({
    message: "Money added successfully",
    balance: wallet.balance,
  });

})

const deductParkingFee = asyncHandler(async(req, res) => {
  const {userId} = req.params;
  const { startTime, endTime } = req.body;

  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    return res.status(404).json({ message: "Wallet not found for this user" });
  }

  const start = new Date(startTime);
  const end = new Date(endTime);
  const duration = (end - start) / (1000 * 60 * 60);
  const requiredFee = 10 * duration;

  if (wallet.balance < requiredFee) {
    return res.status(400).json({
      message: "Insufficient balance. Please add money to your wallet.",
    });
  }

  wallet.balance -= requiredFee;
  wallet.updatedAt = Date.now(); 
  await wallet.save(); 

  return res.status(200).json({
    message: "Parking fee deducted successfully",
    balance: wallet.balance,
  });

})

export { CheckBalance, addMoney, deductParkingFee };