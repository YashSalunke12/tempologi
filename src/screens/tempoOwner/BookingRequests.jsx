import React, { useState } from "react";
import { User, Package, Calendar, Clock, Phone, Check, X } from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";

export default function BookingRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample booking requests (replace with API later)
  const bookingRequests = [
    {
      id: 1,
      consignee: "Ravi Sharma",
      contact: "+91 98765 43210",
      goods: "Electronics",
      weight: "1200 kg",
      docs: "Invoice.pdf",
      price: "₹15,000",
      deliveryDate: "2025-09-10",
      deliveryTime: "4:00 PM",
      status: "Pending",
    },
    {
      id: 2,
      consignee: "Global Traders Pvt Ltd",
      contact: "+91 99887 66554",
      goods: "Furniture",
      weight: "800 kg",
      docs: "PackingList.pdf",
      price: "₹12,500",
      deliveryDate: "2025-09-12",
      deliveryTime: "2:30 PM",
      status: "Pending",
    },
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
              <User className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Booking Requests</h1>
            </div>

            <div className="space-y-4">
              {bookingRequests.map((req) => (
                <BookingCard key={req.id} req={req} />
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Booking Request Card ---------------- */
function BookingCard({ req }) {
  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Consignee Info */}
        <div>
          <p className="text-sm font-semibold flex items-center gap-2">
            <User className="w-4 h-4" /> {req.consignee}
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-2 mt-1">
            <Phone className="w-4 h-4" /> {req.contact}
          </p>
        </div>

        {/* Goods Info */}
        <div className="text-sm space-y-1">
          <p className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-500" /> {req.goods} • {req.weight}
          </p>
          <p className="text-xs text-blue-600 cursor-pointer hover:underline">
            {req.docs}
          </p>
        </div>

        {/* Delivery & Price */}
        <div className="text-sm space-y-1">
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" /> {req.deliveryDate}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" /> {req.deliveryTime}
          </p>
          <p className="text-base font-semibold text-[#211C84] mt-1">{req.price}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end justify-between">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              req.status === "Accepted"
                ? "bg-green-100 text-green-700"
                : req.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {req.status}
          </span>

          <div className="flex gap-2 mt-3">
            <Button variant="secondary">
              <Phone className="w-4 h-4" /> Contact
            </Button>
            <Button variant="primary">
              <Check className="w-4 h-4" /> Accept
            </Button>
            <Button variant="ghost">
              <X className="w-4 h-4" /> Reject
            </Button>
          </div>
        </div>
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

function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
    secondary: "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
    ghost: "bg-transparent text-[#211C84] border border-dashed hover:bg-[#ebeafb]",
  };
  return (
    <button
      className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
