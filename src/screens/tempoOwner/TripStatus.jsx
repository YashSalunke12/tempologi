import React, { useState } from "react";
import {
  Truck,
  MapPin,
  FileText,
  ChevronRight,
  Layers,
  Package,
  Upload,
} from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { useNavigate } from "react-router-dom";

export default function TripStatus() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [stops, setStops] = useState("");
  const [space, setSpace] = useState("");
  const [status, setStatus] = useState("On Trip");
  const [docs, setDocs] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setDocs(e.target.files[0]);
  };

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
              <Truck className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Trip Status</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Column */}
              <div className="lg:col-span-2 space-y-6">
                <Section title="Trip Locations" icon={<MapPin className="w-5 h-5" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Location</Label>
                      <Input
                        placeholder="Enter start location"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Location</Label>
                      <Input
                        placeholder="Enter end location"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Route Details / Stops</Label>
                    <TextArea
                      placeholder="Enter stops or route details"
                      rows={3}
                      value={stops}
                      onChange={(e) => setStops(e.target.value)}
                    />
                  </div>
                </Section>

                <Section title="Available Space" icon={<Package className="w-5 h-5" />}>
                  <Input
                    type="number"
                    placeholder="Enter available space (e.g., 2000 kg or 50%)"
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                  />
                </Section>

                <Section title="Current Status" icon={<Layers className="w-5 h-5" />}>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84]"
                  >
                    {["On Trip", "Loading", "Unloading", "Idle"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Section>

                <Section title="Upload Trip Documents" icon={<FileText className="w-5 h-5" />}>
                  <label className="flex items-center gap-2 cursor-pointer px-4 py-3 border rounded-xl hover:bg-[#ebeafb]">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm">{docs ? docs.name : "Choose a file"}</span>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </Section>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="w-full sm:w-auto"
                    onClick={() => navigate("/tempo-owner/dashboard")}
                  >
                    Submit
                  </Button>
                  <Button variant="ghost" className="w-full sm:w-auto">
                    Cancel
                  </Button>
                </div>
              </div>

              {/* Side Info */}
              <aside className="lg:col-span-1 space-y-6">
                <Card className="top-4">
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Keep your trip
                      status updated for better visibility.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Share available
                      space to get return loads.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Uploading docs is
                      optional but helps in faster validation.
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

/* ---------------- Reusable Inline Components ---------------- */
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

function TextArea({ className = "", rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
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
