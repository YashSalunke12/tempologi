import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Calendar,
  Truck,
  Package,
  IndianRupee,
  Target,
  Leaf,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function ReportsAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedMetric, setSelectedMetric] = useState("shipments");

  const timeRanges = ["daily", "weekly", "monthly", "quarterly", "yearly"];
  const metrics = [
    { id: "shipments", label: "Shipment Volume", icon: Package },
    { id: "spend", label: "Cost Analysis", icon: IndianRupee },
    { id: "performance", label: "Transporter Performance", icon: Truck },
    { id: "esg", label: "ESG Metrics", icon: Leaf },
  ];

  const shipmentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [45, 52, 48, 65, 58, 72],
  };

  const budgetData = {
    budget: "₹5,00,000",
    spent: "₹3,42,500",
    remaining: "₹1,57,500",
    utilization: 68.5,
  };

  const transporterPerformance = [
    { name: "ABC Logistics", onTime: 95, damage: 1.2, rating: 4.8, shipments: 24 },
    { name: "XYZ Transport", onTime: 88, damage: 2.1, rating: 4.5, shipments: 18 },
    { name: "Swift Movers", onTime: 92, damage: 0.8, rating: 4.7, shipments: 15 },
    { name: "Reliable Cargo", onTime: 85, damage: 1.8, rating: 4.3, shipments: 12 },
  ];

  const esgMetrics = {
    co2Saved: "3.2 tons",
    tripsOptimized: 42,
    fuelSaved: "1,850 liters",
    greenVehicles: 8,
  };

  const kpis = [
    { label: "Total Shipments", value: "156", change: "+12%", trend: "up" },
    { label: "Avg. Cost/Shipment", value: "₹12,450", change: "-5%", trend: "down" },
    { label: "On-Time Delivery", value: "91%", change: "+3%", trend: "up" },
    { label: "Damage Rate", value: "1.4%", change: "-0.8%", trend: "down" },
  ];

  const handleExport = (format) => {
    console.log(`Exporting report as ${format}`);
    alert(`Report exported as ${format.toUpperCase()}`);
  };

  const Star = ({ filled }) => (
    <svg
      className={`w-3 h-3 sm:w-4 sm:h-4 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"}`}
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
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Reports & Analytics</h1>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 sm:mt-0">
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg sm:rounded-xl hover:bg-gray-50 flex items-center gap-2 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                </button>
                <div className="relative">
                  <select className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg sm:rounded-xl appearance-none pr-8 text-xs sm:text-sm">
                    <option>Last 30 days</option>
                    <option>Last quarter</option>
                    <option>Year to date</option>
                    <option>Custom range</option>
                  </select>
                  <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6">
              {kpis.map((kpi, idx) => (
                <div key={idx} className="border rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{kpi.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#211C84]">{kpi.value}</p>
                    <div className={`flex items-center gap-1 ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.trend === "up" ? 
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> : 
                        <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                      }
                      <span className="text-xs sm:text-sm">{kpi.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics Tabs */}
            <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm ${
                      selectedMetric === metric.id
                        ? "bg-[#211C84] text-white"
                        : "border hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    {metric.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
              {/* Main Chart Area */}
              <div className="lg:col-span-2">
                <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                    <h2 className="text-base sm:text-lg font-semibold">Shipment Volume Trend</h2>
                  </div>
                  <div className="h-48 sm:h-56 md:h-64 flex items-end gap-1 sm:gap-2 p-3 sm:p-4">
                    {shipmentData.values.map((value, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-[#211C84] rounded-t-lg sm:rounded-t-xl"
                          style={{ height: `${(value / 80) * 100}%` }}
                        />
                        <span className="text-xs mt-2">{shipmentData.labels[idx]}</span>
                        <span className="text-xs sm:text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Budget Overview */}
              <div className="lg:col-span-1">
                <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                    <h2 className="text-base sm:text-lg font-semibold">Budget Overview</h2>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span>Total Budget</span>
                        <span className="font-semibold">{budgetData.budget}</span>
                      </div>
                      <div className="h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${budgetData.utilization}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Spent: {budgetData.spent}</span>
                        <span>Remaining: {budgetData.remaining}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="border rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                        <p className="text-base sm:text-lg font-bold mb-1 text-[#211C84]">
                          {budgetData.utilization}%
                        </p>
                        <p className="text-xs text-gray-600">Utilization</p>
                      </div>
                      <div className="border rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                        <p className="text-base sm:text-lg font-bold mb-1 text-green-600">
                          ₹0
                        </p>
                        <p className="text-xs text-gray-600">Overspend</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transporter Performance */}
            <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold">Transporter Performance</h2>
              </div>
              
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Mobile/Tablet Grid View */}
                  <div className="sm:hidden space-y-3">
                    {transporterPerformance.map((tp, idx) => (
                      <div key={idx} className="border rounded-lg p-3 space-y-2">
                        <div className="font-medium text-sm">{tp.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">On-Time %</span>
                            <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                              tp.onTime >= 90 ? "bg-green-100 text-green-700" :
                              tp.onTime >= 80 ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {tp.onTime}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Damage Rate</span>
                            <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                              tp.damage <= 1 ? "bg-green-100 text-green-700" :
                              tp.damage <= 2 ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {tp.damage}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Rating</span>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} filled={i < Math.floor(tp.rating)} />
                              ))}
                              <span className="ml-1 text-gray-600 text-xs">{tp.rating}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">Shipments</span>
                            <div className="font-medium">{tp.shipments}</div>
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
                        <th className="p-2 sm:p-3 text-left">On-Time %</th>
                        <th className="p-2 sm:p-3 text-left">Damage Rate</th>
                        <th className="p-2 sm:p-3 text-left">Rating</th>
                        <th className="p-2 sm:p-3 text-left">Shipments</th>
                        <th className="p-2 sm:p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transporterPerformance.map((tp, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-2 sm:p-3 font-medium">{tp.name}</td>
                          <td className="p-2 sm:p-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              tp.onTime >= 90 ? "bg-green-100 text-green-700" :
                              tp.onTime >= 80 ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {tp.onTime}%
                            </span>
                          </td>
                          <td className="p-2 sm:p-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              tp.damage <= 1 ? "bg-green-100 text-green-700" :
                              tp.damage <= 2 ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {tp.damage}%
                            </span>
                          </td>
                          <td className="p-2 sm:p-3">
                            <div className="flex items-center gap-0.5 sm:gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} filled={i < Math.floor(tp.rating)} />
                              ))}
                              <span className="ml-1 text-gray-600">{tp.rating}</span>
                            </div>
                          </td>
                          <td className="p-2 sm:p-3">{tp.shipments}</td>
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

            {/* ESG Metrics */}
            <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold">ESG & Sustainability</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                <div className="border rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 mx-auto mb-1 sm:mb-2" />
                  <p className="text-base sm:text-lg md:text-xl font-bold text-green-700 mb-0.5 sm:mb-1">{esgMetrics.co2Saved}</p>
                  <p className="text-xs sm:text-sm font-medium mb-0.5">CO₂ Saved</p>
                  <p className="text-xs text-gray-500">Vs traditional routes</p>
                </div>
                <div className="border rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 mx-auto mb-1 sm:mb-2" />
                  <p className="text-base sm:text-lg md:text-xl font-bold text-green-700 mb-0.5 sm:mb-1">{esgMetrics.tripsOptimized}</p>
                  <p className="text-xs sm:text-sm font-medium mb-0.5">Trips Optimized</p>
                  <p className="text-xs text-gray-500">Load consolidation</p>
                </div>
                <div className="border rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 mx-auto mb-1 sm:mb-2" />
                  <p className="text-base sm:text-lg md:text-xl font-bold text-green-700 mb-0.5 sm:mb-1">{esgMetrics.fuelSaved}</p>
                  <p className="text-xs sm:text-sm font-medium mb-0.5">Fuel Saved</p>
                  <p className="text-xs text-gray-500">Route optimization</p>
                </div>
                <div className="border rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 mx-auto mb-1 sm:mb-2" />
                  <p className="text-base sm:text-lg md:text-xl font-bold text-green-700 mb-0.5 sm:mb-1">{esgMetrics.greenVehicles}</p>
                  <p className="text-xs sm:text-sm font-medium mb-0.5">Green Vehicles</p>
                  <p className="text-xs text-gray-500">CNG/Electric fleets</p>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 sm:pt-6 border-t">
              <div className="text-xs sm:text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleExport("pdf")}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg sm:rounded-xl hover:bg-gray-50 flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>PDF Report</span>
                </button>
                <button
                  onClick={() => handleExport("excel")}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#211C84] text-white rounded-lg sm:rounded-xl hover:bg-[#1a166b] flex items-center gap-2 text-xs sm:text-sm"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Excel Export</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}