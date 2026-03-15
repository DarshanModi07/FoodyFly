import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const LOGO_URL = import.meta.env.VITE_LOGO_URL;

const OwnerHeader = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAuth, setShowAuth] = useState(true);
    const [restroName, setRestroName] = useState("");
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        const init = async () => {
            try {
                const res = await axios.get(BASE_URL + "verifyUser", { withCredentials: true });
                if (res.data.success) {
                    setShowAuth(false);
                    try {
                        const restro = await axios.get(BASE_URL + "owner/myRestaurant", { withCredentials: true });
                        setRestroName(restro.data.data?.restaurant?.RestroName || "");
                        setStatus(restro.data.data?.menu?.status || "pending");
                    } catch {}
                } else {
                    setShowAuth(true);
                }
            } catch {
                setShowAuth(true);
            }
        };
        init();
    }, []);

    const doLogOut = async () => {
        try {
            const res = await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
            if (res.data.success) {
                toast.success("Logged out successfully 👋");
                window.location.href = "/";
            }
        } catch {
            toast.error("Logout failed");
        }
    };

    const statusStyle = {
        approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        rejected:  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        pending:   "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    };

    const navLinks = [
        { to: "/owner/dashboard", label: "Dashboard" },
        { to: "/owner/addItem",   label: "Add Item"   },
        { to: "/owner/orders",    label: "Orders"     },
        { to: "/profile",         label: "Profile"    },
    ];

    return (
        <div className="bg-[#4a7ac3] dark:bg-gray-800 m-2 md:m-4 p-4 rounded-lg shadow-2xl text-white font-serif transition-all duration-300">

            <div className="flex justify-between items-center">

                <div className="flex items-center gap-3">
                    <img src={LOGO_URL} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover" />
                    <div>
                        <div className="font-bold text-xl md:text-2xl tracking-wide">FoodyFly</div>
                        <div className="text-xs text-white/70 tracking-widest uppercase">Owner Portal</div>
                    </div>
                </div>

                {restroName && (
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-white/80 text-base font-semibold">{restroName}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusStyle[status] || statusStyle.pending}`}>
                            {status === "approved" ? "✓ " : "⏳ "}{status}
                        </span>
                    </div>
                )}

                <div className="hidden md:flex items-center gap-4 lg:gap-6">
                    <ThemeToggle />
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-lg font-semibold transition-colors ${
                                    isActive ? "text-white underline underline-offset-4" : "text-white/80 hover:text-white"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    {showAuth ? (
                        <NavLink to="/login" className="text-lg font-semibold text-white/80 hover:text-white transition-colors">
                            Login
                        </NavLink>
                    ) : (
                        <button
                            onClick={doLogOut}
                            className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                        >
                            Logout
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl focus:outline-none">
                        {isMenuOpen ? "✖" : "☰"}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-white/20 flex flex-col gap-3">
                    {restroName && (
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-white/80 text-sm">{restroName}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${statusStyle[status] || statusStyle.pending}`}>
                                {status}
                            </span>
                        </div>
                    )}
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-base font-semibold transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-white"}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    {showAuth ? (
                        <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="text-base font-semibold text-white/80 hover:text-white">
                            Login
                        </NavLink>
                    ) : (
                        <button onClick={doLogOut} className="text-left text-base font-semibold text-white/80 hover:text-white transition-colors">
                            Logout
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default OwnerHeader;