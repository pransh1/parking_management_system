import express from "express";
import {
  createParkingSpace,
  getAllParkingSpace,
  updateParkingSpace,
  deleteParkingSpace,
} from "../controllers/parkingSpaceController.js";

const router = express.Router();

router.post("/", createParkingSpace);
router.get("/", getAllParkingSpace);
router.put("/:id", updateParkingSpace);
router.delete("/:id", deleteParkingSpace);

export default router;
