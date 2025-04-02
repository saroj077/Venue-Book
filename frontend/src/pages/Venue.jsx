import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Venue.css";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  ArrowLeft,
} from "lucide-react";

function VenuesList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVenue, setActiveVenue] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get(`http://localhost:8000/api/venue/`);
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleVenueClick = (venueId) => {
    setActiveVenue(venueId);
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your venues...</p>
      </div>
    );
  }

  const selectedVenue = venues.find((venue) => venue.venueid === activeVenue);

  return (
    <div className="venues-dashboard">
      {!showDetails ? (
        // Venue List View
        <>
          <div className="dashboard-header">
            <h1>My Venues</h1>
            <button className="add-venue-btn">+ Add New Venue</button>
          </div>

          {venues.length === 0 ? (
            <div className="no-venues">
              <h3>You don't have any venues yet</h3>
              <p>Start by adding your first venue property</p>
              <button className="add-venue-btn large">
                Create Your First Venue
              </button>
            </div>
          ) : (
            <div className="venues-grid">
              {venues.map((venue) => (
                <div
                  key={venue.venueid}
                  className="venue-card"
                  onClick={() => handleVenueClick(venue.venueid)}
                >
                  <div className="venue-card-image">
                    <img src={venue.imageurl[0]} alt={venue.venuename} />
                    <span className="booking-badge">
                      {venue.booked_dates.length} Bookings
                    </span>
                  </div>
                  <div className="venue-card-info">
                    <h3>{venue.venuename}</h3>
                    <div className="venue-card-meta">
                      <span>
                        <Users size={14} /> {venue.max_capacity}
                      </span>
                      <span>
                        <DollarSign size={14} /> ${venue.min_price}-$
                        {venue.max_price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        // Venue Details View
        selectedVenue && (
          <div className="venue-detail-page">
            <div className="detail-header">
              <button className="back-btn" onClick={handleBackClick}>
                <ArrowLeft size={18} />
                Back to Venues
              </button>
            </div>

            {/* Venue Details Container */}
            <div className="venue-details">
              {/* Row with Image (Left) and Meta Info (Right) */}
              <div className="venue-header-row">
                <div className="venue-left">
                  <img
                    className="main-image"
                    src={selectedVenue.imageurl[0]}
                    alt={selectedVenue.venuename}
                  />
                  <div className="image-thumbnails">
                    {selectedVenue.imageurl.slice(0, 4).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${selectedVenue.venuename} ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="venue-right">
                  <h2>{selectedVenue.venuename}</h2>
                  <div className="venue-meta">
                    <div className="meta-item">
                      <MapPin size={18} />
                      <span>Location details</span>
                    </div>
                    <div className="meta-item">
                      <Users size={18} />
                      <span>
                        Max capacity: {selectedVenue.max_capacity} people
                      </span>
                    </div>
                    <div className="meta-item">
                      <DollarSign size={18} />
                      <span>
                        Price range: ${selectedVenue.min_price} - $
                        {selectedVenue.max_price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row with Venue Description */}
              <div className="venue-description-row">
                <p className="venue-description">{selectedVenue.description}</p>
              </div>
              <div className="action-buttons">
                    <button className="edit-btn">Edit Venue</button>
                    <button className="delete-btn">Delete</button>
                  </div>
            </div>

            {/* Bookings Section */}
            <div className="bookings-section">
              <h3>
                <Calendar size={20} />
                Upcoming Bookings
              </h3>

              {selectedVenue.booked_dates.length > 0 ? (
                <div className="bookings-list">
                  {selectedVenue.booked_dates.map((booking, index) => (
                    <div key={index} className="booking-card">
                      <div className="booking-dates">
                        <Clock size={16} />
                        <span>
                          {booking.start_date} to {booking.end_date}
                        </span>
                      </div>
                      <div className="booking-user">
                        <h4>{booking.user.username}</h4>
                        <p>Email: {booking.user.email}</p>
                        <p>Phone: {booking.user.phoneNumber || "N/A"}</p>
                      </div>
                      <div className="booking-actions">
                        <button className="contact-btn">Contact</button>
                        <button className="view-btn">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-bookings">
                  <p>No bookings yet for this venue</p>
                  <small>
                    When you receive bookings, they will appear here
                  </small>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default VenuesList;
