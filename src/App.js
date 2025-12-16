import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import Header from "./components/Header";
import {RestroMenu} from "./components/RestroMenu";
import {Footer} from "./components/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Error from "./components/Error";
import { Outlet } from "react-router-dom";
const About = React.lazy(() => import( "./components/About"));
const Contact = React.lazy(() => import( "./components/Contact"));
const Cart = React.lazy(() => import( "./components/Cart"));
import Loading from "./components/Loading";
// import { UserContext } from "./utils/UserContext";
import AppStore from "../redux/appStore"
import { Provider } from "react-redux"

const AppLayout = () => {
    return (
      // <UserContext.Provider value={{ loggedInUser: "Darshan" }}>
      <Provider store={AppStore}>
        <div className="app">
            <Header></Header>
            <Outlet />
            <Footer></Footer>
        </div>
      </Provider>
      // </UserContext.Provider>  
    )
}

// React-Router-DOM
const appRouter = createBrowserRouter([
  {   
    path: "/",
    element : <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "about",
        element: <Suspense fallback={<Loading />}><About /></Suspense>,
      },
      {
        path: "contact",
        element: <Suspense fallback={<Loading />}><Contact /></Suspense>,
      },
      {
        path: "cart",
        element: <Suspense fallback={<Loading />}><Cart /></Suspense>,
      },
      {
        path : "restro/:id",
        element : <RestroMenu/>
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}></RouterProvider>);