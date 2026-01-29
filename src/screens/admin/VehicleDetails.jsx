import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Car, FileCheck, ChevronRight } from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

// Dummy vehicle DB (can be replaced with API call)
const vehicles = [
  {
    id: 1,
    make: "Tata",
    model: "407",
    regYear: 2020,
    capacity: "3000 kg",
    status: "Pending",
    availability: "Available",
    documents: {
      insurance: "Verified",
      fitness: "Pending",
      permits: "Verified",
    },
  },
  {
    id: 2,
    make: "Mahindra",
    model: "Bolero Pickup",
    regYear: 2019,
    capacity: "1500 kg",
    status: "Approved",
    availability: "On Trip",
    documents: {
      insurance: "Verified",
      fitness: "Verified",
      permits: "Verified",
    },
  },
  {
    id: 3,
    make: "Ashok Leyland",
    model: "Ecomet",
    regYear: 2018,
    capacity: "7000 kg",
    status: "Blacklisted",
    availability: "N/A",
    documents: {
      insurance: "Expired",
      fitness: "Verified",
      permits: "Expired",
    },
  },
];

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find((v) => v.id === parseInt(id));

  if (!vehicle) {
    return <div className="p-6 text-center text-red-600">Vehicle not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Car className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Vehicle Details
              </h1>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <Section title="Basic Information">
                <ul className="text-sm space-y-2">
                  <li><b>Make:</b> {vehicle.make}</li>
                  <li><b>Model:</b> {vehicle.model}</li>
                  <li><b>Registration Year:</b> {vehicle.regYear}</li>
                  <li><b>Capacity:</b> {vehicle.capacity}</li>
                  <li><b>Status:</b> <StatusBadge status={vehicle.status} /></li>
                  <li><b>Availability:</b> {vehicle.availability}</li>
                </ul>
              </Section>

              {/* Document Verification */}
              <Section title="Document Verification" icon={<FileCheck className="w-4 h-4" />}>
                <ul className="text-sm space-y-2">
                  {Object.entries(vehicle.documents).map(([doc, status]) => (
                    <li key={doc} className="flex justify-between">
                      <span className="capitalize">{doc}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${status === "Verified"
                            ? "bg-green-100 text-green-700"
                            : status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {status}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Back
                </Button>
                {vehicle.status === "Pending" && (
                  <>
                    <Button variant="primary">Approve</Button>
                    <Button variant="ghost">Reject</Button>
                  </>
                )}
                {vehicle.status === "Approved" && (
                  <Button variant="ghost">Blacklist</Button>
                )}
                {vehicle.status === "Blacklisted" && (
                  <Button variant="secondary">Re-Activate</Button>
                )}
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
    <div className="bg-white border rounded-2xl p-4 sm:p-5 mb-4">
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
      className={`px-3 py-1.5 rounded-xl text-sm font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Blacklisted: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${colors[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
