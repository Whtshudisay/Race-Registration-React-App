import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom"; // Remove BrowserRouter here
import "./App.css";
import ThankYou from "./ThankYou";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    race: "",
    division: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, race: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.race ||
      !formData.division
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration Failed");
      }

      setTimeout(() => {
        setFormData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          race: "",
          division: ""
        });
        setLoading(false);
        navigate("/thankyou");
      }, 1000);

    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error connecting to server");
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Processing your registration...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <h1 id="rr">Race Registration</h1>
          
          {error && <div className="error-message">{error}</div>}

          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={10}
          />
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            minLength={4}
            maxLength={20}
          />
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            minLength={4}
            maxLength={20}
          />

          <div className="run">
            <p>Select a race:</p>
            <div>
              <input
                type="radio"
                id="5k"
                name="race"
                value="5k"
                onChange={handleRadioChange}
                required
              />
              <label htmlFor="5k">Fun Run 5k</label>
            </div>
            <div>
              <input
                type="radio"
                id="half"
                name="race"
                value="half"
                onChange={handleRadioChange}
              />
              <label htmlFor="half">Half Marathon</label>
            </div>
            <div>
              <input
                type="radio"
                id="full"
                name="race"
                value="full"
                onChange={handleRadioChange}
              />
              <label htmlFor="full">Full Marathon</label>
            </div>
          </div>

          <div id="selector">
            <label htmlFor="division">Select Age Group:</label>
            <select
              id="division"
              value={formData.division}
              onChange={handleChange}
              required
            >
              <option value="">--Select--</option>
              <option value="Kids 0-10">0-10</option>
              <option value="Teens 11-19">11-19</option>
              <option value="Adults 20-60">20-60</option>
              <option value="Seniors 61-100">61-100</option>
            </select>
          </div>

          <button id="register" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Register!'}
          </button>
        </form>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/thankyou" element={<ThankYou />} />
    </Routes>
  );
}

export default App;