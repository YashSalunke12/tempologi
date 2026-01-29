import React, { useState } from "react";
import {
  CreditCard,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Filter,
  Search,
  IndianRupee,
  Wallet,
  Banknote,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";

export default function PaymentInvoicing() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [paymentMethod, setPaymentMethod] = useState("escrow");

  const walletData = {
    balance: "₹2,45,800",
    available: "₹1,85,000",
    onHold: "₹60,800",
    thisMonthSpend: "₹3,42,500",
  };

  const invoices = [
    {
      id: "INV-4567",
      transporter: "ABC Logistics",
      amount: "₹45,000",
      dueDate: "2024-03-20",
      status: "pending",
      shipmentId: "SH-78901",
      createdAt: "2024-03-15",
    },
    {
      id: "INV-4568",
      transporter: "XYZ Transport",
      amount: "₹38,500",
      dueDate: "2024-03-18",
      status: "paid",
      shipmentId: "SH-78902",
      createdAt: "2024-03-14",
      paidOn: "2024-03-15",
    },
    {
      id: "INV-4569",
      transporter: "Swift Movers",
      amount: "₹52,000",
      dueDate: "2024-03-22",
      status: "pending",
      shipmentId: "SH-78903",
      createdAt: "2024-03-15",
    },
    {
      id: "INV-4570",
      transporter: "Reliable Cargo",
      amount: "₹28,000",
      dueDate: "2024-03-25",
      status: "overdue",
      shipmentId: "SH-78904",
      createdAt: "2024-03-10",
    },
    {
      id: "INV-4571",
      transporter: "Fast Track Logistics",
      amount: "₹67,500",
      dueDate: "2024-04-05",
      status: "scheduled",
      shipmentId: "SH-78905",
      createdAt: "2024-03-15",
    },
  ];

  const paymentMethods = [
    { id: "escrow", name: "Escrow Balance", icon: Wallet },
    { id: "bank", name: "Bank Transfer", icon: Banknote },
    { id: "credit", name: "Credit Account", icon: CreditCard },
  ];

  const transactions = [
    { id: 1, type: "Payment", amount: "-₹45,000", to: "ABC Logistics", date: "2024-03-15", status: "completed" },
    { id: 2, type: "Credit", amount: "+₹2,00,000", from: "Corporate Account", date: "2024-03-10", status: "completed" },
    { id: 3, type: "Payment", amount: "-₹38,500", to: "XYZ Transport", date: "2024-03-14", status: "completed" },
    { id: 4, type: "Hold", amount: "-₹60,800", description: "Shipment Escrow", date: "2024-03-13", status: "onHold" },
  ];

  const filteredInvoices = invoices.filter(inv => 
    activeTab === "all" ? true : inv.status === activeTab
  );

  const handlePayNow = (invoiceId) => {
    console.log(`Paying invoice: ${invoiceId}`);
    alert(`Payment initiated for ${invoiceId}`);
  };

  const handleSchedulePayment = (invoiceId) => {
    console.log(`Scheduling payment for: ${invoiceId}`);
    alert(`Scheduling payment for ${invoiceId}`);
  };

  const totalPending = invoices
    .filter(inv => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.-]+/g, "")), 0);

  return (
    <div className="min-h-screen bg-[#ebeafb] flex flex-col lg:flex-row text-gray-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col w-full">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Payment & Invoicing</h1>
              </div>
            </div>

            {/* Wallet Balance */}
            <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold">Corporate Wallet</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6 mb-2 mx-auto text-[#211C84]" />
                  <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-[#211C84]">{walletData.balance}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Total Balance</p>
                </div>
                <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mb-2 mx-auto text-green-600" />
                  <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-green-600">{walletData.available}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Available Balance</p>
                </div>
                <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 mb-2 mx-auto text-yellow-600" />
                  <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-yellow-600">{walletData.onHold}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Amount on Hold</p>
                </div>
                <div className="border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 mb-2 mx-auto text-purple-600" />
                  <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-purple-600">{walletData.thisMonthSpend}</p>
                  <p className="text-xs sm:text-sm text-gray-600">This Month Spend</p>
                </div>
              </div>

              <div className="p-3 sm:p-4 border rounded-lg sm:rounded-xl bg-blue-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                  <div>
                    <p className="font-medium text-sm sm:text-base text-blue-800">Total Pending Payments</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-900">₹{totalPending.toLocaleString('en-IN')}</p>
                  </div>
                  <button className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 text-sm sm:text-base">
                    Add Funds
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold">Payment Methods</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`border rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "ring-1 sm:ring-2 ring-[#211C84] bg-[#ebeafb]"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="font-medium text-sm sm:text-base">{method.name}</span>
                      </div>
                      {paymentMethod === method.id && (
                        <p className="text-xs sm:text-sm text-gray-600 mt-2">
                          Selected as default payment method
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Invoices Section */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                {["all", "pending", "paid", "overdue", "scheduled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl capitalize text-xs sm:text-sm ${
                      activeTab === tab
                        ? "bg-[#211C84] text-white"
                        : "border hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Invoices List */}
              <div className="space-y-3 sm:space-y-4">
                {filteredInvoices.map((invoice) => {
                  const isDueSoon = () => {
                    const dueDate = new Date(invoice.dueDate);
                    const today = new Date();
                    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                    return diffDays <= 3 && diffDays >= 0;
                  };

                  const getStatusColor = (status) => {
                    switch (status) {
                      case "paid": return "bg-green-100 text-green-700";
                      case "pending": return "bg-yellow-100 text-yellow-700";
                      case "overdue": return "bg-red-100 text-red-700";
                      case "scheduled": return "bg-blue-100 text-blue-700";
                      default: return "bg-gray-100 text-gray-700";
                    }
                  };

                  const getStatusIcon = (status) => {
                    switch (status) {
                      case "paid": return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
                      case "pending": return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
                      case "overdue": return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
                      default: return null;
                    }
                  };

                  return (
                    <div key={invoice.id} className="border rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="font-semibold text-sm sm:text-base md:text-lg">{invoice.id}</h3>
                            <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(invoice.status)}`}>
                              {getStatusIcon(invoice.status)} {invoice.status.toUpperCase()}
                            </span>
                            {isDueSoon() && invoice.status === "pending" && (
                              <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
                                Due Soon
                              </span>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                            <div>
                              <p className="text-xs text-gray-500">Transporter</p>
                              <p className="text-xs sm:text-sm font-medium truncate">{invoice.transporter}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Amount</p>
                              <p className="text-xs sm:text-sm font-medium">{invoice.amount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Due Date</p>
                              <p className="text-xs sm:text-sm font-medium">{invoice.dueDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Shipment</p>
                              <p className="text-xs sm:text-sm font-medium">{invoice.shipmentId}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 self-stretch sm:self-auto">
                          {invoice.status === "paid" ? (
                            <div className="text-xs sm:text-sm text-green-600 flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                              Paid on {invoice.paidOn}
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handlePayNow(invoice.id)}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#211C84] text-white rounded-lg sm:rounded-xl hover:bg-[#1a166b] text-xs sm:text-sm"
                              >
                                Pay Now
                              </button>
                              <button
                                onClick={() => handleSchedulePayment(invoice.id)}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 border rounded-lg sm:rounded-xl hover:bg-gray-50 text-xs sm:text-sm"
                              >
                                Schedule
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {invoice.status === "overdue" && (
                        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-red-50 rounded-lg sm:rounded-xl">
                          <div className="flex items-center gap-2 text-red-700">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="font-medium text-sm sm:text-base">Overdue</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-semibold">Recent Transactions</h2>
              </div>
              
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 py-2 px-3 border-b text-xs sm:text-sm font-medium bg-gray-50 rounded-t-lg">
                    <div>Type</div>
                    <div>Amount</div>
                    <div>Details</div>
                    <div>Date</div>
                    <div>Status</div>
                  </div>
                  
                  {transactions.map((txn) => (
                    <div key={txn.id} className="grid grid-cols-1 sm:grid-cols-5 gap-2 py-3 px-3 border-b hover:bg-gray-50 last:border-b-0">
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          txn.type === "Payment" 
                            ? "bg-red-100 text-red-700"
                            : txn.type === "Credit"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {txn.type}
                        </span>
                      </div>
                      <div className="font-medium text-xs sm:text-sm">{txn.amount}</div>
                      <div className="text-xs sm:text-sm truncate">{txn.to || txn.from || txn.description}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{txn.date}</div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          txn.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {txn.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}