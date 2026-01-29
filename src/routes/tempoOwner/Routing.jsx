import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../screens/tempoOwner/Dashboard";
import VehicleRegistration from "../../screens/tempoOwner/VehicleRegistration";
import VehicleList from "../../screens/tempoOwner/VehicleList";
import VehicleDetails from "../../screens/tempoOwner/VehicleDetails";
import VehicleAvailability from "../../screens/tempoOwner/VehicleAvailability";
import TripStatus from "../../screens/tempoOwner/TripStatus";
import ReturnTripSchedule from "../../screens/tempoOwner/ReturnTripSchedule";
import LoadMatches from "../../screens/tempoOwner/LoadMatches";
import BookingRequests from "../../screens/tempoOwner/BookingRequests";
import PaymentStatus from "../../screens/tempoOwner/PaymentStatus";
import Ratings from "../../screens/tempoOwner/Ratings";
import SettingProfile from "../../screens/tempoOwner/SettingProfile";

const TempoTruckRouting = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/vehicle-registration" element={<VehicleRegistration />} />
    <Route path="/vehicle-list" element={<VehicleList />} />
    <Route path="/vehicle-details" element={<VehicleDetails />} />
    <Route path="/vehicle-availability" element={<VehicleAvailability />} />
    <Route path="/trip-status" element={<TripStatus />} />
    <Route path="/return-trip-schedule" element={<ReturnTripSchedule />} />
    <Route path="/load-matches" element={<LoadMatches />} />
    <Route path="/booking-requests" element={<BookingRequests />} />
    <Route path="/payment-status" element={<PaymentStatus />} />
    <Route path="/ratings" element={<Ratings />} />
    <Route path="/settings-profile" element={<SettingProfile />} />
  </Routes>
);

export default TempoTruckRouting;