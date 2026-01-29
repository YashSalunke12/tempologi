import React, { useState } from "react";
import {
  Users,
  Shield,
  ClipboardList,
  Activity,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminUserManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Super Admin");

  const roles = ["Super Admin", "Finance", "Support", "Verification Agent"];

  const activityLogs = [
    { id: 1, action: "Logged in", user: "Admin1", time: "2025-09-04 10:32" },
    { id: 2, action: "Approved KYC for User123", user: "Agent2", time: "2025-09-04 09:15" },
    { id: 3, action: "Resolved dispute #456", user: "Support1", time: "2025-09-03 18:40" },
  ];

  const adminList = [
    { id: 1, name: "Ravi Kumar", role: "Super Admin", status: "Active" },
    { id: 2, name: "Priya Singh", role: "Finance", status: "Active" },
    { id: 3, name: "Arjun Mehta", role: "Support", status: "Inactive" },
    { id: 4, name: "Simran Patel", role: "Verification Agent", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Admin User Management
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 (Main Management) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Role-based Access */}
                <Section title="Role-based Access Control" icon={<Shield className="w-5 h-5" />}>
                  <PillGroup
                    options={roles}
                    value={selectedRole}
                    onChange={setSelectedRole}
                  />
                  <div className="mt-4 border rounded-xl p-4 bg-gray-50 text-sm">
                    Selected Role: <strong>{selectedRole}</strong>
                    <p className="mt-2 text-gray-600">
                      Manage permissions, assign tasks, and control access for {selectedRole}.
                    </p>
                  </div>
                </Section>

                {/* Multi-admin Collaboration */}
                <Section title="Multi-admin Collaboration" icon={<ClipboardList className="w-5 h-5" />}>
                  <div className="text-sm text-gray-600 mb-3">
                    Assign tasks such as <b>KYC Verification</b>, <b>Dispute Handling</b>, and <b>Finance Approvals</b>.
                  </div>
                  <Button variant="secondary">Assign New Task</Button>
                </Section>

                {/* Admin List */}
                <Section title="Admin Accounts">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border rounded-xl">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">Name</th>
                          <th className="p-2 text-left">Role</th>
                          <th className="p-2 text-left">Status</th>
                          <th className="p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminList.map((admin) => (
                          <tr key={admin.id} className="border-t">
                            <td className="p-2">{admin.name}</td>
                            <td className="p-2">{admin.role}</td>
                            <td className="p-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${admin.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                  }`}
                              >
                                {admin.status}
                              </span>
                            </td>
                            <td className="p-2 space-x-2">
                              <Button variant="secondary" className="px-2 py-1 text-xs">
                                Edit
                              </Button>
                              <Button variant="ghost" className="px-2 py-1 text-xs">
                                Disable
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>
              </div>

              {/* Column 2 (Sidebar: Logs & Help) */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Activity Logs
                  </h3>
                  <ul className="text-sm space-y-2 max-h-60 overflow-y-auto">
                    {activityLogs.map((log) => (
                      <li key={log.id} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-gray-400" />
                        <div>
                          <p>{log.action}</p>
                          <span className="text-xs text-gray-500">
                            {log.user} • {log.time}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Contact Super Admin or browse documentation for admin guidelines.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="secondary">Contact</Button>
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
