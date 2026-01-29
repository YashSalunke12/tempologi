import React, { useState } from "react";
import {
  MapPin,
  Package,
  Truck,
  Calendar,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/corporateClient/Header";
import Sidebar from "../../components/corporateClient/Sidebar";
export default function NewShipmentRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    goodsType: "",
    weight: "",
    volume: "",
    vehicleType: "",
    deadline: "",
    instructions: "",
  });

  const vehicleTypes = [
    "Tempo",
    "Mini Truck",
    "Truck",
    "Container",
    "Refrigerated",
    "Flatbed",
    "Trailer",
  ];

  const goodsTypes = [
    "Electronics",
    "FMCG",
    "Pharmaceuticals",
    "Automotive",
    "Textiles",
    "Furniture",
    "Machinery",
    "Chemicals",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Shipment Request:", formData);
    // API call would go here
    alert("Shipment request submitted!");
  };

  return (
    <div className="min-h-screen bg-[#ebeafb] flex text-gray-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto overflow-y-auto">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Link to="/corporate/dashboard" className="p-2 hover:bg-[#ebeafb] rounded-xl">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold">New Shipment Request</h1>
                  <p className="text-sm text-gray-600">Create and request a new shipment from logistics partners</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Section */}
              <Section title="Location Details" icon={<MapPin className="w-5 h-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Pickup Location *</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-xl"
                      placeholder="Enter pickup address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Delivery Location *</label>
                    <input
                      type="text"
                      name="deliveryLocation"
                      value={formData.deliveryLocation}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-xl"
                      placeholder="Enter delivery address"
                      required
                    />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Or use <button type="button" className="text-[#211C84] hover:underline">map selection</button>
                </div>
              </Section>

              {/* Goods Details */}
              <Section title="Goods Details" icon={<Package className="w-5 h-5" />}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type of Goods *</label>
                    <select
                      name="goodsType"
                      value={formData.goodsType}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-xl"
                      required
                    >
                      <option value="">Select goods type</option>
                      {goodsTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Weight (kg) *</label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        placeholder="e.g., 500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Volume (cbm)</label>
                      <input
                        type="number"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl"
                        placeholder="e.g., 10"
                        step="0.1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Special Conditions</label>
                    <textarea
                      name="specialConditions"
                      className="w-full p-3 border rounded-xl"
                      placeholder="Fragile, Temperature sensitive, etc."
                      rows="2"
                    />
                  </div>
                </div>
              </Section>

              {/* Vehicle & Timing */}
              <Section title="Transport Details" icon={<Truck className="w-5 h-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Vehicle Type</label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-xl"
                    >
                      <option value="">Any suitable vehicle</option>
                      {vehicleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Delivery Deadline *</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        name="deadlineDate"
                        className="flex-1 p-3 border rounded-xl"
                        required
                      />
                      <input
                        type="time"
                        name="deadlineTime"
                        className="flex-1 p-3 border rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>
              </Section>

              {/* Additional Instructions */}
              <Section title="Additional Instructions" icon={<FileText className="w-5 h-5" />}>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl"
                  placeholder="Any special instructions for the transporter..."
                  rows="4"
                />
              </Section>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <Link
                  to="/corporate/dashboard"
                  className="px-6 py-3 border rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#211C84] text-white rounded-xl hover:bg-[#1a166b]"
                >
                  Submit Shipment Request
                </button>
              </div>
            </form>
          </Card>
        </main>
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
    <div className="border rounded-2xl p-4 sm:p-5">
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