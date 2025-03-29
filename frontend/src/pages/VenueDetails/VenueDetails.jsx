// VenueDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import '../../styles/Home.css'

function VenueDetails() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/venues/${venueId}/`
        );
        setVenue(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchVenue();
  }, [venueId]);

  if (loading) return <div className="loading">Loading venue details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!venue) return <div className="error">Venue not found</div>;

  return (
    <div className="home-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Venues
      </button>

      <div className="modal-content">
        <div className="modal-header">
          <h2>{venue.venuename}</h2>
          <p className="venue-address">
             {venue.venueaddress}
          </p>
        </div>

        <div className="modal-body">
          <div className="image-gallery">
            {venue.imageurl?.map((img, index) => (
              <img key={index} src={img} alt={`Venue ${index + 1}`} />
            ))}
          </div>

          <div className="price-section">
            <h3>Starting Price: Rs.{venue.starting_price}</h3>
          </div>

          <div className="amenities-section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {venue.features?.split(',').map((feature, index) => (
                <div key={index} className="amenity-item">
                  <FaCheckCircle className="amenity-icon" /> {feature.trim()}
                </div>
              ))}
            </div>
          </div>

          <div className="booking-section">
            <h3>Book This Venue</h3>
            <div className="date-picker">
              <div>
                <label>Start Date:</label>
                <input type="date" />
              </div>
              <div>
                <label>End Date:</label>
                <input type="date" />
              </div>
            </div>
            <div className="guest-selector">
              <label>Number of Guests:</label>
              <input
                type="number"
                min="1"
                max={venue.capacity}
                defaultValue="1"
              />
              <span>(Max Capacity: {venue.capacity})</span>
            </div>
            <button className="confirm-booking-btn">Confirm Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueDetails;