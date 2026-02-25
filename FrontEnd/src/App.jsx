import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoutes";

// Public
import PublicLayout from "./pages/user/publicLayout";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Products from "./pages/user/Products";
import Blog from "./pages/user/Blog";
import Contact from "./pages/user/Contacts";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// Admin
import DashboardLayout from "./pages/admin/HomeAdmin";
import DashboardHome from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/productmanagement";
import Orders from "./pages/admin/Order";
import Clients from "./pages/admin/user";
import Settings from "./pages/admin/settings";
import BlogAdmin from "./pages/admin/blogA";

export default function App() {
  return (
    <AuthProvider>
    <main className="pt-24">
    <Routes>
      {/* Public / utilisateur */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin - Protected Routes */}
      <Route element={<PrivateRoute />}>
  <Route element={<DashboardLayout />}>
    <Route path="/admin" element={<DashboardHome />} />
    <Route path="/admin/dashboard" element={<DashboardHome />} />
    <Route path="/admin/productmanagement" element={<ProductManagement />} />
    <Route path="/admin/Order" element={<Orders />} />
    <Route path="/admin/blogA" element={<BlogAdmin/>} /> 
    <Route path="/admin/user" element={<Clients />} />
    <Route path="/admin/settings" element={<Settings />} />
  </Route>
</Route>

    </Routes>
    </main>
    </AuthProvider>
  );
}
