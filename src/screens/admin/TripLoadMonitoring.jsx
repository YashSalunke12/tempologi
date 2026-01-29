import React, { useState } from "react";
import {
  Truck,
  Package,
  User,
  MapPin,
  Calendar,
  BarChart2,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function TripLoadMonitoring() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  // Dummy Trips Data
  const trips = [
    {
      id: 1,
      owner: "Ravi Transport",
      consignee: "ABC Electronics",
      vehicle: "Tata 407",
      status: "Ongoing",
      route: "Pune → Mumbai",
      goods: "Electronics",
      date: "2025-09-01",
    },
    {
      id: 2,
      owner: "Sharma Logistics",
      consignee: "XYZ Furniture",
      vehicle: "Mahindra Pickup",
      status: "Completed",
      route: "Delhi → Jaipur",
      goods: "Furniture",
      date: "2025-08-28",
    },
    {
      id: 3,
      owner: "Verma Transport",
      consignee: "LMN Textiles",
      vehicle: "Ashok Leyland Ecomet",
      status: "Return (Empty)",
      route: "Surat → Ahmedabad",
      goods: "N/A",
      date: "2025-09-02",
    },
    {
      id: 4,
      owner: "Global Cargo",
      consignee: "PQR Steel",
      vehicle: "Container",
      status: "Pending",
      route: "Chennai → Bangalore",
      goods: "Steel Rods",
      date: "2025-09-04",
    },
  ];

  const filteredTrips = filter === "All" ? trips : trips.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <BarChart2 className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Trip & Load Monitoring
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trip List */}
              <div className="lg:col-span-2 space-y-6">
                <Section title="All Trips & Loads" icon={<Truck className="w-5 h-5" />}>
                  {/* Filters */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <FilterButton label="All" value={filter} onClick={setFilter} />
                    <FilterButton label="Pending" value={filter} onClick={setFilter} />
                    <FilterButton label="Ongoing" value={filter} onClick={setFilter} />
                    <FilterButton label="Completed" value={filter} onClick={setFilter} />
                    <FilterButton label="Return (Empty)" value={filter} onClick={setFilter} />
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border rounded-xl overflow-hidden">
                      <thead className="bg-[#f5f4ff] text-left">
                        <tr>
                          <th className="px-3 py-2">Owner</th>
                          <th className="px-3 py-2">Consignee</th>
                          <th className="px-3 py-2">Vehicle</th>
                          <th className="px-3 py-2">Route</th>
                          <th className="px-3 py-2">Goods</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTrips.map((t) => (
                          <tr key={t.id} className="border-t hover:bg-[#f9f9ff]">
                            <td className="px-3 py-2">{t.owner}</td>
                            <td className="px-3 py-2">{t.consignee}</td>
                            <td className="px-3 py-2">{t.vehicle}</td>
                            <td className="px-3 py-2">{t.route}</td>
                            <td className="px-3 py-2">{t.goods}</td>
                            <td className="px-3 py-2">
                              <StatusBadge status={t.status} />
                            </td>
                            <td className="px-3 py-2">{t.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              </div>

              {/* Right Panel */}
              <aside className="lg:col-span-1 space-y-6">
                <Card className="sticky top-4">
                  <h3 className="text-lg font-semibold mb-2">Summary Stats</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Total Trips: {trips.length}
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Ongoing:{" "}
                      {trips.filter((t) => t.status === "Ongoing").length}
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Completed:{" "}
                      {trips.filter((t) => t.status === "Completed").length}
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Pending:{" "}
                      {trips.filter((t) => t.status === "Pending").length}
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Empty Returns:{" "}
                      {trips.filter((t) => t.status === "Return (Empty)").length}
                    </li>
                  </ul>

                  <div className="mt-4 p-3 bg-[#ebeafb] rounded-xl border text-xs">
                    Tip: Track empty return trips to optimize fleet utilization.
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Contact logistics support or view admin FAQs.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="secondary">Chat Now</Button>
                    <Button variant="ghost">View FAQs</Button>
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
    <div className="bg-white border rounded-2xl p-4 sm:p-5 mb-4">
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
    Ongoing: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    "Return (Empty)": "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${colors[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}

function FilterButton({ label, value, onClick }) {
  const active = value === label;
  return (
    <button
      onClick={() => onClick(label)}
      className={`px-3 py-1.5 rounded-xl text-sm border ${active ? "bg-[#211C84] text-white border-[#211C84]" : "hover:bg-[#ebeafb]"
        }`}
    >
      {label}
    </button>
  );
}
