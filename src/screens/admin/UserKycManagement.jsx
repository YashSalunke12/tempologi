import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  FileText,
  CheckCircle,
  XCircle,
  ShieldBan,
  ChevronRight,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function UserKycManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Mock Users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ravi Sharma",
      type: "Owner",
      status: "Active",
      kycStage: "Pending",
      documents: ["Aadhaar", "PAN"],
    },
    {
      id: 2,
      name: "Suman Enterprises",
      type: "Corporate Client",
      status: "Blocked",
      kycStage: "Verified",
      documents: ["Aadhaar", "PAN", "GST", "RC"],
    },
    {
      id: 3,
      name: "Anil Transport",
      type: "Transporter",
      status: "Active",
      kycStage: "In Review",
      documents: ["Aadhaar", "PAN", "DL"],
    },
  ]);

  const handleAction = (id, action) => {
    console.log(`Action: ${action} on user ${id}`);
  };

  const filteredUsers = users.filter(
    (u) =>
      (filter === "All" || u.type === filter) &&
      (search === "" || u.name.toLowerCase().includes(search.toLowerCase()))
  );

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
              <h1 className="text-xl sm:text-2xl font-semibold">User & KYC Management</h1>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select
                className="rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-[#211C84]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>Owner</option>
                <option>Consignee</option>
                <option>Corporate Client</option>
                <option>Transporter</option>
              </select>
            </div>

            {/* User List */}
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.type}</p>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        <span
                          className={`px-2 py-1 rounded-full font-medium ${user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            }`}
                        >
                          {user.status}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full font-medium ${user.kycStage === "Verified"
                              ? "bg-green-100 text-green-700"
                              : user.kycStage === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                        >
                          {user.kycStage}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleAction(user.id, "view")}
                      >
                        <FileText className="w-4 h-4 mr-1" /> View Profile
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleAction(user.id, "approve")}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleAction(user.id, "reject")}
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleAction(user.id, "block")}
                      >
                        <ShieldBan className="w-4 h-4 mr-1" /> Block
                      </Button>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Documents</h4>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {user.documents.map((doc) => (
                        <span
                          key={doc}
                          className="px-2 py-1 rounded-full border bg-[#f9f9ff]"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Bulk Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button variant="primary">Approve Selected</Button>
              <Button variant="ghost">Deactivate Inactive Users</Button>
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
    ghost:
      "bg-transparent text-[#211C84] border border-dashed hover:bg-[#ebeafb]",
  };
  return (
    <button
      className={`px-3 py-2 rounded-2xl text-sm font-medium flex items-center ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
