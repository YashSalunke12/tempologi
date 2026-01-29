import React, { useState } from "react";
import { User, Mail, Phone, Lock, Bell, Globe, ChevronRight, Star } from "lucide-react";
import Header from "../../components/tempoOwner/Header";
import Sidebar from "../../components/tempoOwner/Sidebar";
import { useNavigate } from "react-router-dom";

export default function SettingProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock profile data
  const [profile, setProfile] = useState({
    name: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    phone: "+91 9876543210",
    language: "English",
    notifications: true,
  });

  const handleChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Profile Settings</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-6">
                <Section title="Personal Information" icon={<User className="w-5 h-5" />}>
                  <Label>Full Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />

                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />

                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </Section>

                <Section title="Security" icon={<Lock className="w-5 h-5" />}>
                  <Button variant="secondary" className="w-full flex items-center justify-between">
                    Change Password <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" className="w-full flex items-center justify-between mt-2">
                    Enable 2FA <ChevronRight className="w-4 h-4" />
                  </Button>
                </Section>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <Section title="Preferences" icon={<Globe className="w-5 h-5" />}>
                  <Label>Language</Label>
                  <select
                    value={profile.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84]"
                  >
                    <option>English</option>
                    <option>हिन्दी</option>
                    <option>मराठी</option>
                    <option>বাংলা</option>
                  </select>
                </Section>

                <Section title="Notifications" icon={<Bell className="w-5 h-5" />}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profile.notifications}
                      onChange={(e) => handleChange("notifications", e.target.checked)}
                      className="w-5 h-5 rounded text-[#211C84] focus:ring-[#211C84]"
                    />
                    <span className="text-sm">Enable Email & SMS Notifications</span>
                  </label>
                </Section>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button className="w-full sm:w-auto">Save Changes</Button>
              <Button variant="secondary" className="w-full sm:w-auto">Cancel</Button>
              <Button
                variant="ghost"
                className="w-full sm:w-auto flex items-center justify-center gap-2"
                onClick={() => navigate("/tempo-owner/ratings")}
              >
                <Star className="w-4 h-4" /> View Ratings & Reviews
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

/* --------- Helper Components (reused from PostLoad.jsx style) --------- */
function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-sm ${className}`}>{children}</div>;
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
      <div className="space-y-3">{children}</div>
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
