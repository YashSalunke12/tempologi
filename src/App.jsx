import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConsigneeRouting from './routes/consignee/routing';
import AuthRouting from './routes/auth/Routing';
import TempoTruckRouting from './routes/tempoOwner/Routing';
import AdminRouting from './routes/admin/Routing';
import CorporateRouting from './routes/corporateClient/Routing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes */}
        <Route path="/*" element={<AuthRouting />} />

        {/* Consignee routes */}
        <Route path="/consignee/*" element={<ConsigneeRouting />} />

        {/* Tempo Truck Owner routes */}
        <Route path="/tempo-owner/*" element={<TempoTruckRouting />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminRouting />} />

        {/* Corporate Client routes */}
        <Route path="/corporate-client/*" element={<CorporateRouting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
