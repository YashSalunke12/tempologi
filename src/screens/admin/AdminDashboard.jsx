import React, { useState } from "react";
import {
  Users,
  Truck,
  Package,
  CreditCard,
  Gavel,
  Star,
  Bell,
  BarChart,
  Shield,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Example KPIs (replace with API calls later)
  const kpis = [
    { label: "Total Trips Today", value: 124, icon: Package },
    { label: "Active Vehicles", value: 87, icon: Truck },
    { label: "Pending KYC Approvals", value: 32, icon: Users },
    { label: "Escrow Balance", value: "₹4.8 Cr", icon: CreditCard },
    { label: "Disputes Open", value: 9, icon: Gavel },
  ];

  const modules = [
    { label: "Users & KYC", icon: Users, path: "/admin/user-kyc-management" },
    { label: "Vehicles", icon: Truck, path: "/admin/vehicle-management" },
    { label: "Trips & Loads", icon: Package, path: "/admin/trip-load-monitoring" },
    { label: "Bookings & Bidding", icon: ClipboardList, path: "/admin/booking-bidding-control" },
    { label: "Payments & Escrow", icon: CreditCard, path: "/admin/payments-escrow-management" },
    { label: "Disputes", icon: Gavel, path: "/admin/dispute-escalation-management" },
    { label: "Ratings & Reviews", icon: Star, path: "/admin/ratings-reviews-control" },
    { label: "Notifications", icon: Bell, path: "/admin/notifications-alerts" },
    { label: "Reports & Analytics", icon: BarChart, path: "/admin/analytics-reporting" },
    { label: "Admin Management", icon: Shield, path: "/admin/admin-user-management" },
  ];

  const recentActivity = [
    "✅ 5 KYCs approved today",
    "🚚 3 new vehicles registered",
    "⚠️ 2 disputes escalated",
  ];

  const quickStats = [
    "📊 Vehicle Utilization: 82%",
    "💰 Revenue (Today): ₹12.4L",
    "🌍 Carbon Saved: 310 kg CO₂",
  ];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Admin Dashboard
              </h1>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
              {kpis.map((kpi, idx) => (
                <Card key={idx} className="text-center">
                  <kpi.icon className="w-6 h-6 text-[#211C84] mb-2 mx-auto" />
                  <p className="text-xl font-bold text-[#211C84]">{kpi.value}</p>
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content column */}
              <div className="lg:col-span-2 space-y-6">
                <Section
                  title="Admin Modules"
                  icon={<Shield className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {modules.map((m, idx) => (
                      <Link
                        key={idx}
                        to={m.path}
                        className="flex flex-col items-center p-4 border rounded-xl hover:bg-[#ebeafb] cursor-pointer"
                      >
                        <m.icon className="w-6 h-6 text-[#211C84] mb-2" />
                        <span className="text-sm font-medium text-center">{m.label}</span>
                      </Link>
                    ))}
                  </div>
                </Section>

                <Section
                  title="Recent Activity"
                  icon={<ClipboardList className="w-5 h-5" />}
                >
                  {recentActivity.length ? (
                    <ul className="text-sm space-y-2">
                      {recentActivity.map((a, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 border-b py-2 last:border-b-0"
                        >
                          <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No recent activities.
                    </p>
                  )}
                </Section>
              </div>

              {/* Sidebar column */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BarChart className="w-5 h-5" /> Quick Stats
                  </h3>
                  <ul className="text-sm space-y-2">
                    {quickStats.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500" />
                        {s}
                      </li>
                    ))}
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
