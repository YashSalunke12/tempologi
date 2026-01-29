import React, { useState } from "react";
import {
  Wallet,
  IndianRupee,
  RefreshCcw,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  ChevronRight,
  CreditCard,
  Percent,
} from "lucide-react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

export default function PaymentsEscrowManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy Data
  const escrowStats = {
    incoming: "₹2,50,000",
    pendingRelease: "₹75,000",
    platformFee: "₹15,000",
    refunds: "₹10,000",
    payouts: "₹2,25,000",
  };

  const reconciliation = [
    { id: 1, gateway: "Razorpay", settled: "₹1,20,000", pending: "₹10,000" },
    { id: 2, gateway: "Cashfree", settled: "₹80,000", pending: "₹5,000" },
    { id: 3, gateway: "Paytm", settled: "₹50,000", pending: "₹3,000" },
  ];

  const transactions = [
    {
      id: 1,
      user: "ABC Logistics",
      type: "Incoming",
      amount: "₹50,000",
      status: "Completed",
    },
    {
      id: 2,
      user: "XYZ Transport",
      type: "Pending Release",
      amount: "₹20,000",
      status: "On Hold",
    },
    {
      id: 3,
      user: "SafeMove Carriers",
      type: "Refund",
      amount: "₹10,000",
      status: "Processed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Wallet className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">
                Payments & Escrow Management
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Wallet Overview */}
                <Section
                  title="Escrow Wallet Overview"
                  icon={<IndianRupee className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
                    <Stat label="Incoming Payments" value={escrowStats.incoming} />
                    <Stat
                      label="Pending Release"
                      value={escrowStats.pendingRelease}
                    />
                    <Stat label="Platform Fee" value={escrowStats.platformFee} />
                    <Stat label="Refunds" value={escrowStats.refunds} />
                    <Stat label="Payouts" value={escrowStats.payouts} />
                  </div>
                </Section>

                {/* Transactions Table */}
                <Section
                  title="Transactions"
                  icon={<RefreshCcw className="w-5 h-5" />}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border rounded-xl overflow-hidden">
                      <thead className="bg-[#f5f4ff] text-left">
                        <tr>
                          <th className="px-3 py-2">User</th>
                          <th className="px-3 py-2">Type</th>
                          <th className="px-3 py-2">Amount</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((t) => (
                          <tr
                            key={t.id}
                            className="border-t hover:bg-[#f9f9ff]"
                          >
                            <td className="px-3 py-2">{t.user}</td>
                            <td className="px-3 py-2">
                              <TypeBadge type={t.type} />
                            </td>
                            <td className="px-3 py-2">{t.amount}</td>
                            <td className="px-3 py-2">
                              <StatusBadge status={t.status} />
                            </td>
                            <td className="px-3 py-2">
                              {t.type === "Pending Release" ? (
                                <Button variant="primary">Release</Button>
                              ) : t.type === "Refund" ? (
                                <Button variant="secondary">Process Refund</Button>
                              ) : (
                                <Button variant="ghost">View</Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Section>

                {/* Reconciliation */}
                <Section
                  title="Payment Gateway Reconciliation"
                  icon={<CreditCard className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {reconciliation.map((g) => (
                      <div
                        key={g.id}
                        className="p-3 bg-[#f9f9ff] rounded-xl border"
                      >
                        <p className="text-sm font-semibold">{g.gateway}</p>
                        <p className="text-xs text-gray-600">
                          Settled: {g.settled}
                        </p>
                        <p className="text-xs text-gray-600">
                          Pending: {g.pending}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Commission Tracking */}
                <Section
                  title="Commission Tracking"
                  icon={<Percent className="w-5 h-5" />}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Stat label="Platform Fee Collected" value="₹15,000" />
                    <Stat label="Total Payouts to Vendors" value="₹2,25,000" />
                  </div>
                </Section>
              </div>

              {/* Right Section - Summary / Help */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Monitor escrow
                      balances in real-time.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Release or
                      refund payments manually if required.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Reconcile
                      Razorpay, Cashfree, and Paytm settlements.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Track platform
                      commissions vs. payouts.
                    </li>
                  </ul>

                  <div className="mt-4 p-3 bg-[#ebeafb] rounded-xl border text-xs">
                    Tip: Ensure reconciliation is done daily to avoid disputes.
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Contact finance team or view detailed reconciliation docs.
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

function Stat({ label, value }) {
  return (
    <div className="p-3 bg-[#f9f9ff] rounded-xl border text-center">
      <p className="text-xs text-gray-600">{label}</p>
      <p className="font-semibold">{value}</p>
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
      className={`px-3 py-1.5 rounded-xl text-sm font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Completed: "bg-green-100 text-green-700",
    "On Hold": "bg-yellow-100 text-yellow-700",
    Processed: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full ${colors[status] || "bg-gray-100 text-gray-700"
        }`}
    >
      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  const icons = {
    Incoming: <ArrowDownRight className="w-4 h-4 text-green-600" />,
    "Pending Release": <ArrowUpRight className="w-4 h-4 text-yellow-600" />,
    Refund: <Scale className="w-4 h-4 text-blue-600" />,
  };
  return (
    <span className="flex items-center gap-1 text-xs font-medium">
      {icons[type]} {type}
    </span>
  );
}
