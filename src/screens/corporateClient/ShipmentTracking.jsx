import React, { useState } from "react";
import {
  MapPin,
  Truck,
  Phone,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  Search,
  Navigation,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function ShipmentTracking() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [selectedShipment, setSelectedShipment] = useState(null);

  const shipments = [
    {
      id: "SH-78901",
      pickup: "Mumbai Warehouse",
      delivery: "Delhi Distribution Center",
      transporter: "ABC Logistics",
      driver: "Rajesh Kumar",
      contact: "+91 98765 43210",
      vehicle: "MH-01-AB-1234 (Truck)",
      status: "In Transit",
      progress: 65,
      eta: "2024-03-15 14:30",
      delay: null,
      lastUpdate: "2024-03-15 10:45 - Left Nagpur",
    },
    {
      id: "SH-78902",
      pickup: "Bangalore Factory",
      delivery: "Chennai Port",
      transporter: "XYZ Transport",
      driver: "Suresh Patel",
      contact: "+91 87654 32109",
      vehicle: "KA-05-CD-5678 (Container)",
      status: "Loading",
      progress: 20,
      eta: "2024-03-15 18:00",
      delay: null,
      lastUpdate: "2024-03-15 09:30 - At pickup location",
    },
    {
      id: "SH-78903",
      pickup: "Delhi",
      delivery: "Kolkata",
      transporter: "Swift Movers",
      driver: "Amit Sharma",
      contact: "+91 76543 21098",
      vehicle: "DL-03-EF-9012 (Tempo)",
      status: "Delayed",
      progress: 40,
      eta: "2024-03-15 16:00",
      delay: "2 hours (Traffic)",
      lastUpdate: "2024-03-15 11:15 - Heavy traffic near Kanpur",
    },
  ];

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingId) {
      const shipment = shipments.find(s => s.id === trackingId);
      setSelectedShipment(shipment || null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'In Transit': return 'bg-blue-100 text-blue-700';
      case 'Loading': return 'bg-yellow-100 text-yellow-700';
      case 'Delayed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#ebeafb] flex flex-col lg:flex-row text-gray-800">
      {/* Sidebar - Hidden on mobile, shown on lg+ */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Shipment Tracking</h1>
              </div>
            </div>

            {/* Tracking Search */}
            <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold">Track Shipment</h2>
              </div>
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="text"
                  placeholder="Enter Shipment ID (e.g., SH-78901)"
                  className="flex-1 p-2 sm:p-3 border rounded-lg sm:rounded-xl text-sm sm:text-base"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                />
                <button
                  type="submit"
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-[#211C84] text-white rounded-lg sm:rounded-xl hover:bg-[#1a166b] flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Track</span>
                </button>
              </form>
            </div>

            {/* Active Shipments List */}
            <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold">Active Shipments</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {shipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className={`border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md cursor-pointer transition-all ${selectedShipment?.id === shipment.id ? 'ring-1 sm:ring-2 ring-[#211C84] bg-[#ebeafb]' : ''}`}
                    onClick={() => setSelectedShipment(shipment)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-0">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h3 className="font-semibold text-sm sm:text-base md:text-lg">{shipment.id}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${shipment.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {shipment.status}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{shipment.pickup} → {shipment.delivery}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs sm:text-sm font-medium">ETA: {shipment.eta}</p>
                        <p className="text-xs text-gray-500">{shipment.transporter}</p>
                      </div>
                    </div>
                    {shipment.delay && (
                      <div className="mt-2 sm:mt-3 p-2 bg-red-50 rounded-lg flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                        <span className="text-xs sm:text-sm text-red-700">{shipment.delay}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Tracking View */}
            {selectedShipment && (
              <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                  <h2 className="text-base sm:text-lg font-semibold">Tracking Details: {selectedShipment.id}</h2>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  {/* Left Column - Main Details */}
                  <div className="flex-1 lg:w-2/3 space-y-4 sm:space-y-6">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm mb-2 gap-1">
                        <span className="truncate">Pickup: {selectedShipment.pickup}</span>
                        <span className="truncate">Delivery: {selectedShipment.delivery}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#211C84] rounded-full"
                          style={{ width: `${selectedShipment.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Started</span>
                        <span>{selectedShipment.progress}% Complete</span>
                        <span>Destination</span>
                      </div>
                    </div>

                    {/* Shipment Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="border rounded-lg sm:rounded-xl p-3">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">Vehicle</span>
                        </div>
                        <p className="text-sm sm:text-base font-medium truncate">{selectedShipment.vehicle}</p>
                      </div>
                      <div className="border rounded-lg sm:rounded-xl p-3">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">ETA</span>
                        </div>
                        <p className="text-sm sm:text-base font-medium">{selectedShipment.eta}</p>
                      </div>
                      <div className="border rounded-lg sm:rounded-xl p-3">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">Transporter</span>
                        </div>
                        <p className="text-sm sm:text-base font-medium truncate">{selectedShipment.transporter}</p>
                      </div>
                      <div className="border rounded-lg sm:rounded-xl p-3">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">Driver Contact</span>
                        </div>
                        <p className="text-sm sm:text-base font-medium">{selectedShipment.contact}</p>
                      </div>
                    </div>

                    {/* Last Update */}
                    <div className="p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl">
                      <p className="text-xs sm:text-sm font-medium text-blue-800 mb-1">Last Update</p>
                      <p className="text-xs sm:text-sm text-blue-600">{selectedShipment.lastUpdate}</p>
                    </div>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="lg:w-1/3 space-y-3 sm:space-y-4">
                    {/* Status Card */}
                    <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <h3 className="font-semibold text-sm sm:text-base mb-2">Current Status</h3>
                      <div className={`px-2 py-1 sm:px-3 sm:py-2 rounded text-xs sm:text-sm ${getStatusColor(selectedShipment.status)} inline-block`}>
                        {selectedShipment.status}
                      </div>
                      {selectedShipment.delay && (
                        <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-2 text-red-700">
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm font-medium">Delay Alert</span>
                          </div>
                          <p className="text-xs sm:text-sm text-red-600 mt-1">{selectedShipment.delay}</p>
                        </div>
                      )}
                    </div>

                    {/* Map Placeholder */}
                    <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 h-48 sm:h-56 md:h-64 flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#ebeafb] rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                          <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#211C84]" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">Live GPS Map</p>
                        <p className="text-xs text-gray-500 mt-1">(Would show real-time location)</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <button className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg sm:rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 text-xs sm:text-sm">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Contact Driver</span>
                      </button>
                      <button className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg sm:rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 text-xs sm:text-sm">
                        <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Report Issue</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}