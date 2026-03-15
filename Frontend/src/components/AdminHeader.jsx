import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const LOGO_URL = import.meta.env.VITE_LOGO_URL;
import { useState } from "react";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = async () => {
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      toast.success("Logged out 👋");
      window.location.href="/"
    } catch {
      toast.error("Logout failed");
    }
  };

  const linkClass = ({ isActive }) =>
    `text-lg font-semibold transition-colors ${
      isActive
        ? "text-white underline underline-offset-4"
        : "text-white/80 hover:text-white"
    }`;

  return (
    <div className="bg-[#4a7ac3] dark:bg-gray-800 m-2 md:m-4 p-4 rounded-lg shadow-2xl text-white font-serif">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={LOGO_URL}
            alt="FoodyFly"
            className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
          />
          <div>
            <div className="font-bold text-xl md:text-2xl tracking-wide">
              FoodyFly
            </div>
            <div className="text-xs text-white/70 tracking-widest uppercase">
              Admin Portal
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">

          <ThemeToggle />

          <NavLink to="/admin/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/pending" className={linkClass}>
            Pending
          </NavLink>

          <NavLink to="/admin/restaurants" className={linkClass}>
            Restaurants
          </NavLink>

          <NavLink to="/admin/users" className={linkClass}>
            Users
          </NavLink>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Logout
          </button>

        </div>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">

          <ThemeToggle />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

        </div>

      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (

        <div className="md:hidden mt-4 pt-4 border-t border-white/20 flex flex-col gap-3">

          <NavLink
            to="/admin/dashboard"
            onClick={() => setIsMenuOpen(false)}
            className="text-base font-semibold text-white/80 hover:text-white"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/pending"
            onClick={() => setIsMenuOpen(false)}
            className="text-base font-semibold text-white/80 hover:text-white"
          >
            Pending
          </NavLink>

          <NavLink
            to="/admin/restaurants"
            onClick={() => setIsMenuOpen(false)}
            className="text-base font-semibold text-white/80 hover:text-white"
          >
            Restaurants
          </NavLink>

          <NavLink
            to="/admin/users"
            onClick={() => setIsMenuOpen(false)}
            className="text-base font-semibold text-white/80 hover:text-white"
          >
            Users
          </NavLink>

          <button
            onClick={logout}
            className="text-left text-base font-semibold text-white/80 hover:text-white"
          >
            Logout
          </button>

        </div>

      )}

    </div>
  );
};

export default AdminHeader;