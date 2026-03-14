import React, { useState, useEffect, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import axios from "axios";

// Components
import Body from "./components/Body";
import Header from "./components/Header";
import { RestroMenu } from "./components/RestroMenu";
import { Footer } from "./components/Footer";
import Profile from "./components/profile";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Login from "./components/login";
import Signup from "./components/signup";
import EditProfile from "./components/EditProfile";
import OwnerSignup from "./components/OwnerSignup";
import OwnerHeader from "./components/OwnerHeader";
import OwnerDashboard from "./components/OwnerDashboard";
import OwnerCreateRestro from "./components/OwnerCreateRestro";
import OwnerAddItem from "./components/OwnerAddItem";
import OwnerEditItem from "./components/OwnerEditItem";
import OwnerEditRestaurant from "./components/OwnerEditRestaurant";
import AdminDashboard from "./components/AdminDashboard";
import AdminHeader from "./components/AdminHeader";
import AdminPending from "./components/AdminPanding";
import AdminRestaurants from "./components/AdminRestaurants";
import AdminUsers from "./components/AdminUsers";
import AdminRestaurantDetail from "./components/AdminRestaurantDetail";
import PaymentSuccess from "./components/PaymentSuccess";
import OwnerOrders from"./components/OwnerOrder"

const About   = React.lazy(() => import("./components/About"));
const Contact = React.lazy(() => import("./components/Contact"));
const Cart    = React.lazy(() => import("./components/Cart"));

import OwnerOrders from "./components/OwnerOrder";
const BASE_URL = process.env.BASE_URL; 

const AppLayout = () => {
  const [userData, setUserData]     = useState(null);
  const [role, setRole]             = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "verifyUser", {
          withCredentials: true,
        });

        if (res.data.success) {
          setUserData(res.data.user);
          const userRole = res.data.user.role;
          setRole(userRole);

          if (userRole === "owner") {
            navigate("/owner/dashboard");
          } else if (userRole === "admin") {
            navigate("/admin/dashboard");
          }
        } else {
          setRole("user");
        }
      } catch {
        setRole("user");
      }

      setAuthChecked(true);
    };

    verifyUser();
  }, []); 

  if (!authChecked) return <Loading />;  

  return (
    <Provider store={AppStore}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="app">
        {role === "owner" && <OwnerHeader />}
        {role === "admin" && <AdminHeader />}
        {role === "user"  && <Header />}
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/",            element: <Body /> },
      { path: "about",        element: <Suspense fallback={<Loading />}><About /></Suspense> },
      { path: "contact",      element: <Suspense fallback={<Loading />}><Contact /></Suspense> },
      { path: "cart",         element: <Suspense fallback={<Loading />}><Cart /></Suspense> },
      { path: "editprofile",  element: <EditProfile /> },
      { path: "restro/:id",   element: <RestroMenu /> },
      { path: "login",        element: <Login /> },
      { path: "signup",       element: <Signup /> },
      { path: "profile",      element: <Profile /> },
      { path: "owner/signup",     element: <OwnerSignup /> },
      { path: "owner/dashboard",  element: <OwnerDashboard /> },
      { path: "owner/addItem",  element: <OwnerAddItem /> },
      { path: "owner/editItem",  element: <OwnerEditItem /> },
      { path: "owner/createRestaurant", element: <OwnerCreateRestro /> },
      { path: "owner/editRestaurant", element: <OwnerEditRestaurant /> },
      { path: "owner/orders",element : <OwnerOrders/>},
      { path: "admin/dashboard", element : <AdminDashboard /> },
      { path: "admin/pending", element : <AdminPending /> },
      { path: "admin/restaurants", element : <AdminRestaurants /> },
      { path: "admin/users", element : <AdminUsers /> },
      { path: "admin/restro/:id", element : <AdminRestaurantDetail /> },
      { path: "success", element: <PaymentSuccess />  },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);