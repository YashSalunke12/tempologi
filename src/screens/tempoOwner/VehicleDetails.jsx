import React, { useState } from "react";
import {
  Truck,
  FileText,
  Camera,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { useNavigate } from "react-router-dom";

export default function VehicleDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Sample Data (you can replace this with API data)
  const [vehicle, setVehicle] = useState({
    type: "Tempo",
    manufacturer: "Tata",
    regNo: "MH12AB1234",
    regYear: "2021",
    capacity: "3 Ton",
    documents: [
      { name: "Registration Certificate (RC)", status: "Valid", expiry: "2027-05-20" },
      { name: "Insurance Certificate", status: "Expired", expiry: "2024-06-10" },
      { name: "Fitness Certificate", status: "Valid", expiry: "2026-11-15" },
    ],
    photos: [
      "https://cdn.pixabay.com/photo/2017/07/21/19/18/truck-2526825_1280.jpg",
      "https://via.placeholder.com/150?text=Back",
      "https://via.placeholder.com/150?text=Left",
      "https://via.placeholder.com/150?text=Right",
    ],
  });

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
              <h1 className="text-xl sm:text-2xl font-semibold">Vehicle Details</h1>
            </div>

            {/* Vehicle Info */}
            <Section title="Vehicle Information" icon={<Truck className="w-5 h-5" />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoField label="Vehicle Type" value={vehicle.type} editable={editMode} />
                <InfoField label="Manufacturer" value={vehicle.manufacturer} editable={editMode} />
                <InfoField label="Registration Number" value={vehicle.regNo} editable={editMode} />
                <InfoField label="Registration Year" value={vehicle.regYear} editable={editMode} />
                <InfoField label="Capacity" value={vehicle.capacity} editable={editMode} />
              </div>
            </Section>

            {/* Documents */}
            <Section title="Documents Status" icon={<FileText className="w-5 h-5" />}>
              <ul className="divide-y text-sm">
                {vehicle.documents.map((doc, idx) => (
                  <li key={idx} className="py-2 flex justify-between items-center">
                    <span>{doc.name}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        doc.status === "Valid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doc.status} (Exp: {doc.expiry})
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Photos */}
            <Section title="Vehicle Photos" icon={<Camera className="w-5 h-5" />}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {vehicle.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Vehicle ${idx}`}
                    className="rounded-xl border w-full h-28 object-cover"
                  />
                ))}
              </div>
            </Section>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                className="flex items-center gap-2 w-full sm:w-auto"
                onClick={() => setEditMode(!editMode)}
              >
                <Edit className="w-4 h-4" />
                {editMode ? "Save Changes" : "Edit Vehicle"}
              </Button>

              <Button
                variant="secondary"
                className="flex items-center gap-2 w-full sm:w-auto"
                onClick={() => navigate("/tempo-owner/vehicle-registration")}
              >
                Add New Vehicle
              </Button>

              <Button
                variant="ghost"
                className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50 w-full sm:w-auto"
              >
                <Trash2 className="w-4 h-4" />
                Delete Vehicle
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
    <div className="bg-white border rounded-2xl p-4 sm:p-5 mb-6">
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

function InfoField({ label, value, editable }) {
  return (
    <div>
      <Label>{label}</Label>
      {editable ? (
        <input
          type="text"
          defaultValue={value}
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84]"
        />
      ) : (
        <div className="px-3 py-2 rounded-xl border bg-gray-50">{value}</div>
      )}
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
