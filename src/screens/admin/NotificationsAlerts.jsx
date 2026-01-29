import React, { useState } from "react";
import {
  Bell,
  Users,
  AlertTriangle,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function NotificationsAlerts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [audience, setAudience] = useState("All");
  const [type, setType] = useState("Policy Update");
  const [urgency, setUrgency] = useState("Normal");

  // Mock system alerts
  const systemAlerts = [
    {
      id: 1,
      message: "Insurance expiring for Vehicle MH12AB1234",
      type: "Insurance",
      createdAt: "2025-09-04 10:30 AM",
    },
    {
      id: 2,
      message: "Pending payment from Ravi Sharma (₹12,500)",
      type: "Payment",
      createdAt: "2025-09-04 09:45 AM",
    },
    {
      id: 3,
      message: "Fitness certificate renewal required for 5 vehicles",
      type: "Document",
      createdAt: "2025-09-03 05:20 PM",
    },
  ];

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
              <Bell className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Notifications & Alerts
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Side – Send Notification */}
              <div className="lg:col-span-2 space-y-6">
                <Section
                  title="Create New Notification"
                  icon={<Bell className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label>Notification Title</Label>
                      <Input placeholder="Enter title (e.g., Scheduled Downtime)" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Message</Label>
                      <TextArea placeholder="Enter notification message" rows={3} />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Audience</Label>
                      <PillGroup
                        options={["All", "Owners", "Consignees", "Corporates"]}
                        value={audience}
                        onChange={setAudience}
                      />
                    </div>
                    <div>
                      <Label>Notification Type</Label>
                      <PillGroup
                        options={["Policy Update", "Offer", "Downtime Alert"]}
                        value={type}
                        onChange={setType}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>Urgency</Label>
                    <RadioRow
                      name="urgency"
                      options={["Normal", "High"]}
                      value={urgency}
                      onChange={setUrgency}
                    />
                  </div>

                  {urgency === "High" && (
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

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Button className="w-full sm:w-auto">Send Notification</Button>
                    <Button variant="secondary" className="w-full sm:w-auto">
                      Save as Draft
                    </Button>
                  </div>
                </Section>

                <Section
                  title="System Generated Alerts"
                  icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
                >
                  <div className="space-y-3 text-sm">
                    {systemAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 rounded-xl border bg-[#fafafa] flex flex-col sm:flex-row sm:items-center justify-between"
                      >
                        <p>{alert.message}</p>
                        <span className="text-xs text-gray-500">
                          {alert.createdAt}
                        </span>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>

              {/* Right Side – Summary / Help */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Bulk send
                      notifications to any role.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Track
                      auto-generated system alerts.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Save drafts
                      before sending.
                    </li>
                  </ul>

                  <div className="mt-4 p-3 bg-[#ebeafb] rounded-xl border text-xs">
                    Tip: Use "High" urgency for time-sensitive alerts like system
                    downtime.
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Contact support team for urgent system announcements.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="secondary">Chat Now</Button>
                    <Button variant="ghost">View Docs</Button>
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
          className={`cursor-pointer select-none px-3 py-2 rounded-xl border text-sm ${value === opt
              ? "bg-[#211C84] text-white border-[#211C84]"
              : "hover:bg-[#ebeafb]"
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
          className={`px-3 py-2 rounded-full text-sm border ${value === opt
              ? "bg-[#211C84] text-white border-[#211C84]"
              : "hover:bg-[#ebeafb]"
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
