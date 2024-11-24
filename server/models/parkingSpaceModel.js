import mongoose from "mongoose";

const parkingSpaceSchema = mongoose.Schema({
  // parking spot id , is occupied, vehicle name, vehicle no, start time , end time

  parkingSpotId: {
    type: String,
    requireed: true,
    unique: true,
    trim: true,
  },

  isOccupied: {
    type: Boolean,
    required: true,
    default: true,
  },

  vehicleName: {
    type: String,
    trim: true,
    required: function () {
      return this.isOccupied;
    },
    default: null,
  },

  vehicleNumber: {
    type: String,
    trim: true,
    required: function () {
      return this.isOccupied;
    },
    match: [/^[A-Z0-9-]{6,10}$/, "Invalid vehicle number format"],
    default: null,
  },

  vehicleType: {
    type: String,
    enum: ["2-wheeler", "3-wheeler", "4-wheeler"],
    required: function () {
      return this.isOccupied;
    },
    default: null,
  },

  startTime: {
    type: Date,
    required: function () {
      return this.isOccupied;
    },
    default: null,
  },

  endTime: {
    type: Date,
    required: function () {
      return this.isOccupied;
    },
    default: null,
  },
});

export const ParkingSpace = mongoose.model("ParkingSpace", parkingSpaceSchema);
