import React, { useState } from "react";
import { Truck, User, Building2, Users, Mail, MapPin } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
    const [role, setRole] = useState("Consignee");
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
    });
    const navigate = useNavigate();

    const roles = [
        { label: "Truck Owner", icon: <Truck className="w-4 h-4" /> },
        { label: "Consignee", icon: <User className="w-4 h-4" /> },
        { label: "Corporate Client", icon: <Building2 className="w-4 h-4" /> },
        // { label: "Transporter", icon: <Users className="w-4 h-4" /> },
    ];

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <main className="p-4 sm:p-6 lg:p-8 max-w-md w-full mx-auto flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-full">
                {/* Logo + Title */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#211C84] flex items-center justify-center mb-3">
                        <Truck className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#211C84]">TempoLogi</h1>
                    <p className="text-sm text-gray-600">SignUp</p>
                </div>

                {/* Create Account Title */}
                <div className="text-center mb-4">
                    <h2 className="text-base font-semibold text-gray-900">
                        Create your account
                    </h2>
                </div>

                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {roles.map((r) => (
                        <button
                            key={r.label}
                            onClick={() => setRole(r.label)}
                            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-sm font-medium
                ${role === r.label
                                    ? "bg-[#ebeafb] border-[#211C84] text-[#211C84] font-semibold"
                                    : "hover:bg-gray-50"
                                }`}
                        >
                            {r.icon} {r.label}
                        </button>
                    ))}
                </div>

                {/* Full Name */}
                <Section>
                    <div className="flex items-center border rounded-xl overflow-hidden">
                        <User className="w-4 h-4 text-gray-500 ml-3" />
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Full Name"
                            className="flex-1 px-3 py-2 outline-none text-sm"
                        />
                    </div>
                </Section>

                {/* Mobile Number */}
                <Section>
                    <div className="flex items-center border rounded-xl overflow-hidden">
                        <span className="px-3 text-sm text-gray-600">+91</span>
                        <input
                            type="tel"
                            value={form.mobile}
                            onChange={(e) => handleChange("mobile", e.target.value)}
                            placeholder="Mobile Number"
                            className="flex-1 px-3 py-2 outline-none text-sm"
                        />
                    </div>
                </Section>

                {/* Email */}
                <Section>
                    <div className="flex items-center border rounded-xl overflow-hidden">
                        <Mail className="w-4 h-4 text-gray-500 ml-3" />
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="Email"
                            className="flex-1 px-3 py-2 outline-none text-sm"
                        />
                    </div>
                </Section>

                {/* Address */}
                <Section>
                    <div className="flex items-center border rounded-xl overflow-hidden">
                        <MapPin className="w-4 h-4 text-gray-500 ml-3" />
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            placeholder="Address"
                            className="flex-1 px-3 py-2 outline-none text-sm"
                        />
                    </div>
                </Section>

                {/* Register Button */}
                <div className="mt-4">
                    <Button
                        className="w-full"
                        onClick={() => navigate("/registration-otp-verification")}
                    >
                        SignUp
                    </Button>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#211C84] font-semibold">
                        Login
                    </Link>
                </p>
            </Card>
        </main>
    );
}

/* ---------------- Helper Components ---------------- */
function Card({ children, className = "" }) {
    return (
        <div
            className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm ${className}`}
        >
            {children}
        </div>
    );
}

function Section({ children, className = "" }) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

function Button({ children, variant = "primary", className = "", ...props }) {
    const variants = {
        primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
        secondary: "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
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
