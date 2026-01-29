import React, { useState } from "react";
import {
    Star,
    User,
    Truck,
    ShieldAlert,
    Trash2,
    RefreshCcw,
    ChevronRight,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function RatingsReviewsControl() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock data for ratings
    const [ratings, setRatings] = useState([
        {
            id: 1,
            userType: "Owner",
            name: "Ramesh Transport",
            rating: 4,
            review: "Good service, punctual delivery.",
            flagged: false,
            trustScore: 82,
        },
        {
            id: 2,
            userType: "Vehicle",
            name: "MH12AB1234",
            rating: 2,
            review: "Vehicle was late and driver unprofessional.",
            flagged: false,
            trustScore: 60,
        },
        {
            id: 3,
            userType: "Consignee",
            name: "ABC Traders",
            rating: 5,
            review: "Smooth transaction. Highly recommended.",
            flagged: false,
            trustScore: 95,
        },
    ]);

    const handleFlag = (id) => {
        setRatings((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, flagged: !r.flagged } : r
            )
        );
    };

    const handleRemove = (id) => {
        setRatings((prev) => prev.filter((r) => r.id !== id));
    };

    const handleResetTrust = (id) => {
        setRatings((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, trustScore: 80 } : r
            )
        );
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
                            <Star className="w-6 h-6 text-yellow-500" />
                            <h1 className="text-xl sm:text-2xl font-semibold">
                                Ratings & Reviews Control
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Column 1 - Ratings List */}
                            <div className="lg:col-span-2 space-y-6">
                                <Section title="Manage Reviews">
                                    <div className="space-y-4">
                                        {ratings.map((r) => (
                                            <div
                                                key={r.id}
                                                className="border rounded-xl p-4 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                                            >
                                                <div className="flex items-start gap-3">
                                                    {r.userType === "Owner" && (
                                                        <User className="w-6 h-6 text-[#211C84]" />
                                                    )}
                                                    {r.userType === "Vehicle" && (
                                                        <Truck className="w-6 h-6 text-[#211C84]" />
                                                    )}
                                                    {r.userType === "Consignee" && (
                                                        <User className="w-6 h-6 text-[#211C84]" />
                                                    )}
                                                    <div>
                                                        <h3 className="font-semibold">
                                                            {r.name} ({r.userType})
                                                        </h3>
                                                        <div className="flex items-center gap-1 text-yellow-500">
                                                            {Array.from({ length: 5 }).map(
                                                                (_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-4 h-4 ${i <
                                                                                r.rating
                                                                                ? "fill-yellow-500"
                                                                                : "stroke-gray-400"
                                                                            }`}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                        <p className="text-sm mt-1 text-gray-600">
                                                            {r.review}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Trust Score:{" "}
                                                            <span className="font-medium">
                                                                {r.trustScore}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant={
                                                            r.flagged
                                                                ? "secondary"
                                                                : "ghost"
                                                        }
                                                        onClick={() =>
                                                            handleFlag(r.id)
                                                        }
                                                    >
                                                        <ShieldAlert className="w-4 h-4 mr-1" />
                                                        {r.flagged
                                                            ? "Unflag"
                                                            : "Flag"}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() =>
                                                            handleResetTrust(r.id)
                                                        }
                                                    >
                                                        <RefreshCcw className="w-4 h-4 mr-1" />
                                                        Reset Trust
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() =>
                                                            handleRemove(r.id)
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Section>
                            </div>

                            {/* Column 2 - Help/Guidelines */}
                            <aside className="lg:col-span-1 space-y-6">
                                <Card className="top-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Guidelines
                                    </h3>
                                    <ul className="text-sm space-y-2">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 mt-0.5" />
                                            Flag only fake, spam, or abusive reviews.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 mt-0.5" />
                                            Trust score impacts bidding priority.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 mt-0.5" />
                                            Removal should be last option.
                                        </li>
                                    </ul>
                                </Card>

                                <Card>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Need Help?
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Contact moderation team for escalated
                                        review disputes.
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        <Button variant="secondary">
                                            Contact Team
                                        </Button>
                                        <Button variant="ghost">FAQs</Button>
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

function Section({ title, children }) {
    return (
        <div className="bg-white border rounded-2xl p-4 sm:p-5">
            {title && (
                <h2 className="text-base sm:text-lg font-semibold mb-4">
                    {title}
                </h2>
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
            className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
