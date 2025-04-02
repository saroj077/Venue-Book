import { useEffect, useState } from "react";
import api from "../api";

function VenuesList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerId = 8; // The venue owner ID

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

  if (loading) return <p>Loading venues...</p>;

  return (
    <div>
      <h2>Venues Owned by User {ownerId}</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.venueid}>
            <h3>{venue.venuename}</h3>
            <p>{venue.description}</p>
            <p><strong>Price Range:</strong> ${venue.min_price} - ${venue.max_price}</p>
            <p><strong>Max Capacity:</strong> {venue.max_capacity} people</p>
            <img src={venue.imageurl[0]} alt={venue.venuename} width="200" />
            <h4>Bookings:</h4>
            {venue.booked_dates.length > 0 ? (
              <ul>
                {venue.booked_dates.map((booking, index) => (
                  <li key={index}>
                    <strong>Booked from:</strong> {booking.start_date} to {booking.end_date} <br />
                    <strong>User:</strong> {booking.user.username} <br />
                    <strong>Email:</strong> {booking.user.email} <br />
                    <strong>Phone:</strong> {booking.user.phoneNumber || "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings yet</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VenuesList;
