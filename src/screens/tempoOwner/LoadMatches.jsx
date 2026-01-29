import React, { useState } from "react";
import { MapPin, Package, Calendar, Truck, Clock, ChevronRight } from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { useNavigate } from "react-router-dom";

export default function LoadMatches() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Sample matched loads (replace with API data)
  const loadMatches = [
    {
      id: 1,
      source: "Pune, MH",
      destination: "Mumbai, MH",
      loadType: "Electronics",
      weight: "1200 kg",
      deliveryDate: "2025-09-10",
      price: "₹15,000",
      distance: "150 km",
      eta: "4 hrs",
    },
    {
      id: 2,
      source: "Nagpur, MH",
      destination: "Indore, MP",
      loadType: "Furniture",
      weight: "800 kg",
      deliveryDate: "2025-09-12",
      price: "₹12,500",
      distance: "350 km",
      eta: "9 hrs",
    },
  ];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Load Matches</h1>
            </div>

            {/* Matches list */}
            <div className="space-y-4">
              {loadMatches.map((match) => (
                <LoadMatchCard key={match.id} match={match} navigate={navigate} />
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */
function LoadMatchCard({ match, navigate }) {
  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Left: Locations */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-[#211C84]" />
            {match.source}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium mt-1">
            <MapPin className="w-4 h-4 text-red-500" />
            {match.destination}
          </div>
        </div>

        {/* Middle: Load details */}
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-500" /> {match.loadType} • {match.weight}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" /> {match.deliveryDate}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" /> {match.distance} • {match.eta}
          </div>
        </div>

        {/* Right: Price + Actions */}
        <div className="flex flex-col items-end justify-between">
          <p className="text-lg font-semibold text-[#211C84]">{match.price}</p>
          <div className="flex gap-2 mt-3">
            <Button
              variant="secondary"
              onClick={() => navigate(`/tempo-owner/load-details/${match.id}`)}
            >
              View Details
            </Button>
            <Button onClick={() => alert(`Booking Request sent for load ${match.id}`)}>
              Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
    secondary: "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
    ghost: "bg-transparent text-[#211C84] border border-dashed hover:bg-[#ebeafb]",
  };
  return (
    <button
      className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
