import React from "react";
import NavbarAdmin from "../../components/layout/NavBarA";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavbarAdmin />
      <main className="pt-28 px-6 md:px-12">
         <Outlet /> 
      </main>
    </div>
  );
}
