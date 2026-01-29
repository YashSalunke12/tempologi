import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth screens
import KycUpload from "../../screens/auth/KycUpload";
import Login from "../../screens/auth/Login";
import OtpVerification from "../../screens/auth/OtpVerification";
import RegistrationOtpVerification from "../../screens/auth/RegistrationOtpVerification";
import SignUp from "../../screens/auth/SignUp";

const AuthRouting = () => (
  <Routes>
    {/* Auth routes */}
    <Route path="/kyc-upload" element={<KycUpload />} />
    <Route path="/login" element={<Login />} />
    <Route path="/otp-verification" element={<OtpVerification />} />
    <Route path="/registration-otp-verification" element={<RegistrationOtpVerification />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
);

export default AuthRouting;