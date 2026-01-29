import React, { useState } from "react";
import {
  Truck,
  MapPin,
  Phone,
  MessageSquare,
  AlertTriangle,
  Clock,
  Navigation,
} from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";

export default function ShipmentTracking() {
  const [status, setStatus] = useState("In Transit");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar (mobile overlay + desktop fixed) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
          <Card>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Shipment Tracking</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Tracking Details */}
                <Section title="Current Shipment" icon={<Navigation className="w-5 h-5" />}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Status</p>
                      <StatusBadge status={status} />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">ETA</p>
                      <p className="font-medium">2 hrs 15 mins</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Route</p>
                      <p className="font-medium">Mumbai → Pune</p>
                    </div>
                  </div>
                </Section>

                {/* Driver Details */}
                <Section title="Driver Details" icon={<MapPin className="w-5 h-5" />}>
                  <div className="space-y-3">
                    <p className="font-medium">Rahul Sharma</p>
                    <p className="text-sm text-gray-600">Vehicle: MH12 AB 4567</p>
                    <div className="flex gap-3 mt-2">
                      <Button variant="secondary" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Call Driver
                      </Button>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Message
                      </Button>
                    </div>
                  </div>
                </Section>

                {/* Panic Button */}
                <Section>
                  <Button variant="danger" className="w-full flex items-center gap-2 justify-center">
                    <AlertTriangle className="w-5 h-5" /> Panic Button
                  </Button>
                </Section>
              </div>

              {/* Right Column (Map / Summary) */}
              <aside className="lg:col-span-1 space-y-6">
                <Card className="top-4">
                  <h3 className="text-lg font-semibold mb-2">Live GPS Tracking</h3>
                  <div className="bg-gray-100 h-48 rounded-xl flex items-center justify-center text-gray-500">
                    [Map Preview Here]
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Updates</h3>
                  <ul className="text-sm space-y-2">
                    <li>09:30 AM - Pickup from Mumbai</li>
                    <li>11:45 AM - Entered Expressway</li>
                    <li>12:00 PM - Current ETA Updated</li>
                  </ul>
                </Card>
              </aside>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Inline Helper Components ---------------- */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-5">
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
    secondary: "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
    ghost: "bg-transparent text-[#211C84] border border-dashed hover:bg-[#ebeafb]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button
      className={`px-4 py-2 rounded-2xl text-sm font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const colors = {
    "Pending Pickup": "bg-yellow-100 text-yellow-700",
    "In Transit": "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || ""}`}>
      {status}
    </span>
  );
}
