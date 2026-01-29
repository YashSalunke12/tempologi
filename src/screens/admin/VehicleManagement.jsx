import React, { useState } from "react";
import {
    Car,
    FileCheck,
    ShieldAlert,
    ClipboardCheck,
    Ban,
    ChevronRight,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function VehicleManagement() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // Dummy Data
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

    return (
        <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main */}
            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <Car className="w-6 h-6" />
                            <h1 className="text-xl sm:text-2xl font-semibold">
                                Vehicle Management
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Vehicle Table */}
                            <div className="lg:col-span-2 space-y-6">
                                <Section title="Vehicle Listings" icon={<ClipboardCheck className="w-5 h-5" />}>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm border rounded-xl overflow-hidden">
                                            <thead className="bg-[#f5f4ff] text-left">
                                                <tr>
                                                    <th className="px-3 py-2">Make</th>
                                                    <th className="px-3 py-2">Model</th>
                                                    <th className="px-3 py-2">Year</th>
                                                    <th className="px-3 py-2">Capacity</th>
                                                    <th className="px-3 py-2">Status</th>
                                                    <th className="px-3 py-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vehicles.map((v) => (
                                                    <tr key={v.id} className="border-t hover:bg-[#f9f9ff]">
                                                        <td className="px-3 py-2">{v.make}</td>
                                                        <td className="px-3 py-2">{v.model}</td>
                                                        <td className="px-3 py-2">{v.regYear}</td>
                                                        <td className="px-3 py-2">{v.capacity}</td>
                                                        <td className="px-3 py-2">
                                                            <StatusBadge status={v.status} />
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            <div className="flex flex-wrap gap-2">
                                                                <Button
                                                                    variant="secondary"
                                                                    onClick={() => window.location.href = `/admin/vehicle-management/${v.id}`}
                                                                >
                                                                    View
                                                                </Button>
                                                                {v.status === "Pending" && (
                                                                    <>
                                                                        <Button variant="primary">Approve</Button>
                                                                        <Button variant="ghost">Reject</Button>
                                                                    </>
                                                                )}
                                                                {v.status === "Approved" && (
                                                                    <Button variant="ghost">Blacklist</Button>
                                                                )}
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Section>
                            </div>

                            {/* Vehicle Details Side Panel */}
                            <aside className="lg:col-span-1 space-y-6">
                                {selectedVehicle ? (
                                    <Card className="sticky top-4">
                                        <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
                                        <p className="text-sm text-gray-700 mb-3">
                                            {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.regYear})
                                        </p>
                                        <ul className="text-sm space-y-2">
                                            <li><b>Capacity:</b> {selectedVehicle.capacity}</li>
                                            <li><b>Status:</b> <StatusBadge status={selectedVehicle.status} /></li>
                                            <li><b>Availability:</b> {selectedVehicle.availability}</li>
                                        </ul>

                                        <Section title="Document Verification" icon={<FileCheck className="w-4 h-4" />}>
                                            <ul className="text-sm space-y-1">
                                                {Object.entries(selectedVehicle.documents).map(([doc, status]) => (
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

                                        <div className="mt-4 flex gap-2">
                                            {selectedVehicle.status === "Pending" && (
                                                <>
                                                    <Button variant="primary">Approve</Button>
                                                    <Button variant="ghost">Reject</Button>
                                                </>
                                            )}
                                            {selectedVehicle.status === "Approved" && (
                                                <Button variant="ghost">Blacklist</Button>
                                            )}
                                            {selectedVehicle.status === "Blacklisted" && (
                                                <Button variant="secondary">Re-Activate</Button>
                                            )}
                                        </div>
                                    </Card>
                                ) : (
                                    <Card className="sticky top-4">
                                        <h3 className="text-lg font-semibold mb-2">Summary</h3>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-start gap-2">
                                                <ChevronRight className="w-4 h-4 mt-0.5" /> Total Vehicles: 3
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <ChevronRight className="w-4 h-4 mt-0.5" /> Pending Approvals: 1
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <ChevronRight className="w-4 h-4 mt-0.5" /> Blacklisted: 1
                                            </li>
                                        </ul>
                                        <div className="mt-4 p-3 bg-[#ebeafb] rounded-xl border text-xs">
                                            Tip: Regularly verify insurance & permits to avoid fraud risks.
                                        </div>
                                    </Card>
                                )}

                                <Card>
                                    <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                                    <p className="text-sm text-gray-600">Chat with our compliance officer or read admin FAQs.</p>
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
