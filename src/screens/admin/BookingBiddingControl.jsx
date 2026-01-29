import React, { useState } from "react";
import {
    ClipboardList,
    Ban,
    FileCheck,
    UserCheck,
    ChevronRight,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function BookingBiddingControl() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);

    // Dummy Active Bids Data
    const bids = [
        {
            id: 1,
            transporter: "ABC Logistics",
            vehicle: "Tata 407",
            bidAmount: "₹15,000",
            status: "Active",
        },
        {
            id: 2,
            transporter: "XYZ Transports",
            vehicle: "Bolero Pickup",
            bidAmount: "₹13,500",
            status: "Active",
        },
        {
            id: 3,
            transporter: "SafeMove Carriers",
            vehicle: "Ashok Leyland Ecomet",
            bidAmount: "₹17,200",
            status: "Rejected",
        },
    ];

    return (
        <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main */}
            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <ClipboardList className="w-6 h-6" />
                            <h1 className="text-xl sm:text-2xl font-semibold">
                                Booking & Bidding Control
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Section - Bids Table */}
                            <div className="lg:col-span-2 space-y-6">
                                <Section title="Active Bids">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm border rounded-xl overflow-hidden">
                                            <thead className="bg-[#f5f4ff] text-left">
                                                <tr>
                                                    <th className="px-3 py-2">Transporter</th>
                                                    <th className="px-3 py-2">Vehicle</th>
                                                    <th className="px-3 py-2">Bid Amount</th>
                                                    <th className="px-3 py-2">Status</th>
                                                    <th className="px-3 py-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bids.map((b) => (
                                                    <tr
                                                        key={b.id}
                                                        className="border-t hover:bg-[#f9f9ff]"
                                                    >
                                                        <td className="px-3 py-2">{b.transporter}</td>
                                                        <td className="px-3 py-2">{b.vehicle}</td>
                                                        <td className="px-3 py-2">{b.bidAmount}</td>
                                                        <td className="px-3 py-2">
                                                            <StatusBadge status={b.status} />
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            <div className="flex flex-wrap gap-2">
                                                                <Button
                                                                    variant="secondary"
                                                                    onClick={() => (window.location.href = `/admin/booking-bidding-control/bid/${b.id}`)}
                                                                >
                                                                    View
                                                                </Button>
                                                                {b.status === "Active" && (
                                                                    <>
                                                                        <Button variant="primary">Assign</Button>
                                                                        <Button variant="ghost">Cancel</Button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Section>

                                <Section title="Trip e-Documents" icon={<FileCheck className="w-5 h-5" />}>
                                    <ul className="text-sm space-y-2">
                                        <li>Bilty.pdf</li>
                                        <li>E-wayBill.pdf</li>
                                        <li>Permit.pdf</li>
                                    </ul>
                                    <div className="mt-3">
                                        <Button variant="secondary">Download All</Button>
                                    </div>
                                </Section>
                            </div>

                            {/* Right Section - Bid Details & Help */}
                            <aside className="lg:col-span-1 space-y-6">
                                {selectedBid ? (
                                    <Card className="top-4">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Bid Details
                                        </h3>
                                        <ul className="text-sm space-y-2">
                                            <li>
                                                <b>Transporter:</b> {selectedBid.transporter}
                                            </li>
                                            <li>
                                                <b>Vehicle:</b> {selectedBid.vehicle}
                                            </li>
                                            <li>
                                                <b>Bid Amount:</b> {selectedBid.bidAmount}
                                            </li>
                                            <li>
                                                <b>Status:</b>{" "}
                                                <StatusBadge status={selectedBid.status} />
                                            </li>
                                        </ul>
                                        <div className="mt-4 flex gap-2">
                                            <Button variant="primary">Assign Booking</Button>
                                            <Button variant="ghost">Cancel Bid</Button>
                                        </div>
                                    </Card>
                                ) : (
                                    <Card className="top-4">
                                        <h3 className="text-lg font-semibold mb-2">Summary</h3>
                                        <ul className="text-sm space-y-2">
                                            <li className="flex items-start gap-2">
                                                <ChevronRight className="w-4 h-4 mt-0.5" /> Total Bids:
                                                3
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <ChevronRight className="w-4 h-4 mt-0.5" /> Active Bids:
                                                2
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <ChevronRight className="w-4 h-4 mt-0.5" /> Fraudulent
                                                Cancelled: 0
                                            </li>
                                        </ul>
                                        <div className="mt-4 p-3 bg-[#ebeafb] rounded-xl border text-xs">
                                            Tip: Manually assign bookings if auto-allocation fails.
                                        </div>
                                    </Card>
                                )}

                                <Card>
                                    <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                                    <p className="text-sm text-gray-600">
                                        Chat with our operations manager or read admin FAQs.
                                    </p>
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
        <div
            className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-sm ${className}`}
        >
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

function Button({ children, variant = "primary", className = "", ...props }) {
    const variants = {
        primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
        secondary: "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
        ghost:
            "bg-transparent text-[#211C84] border border-dashed hover:bg-[#ebeafb]",
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

function StatusBadge({ status }) {
    const colors = {
        Active: "bg-green-100 text-green-700",
        Assigned: "bg-blue-100 text-blue-700",
        Rejected: "bg-red-100 text-red-700",
    };
    return (
        <span
            className={`px-2 py-1 text-xs rounded-full ${colors[status] || "bg-gray-100 text-gray-700"
                }`}
        >
            {status}
        </span>
    );
}
