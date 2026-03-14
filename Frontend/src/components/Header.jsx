import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import ThemeToggle from "./ThemeToggle";
import { UserContext } from "../utils/UserContext";
import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const LOGO_URL = process.env.LOGO_URL;

const Header = () => {

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  const [showAuth, setShowAuth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {

      const res = await axios.get(
        BASE_URL + "allOrders",
        { withCredentials:true }
      );

      setCartCount(res.data.data?.length || 0);

    } catch {

      setCartCount(0);

    }
  };

  useEffect(() => {

    fetchCartCount();

    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };

  }, []);

  useEffect(() => {

    const verifyUser = async () => {

      try {

        const res = await axios.get(
          BASE_URL + "verifyUser",
          { withCredentials:true }
        );

        setShowAuth(!res.data.success);

      } catch {

        setShowAuth(true);

      }

    };

    verifyUser();

  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (

    <div className="bg-[#4a7ac3] m-2 md:m-4 p-4 rounded-lg shadow-2xl text-white font-serif dark:bg-gray-800 transition-all">

      {/* TOP BAR */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <img
            className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
            src={LOGO_URL}
            alt="Logo"
          />

          <h1 className="font-bold text-xl md:text-3xl tracking-wide">
            FoodyFly
          </h1>

        </div>

        {/* DESKTOP MENU */}

        <ul className="hidden md:flex items-center gap-6 lg:gap-10">

          <li><ThemeToggle /></li>

          <li className="text-lg lg:text-xl hover:text-gray-200">
            <NavLink to="/">Home</NavLink>
          </li>

          <li className="text-lg lg:text-xl hover:text-gray-200">
            <NavLink to="/about">About</NavLink>
          </li>

          <li className="text-lg lg:text-xl hover:text-gray-200">
            <NavLink to="/contact">Contact</NavLink>
          </li>

          <li className="text-lg lg:text-xl">
            <NavLink to="/cart">
              Cart ({cartCount})
            </NavLink>
          </li>

          {showAuth ? (

            <>
              <li className="text-lg lg:text-xl">
                <NavLink to="/login">Login</NavLink>
              </li>

              <li className="text-lg lg:text-xl">
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>

          ) : (

            <li className="text-lg lg:text-xl">
              <NavLink to="/profile">Profile</NavLink>
            </li>

          )}

        </ul>

        {/* MOBILE RIGHT SIDE */}

        <div className="flex items-center gap-3 md:hidden">

          <ThemeToggle />

          <button
            onClick={toggleMenu}
            className="text-2xl"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {isMenuOpen && (

        <div className="md:hidden mt-4 border-t border-white/20 pt-4">

          <ul className="flex flex-col gap-4 text-lg">
            
            <NavLink to="/">
            <li onClick={closeMenu} className="text-center">
              Home
            </li>
            </NavLink>

              <NavLink to="/about">
            <li onClick={closeMenu} className="text-center">
              About
            </li>
              </NavLink>

              <NavLink to="/contact">
            <li onClick={closeMenu} className="text-center">
              Contact
            </li>
              </NavLink>

              <NavLink to="/cart">
            <li onClick={closeMenu} className="text-center">
                Cart ({cartCount})
            </li>
              </NavLink>

            {showAuth ? (

              <>
                  <NavLink to="/login">
                <li onClick={closeMenu} className="text-center">
                  Login
                </li>
                  </NavLink>

                  <NavLink to="/signup">
                <li onClick={closeMenu} className="text-center">
                  Signup
                </li>
                  </NavLink>
              </>

            ) : (

                <NavLink to="/profile">
              <li onClick={closeMenu} className="text-center">
                Profile
              </li>
                </NavLink>

            )}

          </ul>

        </div>

      )}

    </div>

  );

};

export default Header;