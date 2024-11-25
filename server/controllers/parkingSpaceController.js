import { ParkingSpace } from "../models/parkingSpaceModel.js";
import asyncHandler from "express-async-handler";

const createParkingSpace = asyncHandler(async (req, res) => {
  const {
    parkingSpotId,
    isOccupied,
    vehicleName,
    vehicleNumber,
    startTime,
    endTime,
    vehicleType,
  } = req.body;

  if (!parkingSpotId) {
    res.status(400);
    throw new Error("parking spot id is required");
  }

  const existingSpace = await ParkingSpace.findOne({ parkingSpotId });

  if (existingSpace) {
    res.status(400);
    throw new Error("Parking space with this spot id is already isOccupied");
  }

  const parkingSpace = await ParkingSpace.create({
    parkingSpotId,
    isOccupied: isOccupied || false,
    vehicleName: vehicleName || "",
    vehicleNumber: vehicleNumber || "",
    startTime: startTime || null,
    endTime: endTime || null,
    vehicleType: vehicleType || "unkown",
  });

  res.status(200).json(parkingSpace);
});

// get all parking spaces
const getAllParkingSpace = asyncHandler(async (req, res) => {
  const parkingSpaces = await ParkingSpace.find({});
  res.status(200).json(parkingSpaces);
});

// update the parking spaces
const updateParkingSpace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const parkingSpace = await ParkingSpace.findById(id);
  if (!parkingSpace) {
    res.status(400);
    throw new Error("parking space not found");
  }

  const updatedParkingSpace = await ParkingSpace.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
  );

  res.status(200).json(updatedParkingSpace);
});

//delete a parking space
const deleteParkingSpace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const parkingSpace = await ParkingSpace.findById(id);
  if (!parkingSpace) {
    res.status(400);
    throw new Error("Parking space not found");
  }

  await parkingSpace.remove();
  res.status(200).json({ message: "Parking space deleted successfully" });
});

export {
  createParkingSpace,
  getAllParkingSpace,
  updateParkingSpace,
  deleteParkingSpace,
};
