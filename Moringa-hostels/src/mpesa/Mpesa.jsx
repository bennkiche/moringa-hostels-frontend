import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./mpesa.css"; 

function Mpesa() {
  const location = useLocation();
  const [phone, setPhone] = useState("254");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Set amount from booking when component mounts
  useEffect(() => {
    if (location.state?.amount) {
      setAmount(location.state.amount);
    }
  }, [location.state]);

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    if (!input.startsWith("254")) {
      input = "254";
    } else if (input.length > 12) {
      input = input.slice(0, 12);
    }
    setPhone(input);
  };

  const handlePay = async (e) => {
    e.preventDefault();

    if (!phone || phone.length !== 12 || !amount) {
      alert("Please enter a valid phone number and amount.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/mpesa/pay", {
        phone_number: phone,
        amount: amount
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      console.log("Payment Response:", response.data);
      alert("Payment successful! Check your phone for confirmation.");
    } catch (error) {
      console.error("Payment Error:", error);
      alert(error.response?.data?.error || "Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Marksmatt</h2>
      <p className="subtitle">
        Pay with <span className="mpesa-text">M<span className="hyphen">-</span>pesa</span>
      </p>

      <form className="payment-form" onSubmit={handlePay}>
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          className="input-field"
          placeholder="2547XXXXXXXX"
          required
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input-field" 
          placeholder="Enter amount"
          required
          readOnly // Prevent user from changing the amount
        />

        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default Mpesa;
