import React, { useState } from "react";
import { User, Shield, Lock, Bell, LogOut } from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";
import { useNavigate } from "react-router-dom";

export default function SettingsProfile() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar (mobile overlay + desktop fixed) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Settings & Profile
              </h1>
            </div>

            <div className="space-y-6">
              {/* Edit Profile Info */}
              <Section title="Edit Profile Info" icon={<User className="w-5 h-5" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Enter your name" defaultValue="John Doe" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input placeholder="Enter email" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <Label>Mobile</Label>
                    <Input placeholder="Enter mobile" defaultValue="+91 9876543210" />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input placeholder="Enter address" defaultValue="Mumbai, India" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button>Save Changes</Button>
                </div>
              </Section>

              {/* KYC Status */}
              <Section title="KYC Status" icon={<Shield className="w-5 h-5" />}>
                <div className="flex items-center justify-between p-3 bg-[#ebeafb] rounded-xl text-sm">
                  <span>Your KYC is verified ✅</span>
                  <Button variant="secondary">View Details</Button>
                </div>
              </Section>

              {/* Change Password */}
              <Section title="Change Password" icon={<Lock className="w-5 h-5" />}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Re-enter new password" />
                  </div>
                </div>
                <div className="mt-4">
                  <Button>Update Password</Button>
                </div>
              </Section>

              {/* Notification Preferences */}
              <Section
                title="Notification Preferences"
                icon={<Bell className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  {Object.keys(notifications).map((key) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={notifications[key]}
                        onChange={() =>
                          setNotifications({
                            ...notifications,
                            [key]: !notifications[key],
                          })
                        }
                      />
                      {key.toUpperCase()}
                    </label>
                  ))}
                </div>
              </Section>

              {/* Logout */}
              <Section title="Logout" icon={<LogOut className="w-5 h-5" />}>
                <p className="text-sm text-gray-600 mb-3">
                  You can log out from your account anytime.
                </p>
                <Button variant="ghost" className="text-red-600 border-red-600" onClick={() => navigate("/login")}>
                  Logout
                </Button>
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

function Label({ children, className = "" }) {
  return (
    <label className={`block text-sm font-medium mb-1 ${className}`}>
      {children}
    </label>
  );
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
