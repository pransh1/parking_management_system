import React, { useState } from "react";
import axios from "axios";

const Wallet = () => {
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCheckBalance = async () => {
    try {
      const response = await axios.get(`/api/wallet/check-balance/${userId}`);
      setBalance(response.data.balance);
      setMessage("Balance fetched successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch balance");
      setMessage("");
    }
  };

  const handleAddMoney = async () => {
    try {
      const response = await axios.post("/api/wallet/add-money", {
        userId,
        amount: parseFloat(amount),
      });
      setBalance(response.data.balance);
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add money");
      setMessage("");
    }
  };

  const handleDeductParkingFee = async () => {
    try {
      const response = await axios.post(`/api/wallet/deduct-parking-fee/${userId}`, {
        startTime,
        endTime,
      });
      setBalance(response.data.balance);
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to deduct parking fee");
      setMessage("");
    }
  };

  return (
    <div className="wallet-container">
      <h1>Wallet Management</h1>
      
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      
      <div className="form-group">
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
      </div>

      <button onClick={handleCheckBalance} className="btn">
        Check Balance
      </button>
      {balance !== null && <p>Current Balance: ${balance}</p>}

      <div className="form-group">
        <label>Amount to Add:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
        />
      </div>

      <button onClick={handleAddMoney} className="btn">
        Add Money
      </button>

      <div className="form-group">
        <label>Parking Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Parking End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <button onClick={handleDeductParkingFee} className="btn">
        Deduct Parking Fee
      </button>
    </div>
  );
};

export default Wallet;
