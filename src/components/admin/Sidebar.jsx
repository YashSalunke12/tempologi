import React from "react";
import {
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  Users,
  Truck,
  Activity,
  Gavel,
  Star,
  Bell,
  BarChart,
  Shield,
  FileText,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function SideLink({ children, icon: Icon, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-xl text-sm border hover:bg-[#ebeafb] ${
          isActive ? "bg-[#ebeafb] border-[#211C84]" : "border-transparent"
        }`
      }
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-50 inset-y-0 left-0 w-72 bg-white border-r shadow-xl transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
        aria-label="Sidebar"
      >
        <div className="h-14 border-b flex items-center justify-between px-4">
          <span className="font-semibold">Admin Navigation</span>
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[#ebeafb]"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          <SideLink icon={LayoutDashboard} to="/admin/dashboard">
            Dashboard
          </SideLink>
          <SideLink icon={Users} to="/admin/user-kyc-management">
            User KYC Management
          </SideLink>
          <SideLink icon={Truck} to="/admin/vehicle-management">
            Vehicle Management
          </SideLink>
          <SideLink icon={Activity} to="/admin/trip-load-monitoring">
            Trip Load Monitoring
          </SideLink>
          <SideLink icon={FileText} to="/admin/booking-bidding-control">
            Booking & Bidding Control
          </SideLink>
          <SideLink icon={Shield} to="/admin/payments-escrow-management">
            Payments & Escrow
          </SideLink>
          <SideLink icon={Gavel} to="/admin/dispute-escalation-management">
            Dispute Escalation
          </SideLink>
          <SideLink icon={Star} to="/admin/ratings-reviews-control">
            Ratings & Reviews
          </SideLink>
          <SideLink icon={Bell} to="/admin/notifications-alerts">
            Notifications & Alerts
          </SideLink>
          <SideLink icon={BarChart} to="/admin/analytics-reporting">
            Analytics & Reporting
          </SideLink>
          <SideLink icon={Users} to="/admin/admin-user-management">
            Admin User Management
          </SideLink>
        </nav>

        <div className="mt-auto p-3 border-t flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/settings-profile")}
            className="text-sm text-gray-600 hover:text-[#211C84] flex items-center gap-2"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-[#211C84] flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
