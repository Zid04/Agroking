import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./components/PrivateRoute";
import DashboardHome from "./pages/admin/DashboardHome";
import ProductManagement from "./pages/admin/ProductManagement";
import Orders from "./pages/admin/Orders";
import Clients from "./pages/admin/Clients";
import Settings from "./pages/admin/Settings";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Toutes les routes admin passent par PrivateRoute */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<DashboardHome />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/clients" element={<Clients />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}
