import React, { useState } from "react";
import "../../styles/RegisterVenue.css";
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const RegisterVenue = () => {
  const [formData, setFormData] = useState({
    venueName: "",
    venueAddress: "",
    contactPerson: "",
    phoneNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.venueName)
      validationErrors.venueName = "Venue name is required";
    if (!formData.venueAddress)
      validationErrors.venueAddress = "Venue Address is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="register-venue-container">
      <div className="register-venue-box">
        <h2>Register Your Venue With Us</h2>
        <p>
          Make your venue the go-to spot for unforgettable events. Register now
          and connect with the perfect clients!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="venueName"
              placeholder="Venue name"
              value={formData.venueName}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>
          {errors.venueName && (
            <span className="error">{errors.venueName}</span>
          )}

          <div className="input-group">
            <input
              type="text"
              name="venueAddress"
              placeholder="Venue address"
              value={formData.venueAddress}
              onChange={handleChange}
            />
            <FaMapMarkerAlt className="icon" />
          </div>
          {errors.venueAddress && (
            <span className="error">{errors.venueAddress}</span>
          )}

          <div className="input-group">
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person Name"
              value={formData.contactPerson}
              onChange={handleChange}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-row">
            <div className="input-group">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <FaPhone className="icon" />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <FaEnvelope className="icon" />
            </div>
          </div>

          <button type="submit" className="register-btn">
            Click To Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterVenue;
