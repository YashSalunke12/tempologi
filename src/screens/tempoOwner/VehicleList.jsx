import React, { useState } from "react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { Truck, Calendar, Weight, FileText, Camera, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VehicleList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Dummy vehicle data (replace with API later)
  const vehicles = [
    {
      id: 1,
      type: "Mini Truck",
      manufacturer: "Tata Motors",
      regNo: "MH12AB1234",
      year: 2021,
      capacity: "2500 kg",
      docs: "Insurance Valid till Dec 2025",
      photos: 3,
    },
    {
      id: 2,
      type: "Tempo",
      manufacturer: "Mahindra",
      regNo: "MH14XY5678",
      year: 2019,
      capacity: "1800 kg",
      docs: "Fitness Expired",
      photos: 2,
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
              <Truck className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">My Vehicles</h1>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white border rounded-2xl p-4 sm:p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">{vehicle.type}</h2>
                      <p className="text-sm text-gray-600">{vehicle.manufacturer}</p>
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-100">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <InfoRow icon={<Truck className="w-4 h-4" />} label="Reg. No" value={vehicle.regNo} />
                    <InfoRow icon={<Calendar className="w-4 h-4" />} label="Year" value={vehicle.year} />
                    <InfoRow icon={<Weight className="w-4 h-4" />} label="Capacity" value={vehicle.capacity} />
                    <InfoRow icon={<FileText className="w-4 h-4" />} label="Docs" value={vehicle.docs} />
                    <InfoRow icon={<Camera className="w-4 h-4" />} label="Photos" value={`${vehicle.photos} uploaded`} />
                  </div>

                  <div className="mt-4 flex gap-2">
                    {/* <Button onClick={() => navigate(`/tempo-owner/vehicle-details/${vehicle.id}`)}>View Details</Button> */}
                    <Button onClick={() => navigate("/tempo-owner/vehicle-details")}>View Details</Button>
                    {/* <Button variant="secondary">Edit</Button>
                    <Button variant="ghost" className="text-red-600 border-red-300">Delete</Button> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Vehicle */}
            <div className="mt-8 flex justify-center">
              <Button onClick={() => navigate("/tempo-owner/vehicle-registration")}>
                + Add New Vehicle
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium">{value}</span>
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
