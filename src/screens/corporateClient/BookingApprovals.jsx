import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Package,
  Truck,
  IndianRupee,
  Filter,
  MoreVertical,
  AlertCircle,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function BookingApprovals() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const bookingRequests = [
    {
      id: 1,
      requestor: "Rajesh Mehta",
      department: "Procurement",
      shipment: "Electronics - Mumbai to Delhi",
      goods: "LED TVs (500 kg)",
      timeline: "2024-03-16 to 2024-03-18",
      cost: "₹45,000",
      transporter: "ABC Logistics",
      transporterRating: "4.8 ★",
      status: "pending",
      submitted: "2024-03-15 10:30",
    },
    {
      id: 2,
      requestor: "Priya Sharma",
      department: "Sales",
      shipment: "FMCG - Bangalore to Chennai",
      goods: "Packaged Foods (800 kg)",
      timeline: "2024-03-17 to 2024-03-19",
      cost: "₹38,500",
      transporter: "XYZ Transport",
      transporterRating: "4.5 ★",
      status: "approved",
      submitted: "2024-03-15 09:15",
    },
    {
      id: 3,
      requestor: "Amit Patel",
      department: "Operations",
      shipment: "Pharmaceuticals - Delhi to Kolkata",
      goods: "Medicines (300 kg, Refrigerated)",
      timeline: "2024-03-15 to 2024-03-17",
      cost: "₹52,000",
      transporter: "Swift Movers",
      transporterRating: "4.2 ★",
      status: "pending",
      submitted: "2024-03-14 16:45",
    },
    {
      id: 4,
      requestor: "Sneha Reddy",
      department: "Marketing",
      shipment: "Promotional Material - Pune to Hyderabad",
      goods: "Banners & Stands (200 kg)",
      timeline: "2024-03-18 to 2024-03-20",
      cost: "₹28,000",
      transporter: "Reliable Cargo",
      transporterRating: "4.7 ★",
      status: "rejected",
      submitted: "2024-03-14 14:20",
    },
  ];

  const filteredRequests = filter === "all" 
    ? bookingRequests 
    : bookingRequests.filter(req => req.status === filter);

  const stats = {
    total: bookingRequests.length,
    pending: bookingRequests.filter(req => req.status === "pending").length,
    approved: bookingRequests.filter(req => req.status === "approved").length,
    rejected: bookingRequests.filter(req => req.status === "rejected").length,
  };

  const handleAction = (id, action) => {
    console.log(`Booking ${id}: ${action}`);
    alert(`Booking ${id} ${action}`);
  };

  return (
    <div className="min-h-screen bg-[#ebeafb] flex flex-col lg:flex-row text-gray-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col w-full">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Booking Requests & Approvals</h1>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
              <div className="text-center p-3 sm:p-4 border rounded-lg sm:rounded-xl">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#211C84] mb-1">{stats.total}</p>
                <p className="text-xs sm:text-sm text-gray-600">Total Requests</p>
              </div>
              <div className="text-center p-3 sm:p-4 border rounded-lg sm:rounded-xl">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600 mb-1">{stats.pending}</p>
                <p className="text-xs sm:text-sm text-gray-600">Pending</p>
              </div>
              <div className="text-center p-3 sm:p-4 border rounded-lg sm:rounded-xl">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 mb-1">{stats.approved}</p>
                <p className="text-xs sm:text-sm text-gray-600">Approved</p>
              </div>
              <div className="text-center p-3 sm:p-4 border rounded-lg sm:rounded-xl">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600 mb-1">{stats.rejected}</p>
                <p className="text-xs sm:text-sm text-gray-600">Rejected</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
              {["all", "pending", "approved", "rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl capitalize text-xs sm:text-sm ${filter === tab 
                    ? 'bg-[#211C84] text-white' 
                    : 'border hover:bg-gray-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Booking Requests List */}
            <div className="space-y-3 sm:space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="border rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 sm:mb-4">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg">Request #{request.id}</h3>
                        <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs flex items-center gap-1 ${request.status === 'approved' ? 'bg-green-100 text-green-700' : request.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {request.status === 'approved' ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> : 
                           request.status === 'rejected' ? <XCircle className="w-3 h-3 sm:w-4 sm:h-4" /> : 
                           <Clock className="w-3 h-3 sm:w-4 sm:h-4" />} 
                          {request.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" /> {request.requestor} ({request.department})
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" /> {request.submitted}
                        </span>
                      </div>
                    </div>
                    <button className="self-start sm:self-auto p-1 hover:bg-gray-100 rounded-lg">
                      <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-start gap-2">
                      <Package className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Shipment</p>
                        <p className="text-xs sm:text-sm font-medium truncate">{request.shipment}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Package className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Goods</p>
                        <p className="text-xs sm:text-sm font-medium truncate">{request.goods}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Timeline</p>
                        <p className="text-xs sm:text-sm font-medium">{request.timeline}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Proposed Cost</p>
                        <p className="text-xs sm:text-sm font-medium">{request.cost}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Transporter</p>
                        <p className="text-xs sm:text-sm font-medium truncate">{request.transporter}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="text-xs sm:text-sm font-medium">{request.transporterRating}</p>
                      </div>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t">
                      <button
                        onClick={() => handleAction(request.id, 'approved')}
                        className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg sm:rounded-xl hover:bg-green-700 flex items-center justify-center gap-2 text-xs sm:text-sm"
                      >
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 sm:w-5 sm:h-5" /> 
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleAction(request.id, 'rejected')}
                        className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg sm:rounded-xl hover:bg-red-700 flex items-center justify-center gap-2 text-xs sm:text-sm"
                      >
                        <XCircle className="w-3 h-3 sm:w-4 sm:h-4 sm:w-5 sm:h-5" /> 
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleAction(request.id, 'modify')}
                        className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border rounded-lg sm:rounded-xl hover:bg-gray-50 text-xs sm:text-sm"
                      >
                        Request Modification
                      </button>
                    </div>
                  )}

                  {request.status === 'approved' && (
                    <div className="pt-3 sm:pt-4 border-t">
                      <p className="text-xs sm:text-sm text-green-600 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> 
                        Approved on {request.submitted}
                      </p>
                    </div>
                  )}

                  {request.status === 'rejected' && (
                    <div className="pt-3 sm:pt-4 border-t">
                      <p className="text-xs sm:text-sm text-red-600 flex items-center gap-2">
                        <XCircle className="w-3 h-3 sm:w-4 sm:h-4" /> 
                        Rejected on {request.submitted}
                      </p>
                      <button className="mt-2 px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border rounded-lg hover:bg-gray-50">
                        View Rejection Reason
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Approval Stats */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 border rounded-lg sm:rounded-xl bg-gray-50">
              <h3 className="font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Approval Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Avg. Approval Time</p>
                  <p className="text-base sm:text-lg font-semibold">2.5 hours</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Monthly Approval Rate</p>
                  <p className="text-base sm:text-lg font-semibold">85%</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Cost Savings (This Month)</p>
                  <p className="text-base sm:text-lg font-semibold">₹1.2L</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}