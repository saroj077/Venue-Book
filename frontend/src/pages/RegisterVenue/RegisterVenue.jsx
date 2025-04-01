import React, { useState, useEffect } from "react";
import "../../styles/RegisterVenue.css";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaList,
  FaFileAlt,
  FaImage,
  FaCheckCircle,
  FaDollarSign,
  FaUserFriends,
  FaMusic,
} from "react-icons/fa";

const RegisterVenue = () => {
  const [formData, setFormData] = useState({
    venuename: "",
    venueaddress: "",
    features: "",
    description: "",
    imageurl: "",
    capacity: "",
    price: "",
    category: "wedding",
  });

  const [errors, setErrors] = useState({});
  const [formStage, setFormStage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateStage = (stage) => {
    let validationErrors = {};

    if (stage === 1) {
      if (!formData.venuename)
        validationErrors.venuename = "Venue name is required";
      if (!formData.venueaddress)
        validationErrors.venueaddress = "Venue address is required";
      if (!formData.category)
        validationErrors.category = "Venue type is required";
    } else if (stage === 2) {
      if (!formData.features)
        validationErrors.features = "Features are required";
      if (!formData.capacity)
        validationErrors.capacity = "Capacity is required";
      if (!formData.price) validationErrors.price = "Price range is required";
    } else if (stage === 3) {
      if (!formData.description)
        validationErrors.description = "Description is required";

      const imageUrls = formData.imageurl
        .split("\n")
        .filter((url) => url.trim() !== "");
      if (imageUrls.length === 0)
        validationErrors.imageurl = "At least one image URL is required";
    }

    return validationErrors;
  };

  const nextStage = () => {
    const validationErrors = validateStage(formStage);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setFormStage(formStage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStage = () => {
    setFormStage(formStage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateStage(3);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        const imageUrls = formData.imageurl
          .split("\n")
          .filter((url) => url.trim() !== "");
        const submissionData = {
          ...formData,
          imageurl: imageUrls,
        };
        console.log("Form submitted successfully", submissionData);
        setIsSubmitting(false);
        setSubmitted(true);
        // Here you would typically send the data to your backend API
      }, 1500);
    }
  };

  const venueCategories = [
    { value: "wedding", label: "Wedding Venue" },
    { value: "corporate", label: "Corporate Event" },
    { value: "concert", label: "Concert Hall" },
    { value: "conference", label: "Conference Center" },
    { value: "party", label: "Party Venue" },
  ];

  if (submitted) {
    return (
      <div className="register-venue-container">
        <div className="register-venue-box success-box">
          <div className="success-animation">
            <FaCheckCircle className="success-icon" />
          </div>
          <h2>Venue Successfully Registered!</h2>
          <p>
            Thank you for registering your venue with us. Our team will review
            your submission and get back to you within 48 hours. You'll soon be
            connecting with clients looking for amazing venues like yours!
          </p>
          <button
            onClick={() => {
              setFormData({
                venuename: "",
                venueaddress: "",
                features: "",
                description: "",
                imageurl: "",
                capacity: "",
                price: "",
                category: "wedding",
              });
              setFormStage(1);
              setSubmitted(false);
            }}
            className="register-btn"
          >
            Register Another Venue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-venue-container">
      <div className="register-venue-box">
        <div className="form-progress">
          <div
            className={`progress-step ${formStage >= 1 ? "active" : ""} ${
              formStage > 1 ? "completed" : ""
            }`}
          >
            <div className="step-number">1</div>
            <div className="step-label">Basic Info</div>
          </div>
          <div className="progress-line"></div>
          <div
            className={`progress-step ${formStage >= 2 ? "active" : ""} ${
              formStage > 2 ? "completed" : ""
            }`}
          >
            <div className="step-number">2</div>
            <div className="step-label">Features</div>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${formStage >= 3 ? "active" : ""}`}>
            <div className="step-number">3</div>
            <div className="step-label">Media</div>
          </div>
        </div>

        <h2>List Your Venue</h2>
        <p className="form-subtitle">
          {formStage === 1 &&
            "Start showcasing your venue to thousands of potential clients"}
          {formStage === 2 && "Tell us what makes your venue special"}
          {formStage === 3 && "Upload images to make your venue stand out"}
        </p>

        <form onSubmit={handleSubmit}>
          {formStage === 1 && (
            <div className="form-stage">
              {/* Venue Name Field */}
              <div className="form-field-row">
                <div className="form-field-label">Venue Name</div>
                <div className="form-field-input">
                  <div className="input-with-icon">
                    <FaBuilding className="icon" />
                    <input
                      type="text"
                      id="venuename"
                      name="venuename"
                      placeholder="E.g., Party Palace"
                      value={formData.venuename}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.venuename && (
                    <span className="error">{errors.venuename}</span>
                  )}
                </div>
              </div>

              {/* Venue Category Field */}
              <div className="form-field-row">
                <div className="form-field-label">Venue Type</div>
                <div className="form-field-input">
                  <div className="input-with-icon select-wrapper">
                    <FaMusic className="icon" />
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="wedding">Wedding Venue</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="conference">Conference Center</option>
                      <option value="concert">Concert Hall</option>
                      <option value="party">Party Venue</option>
                    </select>
                  </div>
                  {errors.category && (
                    <span className="error">{errors.category}</span>
                  )}
                </div>
              </div>

              {/* Venue Address Field */}
              <div className="form-field-row">
                <div className="form-field-label">Venue Address</div>
                <div className="form-field-input">
                  <div className="input-with-icon">
                    <FaMapMarkerAlt className="icon" />
                    <input
                      type="text"
                      id="venueaddress"
                      name="venueaddress"
                      placeholder="E.g., Kathmandu"
                      value={formData.venueaddress}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.venueaddress && (
                    <span className="error">{errors.venueaddress}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {formStage === 2 && (
            <div className="form-stage">
              {/* Capacity Field */}
              <div className="form-field-row">
                <div className="form-field-label">Capacity</div>
                <div className="form-field-input">
                  <div className="input-with-icon">
                    <FaUserFriends className="icon" />
                    <input
                      type="text"
                      id="capacity"
                      name="capacity"
                      placeholder="Maximum number of guests"
                      value={formData.capacity}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.capacity && (
                    <span className="error">{errors.capacity}</span>
                  )}
                </div>
              </div>

              {/* Price Range Field */}
              <div className="form-field-row">
                <div className="form-field-label">Price Range</div>
                <div className="form-field-input">
                  <div className="input-with-icon">
                    <FaDollarSign className="icon" />
                    <input
                      type="text"
                      id="price"
                      name="price"
                      placeholder="E.g., $1000-$5000 per day"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.price && (
                    <span className="error">{errors.price}</span>
                  )}
                </div>
              </div>

              {/* Features Field */}
              <div className="form-field-row">
                <div className="form-field-label">Features & Amenities</div>
                <div className="form-field-input">
                  <div className="input-with-icon textarea-wrapper">
                    <FaList className="icon" />
                    <textarea
                      id="features"
                      name="features"
                      placeholder="List all features (e.g., Parking, WiFi, Sound System, Catering Services)"
                      value={formData.features}
                      onChange={handleChange}
                      rows="4"
                    />
                  </div>
                  {errors.features && (
                    <span className="error">{errors.features}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {formStage === 3 && (
            <div className="form-stage">
              {/* Description Field */}
              <div className="form-field-row">
                <div className="form-field-label">Venue Description</div>
                <div className="form-field-input">
                  <div className="input-with-icon textarea-wrapper">
                    <FaFileAlt className="icon" />
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Describe your venue in detail. What makes it special and perfect for events?"
                      value={formData.description}
                      onChange={handleChange}
                      rows="5"
                    />
                  </div>
                  {errors.description && (
                    <span className="error">{errors.description}</span>
                  )}
                </div>
              </div>

              {/* Image URLs Field */}
              <div className="form-field-row">
                <div className="form-field-label">Image URLs</div>
                <div className="form-field-input">
                  <div className="input-with-icon textarea-wrapper">
                    <FaImage className="icon" />
                    <textarea
                      id="imageurl"
                      name="imageurl"
                      placeholder="Enter image URLs (one per line)"
                      value={formData.imageurl}
                      onChange={handleChange}
                      rows="4"
                    />
                  </div>
                  {errors.imageurl && (
                    <span className="error">{errors.imageurl}</span>
                  )}
                  <div className="help-text">
                    High-quality images increase the likelihood of bookings.
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="form-navigation">
            {formStage > 1 && (
              <button type="button" className="back-btn" onClick={prevStage}>
                Back
              </button>
            )}

            {formStage < 3 ? (
              <button type="button" className="next-btn" onClick={nextStage}>
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className={`register-btn ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register Venue"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVenue;
