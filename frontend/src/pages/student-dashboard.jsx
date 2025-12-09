import React, { useState, useEffect } from "react";
import {
  Calendar,
  Star,
  Users,
  Music,
  Store,
  MapPin,
  Clock,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";

export default function StudentEventViewer() {
  // Sample events data (would come from organizer's created events)
  const [events, setEvents] = useState([]);

  const [reviews, setReviews] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentSlide] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
    attendeeCount: 0,
  });

  const heroImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=600&fit=crop",
  ];

  useEffect(() => {
    fetch("http://localhost:5000/students/events")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched events:", data); // debug
        setEvents(
          data.map((event) => ({
            ...event,
            acousticNight: event.acoustic_night,
            stallCount: event.stall_count,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = ["All", "Music", "Technology", "Food", "Art", "Sports"];

  const handleReviewSubmit = () => {
    if (reviewForm.rating === 0) {
      alert("Please select a rating");
      return;
    }

    const newReview = {
      id: Date.now(),
      eventId: selectedEvent.id,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString(),
      userName: "Anonymous Student",
      helpful: 0,
    };

    setReviews((prev) => ({
      ...prev,
      [selectedEvent.id]: [...(prev[selectedEvent.id] || []), newReview],
    }));

    setReviewForm({ rating: 0, comment: "", attendeeCount: 0 });
    setShowReviewModal(false);
    setSelectedEvent(null);
  };

  const getAverageRating = (eventId) => {
    const eventReviews = reviews[eventId] || [];
    if (eventReviews.length === 0) return 0;
    const sum = eventReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / eventReviews.length).toFixed(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }),
      year: date.getFullYear(),
      weekday: date.toLocaleString("en-US", { weekday: "long" }),
    };
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const StarRating = ({ rating, size = 20, onRate = null }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${onRate ? "cursor-pointer hover:scale-110" : ""} transition-all`}
            onClick={() => onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/85 to-purple-900/90" />
          </div>
        ))}

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  5 + Math.random() * 10
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <Sparkles size={60} className="mb-6 animate-pulse text-yellow-300" />
          <h1 className="text-6xl md:text-7xl font-black mb-4 text-center leading-tight">
            Discover Amazing
            <span className="block text-5xl md:text-6xl mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-transparent bg-clip-text">
              Campus Events
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 text-center max-w-3xl font-light">
            Explore, attend, and review exciting events happening on campus
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <Search
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={24}
              />
              <input
                type="text"
                placeholder="Search for events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-full text-gray-800 text-lg font-semibold shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20">
            <path
              fill="#eff6ff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                filterCategory === category
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
              }`}
            >
              <Filter size={16} className="inline mr-2" />
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Upcoming Events
          </h2>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-lg">
            <span className="text-sm text-gray-500 font-semibold">
              {filteredEvents.length} Events
            </span>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-xl">
            <Calendar size={80} className="mx-auto text-gray-300 mb-6" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No Events Found
            </h3>
            <p className="text-gray-500 text-lg">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.map((event) => {
              const dateInfo = formatDate(event.date);
              const avgRating = getAverageRating(event.id);
              const reviewCount = (reviews[event.id] || []).length;

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                >
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <span className="text-xs font-bold text-indigo-600 uppercase">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      {avgRating > 0 && (
                        <div className="bg-yellow-400 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <Star size={16} className="fill-white text-white" />
                          <span className="text-sm font-black text-white">
                            {avgRating}
                          </span>
                        </div>
                      )}
                      {reviewCount > 0 && (
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                          <span className="text-xs font-bold text-gray-700">
                            {reviewCount} reviews
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    {/* Date Badge */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-4 rounded-2xl shadow-lg">
                        <p className="text-3xl font-black leading-none">
                          {dateInfo.day}
                        </p>
                        <p className="text-xs font-bold uppercase">
                          {dateInfo.month}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 font-semibold">
                          {dateInfo.weekday}
                        </p>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={16} className="text-indigo-600" />
                          <span className="font-semibold">{event.time}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text leading-tight">
                      {event.name}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin size={18} className="text-indigo-600" />
                      <span className="font-semibold text-sm">
                        {event.venue}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-xs flex items-center gap-1">
                        <Users size={14} />
                        {event.capacity}
                      </span>
                      {event.acousticNight && (
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-bold text-xs flex items-center gap-1">
                          <Music size={14} />
                          Acoustic
                        </span>
                      )}
                      {event.stalls && (
                        <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-bold text-xs flex items-center gap-1">
                          <Store size={14} />
                          {event.stallCount} Stalls
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowReviewModal(true);
                        }}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Star size={16} />
                        Review
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-3 text-center">
                      Organized by{" "}
                      <span className="font-bold text-indigo-600">
                        {event.organizer}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 text-white px-8 py-6 rounded-t-3xl">
              <h2 className="text-3xl font-black mb-2">Write a Review</h2>
              <p className="text-white/90 font-semibold">
                {selectedEvent.name}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-wide">
                  Your Rating *
                </label>
                <div className="flex items-center gap-4">
                  <StarRating
                    rating={reviewForm.rating}
                    size={40}
                    onRate={(rating) =>
                      setReviewForm({ ...reviewForm, rating })
                    }
                  />
                  <span className="text-2xl font-black text-indigo-600">
                    {reviewForm.rating > 0 ? `${reviewForm.rating}.0` : "0.0"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-wide">
                  Your Review
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  rows={5}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none font-semibold"
                  placeholder="Share your experience about this event..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedEvent(null);
                    setReviewForm({ rating: 0, comment: "", attendeeCount: 0 });
                  }}
                  className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSubmit}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
