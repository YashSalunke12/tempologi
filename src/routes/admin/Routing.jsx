import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../../screens/admin/AdminDashboard";
import ProfileSettings from "../../screens/admin/ProfileSettings";
import UserKycManagement from "../../screens/admin/UserKycManagement";
import VehicleManagement from "../../screens/admin/VehicleManagement";
import VehicleDetails from "../../screens/admin/VehicleDetails";
import TripLoadMonitoring from "../../screens/admin/TripLoadMonitoring";
import BookingBiddingControl from "../../screens/admin/BookingBiddingControl";
import BidDetails from "../../screens/admin/BidDetails";
import PaymentsEscrowManagement from "../../screens/admin/PaymentsEscrowManagement";
import DisputeEscalationManagement from "../../screens/admin/DisputeEscalationManagement";
import RatingsReviewsControl from "../../screens/admin/RatingsReviewsControl";
import NotificationsAlerts from "../../screens/admin/NotificationsAlerts";
import AnalyticsReporting from "../../screens/admin/AnalyticsReporting";
import AdminUserManagement from "../../screens/admin/AdminUserManagement";

const AdminRouting = () => (
  <Routes>
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="settings-profile" element={<ProfileSettings />} />
    <Route path="user-kyc-management" element={<UserKycManagement />} />
    <Route path="vehicle-management" element={<VehicleManagement />} />
    <Route path="vehicle-management/:id" element={<VehicleDetails />} />
    <Route path="trip-load-monitoring" element={<TripLoadMonitoring />} />
    <Route path="booking-bidding-control" element={<BookingBiddingControl />} />
    <Route path="booking-bidding-control/bid/:id" element={<BidDetails />} />
    <Route path="payments-escrow-management" element={<PaymentsEscrowManagement />} />
    <Route path="dispute-escalation-management" element={<DisputeEscalationManagement />} />
    <Route path="ratings-reviews-control" element={<RatingsReviewsControl />} />
    <Route path="notifications-alerts" element={<NotificationsAlerts />} />
    <Route path="analytics-reporting" element={<AnalyticsReporting />} />
    <Route path="admin-user-management" element={<AdminUserManagement />} />
  </Routes>
);

export default AdminRouting;