import React, { useState } from "react";
import {
    Truck,
    MapPin,
    Package,
    Calendar,
    Clock,
    ChevronRight,
} from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";
import { useNavigate } from "react-router-dom";

export default function PostLoad() {
    const [urgency, setUrgency] = useState("Instant");
    const [tripType, setTripType] = useState("One Way");
    const [vehicle, setVehicle] = useState("Mini Truck");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
            {/* Sidebar (mobile overlay + desktop fixed) */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main column */}
            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto overflow-y-auto">
                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <Truck className="w-6 h-6" />
                            <h1 className="text-xl sm:text-2xl font-semibold">
                                Post a Load / Book a Ride
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Column 1 */}
                            <div className="lg:col-span-2 space-y-6">
                                <Section title="Pickup & Drop Location" icon={<MapPin className="w-5 h-5" />}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Pickup Location</Label>
                                            <AutocompleteInput placeholder="Search pickup (Google Places)" />
                                        </div>
                                        <div>
                                            <Label>Drop Location</Label>
                                            <AutocompleteInput placeholder="Search drop (Google Places)" />
                                        </div>
                                    </div>
                                </Section>

                                <Section title="Goods Information" icon={<Package className="w-5 h-5" />}>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="sm:col-span-1">
                                            <Label>Type of Goods</Label>
                                            <Input placeholder="e.g., Electronics, Furniture" />
                                        </div>
                                        <div>
                                            <Label>Weight</Label>
                                            <Input placeholder="e.g., 1200 kg" />
                                        </div>
                                        <div>
                                            <Label>Volume</Label>
                                            <Input placeholder="e.g., 12 m³" />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <Label>Special Instructions</Label>
                                            <TextArea placeholder="Fragile, temperature control, keep upright, etc." rows={3} />
                                        </div>
                                    </div>
                                </Section>

                                <Section title="Vehicle Preference">
                                    <PillGroup
                                        options={["Mini Truck", "Tempo", "Container", "Trailer"]}
                                        value={vehicle}
                                        onChange={setVehicle}
                                    />
                                </Section>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <Section title="Trip Type">
                                        <RadioRow
                                            name="tripType"
                                            options={["One Way", "Return", "TempoPool"]}
                                            value={tripType}
                                            onChange={setTripType}
                                        />
                                    </Section>

                                    <Section title="Urgency">
                                        <RadioRow
                                            name="urgency"
                                            options={["Instant", "Schedule Later"]}
                                            value={urgency}
                                            onChange={setUrgency}
                                        />

                                        {urgency === "Schedule Later" && (
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" /> Date
                                                    </Label>
                                                    <Input type="date" />
                                                </div>
                                                <div>
                                                    <Label className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" /> Time
                                                    </Label>
                                                    <Input type="time" />
                                                </div>
                                            </div>
                                        )}
                                    </Section>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button className="w-full sm:w-auto" onClick={() => navigate("/consignee/bidding-booking")}>Post Load</Button>
                                    <Button variant="secondary" className="w-full sm:w-auto">Get Quotes</Button>
                                    <Button variant="ghost" className="w-full sm:w-auto">Save as Draft</Button>
                                </div>
                            </div>

                            {/* Column 2 (Summary/Help) */}
                            <aside className="lg:col-span-1 space-y-6">
                                <Card className="top-4">
                                    <h3 className="text-lg font-semibold mb-2">Summary</h3>
                                    <ul className="text-sm space-y-2">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 mt-0.5" /> Compare real-time rates once you post.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 mt-0.5" /> Insured shipments supported.
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight className="w-4 h-4 mt-0.5" /> 24/7 support & live tracking.
                                        </li>
                                    </ul>

                                    <div className="mt-4 p-3 bg-[#ebeafb] rounded-xl border text-xs">
                                        Tip: Use "TempoPool" to share vehicle capacity and save up to 30% on cost.
                                    </div>
                                </Card>

                                <Card>
                                    <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                                    <p className="text-sm text-gray-600">Chat with our logistics expert or browse FAQs.</p>
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
                    <h2 className="text-base sm:text-lg font-semibold"> {title}</h2>
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

function TextArea({ className = "", rows = 4, ...props }) {
    return (
        <textarea
            rows={rows}
            className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84] ${className}`}
            {...props}
        />
    );
}

function RadioRow({ name, options, value, onChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <label
                    key={opt}
                    className={`cursor-pointer select-none px-3 py-2 rounded-xl border text-sm ${value === opt ? "bg-[#211C84] text-white border-[#211C84]" : "hover:bg-[#ebeafb]"
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
                    {opt}
                </label>
            ))}
        </div>
    );
}

function PillGroup({ options, value, onChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onChange(opt)}
                    className={`px-3 py-2 rounded-full text-sm border ${value === opt ? "bg-[#211C84] text-white border-[#211C84]" : "hover:bg-[#ebeafb]"
                        }`}
                >
                    {opt}
                </button>
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
