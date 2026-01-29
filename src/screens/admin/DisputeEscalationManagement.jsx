import React, { useState } from "react";
import {
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function DisputeEscalationManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);

  // Mock disputes data
  const disputes = [
    {
      id: 1,
      bookingId: "BKG123",
      type: "Fraud Trip",
      customer: "Ravi Sharma",
      agent: "Unassigned",
      status: "Open",
      createdAt: "2025-09-01",
    },
    {
      id: 2,
      bookingId: "BKG456",
      type: "Payment Conflict",
      customer: "Amit Patel",
      agent: "Priya Singh",
      status: "In Progress",
      createdAt: "2025-09-02",
    },
    {
      id: 3,
      bookingId: "BKG789",
      type: "Delivery Issue",
      customer: "Neha Verma",
      agent: "Rahul Kumar",
      status: "Resolved",
      createdAt: "2025-09-03",
    },
  ];

  // Mock chat log
  const chatLogs = [
    { sender: "Customer", message: "Driver charged extra amount.", time: "10:05 AM" },
    { sender: "Support Agent", message: "We are investigating this issue.", time: "10:10 AM" },
    { sender: "Driver", message: "Toll charges were not included.", time: "10:15 AM" },
  ];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Dispute & Escalation Management
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Dispute List */}
              <div className="lg:col-span-2 space-y-6">
                <Section
                  title="Dispute Dashboard"
                  icon={<AlertTriangle className="w-5 h-5" />}
                >
                  {/* Responsive Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border rounded-xl overflow-hidden min-w-[600px]">
                      <thead className="bg-[#ebeafb]">
                        <tr>
                          <th className="p-2 text-left">Booking ID</th>
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">Customer</th>
                          <th className="p-2 text-left">Agent</th>
                          <th className="p-2 text-left">Status</th>
                          <th className="p-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {disputes.map((d) => (
                          <tr
                            key={d.id}
                            className="border-t hover:bg-[#f5f5ff] cursor-pointer"
                          >
                            <td className="p-2">{d.bookingId}</td>
                            <td className="p-2">{d.type}</td>
                            <td className="p-2">{d.customer}</td>
                            <td className="p-2">{d.agent}</td>
                            <td className="p-2">
                              <StatusBadge status={d.status} />
                            </td>
                            <td className="p-2">
                              <Button
                                variant="secondary"
                                className="px-3 py-1 text-xs"
                                onClick={() => setSelectedDispute(d)}
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              </div>

              {/* Dispute Details */}
              <aside className="lg:col-span-1 space-y-6">
                {selectedDispute ? (
                  <>
                    <Card>
                      <h3 className="text-lg font-semibold mb-2">Dispute Details</h3>
                      <p className="text-sm">Booking ID: {selectedDispute.bookingId}</p>
                      <p className="text-sm">Customer: {selectedDispute.customer}</p>
                      <p className="text-sm">Type: {selectedDispute.type}</p>
                      <p className="text-sm">Agent: {selectedDispute.agent}</p>
                      <p className="text-sm">Status: {selectedDispute.status}</p>

                      {/* Responsive button group */}
                      <div className="mt-3 flex flex-col sm:flex-row gap-2">
                        <Button variant="secondary" className="w-full sm:w-auto">
                          Assign Agent
                        </Button>
                        <Button className="w-full sm:w-auto">Mark Resolved</Button>
                      </div>
                    </Card>

                    <Card>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Chat Logs
                      </h3>
                      <div className="max-h-64 overflow-auto space-y-2 text-sm">
                        {chatLogs.map((log, i) => (
                          <div key={i} className="p-2 border rounded-lg">
                            <span className="font-medium">{log.sender}:</span>{" "}
                            {log.message}
                            <div className="text-xs text-gray-500">{log.time}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <p className="text-gray-600 text-sm">
                      Select a dispute from the dashboard to view details.
                    </p>
                  </Card>
                )}
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
  const styles = {
    Open: "bg-red-100 text-red-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"
        }`}
    >
      {status}
    </span>
  );
}
