import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Users,
  Music,
  Store,
  X,
  MapPin,
  Clock,
} from "lucide-react";

export default function EventOrganizerDashboard() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Summer Music Festival 2025",
      date: "2025-12-15",
      time: "18:00",
      venue: "Central Park Arena",
      description: "A spectacular evening of live music featuring top artists",
      acousticNight: true,
      stalls: true,
      stallCount: 25,
      capacity: 5000,
    },
    {
      id: 2,
      name: "Tech Innovation Summit",
      date: "2025-12-20",
      time: "09:00",
      venue: "Convention Center",
      description: "Discover the latest in technology and innovation",
      acousticNight: false,
      stalls: true,
      stallCount: 15,
      capacity: 1000,
    },
    {
      id: 3,
      name: "Food & Wine Festival",
      date: "2025-12-25",
      time: "12:00",
      venue: "Downtown Square",
      description: "Culinary delights from world-renowned chefs",
      acousticNight: true,
      stalls: true,
      stallCount: 40,
      capacity: 3000,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    acousticNight: false,
    stalls: false,
    stallCount: 0,
    capacity: "",
  });

  const bannerImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=500&fit=crop",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=500&fit=crop",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=500&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=500&fit=crop",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.date ||
      !formData.time ||
      !formData.venue ||
      !formData.capacity
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id ? { ...formData, id: editingEvent.id } : ev
        )
      );
    } else {
      setEvents((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      time: "",
      venue: "",
      description: "",
      acousticNight: false,
      stalls: false,
      stallCount: 0,
      capacity: "",
    });
    setEditingEvent(null);
    setShowModal(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }),
      year: date.getFullYear(),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Banner with Image Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {bannerImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/80 to-pink-900/90" />
          </div>
        ))}

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <div className="animate-bounce-slow mb-6">
            <Calendar size={80} className="text-white drop-shadow-2xl" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-center leading-tight tracking-tight">
            Event Organizer
            <span className="block text-5xl md:text-6xl mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-transparent bg-clip-text">
              Dashboard
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 text-center max-w-2xl font-light">
            Create, manage, and organize unforgettable events with style and
            ease
          </p>

          {/* Create Event Button */}
          <button
            onClick={() => setShowModal(true)}
            className="group relative px-10 py-5 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-110 flex items-center gap-3"
          >
            <Plus
              size={28}
              className="group-hover:rotate-180 transition-transform duration-500"
            />
            <span>Create New Event</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-12"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20">
            <path
              fill="#faf5ff"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-2">
              My Events
            </h2>
            <p className="text-gray-600 text-lg">
              Manage and organize your upcoming events
            </p>
          </div>
          <div className="bg-white px-8 py-4 rounded-2xl shadow-xl border-2 border-indigo-100">
            <p className="text-sm text-gray-500 font-semibold">Total Events</p>
            <p className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              {events.length}
            </p>
          </div>
        </div>

        {/* Event Cards */}
        {events.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-2xl border-2 border-dashed border-indigo-200">
            <Calendar
              size={100}
              className="mx-auto text-indigo-200 mb-6 animate-bounce-slow"
            />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No Events Yet
            </h3>
            <p className="text-gray-500 text-lg mb-8">
              Start creating your first amazing event!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Create First Event
            </button>
          </div>
        ) : (
          <div className="grid gap-8">
            {events.map((event) => {
              const dateInfo = formatDate(event.date);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 group"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Date Section */}
                    <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 md:w-64 p-8 flex flex-col items-center justify-center text-white overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Calendar size={48} className="mb-4 animate-pulse" />
                      <p className="text-7xl font-black mb-2">{dateInfo.day}</p>
                      <p className="text-xl font-bold uppercase tracking-widest mb-1">
                        {dateInfo.month}
                      </p>
                      <p className="text-sm opacity-90 mb-4">{dateInfo.year}</p>
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/30">
                        <Clock size={20} />
                        <span className="font-semibold text-lg">
                          {event.time}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 p-8">
                      <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                        {event.name}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-700 mb-4">
                        <MapPin size={22} className="text-indigo-600" />
                        <span className="text-lg font-semibold">
                          {event.venue}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        {event.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105">
                          <Users size={18} />
                          {event.capacity} People
                        </span>
                        {event.acousticNight && (
                          <span className="px-6 py-3 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105">
                            <Music size={18} />
                            Acoustic Night
                          </span>
                        )}
                        {event.stalls && (
                          <span className="px-6 py-3 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105">
                            <Store size={18} />
                            {event.stallCount} Stalls
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleEdit(event)}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                          <Edit2 size={20} />
                          Edit Event
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                          <Trash2 size={20} />
                          Delete Event
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-6 flex justify-between items-center z-10">
              <h2 className="text-3xl font-black">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h2>
              <button
                onClick={resetForm}
                className="p-3 hover:bg-white/20 rounded-full transition-all duration-300 hover:rotate-90"
              >
                <X size={28} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-semibold text-lg"
                  placeholder="Enter event name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
                  Venue *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-semibold text-lg"
                  placeholder="Enter venue location"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none font-semibold"
                  placeholder="Describe your event"
                />
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-100">
                <h3 className="font-black text-gray-800 mb-4 text-lg uppercase">
                  Event Features
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="acousticNight"
                      checked={formData.acousticNight}
                      onChange={handleInputChange}
                      className="w-6 h-6 rounded-lg border-2 border-indigo-300 text-indigo-600 focus:ring-4 focus:ring-indigo-100 cursor-pointer"
                    />
                    <span className="font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Acoustic Night
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="stalls"
                      checked={formData.stalls}
                      onChange={handleInputChange}
                      className="w-6 h-6 rounded-lg border-2 border-indigo-300 text-indigo-600 focus:ring-4 focus:ring-indigo-100 cursor-pointer"
                    />
                    <span className="font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">
                      Stalls Available
                    </span>
                  </label>
                </div>
              </div>

              {formData.stalls && (
                <div className="animate-slideDown">
                  <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
                    Number of Stalls
                  </label>
                  <input
                    type="number"
                    name="stallCount"
                    value={formData.stallCount}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-semibold text-lg"
                    placeholder="0"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
                  Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border-2 border-gray-300 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-semibold text-lg"
                  placeholder="Maximum attendees"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full px-8 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
              >
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
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
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-25px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 200px;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
