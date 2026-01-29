import React, { useState } from "react";
import {
  Truck,
  Wallet,
  Bell,
  History,
  ChevronRight,
  PlusCircle,
  Search
} from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [walletBalance] = useState(2450); // example balance
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const ongoingBookings = [
    { id: 1, pickup: "Mumbai", drop: "Pune", status: "In Transit" },
    { id: 2, pickup: "Delhi", drop: "Jaipur", status: "Loading" },
  ];

  const pastTrips = [
    { id: 101, pickup: "Chennai", drop: "Bangalore", status: "Delivered" },
    { id: 102, pickup: "Kolkata", drop: "Patna", status: "Delivered" },
  ];

  const notifications = [
    "Your load #123 is confirmed",
    "Driver assigned for booking #245",
    "Wallet credited with ₹500 cashback",
  ];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar (mobile overlay + desktop fixed) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Dashboard</h1>
            </div>

            {/* Top row cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {/* Wallet Balance */}
              <Card>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Wallet className="w-5 h-5" /> Wallet Balance
                </h3>
                <p className="text-2xl font-bold text-[#211C84] mb-2">
                  ₹{walletBalance}
                </p>
                <Button variant="secondary">Add Money</Button>
              </Card>

              {/* Past Trips Count */}
              <Card>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <History className="w-5 h-5" /> Past Trips
                </h3>
                <p className="text-3xl font-bold text-[#211C84]">
                  {pastTrips.length}
                </p>
                <p className="text-sm text-gray-500">Total trips completed</p>
              </Card>

              {/* Quick Actions */}
              <Card>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" /> Quick Actions
                </h3>
                <div className="flex flex-col gap-3">
                  <Button variant="primary" className="flex items-center gap-2" onClick={() => navigate("/consignee/post-load")}>
                    <PlusCircle className="w-4 h-4" /> Post Load
                  </Button>
                  <Button variant="secondary" className="flex items-center gap-2" onClick={() => navigate("/consignee/search-vehicle")}>
                    <Search className="w-4 h-4" /> Find Vehicle
                  </Button>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 (Main Content) */}
              <div className="lg:col-span-2 space-y-6">
                <Section title="Ongoing Bookings" icon={<Truck className="w-5 h-5" />}>
                  {ongoingBookings.length ? (
                    <ul className="divide-y">
                      {ongoingBookings.map((b) => (
                        <li
                          key={b.id}
                          className="py-3 flex justify-between items-center text-sm"
                        >
                          <span>
                            {b.pickup} → {b.drop}
                          </span>
                          <span className="text-[#211C84] font-medium">
                            {b.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No ongoing bookings.</p>
                  )}
                </Section>

                <Section title="Past Trips" icon={<History className="w-5 h-5" />}>
                  {pastTrips.length ? (
                    <ul className="divide-y">
                      {pastTrips.map((t) => (
                        <li
                          key={t.id}
                          className="py-3 flex justify-between items-center text-sm"
                        >
                          <span>
                            {t.pickup} → {t.drop}
                          </span>
                          <span className="text-green-600">{t.status}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No past trips found.</p>
                  )}
                </Section>
              </div>

              {/* Column 2 (Sidebar) */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Notifications */}
                <Card>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Bell className="w-5 h-5" /> Notifications
                  </h3>
                  <ul className="text-sm space-y-2">
                    {notifications.map((n, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5" />
                        {n}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3">
                    <Button variant="ghost">View All</Button>
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

/* ---------------- Inline Helper Components ---------------- */
function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-sm ${className}`}
    >
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
    ghost:
      "bg-transparent text-[#211C84] border border-dashed hover:bg-[#ebeafb]",
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
