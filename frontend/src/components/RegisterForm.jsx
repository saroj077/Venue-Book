import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/R_Form.css";
import LoadingIndicator from "./LoadingIndicator";

function R_Form({ route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fullname, setFullname] = useState("");
  const [is_venue_owner, setIs_venue_owner] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (
      !username ||
      !password ||
      !fullname ||
      !address ||
      !phoneNumber ||
      !email
    ) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    try {
      await api.post(route, { username, password, email });
      await api.post("/api/register/", {
        username,
        email,
        address,
        phoneNumber,
        is_venue_owner,
      });
      navigate("/login");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="R_Form-container">
      <h1>{name}</h1>
      <input
        className="R_Form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="R_Form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        className="R_Form-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="R_Form-input"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <input
        className="R_Form-input"
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Full Name"
      />
      <input
        className="R_Form-input"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <label>
        Venue Owner
        <input
          type="checkbox"
          checked={is_venue_owner}
          onChange={(e) => setIs_venue_owner(e.target.checked)}
        />
      </label>
      {loading && <LoadingIndicator />}
      <button className="R_Form-button" type="submit">
        {name}
      </button>
    </form>
  );
}

export default R_Form;
