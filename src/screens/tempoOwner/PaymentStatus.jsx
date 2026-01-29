import React, { useState } from "react";
import {
  Wallet,
  CreditCard,
  Calendar,
  Filter,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";

export default function PaymentStatus() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // Sample payments data
  const payments = [
    {
      id: "BK12345",
      amount: "₹5,000",
      method: "Prepaid",
      status: "Completed",
      date: "2025-09-01",
    },
    {
      id: "BK12346",
      amount: "₹2,000",
      method: "COD",
      status: "Pending",
      date: "2025-09-03",
    },
    {
      id: "BK12347",
      amount: "₹3,500",
      method: "Postpaid",
      status: "Failed",
      date: "2025-08-28",
    },
  ];

  const filteredPayments = payments.filter((p) => {
    const statusMatch =
      statusFilter === "All" || p.status === statusFilter;
    const dateMatch =
      (!dateRange.from || p.date >= dateRange.from) &&
      (!dateRange.to || p.date <= dateRange.to);
    return statusMatch && dateMatch;
  });

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Wallet className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Payment Status & History
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="lg:col-span-2 space-y-6">
                <Section title="Wallet / Escrow Balance" icon={<CreditCard className="w-5 h-5" />}>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">₹15,000</p>
                    <Button variant="primary">Withdraw</Button>
                  </div>
                </Section>

                <Section title="Payment Filters" icon={<Filter className="w-5 h-5" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label>Status</Label>
                      <select
                        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84]"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option>All</option>
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Failed</option>
                      </select>
                    </div>
                    <div>
                      <Label>From</Label>
                      <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, from: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>To</Label>
                      <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) =>
                          setDateRange({ ...dateRange, to: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Section>

                <Section title="Payments History">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#f6f6ff] text-left">
                          <th className="p-3 border-b">Booking ID</th>
                          <th className="p-3 border-b">Amount</th>
                          <th className="p-3 border-b">Method</th>
                          <th className="p-3 border-b">Status</th>
                          <th className="p-3 border-b">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((p, i) => (
                          <tr key={i} className="border-b hover:bg-[#f9f9ff]">
                            <td className="p-3">{p.id}</td>
                            <td className="p-3">{p.amount}</td>
                            <td className="p-3">{p.method}</td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  p.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : p.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td className="p-3">{p.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              </div>

              {/* Column 2 (Summary/Help) */}
              <aside className="lg:col-span-1 space-y-6">
                <Card className="top-4">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Track escrow
                      and withdraw anytime.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Secure
                      transactions guaranteed.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> 24/7 payout
                      support available.
                    </li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Chat with our finance expert or browse FAQs.
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
      className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84] ${className}`}
      {...props}
    />
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
