import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

// Components
import Body from "./components/Body.jsx";
import Header from "./components/Header.jsx";
import { RestroMenu } from "./components/RestroMenu.jsx";
import { Footer } from "./components/Footer.jsx";
import Profile from "./components/profile.jsx";
import Error from "./components/Error.jsx";
import Loading from "./components/Loading.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import EditProfile from "./components/EditProfile.jsx";
import OwnerSignup from "./components/OwnerSignup.jsx";
import OwnerHeader from "./components/OwnerHeader.jsx";
import OwnerDashboard from "./components/OwnerDashboard.jsx";
import OwnerCreateRestro from "./components/OwnerCreateRestro.jsx";
import OwnerAddItem from "./components/OwnerAddItem.jsx";
import OwnerEditItem from "./components/OwnerEditItem.jsx";
import OwnerEditRestaurant from "./components/OwnerEditRestaurant.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminHeader from "./components/AdminHeader.jsx";
import AdminPending from "./components/AdminPanding.jsx";
import AdminRestaurants from "./components/AdminRestaurants.jsx";
import AdminUsers from "./components/AdminUsers.jsx";
import AdminRestaurantDetail from "./components/AdminRestaurantDetail.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";
import OwnerOrders from "./components/OwnerOrder.jsx";

const About   = React.lazy(() => import("./components/About.jsx"));
const Contact = React.lazy(() => import("./components/Contact.jsx"));
const Cart    = React.lazy(() => import("./components/Cart.jsx"));

const BASE_URL = import.meta.env.VITE_BASE_URL;


const AppLayout = () => {
  const [role, setRole] = useState(null); 
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "verifyUser", {
          withCredentials: true,
        });

        if (res.data.success) {
          setRole(res.data.user.role);
        } else {
          setRole("guest");
        }
      } catch (err) {
        setRole("guest");
      } finally {
        setAuthChecked(true);
      }
    };

    verifyUser();
  }, []);

  if (!authChecked) return <Loading />;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="app">

        {/* ✅ FIXED HEADER SWITCHING */}
        {role === "owner" ? (
          <OwnerHeader key="owner" />
        ) : role === "admin" ? (
          <AdminHeader key="admin" />
        ) : (
          <Header key="user" /> 
        )}

        <Outlet />
        <Footer />

      </div>
    </>
  );
};


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },

      { path: "about", element: <Suspense fallback={<Loading />}><About /></Suspense> },
      { path: "contact", element: <Suspense fallback={<Loading />}><Contact /></Suspense> },
      { path: "cart", element: <Suspense fallback={<Loading />}><Cart /></Suspense> },

      { path: "editprofile", element: <EditProfile /> },
      { path: "restro/:id", element: <RestroMenu /> },

      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "profile", element: <Profile /> },

      // OWNER
      { path: "owner/signup", element: <OwnerSignup /> },
      { path: "owner/dashboard", element: <OwnerDashboard /> },
      { path: "owner/addItem", element: <OwnerAddItem /> },
      { path: "owner/editItem", element: <OwnerEditItem /> },
      { path: "owner/createRestaurant", element: <OwnerCreateRestro /> },
      { path: "owner/editRestaurant", element: <OwnerEditRestaurant /> },
      { path: "owner/orders", element: <OwnerOrders /> },

      // ADMIN
      { path: "admin/dashboard", element: <AdminDashboard /> },
      { path: "admin/pending", element: <AdminPending /> },
      { path: "admin/restaurants", element: <AdminRestaurants /> },
      { path: "admin/users", element: <AdminUsers /> },
      { path: "admin/restro/:id", element: <AdminRestaurantDetail /> },

      // PAYMENT
      { path: "success", element: <PaymentSuccess /> },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);