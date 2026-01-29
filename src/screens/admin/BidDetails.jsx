import React, { useState } from "react";
import { FileCheck, ClipboardList, ChevronRight } from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function BidDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy selected bid details (replace with API later)
  const bid = {
    id: 1,
    transporter: "ABC Logistics",
    vehicle: "Tata 407",
    bidAmount: "₹15,000",
    status: "Active",
  };

  const documents = ["Bilty.pdf", "E-wayBill.pdf", "Permit.pdf"];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Bid Details
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Section - Bid Info */}
              <div className="lg:col-span-2 space-y-6">
                <Section title="Transporter & Vehicle">
                  <ul className="text-sm space-y-2">
                    <li><b>Transporter:</b> {bid.transporter}</li>
                    <li><b>Vehicle:</b> {bid.vehicle}</li>
                    <li><b>Bid Amount:</b> {bid.bidAmount}</li>
                    <li><b>Status:</b> <StatusBadge status={bid.status} /></li>
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Button variant="primary">Assign Booking</Button>
                    <Button variant="ghost">Cancel Bid</Button>
                  </div>
                </Section>

                <Section
                  title="Trip e-Documents"
                  icon={<FileCheck className="w-5 h-5" />}
                >
                  <ul className="text-sm space-y-2">
                    {documents.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                  <div className="mt-3">
                    <Button variant="secondary">Download All</Button>
                  </div>
                </Section>
              </div>

              {/* Right Section - Summary */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Bid ID: {bid.id}
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Status:{" "}
                      <StatusBadge status={bid.status} />
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-[#ebeafb] rounded-xl border text-xs">
                    Tip: Verify all documents before assigning the booking.
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

function StatusBadge({ status }) {
  const colors = {
    Active: "bg-green-100 text-green-700",
    Assigned: "bg-blue-100 text-blue-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${colors[status] || "bg-gray-100 text-gray-700"
        }`}
    >
      {status}
    </span>
  );
}
