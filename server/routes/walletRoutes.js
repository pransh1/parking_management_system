import { Router } from "express";
import { CheckBalance, addMoney, deductParkingFee } from "../controllers/walletController.js";

const router = Router();

router.get("/check-balance/:userId", CheckBalance);
router.post("/add-money", addMoney);
router.post("/deduct-parking-fee/:userId", deductParkingFee);

export default router;