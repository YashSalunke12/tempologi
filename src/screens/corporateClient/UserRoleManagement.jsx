import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  MoreVertical,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function UserRoleManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ email: "", phone: "", role: "Staff" });

  const roles = ["Admin", "Manager", "Staff", "Viewer"];

  const users = [
    { id: 1, name: "Rajesh Mehta", email: "rajesh@company.com", phone: "+91 98765 43210", role: "Admin", status: "Active", lastActive: "Today, 10:30 AM" },
    { id: 2, name: "Priya Sharma", email: "priya@company.com", phone: "+91 87654 32109", role: "Manager", status: "Active", lastActive: "Yesterday, 18:45" },
    { id: 3, name: "Amit Patel", email: "amit@company.com", phone: "+91 76543 21098", role: "Staff", status: "Active", lastActive: "Today, 09:15 AM" },
    { id: 4, name: "Sneha Reddy", email: "sneha@company.com", phone: "+91 65432 10987", role: "Staff", status: "Inactive", lastActive: "2024-03-10" },
    { id: 5, name: "Vikram Singh", email: "vikram@company.com", phone: "+91 54321 09876", role: "Viewer", status: "Active", lastActive: "Today, 11:20 AM" },
  ];

  const rolePermissions = {
    Admin: ["Full access", "Manage users", "Approve payments", "Manage contracts", "System settings"],
    Manager: ["Approve shipments", "View reports", "Manage budgets", "User oversight"],
    Staff: ["Create shipments", "Track shipments", "Submit requests", "View assigned tasks"],
    Viewer: ["View dashboard", "Read-only access", "Track shipments"],
  };

  const handleInvite = (e) => {
    e.preventDefault();
    console.log("Inviting user:", inviteData);
    // API call would go here
    alert(`Invitation sent to ${inviteData.email}`);
    setShowInviteModal(false);
    setInviteData({ email: "", phone: "", role: "Staff" });
  };

  const toggleUserStatus = (userId, currentStatus) => {
    console.log(`Toggling user ${userId} status from ${currentStatus}`);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6" />
                <h1 className="text-xl sm:text-2xl font-semibold">User & Role Management</h1>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-[#211C84] text-white rounded-xl hover:bg-[#1a166b] flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Invite New User
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Users List */}
                <Section title="Corporate Users">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3 text-left">Name</th>
                          <th className="p-3 text-left">Contact</th>
                          <th className="p-3 text-left">Role</th>
                          <th className="p-3 text-left">Status</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </td>
                            <td className="p-3">{user.phone}</td>
                            <td className="p-3">
                              <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                                {user.role}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs ${
                                  user.status === 'Active' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {user.status}
                                </span>
                                <span className="text-xs text-gray-500">{user.lastActive}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <button className="p-1 hover:bg-gray-100 rounded-lg">
                                  <MoreVertical className="w-5 h-5 text-gray-500" />
                                </button>
                                <button
                                  onClick={() => toggleUserStatus(user.id, user.status)}
                                  className={`px-3 py-1 rounded-lg text-xs ${
                                    user.status === 'Active'
                                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                      : 'bg-green-50 text-green-600 hover:bg-green-100'
                                  }`}
                                >
                                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>

                {/* Role Permissions */}
                <Section title="Role Permissions" icon={<Shield className="w-5 h-5" />}>
                  <div className="flex gap-2 mb-4">
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`px-4 py-2 rounded-xl ${
                          selectedRole === role
                            ? 'bg-[#211C84] text-white'
                            : 'border hover:bg-gray-50'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  <div className="border rounded-xl p-4">
                    <h4 className="font-semibold mb-3">{selectedRole} Permissions</h4>
                    <ul className="space-y-2">
                      {rolePermissions[selectedRole].map((permission, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Section>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Quick Stats */}
                <Card>
                  <h3 className="text-lg font-semibold mb-3">User Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Users</span>
                      <span className="font-semibold">{users.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Users</span>
                      <span className="font-semibold text-green-600">
                        {users.filter(u => u.status === 'Active').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Admins</span>
                      <span className="font-semibold">
                        {users.filter(u => u.role === 'Admin').length}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Activity Log */}
                <Card>
                  <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <ActivityItem
                      action="New user invited"
                      user="Rajesh Mehta"
                      time="10:30 AM"
                    />
                    <ActivityItem
                      action="Role updated"
                      user="Priya Sharma"
                      time="Yesterday"
                    />
                    <ActivityItem
                      action="User deactivated"
                      user="Sneha Reddy"
                      time="Mar 10"
                    />
                  </div>
                </Card>
              </aside>
            </div>
          </Card>
        </main>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Invite New User</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border rounded-xl"
                  placeholder="user@company.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-xl"
                  placeholder="+91 98765 43210"
                  value={inviteData.phone}
                  onChange={(e) => setInviteData({...inviteData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <select
                  className="w-full p-3 border rounded-xl"
                  value={inviteData.role}
                  onChange={(e) => setInviteData({...inviteData, role: e.target.value})}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#211C84] text-white rounded-xl hover:bg-[#1a166b]"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ActivityItem({ action, user, time }) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-2 h-2 bg-[#211C84] rounded-full mt-2"></div>
      <div>
        <p className="text-sm">{action}</p>
        <p className="text-xs text-gray-500">{user} • {time}</p>
      </div>
    </div>
  );
}

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
          <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
}