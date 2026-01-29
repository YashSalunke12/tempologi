import React, { useState } from "react";
import {
    Truck,
    Wallet,
    Bell,
    Clock,
    ChevronRight,
    PlusCircle,
    Search,
    ClipboardList,
} from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [walletBalance] = useState(7500);

    const vehicles = [
        { id: 1, name: "Tata Ace", reg: "MH12AB1234", status: "Active" },
        { id: 2, name: "Ashok Leyland", reg: "DL09XY5678", status: "Inactive" },
    ];

    const activeTrips = [
        { id: 101, pickup: "Mumbai", drop: "Surat", status: "In Transit" },
    ];

    const pendingRequests = [
        { id: 201, load: "Electronics", from: "Delhi", to: "Lucknow" },
    ];

    const notifications = [
        "RC for vehicle MH12AB1234 expires in 7 days",
        "New booking request received",
        "Pending payment of ₹1200",
    ];

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Column */}
            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <Truck className="w-6 h-6" />
                            <h1 className="text-xl sm:text-2xl font-semibold">
                                Dashboard
                            </h1>
                        </div>

                        {/* Top row cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
                            {/* Vehicles */}
                            <Card>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-[#211C84]" /> Total Vehicles
                                </h3>
                                <p className="text-3xl font-bold text-[#211C84]">
                                    {vehicles.length}
                                </p>
                            </Card>

                            {/* Active Trips */}
                            <Card>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#211C84]" /> Active Trips
                                </h3>
                                <p className="text-3xl font-bold text-[#211C84]">
                                    {activeTrips.length}
                                </p>
                            </Card>

                            {/* Pending Requests */}
                            <Card>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <ClipboardList className="w-5 h-5 text-[#211C84]" /> Pending Requests
                                </h3>
                                <p className="text-3xl font-bold text-[#211C84]">
                                    {pendingRequests.length}
                                </p>
                            </Card>
                            {/* Wallet */}
                            <Card>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <Wallet className="w-5 h-5" /> Wallet
                                </h3>
                                <p className="text-2xl font-bold text-[#211C84]">
                                    ₹{walletBalance}
                                </p>
                                <Button variant="secondary">Withdraw</Button>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Column 1 (Main) */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Vehicles */}
                                <Section title="My Vehicles" icon={<Truck className="w-5 h-5" />}>
                                    {vehicles.length ? (
                                        <ul className="divide-y">
                                            {vehicles.map((v) => (
                                                <li
                                                    key={v.id}
                                                    className="py-3 flex justify-between items-center text-sm"
                                                >
                                                    <span>
                                                        {v.name} ({v.reg})
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${v.status === "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {v.status}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No vehicles added.</p>
                                    )}
                                </Section>

                                {/* Active Trips */}
                                <Section title="Active Trips" icon={<Clock className="w-5 h-5" />}>
                                    {activeTrips.length ? (
                                        <ul className="divide-y">
                                            {activeTrips.map((t) => (
                                                <li
                                                    key={t.id}
                                                    className="py-3 flex justify-between items-center text-sm"
                                                >
                                                    <span>
                                                        {t.pickup} → {t.drop}
                                                    </span>
                                                    <span className="text-[#211C84] font-medium">
                                                        {t.status}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No active trips.</p>
                                    )}
                                </Section>
                            </div>

                            {/* Column 2 (Sidebar) */}
                            <aside className="lg:col-span-1 space-y-6">
                                {/* Notifications */}
                                <Card>
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <Bell className="w-5 h-5" /> Notifications
                                    </h3>
                                    <ul className="text-sm space-y-2">
                                        {notifications.map((n, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <ChevronRight className="w-4 h-4 mt-0.5" /> {n}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3">
                                        <Button variant="ghost">View All</Button>
                                    </div>
                                </Card>

                                {/* Quick Actions */}
                                <Card>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <ClipboardList className="w-5 h-5" /> Quick Actions
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        <Button
                                            variant="primary"
                                            className="flex items-center gap-2"
                                            onClick={() => navigate("/tempo-owner/vehicle-registration")}
                                        >
                                            <PlusCircle className="w-4 h-4" /> Register Vehicle
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            className="flex items-center gap-2"
                                            onClick={() => navigate("/tempo-owner/load-matches")}
                                        >
                                            <Search className="w-4 h-4" /> View Load Matches
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2"
                                            onClick={() => navigate("/tempo-owner/booking-requests")}
                                        >
                                            <ClipboardList className="w-4 h-4" /> View Requests
                                        </Button>
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

/* ---------------- Inline Helper Components ---------------- */
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
