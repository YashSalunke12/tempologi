import React from "react";
import { Routes, Route } from "react-router-dom";
import CorporateDashboard from "../../screens/corporateClient/Dashboard";
import NewShipmentRequest from "../../screens/corporateClient/NewShipmentRequest";
import ContractManagement from "../../screens/corporateClient/ContractManagement";
import ShipmentTracking from "../../screens/corporateClient/ShipmentTracking";
import BookingApprovals from "../../screens/corporateClient/BookingApprovals";
import PaymentInvoicing from "../../screens/corporateClient/PaymentInvoicing";
import ReportsAnalytics from "../../screens/corporateClient/ReportsAnalytics";
import UserRoleManagement from "../../screens/corporateClient/UserRoleManagement";
import RatingsFeedback from "../../screens/corporateClient/RatingsFeedback";
import Notifications from "../../screens/corporateClient/Notifications";
import SettingsProfile from "../../screens/corporateClient/SettingsProfile";

const CorporateRouting = () => (
  <Routes>
    <Route path="/dashboard" element={<CorporateDashboard />} />
    <Route path="/new-shipment" element={<NewShipmentRequest />} />
    <Route path="/contract-management" element={<ContractManagement />} />
    <Route path="/shipment-tracking" element={<ShipmentTracking />} />
    <Route path="/booking-approvals" element={<BookingApprovals />} />
    <Route path="/payment-invoicing" element={<PaymentInvoicing />} />
    <Route path="/reports-analytics" element={<ReportsAnalytics />} />
    <Route path="/user-management" element={<UserRoleManagement />} />
    <Route path="/ratings-feedback" element={<RatingsFeedback />} />
    <Route path="/notifications" element={<Notifications />} />
    <Route path="/settings-profile" element={<SettingsProfile />} />
  </Routes>
);

export default CorporateRouting;