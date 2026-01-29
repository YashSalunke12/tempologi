import React, { useState } from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  Map,
  Leaf,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AnalyticsReporting() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <BarChart3 className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Analytics & Reporting
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2/3 */}
              <div className="lg:col-span-2 space-y-6">
                {/* Vehicle Utilization */}
                <Section title="Vehicle Utilization Rate" icon={<TrendingUp className="w-5 h-5" />}>
                  <PlaceholderChart label="Trips vs Idle Time" />
                </Section>

                {/* Repeat Rate */}
                <Section title="Repeat Client Rate" icon={<PieChart className="w-5 h-5" />}>
                  <PlaceholderChart label="New vs Repeat Clients" />
                </Section>

                {/* Empty Miles */}
                <Section title="Empty Miles Saved" icon={<Map className="w-5 h-5" />}>
                  <PlaceholderChart label="Return Trip Optimization Impact" />
                </Section>

                {/* Revenue Reports */}
                <Section title="Revenue Reports" icon={<BarChart3 className="w-5 h-5" />}>
                  <PlaceholderChart label="Revenue per Vehicle / Route / User" />
                </Section>

                {/* Commission */}
                <Section title="Commission Earnings vs Payouts" icon={<TrendingUp className="w-5 h-5" />}>
                  <PlaceholderChart label="Admin Commission vs Driver Payouts" />
                </Section>
              </div>

              {/* Right 1/3 */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2">Top Routes</h3>
                  <ul className="text-sm space-y-2">
                    {["Delhi → Mumbai", "Pune → Bangalore", "Chennai → Hyderabad"].map((route, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5" /> {route}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Peak Booking Hours</h3>
                  <PlaceholderChart label="Bookings by Hour" />
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Environmental Impact</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Diesel Saved: 1200 L</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span className="text-sm">CO₂ Reduced: 3.5 tons</span>
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

/* ---------------- Helper Components ---------------- */
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
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function PlaceholderChart({ label }) {
  return (
    <div className="h-40 flex items-center justify-center border border-dashed rounded-xl text-gray-500 text-sm">
      {label} (Chart Placeholder)
    </div>
  );
}
