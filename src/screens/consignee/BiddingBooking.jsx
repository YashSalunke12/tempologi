import React, { useState } from "react";
import {
  Truck,
  Package,
  User,
  Star,
  Clock,
  FileText,
  Upload,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";
import { useNavigate } from "react-router-dom";

export default function BiddingBooking() {
  const [mode, setMode] = useState("Instant Booking");
  const [selectedBid, setSelectedBid] = useState(null);
  const [docs, setDocs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
              <Package className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Bidding & Booking</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="lg:col-span-2 space-y-6">
                {/* Booking Mode */}
                <Section title="Choose Booking Mode">
                  <PillGroup
                    options={["Instant Booking", "Bid-based Booking"]}
                    value={mode}
                    onChange={setMode}
                  />
                </Section>

                {mode === "Instant Booking" && (
                  <Section title="Instant Booking Details" icon={<Truck className="w-5 h-5" />}>
                    <p className="text-sm text-gray-600">
                      Confirm your booking immediately at the shown rate and proceed with payment.
                    </p>
                    <div className="mt-4">
                      <Label>Shown Rate</Label>
                      <Input value="₹15,000" readOnly />
                    </div>
                  </Section>
                )}

                {mode === "Bid-based Booking" && (
                  <Section title="Available Bids" icon={<Truck className="w-5 h-5" />}>
                    <div className="space-y-4">
                      {[
                        { id: 1, amount: "₹14,500", driver: "Amit Sharma", rating: 4.7, eta: "2 hrs" },
                        { id: 2, amount: "₹15,200", driver: "Ravi Kumar", rating: 4.9, eta: "1.5 hrs" },
                        { id: 3, amount: "₹13,800", driver: "Suresh Singh", rating: 4.5, eta: "3 hrs" },
                      ].map((bid) => (
                        <div
                          key={bid.id}
                          className={`p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer ${selectedBid?.id === bid.id
                              ? "border-[#211C84] bg-[#ebeafb]"
                              : "hover:bg-gray-50"
                            }`}
                          onClick={() => setSelectedBid(bid)}
                        >
                          <div>
                            <p className="font-medium">{bid.amount}</p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <User className="w-4 h-4" /> {bid.driver}
                              <Star className="w-4 h-4 text-yellow-500" /> {bid.rating}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" /> ETA: {bid.eta}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* Confirm Booking */}
                <Section title="Confirm Booking" icon={<FileText className="w-5 h-5" />}>
                  <div className="space-y-4">
                    <div>
                      <Label>Upload Documents</Label>
                      <div className="border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3">
                        <Upload className="w-5 h-5 text-gray-500" />
                        <input
                          type="file"
                          multiple
                          onChange={(e) => setDocs([...e.target.files])}
                          className="text-sm"
                        />
                      </div>
                      {docs.length > 0 && (
                        <ul className="mt-2 text-xs text-gray-600 list-disc pl-4">
                          {Array.from(docs).map((file, i) => (
                            <li key={i}>{file.name}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <input type="checkbox" id="terms" className="rounded" />
                      <label htmlFor="terms">I accept the terms & conditions</label>
                    </div>
                  </div>
                </Section>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:w-auto" onClick={() => navigate("/consignee/payments")}>Confirm & Pay</Button>
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Save as Draft
                  </Button>
                  <Button variant="ghost" className="w-full sm:w-auto" onClick={() => navigate("/consignee/post-load")}>
                    Cancel
                  </Button>
                </div>
              </div>

              {/* Column 2 (Summary/Help) */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2">How it Works</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Choose instant or bid-based booking.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Upload required documents.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Confirm booking and make payment.
                    </li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">Chat with our logistics expert or browse FAQs.</p>
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

/* ---------------- Inline Helper Components (reused from PostLoad) ---------------- */
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
          <h2 className="text-base sm:text-lg font-semibold"> {title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}

function Label({ children, className = "" }) {
  return <label className={`block text-sm font-medium mb-1 ${className}`}>{children}</label>;
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84] ${className}`}
      {...props}
    />
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

function PillGroup({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-3 py-2 rounded-full text-sm border ${value === opt ? "bg-[#211C84] text-white border-[#211C84]" : "hover:bg-[#ebeafb]"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
