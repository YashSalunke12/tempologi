import React, { useState } from "react";
import {
  Package,
  Clock,
  CreditCard,
  FileText,
  MapPin,
  Download,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function CorporateDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const kpis = [
    { label: "Total Active Shipments", value: 24, icon: Package, color: "#211C84" },
    { label: "Pending Approvals", value: 8, icon: Clock, color: "#F59E0B" },
    { label: "Monthly Spend", value: "₹2.8L", icon: CreditCard, color: "#10B981" },
    { label: "Active Contracts", value: 12, icon: FileText, color: "#8B5CF6" },
  ];

  const shipments = [
    { id: "SH-78901", from: "Mumbai", to: "Delhi", status: "In Transit", delay: "On Time" },
    { id: "SH-78902", from: "Bangalore", to: "Chennai", status: "Loading", delay: "On Time" },
    { id: "SH-78903", from: "Delhi", to: "Kolkata", status: "Delayed", delay: "2 hrs late" },
    { id: "SH-78904", from: "Pune", to: "Hyderabad", status: "Delivered", delay: "On Time" },
  ];

  const quickActions = [
    { label: "Create New Shipment", icon: Package, path: "/corporate-client/new-shipment" },
    { label: "Approve Bookings", icon: CheckCircle, path: "/corporate-client/booking-approvals" },
    { label: "Download Reports", icon: Download, path: "/corporate-client/reports-analytics" },
    { label: "Track Shipments", icon: MapPin, path: "/corporate-client/shipment-tracking" },
  ];

  const recentActivity = [
    "✅ Shipment SH-78904 delivered successfully",
    "📝 Contract with ABC Transporters renewed",
    "⚠️ Shipment SH-78903 delayed - Alert sent",
    "💰 Invoice INV-4567 paid via escrow",
  ];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <BarChart className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Corporate Dashboard</h1>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {kpis.map((kpi, idx) => (
                <Card key={idx} className="text-center">
                  <kpi.icon className="w-6 h-6 mb-2 mx-auto" style={{ color: kpi.color }} />
                  <p className="text-xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                  <p className="text-sm text-gray-600">{kpi.label}</p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <Section title="Quick Actions" icon={<Package className="w-5 h-5" />}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {quickActions.map((action, idx) => (
                      <Link
                        key={idx}
                        to={action.path}
                        className="flex flex-col items-center p-4 border rounded-xl hover:bg-[#ebeafb] cursor-pointer"
                      >
                        <action.icon className="w-6 h-6 text-[#211C84] mb-2" />
                        <span className="text-sm font-medium text-center">{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </Section>

                {/* Active Shipments */}
                <Section title="Active Shipments" icon={<MapPin className="w-5 h-5" />}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Shipment ID</th>
                          <th className="p-2 text-left">Route</th>
                          <th className="p-2 text-left">Status</th>
                          <th className="p-2 text-left">Delay Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipments.map((shipment) => (
                          <tr key={shipment.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-medium">{shipment.id}</td>
                            <td className="p-2">{shipment.from} → {shipment.to}</td>
                            <td className="p-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                shipment.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                                shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {shipment.status}
                              </span>
                            </td>
                            <td className="p-2">
                              {shipment.delay === 'On Time' ? (
                                <span className="text-green-600">✓ {shipment.delay}</span>
                              ) : (
                                <span className="text-red-600 flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> {shipment.delay}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              </div>

              <aside className="lg:col-span-1 space-y-6">
                {/* Recent Activity */}
                <Card>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ActivityIcon /> Recent Activity
                  </h3>
                  <ul className="text-sm space-y-2">
                    {recentActivity.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2 border-b py-2 last:border-b-0">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Budget Overview */}
                <Card>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Budget Overview
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Monthly Budget</span>
                        <span className="font-semibold">₹5L</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '56%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">56% used (₹2.8L)</div>
                    </div>
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

function ActivityIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}