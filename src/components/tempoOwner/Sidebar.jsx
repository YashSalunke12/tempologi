import React from "react";
import {
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  Truck,
  Calendar,
  Route,
  RefreshCcw,
  CreditCard,
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
    // Clear session (adjust as needed for your app)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
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
          <span className="font-semibold">Navigation</span>
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-[#ebeafb]"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          <SideLink icon={LayoutDashboard} to="/tempo-owner/dashboard">
            Dashboard
          </SideLink>
          <SideLink icon={Truck} to="/tempo-owner/vehicle-list">
            Vehicle List
          </SideLink>
          <SideLink icon={Calendar} to="/tempo-owner/vehicle-availability">
            Post Availability
          </SideLink>
          <SideLink icon={Route} to="/tempo-owner/trip-status">
            Trip Status
          </SideLink>
          <SideLink icon={RefreshCcw} to="/tempo-owner/return-trip-schedule">
            Post Return Trip
          </SideLink>
          <SideLink icon={CreditCard} to="/tempo-owner/payment-status">
            Payment Status
          </SideLink>
        </nav>

        <div className="mt-auto p-3 border-t flex items-center justify-between">
          {/* Settings navigation */}
          <button
            onClick={() => navigate("/tempo-owner/settings-profile")}
            className="text-sm text-gray-600 hover:text-[#211C84] flex items-center gap-2"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>

          {/* Logout button */}
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
