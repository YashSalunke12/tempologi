import React, { useState } from "react";
import { CreditCard, Wallet, Shield, Gift, ChevronRight } from "lucide-react";
import Header from "../../components/consignee/Header";
import Sidebar from "../../components/consignee/Sidebar";

export default function Payments() {
  const [paymentMode, setPaymentMode] = useState("Prepaid");
  const [gateway, setGateway] = useState("Razorpay");
  const [escrow, setEscrow] = useState("Enabled");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      {/* Sidebar (mobile overlay + desktop fixed) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-semibold">Payments</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <div className="lg:col-span-2 space-y-6">
                {/* Payment Modes */}
                <Section title="Payment Modes">
                  <RadioRow
                    name="paymentMode"
                    options={["Prepaid", "Postpaid", "Cash on Delivery"]}
                    value={paymentMode}
                    onChange={setPaymentMode}
                  />
                </Section>

                {/* Gateways */}
                <Section title="Available Gateways">
                  <PillGroup
                    options={["Razorpay", "Paytm", "UPI"]}
                    value={gateway}
                    onChange={setGateway}
                  />
                </Section>

                {/* Escrow */}
                <Section title="Escrow Mode" icon={<Shield className="w-5 h-5" />}>
                  <RadioRow
                    name="escrow"
                    options={["Enabled", "Disabled"]}
                    value={escrow}
                    onChange={setEscrow}
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Funds will be held securely until delivery confirmation.
                  </p>
                </Section>

                {/* Wallet */}
                <Section title="Wallet System" icon={<Wallet className="w-5 h-5" />}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input placeholder="Enter recharge amount" type="number" />
                    <Button>Recharge</Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Current Balance: ₹0.00</p>
                </Section>

                {/* Refunds */}
                <Section title="Refund Tracking">
                  <p className="text-sm text-gray-600">
                    Track refund status for canceled or failed transactions.
                  </p>
                  <Button variant="secondary" className="mt-3">View Refunds</Button>
                </Section>

                {/* Promo Codes */}
                <Section title="Promo Codes" icon={<Gift className="w-5 h-5" />}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input placeholder="Enter promo code" />
                    <Button>Apply</Button>
                  </div>
                </Section>
              </div>

              {/* Column 2 (Summary/Help) */}
              <aside className="lg:col-span-1 space-y-6">
                <Card>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Multiple payment
                      options supported.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Escrow secures your
                      payments until delivery.
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5" /> Apply promo codes for
                      discounts.
                    </li>
                  </ul>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Contact support for payment or refund issues.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="secondary">Chat Support</Button>
                    <Button variant="ghost">FAQs</Button>
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
          <h2 className="text-base sm:text-lg font-semibold"> {title}</h2>
        </div>
      )}
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
