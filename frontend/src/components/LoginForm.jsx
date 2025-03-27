import { useState } from "react";
import api from "../api";

import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/L_Form.css";
import axios from "axios";
import LoadingIndicator from "./LoadingIndicator";

function L_Form({ route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
          navigate("/");
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
    <form onSubmit={handleSubmit} className="L_Form-container">
      <h1>{name}</h1>
      <input
        className="L_Form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="L_Form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button className="L_Form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default L_Form;
