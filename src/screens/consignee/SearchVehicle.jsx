import React, { useState } from "react";
import {
  MapPin,
  Package,
  Star,
  DollarSign,
  Truck,
  Map,
  List,
  ArrowRight,
} from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";

export default function SearchVehicle() {
  const [viewMode, setViewMode] = useState("list"); // Toggle between list and map
  const [vehicleType, setVehicleType] = useState("All");
  const [costFilter, setCostFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock vehicle data
  const vehicles = [
    { id: "VEH001", type: "Mini Truck", driverRating: 4.5, eta: "15 min", cost: "₹1200" },
    { id: "VEH002", type: "Tempo", driverRating: 4.8, eta: "20 min", cost: "₹1500" },
    { id: "VEH003", type: "Container", driverRating: 4.2, eta: "25 min", cost: "₹2000" },
  ];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar (mobile overlay + desktop fixed) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto min-h-screen">
          <Card>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Truck className="w-5 sm:w-6 h-5 sm:h-6" />
              <h1 className="text-lg sm:text-2xl font-semibold">Search & Match Vehicles</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column: Search and Filters */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <Section title="Search Criteria" icon={<MapPin className="w-4 sm:w-5 h-4 sm:h-5" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label>Pickup Location</Label>
                      <AutocompleteInput placeholder="Search pickup (Google Places)" />
                    </div>
                    <div>
                      <Label>Load Type</Label>
                      <Input placeholder="e.g., Electronics, Furniture" />
                    </div>
                  </div>
                </Section>

                <Section title="Filters">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <Label>Vehicle Type</Label>
                      <PillGroup
                        options={["All", "Mini Truck", "Tempo", "Container", "Trailer"]}
                        value={vehicleType}
                        onChange={setVehicleType}
                      />
                    </div>
                    <div>
                      <Label>Cost</Label>
                      <PillGroup
                        options={["All", "Low to High", "High to Low"]}
                        value={costFilter}
                        onChange={setCostFilter}
                      />
                    </div>
                    <div>
                      <Label>Driver Rating</Label>
                      <PillGroup
                        options={["All", "4+ Stars", "3+ Stars"]}
                        value={ratingFilter}
                        onChange={setRatingFilter}
                      />
                    </div>
                  </div>
                </Section>

                <Section title="Available Vehicles">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-base font-semibold">
                      {vehicles.length} Vehicles Found
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === "list" ? "primary" : "secondary"}
                        onClick={() => setViewMode("list")}
                        className="flex items-center gap-1"
                      >
                        <List className="w-3 sm:w-4 h-3 sm:h-4" /> List
                      </Button>
                      <Button
                        variant={viewMode === "map" ? "primary" : "secondary"}
                        onClick={() => setViewMode("map")}
                        className="flex items-center gap-1"
                      >
                        <Map className="w-3 sm:w-4 h-3 sm:h-4" /> Map
                      </Button>
                    </div>
                  </div>

                  {viewMode === "list" ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs sm:text-sm text-gray-600">
                          <tr>
                            <th className="py-2 px-2 sm:px-4 font-medium">Vehicle ID</th>
                            <th className="py-2 px-2 sm:px-4 font-medium">Type</th>
                            <th className="py-2 px-2 sm:px-4 font-medium">Driver Rating</th>
                            <th className="py-2 px-2 sm:px-4 font-medium">ETA to Pickup</th>
                            <th className="py-2 px-2 sm:px-4 font-medium">Cost</th>
                            <th className="py-2 px-2 sm:px-4 font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicles.map((vehicle) => (
                            <VehicleRow
                              key={vehicle.id}
                              id={vehicle.id}
                              type={vehicle.type}
                              driverRating={vehicle.driverRating}
                              eta={vehicle.eta}
                              cost={vehicle.cost}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="h-64 sm:h-96 bg-gray-200 rounded-xl flex items-center justify-center">
                      <p className="text-xs sm:text-sm text-gray-600">
                        Map View Placeholder (Google Maps integration required)
                      </p>
                    </div>
                  )}
                </Section>
              </div>

              {/* Right Column: Summary/Help */}
              <aside className="lg:col-span-1 space-y-4 sm:space-y-6">
                <Card>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Summary</h3>
                  <ul className="text-xs sm:text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 mt-0.5" />
                      Real-time vehicle matching based on your criteria.
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 mt-0.5" />
                      Filter by cost, ratings, and vehicle type.
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 mt-0.5" />
                      View live ETA and book instantly.
                    </li>
                  </ul>
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-[#ebeafb] rounded-xl border text-xs">
                    Tip: Use filters to narrow down the best vehicles for your load.
                  </div>
                </Card>

                <Card>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Chat with our logistics expert or browse FAQs.</p>
                  <div className="mt-2 sm:mt-3 flex gap-2">
                    <Button variant="secondary" className="w-full sm:w-auto">Chat Now</Button>
                    <Button variant="ghost" className="w-full sm:w-auto">View FAQs</Button>
                  </div>
                </Card>
              </aside>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}


// Reused helper components from PostLoad.jsx
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border p-3 sm:p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white border rounded-2xl p-3 sm:p-5">
      {title && (
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

function Label({ children, className = "" }) {
  return <label className={`block text-xs sm:text-sm font-medium mb-1 ${className}`}>{children}</label>;
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border px-2 sm:px-3 py-1.5 sm:py-2 outline-none focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84] ${className}`}
      {...props}
    />
  );
}

function PillGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm border ${value === opt ? "bg-[#211C84] text-white border-[#211C84]" : "hover:bg-[#ebeafb]"
            }`}
        >
          {opt}
        </button>
      ))}
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
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function AutocompleteInput({ placeholder }) {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-xl shadow max-h-56 overflow-auto">
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              className="block w-full text-left px-2 sm:px-3 py-1 sm:py-2 hover:bg-[#ebeafb] text-xs sm:text-sm"
              onClick={() => setValue(`Sample Place ${i}`)}
            >
              Sample Place {i}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// New component for vehicle row
function VehicleRow({ id, type, driverRating, eta, cost }) {
  return (
    <tr className="border-b last:border-0">
      <td className="py-2 px-2 text-xs sm:text-sm font-semibold">{id}</td>
      <td className="py-2 px-2 text-xs sm:text-sm flex items-center gap-1">
        <Truck className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500" /> {type}
      </td>
      <td className="py-2 px-2 text-xs sm:text-sm flex items-center gap-1">
        <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500" /> {driverRating}
      </td>
      <td className="py-2 px-2 text-xs sm:text-sm">{eta}</td>
      <td className="py-2 px-2 text-xs sm:text-sm">{cost}</td>
      <td className="py-2 px-2">
        <Button variant="primary" className="w-full">Book</Button>
      </td>
    </tr>
  );
}

