import React, { useState, useEffect } from "react";
import {
  Star,
  Calendar,
  Clock,
  MapPin,
  User,
  LogOut,
  Search,
  Filter,
} from "lucide-react";

const StudentDashboard = () => {
  // State
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // Sample events data - replace with your API call
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        // Fetch user profile from API
        const userRes = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }

        // Fetch events from API
        const eventsRes = await fetch("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();

          // If your API returns different data structure, map it here
          const mappedEvents = eventsData.map((event) => ({
            id: event.id,
            eventName: event.eventName || event.event_name || event.name,
            eventType: event.eventType || event.event_type || "austic-night",
            description: event.description || "No description available",
            date: event.date || event.event_date,
            day:
              event.day ||
              new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
              }),
            time: event.time || event.event_time || "TBA",
            venue: event.venue || event.location || "TBA",
            organizer: event.organizer || "Event Committee",
            capacity: event.capacity || 100,
            registered: event.registered || 0,
            image:
              event.image ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
            averageRating: event.averageRating || event.average_rating || 0,
            totalReviews: event.totalReviews || event.total_reviews || 0,
          }));

          setEvents(mappedEvents);
          setFilteredEvents(mappedEvents);
        }

        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        // Use sample data as fallback for development
        const sampleEvents = [
          {
            id: 1,
            eventName: "Austic Night 2024",
            eventType: "austic-night",
            description:
              "Experience the magical Austic Night with live music, dance performances, and cultural shows.",
            date: "2024-12-15",
            day: "Saturday",
            time: "18:00",
            venue: "Main Auditorium",
            organizer: "Cultural Committee",
            capacity: 500,
            registered: 342,
            image:
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
            averageRating: 4.5,
            totalReviews: 23,
          },
          {
            id: 2,
            eventName: "Tech Gaming Tournament",
            eventType: "game",
            description:
              "Join the ultimate gaming competition with prizes worth $5000. FIFA, Valorant, and more!",
            date: "2024-12-16",
            day: "Sunday",
            time: "10:00",
            venue: "Computer Lab Building",
            organizer: "Gaming Club",
            capacity: 100,
            registered: 87,
            image:
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
            averageRating: 4.8,
            totalReviews: 45,
          },
          {
            id: 3,
            eventName: "Music Fest 2024",
            eventType: "austic-night",
            description:
              "A night of melodies featuring local bands and solo artists from across the country.",
            date: "2024-12-20",
            day: "Thursday",
            time: "19:00",
            venue: "Open Air Theater",
            organizer: "Music Society",
            capacity: 800,
            registered: 654,
            image:
              "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
            averageRating: 4.3,
            totalReviews: 67,
          },
          {
            id: 4,
            eventName: "Chess Championship",
            eventType: "game",
            description:
              "Annual inter-college chess championship. Test your strategy and win exciting prizes!",
            date: "2024-12-18",
            day: "Tuesday",
            time: "14:00",
            venue: "Student Center",
            organizer: "Chess Club",
            capacity: 50,
            registered: 48,
            image:
              "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400",
            averageRating: 4.6,
            totalReviews: 12,
          },
          {
            id: 5,
            eventName: "Cultural Night",
            eventType: "austic-night",
            description:
              "Celebrate diversity with traditional dances, songs, and food from different cultures.",
            date: "2024-12-22",
            day: "Saturday",
            time: "17:30",
            venue: "Main Hall",
            organizer: "International Club",
            capacity: 600,
            registered: 423,
            image:
              "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
            averageRating: 4.7,
            totalReviews: 34,
          },
          {
            id: 6,
            eventName: "E-Sports League Finals",
            eventType: "game",
            description:
              "Watch the best teams compete in the grand finals of our E-Sports League!",
            date: "2024-12-25",
            day: "Tuesday",
            time: "15:00",
            venue: "Gaming Arena",
            organizer: "E-Sports Association",
            capacity: 200,
            registered: 189,
            image:
              "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400",
            averageRating: 4.9,
            totalReviews: 78,
          },
        ];
        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDay !== "all") {
      filtered = filtered.filter(
        (event) => event.day.toLowerCase() === filterDay.toLowerCase()
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((event) => event.eventType === filterType);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, filterDay, filterType, events]);

  const handleReviewSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          rating,
          review: reviewText,
        }),
      });

      if (response.ok) {
        alert("Review submitted successfully!");
        setShowReviewModal(false);
        setRating(0);
        setReviewText("");
        setSelectedEvent(null);

        // Optionally refresh events to update ratings
        // fetchEvents();
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      alert("Review submitted successfully!"); // Fallback for development
      setShowReviewModal(false);
      setRating(0);
      setReviewText("");
      setSelectedEvent(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const StarRating = ({ value, onChange, size = 24, interactive = true }) => {
    const [hover, setHover] = useState(0);

    return (
      <div style={{ display: "flex", gap: "4px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            fill={
              (interactive ? hover || value : value) >= star
                ? "#fbbf24"
                : "none"
            }
            stroke={
              (interactive ? hover || value : value) >= star
                ? "#fbbf24"
                : "#d1d5db"
            }
            style={{
              cursor: interactive ? "pointer" : "default",
              transition: "all 0.2s",
            }}
            onClick={() => interactive && onChange && onChange(star)}
            onMouseEnter={() => interactive && setHover(star)}
            onMouseLeave={() => interactive && setHover(0)}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div style={{ textAlign: "center", color: "white" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid rgba(255,255,255,0.3)",
              borderTop: "5px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .event-card {
          animation: fadeIn 0.5s ease-out;
          transition: all 0.3s ease;
        }
        .event-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .btn {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: scale(1.05);
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>

      {/* Header */}
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", marginBottom: "30px" }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {user.full_name.charAt(0)}
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "28px",
                  color: "#1f2937",
                  fontWeight: "700",
                }}
              >
                Welcome, {user.full_name}!
              </h1>

              <p
                style={{
                  margin: "4px 0 0 0",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {user.email}
              </p>
              <p
                style={{
                  margin: "4px 0 0 0",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {user.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div
        style={{ maxWidth: "1400px", margin: "0 auto", marginBottom: "30px" }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                size={20}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 44px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            {/* Day Filter */}
            <div style={{ position: "relative" }}>
              <Filter
                size={20}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <select
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 44px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">All Days</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>

            {/* Type Filter */}
            <div style={{ position: "relative" }}>
              <Filter
                size={20}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 44px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">All Events</option>
                <option value="austic-night">Austic Night</option>
                <option value="game">Games</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Available Events ({filteredEvents.length})
        </h2>

        {filteredEvents.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: "16px",
              padding: "60px",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ fontSize: "18px", color: "#6b7280", margin: 0 }}>
              No events found matching your criteria
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="event-card"
                style={{
                  background: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                {/* Event Image */}
                <div
                  style={{
                    position: "relative",
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.eventName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{ position: "absolute", top: "12px", right: "12px" }}
                  >
                    <span
                      className="badge"
                      style={{
                        background:
                          event.eventType === "austic-night"
                            ? "#8b5cf6"
                            : "#10b981",
                        color: "white",
                      }}
                    >
                      {event.eventType === "austic-night"
                        ? "Austic Night"
                        : "Game"}
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <StarRating
                      value={event.averageRating}
                      interactive={false}
                      size={16}
                    />
                    <span
                      style={{
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "600",
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                      }}
                    >
                      {event.averageRating} ({event.totalReviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#1f2937",
                    }}
                  >
                    {event.eventName}
                  </h3>
                  <p
                    style={{
                      margin: "0 0 16px 0",
                      color: "#6b7280",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    {event.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      <Calendar size={16} style={{ color: "#667eea" }} />
                      <span>
                        <strong>{event.day}</strong> -{" "}
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      <Clock size={16} style={{ color: "#667eea" }} />
                      <span>{event.time}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      <MapPin size={16} style={{ color: "#667eea" }} />
                      <span>{event.venue}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      <User size={16} style={{ color: "#667eea" }} />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                        fontSize: "12px",
                        color: "#6b7280",
                      }}
                    >
                      <span>Registered</span>
                      <span>
                        {event.registered}/{event.capacity}
                      </span>
                    </div>
                    <div
                      style={{
                        height: "6px",
                        background: "#e5e7eb",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          background:
                            event.registered / event.capacity > 0.8
                              ? "#ef4444"
                              : "#10b981",
                          width: `${
                            (event.registered / event.capacity) * 100
                          }%`,
                          transition: "width 0.3s",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <button
                      className="btn"
                      style={{
                        padding: "12px",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      Register
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowReviewModal(true);
                      }}
                      className="btn"
                      style={{
                        padding: "12px",
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <Star size={16} />
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
          onClick={() => setShowReviewModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "500px",
              width: "100%",
              animation: "fadeIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: "24px",
                fontWeight: "700",
                color: "#1f2937",
              }}
            >
              Rate Event
            </h2>
            <p
              style={{
                margin: "0 0 24px 0",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              {selectedEvent?.eventName}
            </p>

            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <p
                style={{
                  marginBottom: "12px",
                  color: "#4b5563",
                  fontWeight: "600",
                }}
              >
                Your Rating
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <StarRating value={rating} onChange={setRating} size={40} />
              </div>
              {rating > 0 && (
                <p
                  style={{
                    marginTop: "8px",
                    color: "#667eea",
                    fontWeight: "600",
                  }}
                >
                  {rating} Star{rating > 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#4b5563",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Your Review (Optional)
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  fontSize: "14px",
                  minHeight: "100px",
                  resize: "vertical",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setShowReviewModal(false)}
                className="btn"
                style={{
                  padding: "14px",
                  background: "#e5e7eb",
                  color: "#4b5563",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="btn"
                style={{
                  padding: "14px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
