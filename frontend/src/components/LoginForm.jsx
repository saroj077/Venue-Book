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
      const response = await axios.get(`/api/userProfile/${username}/`);
      console.log(response.data.is_venue_owner);
      // Check if the user is a venue owner directly in the response
      if (response.data.is_venue_owner) {
        navigate("/venue");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error);
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
