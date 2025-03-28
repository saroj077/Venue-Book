import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { motion } from 'framer-motion'; // Add this import
import { FaSearch, FaMapMarkerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa'; // Add this import
import heroBackground from '../../assets/banner.jpg';
import './HomePage.css';

// Add this features array before the HomePage component
const features = [
    {
        icon: <FaCalendarAlt size={30} color="#e63946" />,
        title: "Easy Booking",
        description: "Book your perfect venue in just a few clicks"
    },
    {
        icon: <FaMapMarkerAlt size={30} color="#e63946" />,
        title: "Prime Locations",
        description: "Find venues in the most sought-after locations"
    },

    {
        icon: <FaSearch size={30} color="#e63946" />,
        title: "Smart Search",
        description: "Find exactly what you need with our filters"
    }
];

const HomePage = () => {
    const [venues, setVenues] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchVenues = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/venues/'); // Update the URL if necessary
            const data = await response.json();
            setVenues(data);
        };

        fetchVenues();
    }, []);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="homepage-container">
            {/* Navigation Bar */}
            <nav className="main-nav">
                <div className="nav-logo">
                    <img src={heroBackground} alt="Logo" className="logo-image" />
                    <span className="logo-text">EventSpace</span>
                </div>
                
                <div className="nav-links">
                    <Link to="/venues">Venues</Link>
                    <Link to="/blogs">Blogs</Link>
                    <Link to="/about">About Us</Link>
                </div>
                
                <div className="nav-buttons">
                    <Link to="/register-venue" className="register-venue-btn">
                        Register Your Venue
                    </Link>
                    <Link to="/login" className="signin-btn">
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero Section with Search */}
            <div className="hero-section">
                <div className="hero-image" style={{ backgroundImage: `url(${heroBackground})` }}></div>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <h1>Find Your Perfect Venue</h1>
                    <p>Discover perfect spaces for your perfect moments</p>
                </motion.div>

                {/* Moved Search Section inside hero-section */}
                <motion.div 
                    className="search-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="search-bar">
                        <div className="search-input-group">
                            <FaMapMarkerAlt className="search-icon" />
                            <input type="text" placeholder="Where to?" />
                        </div>
                        <div className="search-input-group">
                            <FaCalendarAlt className="search-icon" />
                            <input type="text" placeholder="Event Type" />
                        </div>
                        <div className="search-input-group">
                            <FaUsers className="search-icon" />
                            <input type="number" placeholder="Number of Guests" />
                        </div>
                        <button className="search-button">
                            <FaSearch /> Find Venues
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Enhanced Venue Cards Section */}
            <section className="venue-list">
                <h2>Popular Venues</h2>
                <div className="venue-cards-wrapper">
                    <div className="venue-cards">
                        {venues.slice(0, 4).map((venue, index) => (
                            <motion.div
                                className="venue-card"
                                key={venue.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="venue-image-container">
                                    <img src={venue.image} alt={venue.name} />
                                    <div className="venue-overlay">
                                        <button className="book-now-button">Book Now</button>
                                    </div>
                                </div>
                                <div className="venue-info">
                                    <h3>{venue.name}</h3>
                                    <p><FaMapMarkerAlt /> {venue.location}</p>
                                    <div className="venue-details">
                                        <span className="price">From ${venue.price}</span>
                                        <span className="rating">★ 4.5</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Add Features Section */}
            <section className="features-section">
                <motion.div 
                    className="features-container"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Why Choose EventSpace</h2>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <motion.div 
                                className="feature-card"
                                key={index}
                                whileHover={{ scale: 1.05 }}
                            >
                                {feature.icon}
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default HomePage;