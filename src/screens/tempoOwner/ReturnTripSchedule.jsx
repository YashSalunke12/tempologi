import React, { useState } from "react";
import { Calendar, MapPin, ToggleLeft, ToggleRight, ChevronRight, Truck } from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { useNavigate } from "react-router-dom";

export default function ReturnTripSchedule() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

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
              <h1 className="text-xl sm:text-2xl font-semibold">
                Return Trip Schedule
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="lg:col-span-2 space-y-6">
                <Section title="Schedule Dates" icon={<Calendar className="w-5 h-5" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </Section>

                <Section title="Locations" icon={<MapPin className="w-5 h-5" />}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Starting Location</Label>
                      <AutocompleteInput placeholder="Enter starting city/location" />
                    </div>
                    <div>
                      <Label>Destination Location</Label>
                      <AutocompleteInput placeholder="Enter destination city/location" />
                    </div>
                  </div>
                </Section>

                <Section title="Trip Status">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setStatus(status === "Active" ? "Inactive" : "Active")}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm hover:bg-[#ebeafb]"
                    >
                      {status === "Active" ? (
                        <ToggleRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-gray-400" />
                      )}
                      {status}
                    </button>
                  </div>
                </Section>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:w-auto">Submit</Button>
                  <Button variant="secondary" className="w-full sm:w-auto">Save</Button>
                  <Button variant="ghost" className="w-full sm:w-auto" onClick={() => navigate("/tempo-owner/dashboard")}>
                    Cancel
                  </Button>
                </div>
              </div>

              {/* Column 2 (Summary/Help) */}
              <aside className="lg:col-span-1 space-y-6">
                <Card className="top-4">
                  <h3 className="text-lg font-semibold mb-2">Why Schedule?</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Get matched with loads on your empty return trips.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Earn extra revenue while reducing empty runs.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Flexible: update or deactivate any time.
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

function AutocompleteInput({ placeholder }) {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-xl shadow max-h-56 overflow-auto">
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              className="block w-full text-left px-3 py-2 hover:bg-[#ebeafb] text-sm"
              onClick={() => setValue(`Sample Place ${i}`)}
            >
              Sample Place {i}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
