import React, { useState } from "react";
import { User, Mail, Lock, Bell, Save } from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function ProfileSettings() {
    const [profile, setProfile] = useState({
        name: "Admin User",
        email: "admin@example.com",
        role: "Super Admin",
    });

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        system: true,
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleNotificationChange = (e) => {
        setNotifications({ ...notifications, [e.target.name]: e.target.checked });
    };

    return (
        <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
            {/* Sidebar (mobile overlay + desktop fixed) */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main column */}
            <div className="flex-1 flex flex-col">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <User className="w-6 h-6" />
                            <h1 className="text-xl sm:text-2xl font-semibold">
                                Profile Settings
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Profile Info */}
                            <Section title="Profile Information" icon={<User className="w-5 h-5" />}>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleProfileChange}
                                            className="w-full border rounded-xl px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleProfileChange}
                                            className="w-full border rounded-xl px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Role</label>
                                        <input
                                            type="text"
                                            value={profile.role}
                                            disabled
                                            className="w-full border rounded-xl px-3 py-2 text-sm bg-gray-100"
                                        />
                                    </div>
                                    <Button variant="primary" type="button">
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </Button>
                                </form>
                            </Section>

                            {/* Change Password */}
                            <Section title="Change Password" icon={<Lock className="w-5 h-5" />}>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium">Current Password</label>
                                        <input
                                            type="password"
                                            name="current"
                                            value={passwords.current}
                                            onChange={handlePasswordChange}
                                            className="w-full border rounded-xl px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">New Password</label>
                                        <input
                                            type="password"
                                            name="new"
                                            value={passwords.new}
                                            onChange={handlePasswordChange}
                                            className="w-full border rounded-xl px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirm"
                                            value={passwords.confirm}
                                            onChange={handlePasswordChange}
                                            className="w-full border rounded-xl px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <Button variant="secondary" type="button">
                                        <Save className="w-4 h-4 mr-2" /> Update Password
                                    </Button>
                                </form>
                            </Section>
                        </div>

                        {/* Notifications */}
                        <div className="mt-6">
                            <Section title="Notification Preferences" icon={<Bell className="w-5 h-5" />}>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            name="email"
                                            checked={notifications.email}
                                            onChange={handleNotificationChange}
                                            className="w-4 h-4"
                                        />
                                        Email Notifications
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            name="sms"
                                            checked={notifications.sms}
                                            onChange={handleNotificationChange}
                                            className="w-4 h-4"
                                        />
                                        SMS Notifications
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            name="system"
                                            checked={notifications.system}
                                            onChange={handleNotificationChange}
                                            className="w-4 h-4"
                                        />
                                        System Alerts
                                    </label>
                                </div>
                                <div className="mt-4">
                                    <Button variant="primary" type="button">
                                        <Save className="w-4 h-4 mr-2" /> Save Preferences
                                    </Button>
                                </div>
                            </Section>
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

function Button({ children, variant = "primary", className = "", ...props }) {
    const variants = {
        primary: "bg-[#211C84] text-white hover:bg-[#1a166b]",
        secondary: "bg-white text-[#211C84] border hover:bg-[#ebeafb]",
    };
    return (
        <button
            className={`px-4 py-2 rounded-2xl text-sm font-medium flex items-center justify-center ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
