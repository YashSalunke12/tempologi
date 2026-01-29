import React, { useState } from "react";
import {
  Star as StarIcon,
  MessageSquare,
  Filter,
  Search,
  Calendar,
  Truck,
  User,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function RatingsFeedback() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const feedbacks = [
    {
      id: 1,
      shipmentId: "SH-78901",
      transporter: "ABC Logistics",
      driver: "Rajesh Kumar",
      rating: 5,
      date: "2024-03-15",
      feedback: "Excellent service! Driver was punctual and handled goods with care. Would definitely recommend.",
      goodsDelivered: "Electronics",
      route: "Mumbai → Delhi",
      tags: ["Punctual", "Careful", "Professional"],
    },
    {
      id: 2,
      shipmentId: "SH-78902",
      transporter: "XYZ Transport",
      driver: "Suresh Patel",
      rating: 4,
      date: "2024-03-14",
      feedback: "Good service overall. Slight delay but kept us informed throughout the journey.",
      goodsDelivered: "FMCG Products",
      route: "Bangalore → Chennai",
      tags: ["Communicative", "Good Condition"],
    },
    {
      id: 3,
      shipmentId: "SH-78903",
      transporter: "Swift Movers",
      driver: "Amit Sharma",
      rating: 2,
      date: "2024-03-12",
      feedback: "Package arrived damaged. Poor handling and no proper documentation provided.",
      goodsDelivered: "Pharmaceuticals",
      route: "Delhi → Kolkata",
      tags: ["Damaged Goods", "Poor Communication"],
    },
    {
      id: 4,
      shipmentId: "SH-78904",
      transporter: "Reliable Cargo",
      driver: "Vikram Singh",
      rating: 5,
      date: "2024-03-10",
      feedback: "Outstanding service! Vehicle was clean, driver was professional, and delivery was ahead of schedule.",
      goodsDelivered: "Automotive Parts",
      route: "Pune → Hyderabad",
      tags: ["Early Delivery", "Clean Vehicle", "Professional"],
    },
    {
      id: 5,
      shipmentId: "SH-78905",
      transporter: "Fast Track Logistics",
      driver: "Sanjay Verma",
      rating: 3,
      date: "2024-03-08",
      feedback: "Average service. Some communication gaps but goods arrived safely.",
      goodsDelivered: "Textiles",
      route: "Chennai → Bangalore",
      tags: ["Average", "Safe Delivery"],
    },
  ];

  const transporterStats = [
    { name: "ABC Logistics", avgRating: 4.8, totalFeedbacks: 24, positive: 95 },
    { name: "XYZ Transport", avgRating: 4.5, totalFeedbacks: 18, positive: 88 },
    { name: "Swift Movers", avgRating: 4.2, totalFeedbacks: 15, positive: 82 },
    { name: "Reliable Cargo", avgRating: 4.7, totalFeedbacks: 12, positive: 92 },
  ];

  const overallStats = {
    avgRating: 4.4,
    totalFeedbacks: 89,
    positiveRate: 89,
    responseRate: 78,
  };

  const filteredFeedbacks = feedbacks.filter(fb => {
    if (filter === "all") return true;
    if (filter === "positive") return fb.rating >= 4;
    if (filter === "negative") return fb.rating <= 2;
    if (filter === "neutral") return fb.rating === 3;
    return true;
  }).filter(fb => ratingFilter === 0 || fb.rating === ratingFilter);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    console.log("Submitting feedback...");
    setShowFeedbackModal(false);
    alert("Feedback submitted successfully!");
  };

  const Star = ({ filled, className = "" }) => (
    <svg
      className={`w-3 h-3 sm:w-4 sm:h-4 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"} ${className}`}
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#ebeafb] flex flex-col lg:flex-row text-gray-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col w-full">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <StarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Ratings & Feedback</h1>
              </div>
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-[#211C84] text-white rounded-lg sm:rounded-xl hover:bg-[#1a166b] flex items-center gap-2 text-sm sm:text-base"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Submit New Feedback</span>
              </button>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
              <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                <StarIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-2 mx-auto text-yellow-600" />
                <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-yellow-600">{overallStats.avgRating.toFixed(1)}</p>
                <p className="text-xs sm:text-sm text-gray-600">Average Rating</p>
              </div>
              <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mb-2 mx-auto text-blue-600" />
                <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-blue-600">{overallStats.totalFeedbacks}</p>
                <p className="text-xs sm:text-sm text-gray-600">Total Feedbacks</p>
              </div>
              <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 mb-2 mx-auto text-green-600" />
                <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-green-600">{overallStats.positiveRate}%</p>
                <p className="text-xs sm:text-sm text-gray-600">Positive Rate</p>
              </div>
              <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mb-2 mx-auto text-purple-600" />
                <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-purple-600">{overallStats.responseRate}%</p>
                <p className="text-xs sm:text-sm text-gray-600">Response Rate</p>
              </div>
            </div>

            {/* Transporter Performance */}
            <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold">Transporter Ratings Summary</h2>
              </div>
              
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Mobile Grid View */}
                  <div className="sm:hidden space-y-3">
                    {transporterStats.map((ts, idx) => (
                      <div key={idx} className="border rounded-lg p-3 space-y-2">
                        <div className="font-medium text-sm">{ts.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Avg. Rating</span>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} filled={i < Math.floor(ts.avgRating)} />
                              ))}
                              <span className="ml-1 text-gray-600">{ts.avgRating}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Feedbacks</span>
                            <div className="font-medium">{ts.totalFeedbacks}</div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">Positive %</span>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-0.5">
                              <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${ts.positive}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 mt-0.5">{ts.positive}%</span>
                          </div>
                        </div>
                        <button className="w-full px-2 py-1 text-xs border rounded-lg hover:bg-gray-50 mt-2">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <table className="hidden sm:table w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 sm:p-3 text-left">Transporter</th>
                        <th className="p-2 sm:p-3 text-left">Avg. Rating</th>
                        <th className="p-2 sm:p-3 text-left">Total Feedbacks</th>
                        <th className="p-2 sm:p-3 text-left">Positive %</th>
                        <th className="p-2 sm:p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transporterStats.map((ts, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-2 sm:p-3 font-medium">{ts.name}</td>
                          <td className="p-2 sm:p-3">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} filled={i < Math.floor(ts.avgRating)} />
                              ))}
                              <span className="ml-1 text-gray-600">{ts.avgRating}</span>
                            </div>
                          </td>
                          <td className="p-2 sm:p-3">{ts.totalFeedbacks}</td>
                          <td className="p-2 sm:p-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${ts.positive}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">{ts.positive}%</span>
                          </td>
                          <td className="p-2 sm:p-3">
                            <button className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border rounded-lg hover:bg-gray-50">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  <span className="text-xs sm:text-sm text-gray-600">Filter by:</span>
                </div>
                {["all", "positive", "neutral", "negative"].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl capitalize text-xs sm:text-sm ${filter === filterType
                        ? "bg-[#211C84] text-white"
                        : "border hover:bg-gray-50"
                      }`}
                  >
                    {filterType}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="text-xs sm:text-sm text-gray-600">Rating:</span>
                {[0, 5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setRatingFilter(rating)}
                    className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl text-xs sm:text-sm ${ratingFilter === rating
                        ? "bg-yellow-100 text-yellow-700"
                        : "border hover:bg-gray-50"
                      }`}
                  >
                    {rating === 0 ? "All" : `${rating} ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Cards */}
            <div className="space-y-3 sm:space-y-4">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg">{feedback.shipmentId}</h3>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} filled={i < feedback.rating} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                          ))}
                          <span className="ml-1 text-xs sm:text-sm text-gray-600">({feedback.rating}.0)</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3 sm:w-4 sm:h-4" /> {feedback.transporter}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" /> {feedback.driver}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" /> {feedback.date}
                        </span>
                      </div>
                    </div>
                    <button className="self-start sm:self-auto p-1 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="mb-3 sm:mb-4">
                    <p className="text-sm sm:text-base text-gray-700">{feedback.feedback}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {feedback.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs ${
                          tag.includes("Poor") || tag.includes("Damaged")
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 pt-3 sm:pt-4 border-t">
                    <div className="text-xs sm:text-sm text-gray-600">
                      <p>Route: {feedback.route}</p>
                      <p>Goods: {feedback.goodsDelivered}</p>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border rounded-lg hover:bg-gray-50">
                        Edit
                      </button>
                      <button className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold">Submit Feedback</h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitFeedback} className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Shipment ID *</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 sm:p-3 border rounded-lg sm:rounded-xl text-sm"
                    placeholder="e.g., SH-78901"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Transporter *</label>
                  <select className="w-full p-2 sm:p-3 border rounded-lg sm:rounded-xl text-sm">
                    <option>Select Transporter</option>
                    <option>ABC Logistics</option>
                    <option>XYZ Transport</option>
                    <option>Swift Movers</option>
                    <option>Reliable Cargo</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Rating *</label>
                <div className="flex gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <StarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Feedback *</label>
                <textarea
                  required
                  className="w-full p-2 sm:p-3 border rounded-lg sm:rounded-xl text-sm"
                  placeholder="Share your experience..."
                  rows="3"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border rounded-lg sm:rounded-xl hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-[#211C84] text-white rounded-lg sm:rounded-xl hover:bg-[#1a166b] text-sm"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}