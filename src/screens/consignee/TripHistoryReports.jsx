import React, { useState } from "react";
import { Truck, FileText, Calendar, MapPin, ChevronRight, Download, Star } from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";
import { useNavigate } from "react-router-dom";

export default function TripHistoryReports() {
  const [status, setStatus] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock trip data
  const trips = [
    {
      id: 1,
      vehicle: "Mini Truck",
      driver: "Ramesh Kumar",
      date: "2025-09-01",
      destination: "Mumbai",
      status: "Completed",
    },
    {
      id: 2,
      vehicle: "Tempo",
      driver: "Suresh Yadav",
      date: "2025-09-03",
      destination: "Pune",
      status: "Ongoing",
    },
  ];

  const filteredTrips = trips.filter((trip) => {
    if (status !== "All" && trip.status !== status) return false;
    if (dateRange.from && trip.date < dateRange.from) return false;
    if (dateRange.to && trip.date > dateRange.to) return false;
    return true;
  });

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
              <FileText className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Trip History & Reports
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 (Filters + Trips) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Filters */}
                <Section title="Filters">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label>Date From</Label>
                      <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, from: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Date To</Label>
                      <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, to: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <PillGroup
                        options={["All", "Ongoing", "Completed"]}
                        value={status}
                        onChange={setStatus}
                      />
                    </div>
                  </div>
                </Section>

                {/* Trip List */}
                <Section title="Trip Records">
                  <div className="space-y-4">
                    {filteredTrips.map((trip) => (
                      <Card key={trip.id} className="p-4 border bg-gray-50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-[#211C84]" />
                            <div>
                              <p className="font-medium text-sm">
                                {trip.vehicle} - {trip.driver}
                              </p>
                              <p className="text-xs text-gray-600">
                                {trip.date} • {trip.destination}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium flex items-center justify-center ${trip.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                              {trip.status}
                            </span>
                            <Button variant="secondary" className="flex items-center gap-1 text-xs">
                              <Download className="w-4 h-4" /> Invoice
                            </Button>
                            <Button
                              variant="primary"
                              className="flex items-center gap-1 text-xs"
                              onClick={() => navigate("/consignee/ratings-feedback")}
                            >
                              <Star className="w-4 h-4" /> Rate Trip
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}

                    {filteredTrips.length === 0 && (
                      <p className="text-sm text-gray-500 text-center">
                        No trips found for selected filters.
                      </p>
                    )}
                  </div>
                </Section>
              </div>

              {/* Column 2 (Reports / Help) */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2">Reports</h3>
                  <p className="text-sm text-gray-600">
                    Download trip summaries and invoices in PDF format.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button>Download All</Button>
                    <Button variant="secondary">Export CSV</Button>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Tips</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Use filters to find
                      trips by date, destination, or status.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Download invoices
                      and bilties for accounting.
                    </li>
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
          <h2 className="text-base sm:text-lg font-semibold"> {title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

function Label({ children, className = "" }) {
  return (
    <label className={`block text-sm font-medium mb-1 ${className}`}>
      {children}
    </label>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84] ${className}`}
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
          className={`px-3 py-2 rounded-full text-sm border ${value === opt
            ? "bg-[#211C84] text-white border-[#211C84]"
            : "hover:bg-[#ebeafb]"
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
