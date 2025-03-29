import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/L_Form.css";
import axios from "axios";
import { motion } from "framer-motion";
import LoadingIndicator from "./LoadingIndicator";

function L_Form({ route, redirectTo }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const name = "Login";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access}`;

      // Add comprehensive logging
      console.log("Attempting to fetch user profile");
      console.log("Username:", username);

      try {
        const response = await axios.get(
          `http://localhost:8000/api/userProfiles/${username}/`
        );

        console.log("Response data:", response.data);
        console.log("Response status:", response.status);

        // Check if response.data exists and has is_venue_owner

        if (response.data.is_venue_owner) {
          navigate("/venue");
        } else {
          navigate("/home");
        }
      } catch (fetchError) {
        console.error("Fetch error:", fetchError);
        console.error("Fetch error response:", fetchError.response);
        alert(
          fetchError.response?.data?.error || "Error fetching user profile"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-left">
        <motion.div
          className="auth-logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>EventSpace</h2>
        </motion.div>
        <motion.div
          className="auth-welcome"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>Welcome to EventSpace</h1>
          <p>Effortlessly book the perfect venue for every occasion and create unforgettable memories!</p>
        </motion.div>
      </div>

      <div className="auth-right">
        <motion.div
          className="auth-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{name} your Account</h2>
          <p className="auth-subtitle">It's quick and easy.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {loading && <LoadingIndicator />}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Logging in..." : name}
            </button>

            {error && <p className="auth-error">{error}</p>}

            <div className="google-login">
              <button type="button" className="google-button">
                <AiOutlineGoogle size={24} />
                Continue With Google
              </button>
            </div>

            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register" className="switch-link">
                Sign Up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default L_Form;
