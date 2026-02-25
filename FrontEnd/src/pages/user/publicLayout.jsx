import React from "react";
import NavbarU from "../../components/layout/NavbarU";
import Footer from "../../components/layout/Footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <NavbarU />
      <main className="flex-1 bg-transparent">
         <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

