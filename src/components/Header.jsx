import { LOGO_URL } from "../utils/constant";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import ThemeToggle from "./ThemeToggle";
import { UserContext } from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const onlineStatus = useOnlineStatus();
    const [logData, setlogData] = useState('login');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
    const { loggedInUser } = useContext(UserContext);

    const cartItems = useSelector((store) => store.cart.items);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-[#4a7ac3] m-2 md:m-4 p-4 rounded-lg shadow-2xl text-white font-serif dark:bg-gray-800 dark:text-white transition-all duration-300">
            
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="logo-container">
                        <img className="w-12 h-12 md:w-20 md:h-20 rounded-lg object-cover" src={LOGO_URL} alt="Logo" />
                    </div>
                    <div className="font-bold text-xl md:text-3xl tracking-wide">
                        FoodyFly
                    </div>
                </div>

                <button 
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}>
            
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>

                
                <div className="hidden md:block">
                    <ul className="flex items-center gap-6 lg:gap-9">
                        <li><ThemeToggle /></li>
                        <li className="text-xl lg:text-2xl hover:text-gray-200 transition-colors">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li className="text-xl lg:text-2xl hover:text-gray-200 transition-colors">
                            <NavLink to="/about">About Us</NavLink>
                        </li>
                        <li className="text-xl lg:text-2xl hover:text-gray-200 transition-colors">
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        <li className="text-xl lg:text-2xl font-bold hover:text-yellow-300 transition-colors">
                            <NavLink to="/cart">Cart ({cartItems.length})</NavLink>
                        </li>
                        {/* <button
                            className="bg-[#4caf50] hover:bg-[#43a047] py-1 px-4 rounded text-lg transition-colors shadow-md"
                            name="login"
                            onClick={() => {
                                let log = logData === "login" ? "Logout" : "login";
                                setlogData(log);
                            }}
                        >
                            {logData}
                        </button> */}
                    </ul>
                </div>
            </div>

            
            {isMenuOpen && (
                <div className="md:hidden mt-4 border-t border-white/20 pt-4 animate-EaseIn duration-200">
                    <ul className="flex flex-col gap-4 text-center text-lg">
                        {/* <li>
                            <button
                                className="bg-[#4caf50] w-full py-2 rounded text-lg shadow-md"
                                onClick={() => {
                                    let log = logData === "login" ? "Logout" : "login";
                                    setlogData(log);
                                    setIsMenuOpen(false);
                                }}
                            >
                                {logData}
                            </button>
                        </li> */}
                        <li className="flex justify-center items-center gap-2">
                              <ThemeToggle />
                        </li>
                        
                        <li>
                            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-white/10 rounded">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-white/10 rounded">About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:bg-white/10 rounded">Contact Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className="block py-2 font-bold hover:bg-white/10 rounded">
                                Cart ({cartItems.length} Items)
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;