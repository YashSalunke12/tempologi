import React from "react";
import { Routes, Route } from "react-router-dom";
import BiddingBooking from "../../screens/consignee/BiddingBooking";
import Dashboard from "../../screens/consignee/Dashboard";
import Payments from "../../screens/consignee/Payments";
import PostLoad from "../../screens/consignee/PostLoad";
import RatingsFeedback from "../../screens/consignee/RatingsFeedback";
import SearchVehicle from "../../screens/consignee/SearchVehicle";
import SettingsProfile from "../../screens/consignee/SettingsProfile";
import ShipmentTracking from "../../screens/consignee/ShipmentTracking";
import TripHistoryReports from "../../screens/consignee/TripHistoryReports";

const ConsigneeRouting = () => (
  <Routes>
    <Route path="/bidding-booking" element={<BiddingBooking />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/payments" element={<Payments />} />
    <Route path="/post-load" element={<PostLoad />} />
    <Route path="/ratings-feedback" element={<RatingsFeedback />} />
    <Route path="/search-vehicle" element={<SearchVehicle />} />
    <Route path="/settings-profile" element={<SettingsProfile />} />
    <Route path="/shipment-tracking" element={<ShipmentTracking />} />
    <Route path="/trip-history-reports" element={<TripHistoryReports />} />
  </Routes>
);

export default ConsigneeRouting;