import React, { useState } from "react";
import {
  FileText,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";
export default function ContractManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const contracts = [
    {
      id: 1,
      transporter: "ABC Logistics",
      duration: "Jan 2024 - Dec 2024",
      rates: "₹15/km",
      status: "Active",
      renewalDate: "2024-12-15",
      value: "₹5.2L",
    },
    {
      id: 2,
      transporter: "XYZ Transport",
      duration: "Mar 2024 - Feb 2025",
      rates: "₹18/km (Refrigerated)",
      status: "Active",
      renewalDate: "2025-02-28",
      value: "₹8.7L",
    },
    {
      id: 3,
      transporter: "Swift Movers",
      duration: "Jun 2023 - May 2024",
      rates: "₹12/km",
      status: "Renewal Pending",
      renewalDate: "2024-05-30",
      value: "₹3.5L",
    },
    {
      id: 4,
      transporter: "Reliable Cargo",
      duration: "Aug 2022 - Jul 2023",
      rates: "₹14/km",
      status: "Expired",
      renewalDate: "2023-07-31",
      value: "₹6.8L",
    },
  ];

  const filteredContracts = contracts.filter(contract =>
    contract.transporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploading contract:", file.name);
      // Upload logic here
    }
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
                <FileText className="w-6 h-6" />
                <h1 className="text-xl sm:text-2xl font-semibold">Contract Management</h1>
              </div>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2 bg-[#211C84] text-white rounded-xl cursor-pointer hover:bg-[#1a166b] flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Contract
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleUpload} />
                </label>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search contracts by transporter or status..."
                  className="w-full pl-10 p-3 border rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="px-4 py-3 border rounded-xl hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>

            {/* Contracts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {filteredContracts.map((contract) => (
                <ContractCard key={contract.id} contract={contract} />
              ))}
            </div>

            {/* Contract Statistics */}
            <Section title="Contract Statistics" icon={<FileText className="w-5 h-5" />}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Contracts" value={contracts.length} />
                <StatCard label="Active" value={2} color="green" />
                <StatCard label="Pending Renewal" value={1} color="orange" />
                <StatCard label="Expired" value={1} color="red" />
              </div>
            </Section>
          </Card>
        </main>
      </div>
    </div>
  );
}

function ContractCard({ contract }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Renewal Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Renewal Pending': return <Clock className="w-4 h-4" />;
      case 'Expired': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="border rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{contract.transporter}</h3>
          <p className="text-sm text-gray-600">{contract.duration}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(contract.status)}`}>
            {getStatusIcon(contract.status)} {contract.status}
          </span>
          <button className="p-1 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Agreed Rates:</span>
          <span className="font-medium">{contract.rates}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Contract Value:</span>
          <span className="font-medium">{contract.value}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Renewal Date:</span>
          <span className="font-medium">{contract.renewalDate}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-5 pt-4 border-t">
        <button className="flex-1 px-3 py-2 border rounded-xl hover:bg-gray-50 text-sm flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
        {contract.status === 'Active' && (
          <button className="flex-1 px-3 py-2 bg-[#211C84] text-white rounded-xl hover:bg-[#1a166b] text-sm">
            Renew
          </button>
        )}
        {contract.status === 'Renewal Pending' && (
          <button className="flex-1 px-3 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#D97706] text-sm">
            Renew Now
          </button>
        )}
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

function StatCard({ label, value, color = "blue" }) {
  const colorClasses = {
    blue: "text-[#211C84]",
    green: "text-green-600",
    orange: "text-orange-600",
    red: "text-red-600",
  };

  return (
    <div className="text-center p-4 border rounded-xl">
      <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}