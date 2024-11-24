import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ParkingSpace.css";

const ParkingSpace = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [formData, setFormData] = useState({
    parkingSpotId:"",
    isOccupied:false,
    vehicleName:"",
    vehicleNumber:"",
    startTime:"",
    endTime:"",
    vehicleType:"",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchParkingSpaces = async () => {
    try{
      const response = await axios.get("/api/parking-spaces");
      setParkingSpaces(response.data);
    } catch(err) {
      setError("Failed to load parking space");
    }
  };

  useEffect(() => {
    fetchParkingSpaces();
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccessMessage("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/parking-spaces", formData, {
        headers: { 
          "Content-Type": "application/json" 
        },
      });

      setSuccessMessage("Parking space added successfully");
      setParkingSpaces((prev) => [...prev, response.data]);
      setFormData({
        parkingSpotId:"",
        isOccupied:false,
        vehicleName:"",
        vehicleNumber:"",
        startTime:"",
        endTime:"",
        vehicleType:"",
      });
    } catch(err) {
      setError(err.response?.data?.message || "Failed to create parking space");
    };
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/parking-spaces/${id}`);
      setSuccessMessage("Parking space deleted successfully");
      setParkingSpaces((prev) => prev.filter((space) => space._id !== id));
    } catch(err) {
      setError("Failed to delete parking space");
    }
  };

  const renderPrakingSlots = (vehicleType) => {
    return parkingSpaces.filter((space) => space.vehicleType !== vehicleType).map((space) => (
      <div key={space._id} className={`slot ${space.isOccupied ? "unavailable" : "available"}`}>
        {space.isOccupied ? "Unavailable" : "Available"}
        <button
            className="delete-btn"
            onClick={() => handleDelete(space._id)}
          >
            Delete
          </button>
      </div>
    ))
  }

  return (
    <div>
      <h1>Parking Space Management</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Add parking space form */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Parking Spot ID:</label>
          <input
            type="text"
            name="parkingSpotId"
            value={formData.parkingSpotId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle Type:</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="2-wheeler">2 Wheeler</option>
            <option value="3-wheeler">3 Wheeler</option>
            <option value="4-wheeler">4 Wheeler</option>
          </select>
        </div>
        <div className="form-group">
          <label>Is Occupied:</label>
          <input
            type="checkbox"
            name="isOccupied"
            checked={formData.isOccupied}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isOccupied: e.target.checked,
              }))
            }
          />
        </div>
        <button type="submit" className="btn">
          Add Parking Space
        </button>
      </form>

      {/* Parking slots container */}
      <div className="container">
        <div className="parking-type">2 Wheeler Parking</div>
        <div className="parking-slots">{renderPrakingSlots("2-wheeler")}</div>

        <div className="parking-type">3 Wheeler Parking</div>
        <div className="parking-slots">{renderPrakingSlots("3-wheeler")}</div>

        <div className="parking-type">4 Wheeler Parking</div>
        <div className="parking-slots">{renderPrakingSlots("4-wheeler")}</div>
      </div>
    </div>
  );
};

export default ParkingSpace;