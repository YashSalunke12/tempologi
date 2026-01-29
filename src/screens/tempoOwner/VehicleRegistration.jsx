import React, { useState } from "react";
import {
  Truck,
  FileText,
  Camera,
  Building2,
  Calendar,
  Package,
} from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { useNavigate } from "react-router-dom";

export default function VehicleRegistration() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState("Tempo");
  const [manufacturer, setManufacturer] = useState("");
  const [regNo, setRegNo] = useState("");
  const [regYear, setRegYear] = useState("");
  const [capacity, setCapacity] = useState("");
  const [documents, setDocuments] = useState({
    rc: null,
    insurance: null,
    fitness: null,
    photos: [],
  });

  const navigate = useNavigate();

  const handleFileChange = (field, files) => {
    if (field === "photos") {
      setDocuments({ ...documents, photos: Array.from(files) });
    } else {
      setDocuments({ ...documents, [field]: files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Vehicle Registration
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-6">
                <Section title="Vehicle Information" icon={<Truck className="w-5 h-5" />}>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label>Vehicle Type</Label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84]"
                      >
                        <option>Tempo</option>
                        <option>Truck</option>
                        <option>Mini Truck</option>
                        <option>Container</option>
                        <option>Trailer</option>
                      </select>
                    </div>
                    <div>
                      <Label>Manufacturer / Company Name</Label>
                      <Input
                        placeholder="e.g., Tata, Ashok Leyland"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Registration Number</Label>
                      <Input
                        placeholder="e.g., MH12AB1234"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Registration Year</Label>
                      <Input
                        type="date"
                        value={regYear}
                        onChange={(e) => setRegYear(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Capacity</Label>
                      <select
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84]"
                      >
                        <option value="">Select Capacity</option>
                        <option>1 Ton</option>
                        <option>3 Ton</option>
                        <option>5 Ton</option>
                        <option>10 Ton</option>
                        <option>20 Ton</option>
                      </select>
                    </div>
                  </div>
                </Section>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <Section title="Documents Upload" icon={<FileText className="w-5 h-5" />}>
                  <FileInput
                    label="Registration Certificate (RC)"
                    onChange={(e) => handleFileChange("rc", e.target.files)}
                  />
                  <FileInput
                    label="Insurance Certificate"
                    onChange={(e) => handleFileChange("insurance", e.target.files)}
                  />
                  <FileInput
                    label="Fitness Certificate"
                    onChange={(e) => handleFileChange("fitness", e.target.files)}
                  />
                </Section>

                <Section title="Vehicle Photos" icon={<Camera className="w-5 h-5" />}>
                  <FileInput
                    label="Upload 4 Side Images"
                    multiple
                    onChange={(e) => handleFileChange("photos", e.target.files)}
                  />
                  {documents.photos.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      {documents.photos.length} photos selected
                    </p>
                  )}
                </Section>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                className="w-full sm:w-auto"
                onClick={() => navigate("/tempo-owner/vehicle-list")}
              >
                Submit Vehicle
              </Button>
              <Button variant="secondary" className="w-full sm:w-auto">
                Save as Draft
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */
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

function FileInput({ label, multiple = false, onChange }) {
  return (
    <div className="mb-3">
      <Label>{label}</Label>
      <input
        type="file"
        multiple={multiple}
        onChange={onChange}
        className="w-full rounded-xl border px-3 py-2 text-sm"
      />
    </div>
  );
}
