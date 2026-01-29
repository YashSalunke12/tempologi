import React, { useState } from "react";
import { Calendar, MapPin, CheckCircle, XCircle, Truck } from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { useNavigate } from "react-router-dom";

export default function VehicleAvailability() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState("Available");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Vehicle Availability
              </h1>
            </div>

            <div className="space-y-6">
              {/* Date Picker */}
              <Section title="Select Date" icon={<Calendar className="w-5 h-5" />}>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Section>

              {/* Location Input */}
              <Section title="Location" icon={<MapPin className="w-5 h-5" />}>
                <Input
                  type="text"
                  placeholder="Enter location or choose from frequent ones"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Section>

              {/* Availability Status */}
              <Section title="Availability Status">
                <RadioRow
                  name="availability"
                  options={["Available", "Unavailable"]}
                  value={status}
                  onChange={setStatus}
                  icons={{
                    Available: <CheckCircle className="w-4 h-4 text-green-600" />,
                    Unavailable: <XCircle className="w-4 h-4 text-red-600" />,
                  }}
                />
              </Section>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => navigate("/tempo-owner/dashboard")}
                >
                  Save Availability
                </Button>
                <Button variant="ghost" className="w-full sm:w-auto" onClick={() => navigate("/tempo-owner/dashboard")}>
                  Cancel
                </Button>
              </div>
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

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84] ${className}`}
      {...props}
    />
  );
}

function RadioRow({ name, options, value, onChange, icons = {} }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          className={`cursor-pointer select-none px-3 py-2 rounded-xl border text-sm flex items-center gap-2 ${
            value === opt
              ? "bg-[#211C84] text-white border-[#211C84]"
              : "hover:bg-[#ebeafb]"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="hidden"
          />
          {icons[opt] && <span>{icons[opt]}</span>}
          {opt}
        </label>
      ))}
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
