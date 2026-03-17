import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 
import { NavLink } from "react-router-dom";


const Profile = () => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);


  const doLogOut = async () => {

    const loadingToast = toast.loading("Logging out..."); 
    try {

      const res = await axios.post(
        BASE_URL + "logout",
        {},
        { withCredentials: true }
      );

      console.log("logout response:", res.data);

      toast.dismiss(loadingToast);

      if (res.data.success === true) {

        toast.success("Logged out successfully 👋"); 

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
      else {

        toast.error("Logout failed ❌"); 
      }
    }
    catch (err) {

      toast.dismiss(loadingToast);
      console.log("Logout error:", err);
      toast.error("Logout error ❌"); 
    }
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "profile", {
        withCredentials: true,
      });
      console.log("Profile data:", res.data);
      setUser(res.data);
      setError(null);
    }
    catch (err) {
      console.error(err);
      const msg = err?.response?.data || "Failed to fetch profile";
      setError(msg);
      toast.error(msg); 
    }
    finally {
      setLoading(false);
    }
  };


  /* ================= LOADING / ERROR ================= */

  if (loading)
    return (
      <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white transition-colors duration-200">
        <div className="text-2xl font-semibold text-[#4a7ac3] dark:text-white animate-pulse">
          Loading Profile...
        </div>
      </div>
    );


  if (error)
    return (
      <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white transition-colors duration-200">
        <div className="bg-white dark:bg-gray-700 border-2 border-red-400 rounded-lg p-6 shadow-2xl text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      </div>
    );


  if (!user)
    return (
      <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white transition-colors duration-200">
        <div className="text-gray-600 dark:text-gray-300">
          No profile found
        </div>
      </div>
    );


  /* ================= MAIN PROFILE ================= */

  return (
    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white transition-colors duration-200">

      <div className="max-w-3xl mx-auto">


        <div className="mb-6">

          <h1 className="text-4xl font-bold text-[#4a7ac3] dark:text-white text-center">
            My Profile
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-300 mt-1">
            Manage your personal information
          </p>

          

        </div>



        <div className="bg-white dark:bg-gray-700 border-2 border-[#4a7ac3] rounded-xl shadow-2xl p-6 md:p-8">


          <div className="flex flex-col md:flex-row items-center gap-4 mb-6 pb-6 border-b border-[#4a7ac3]/40 dark:border-gray-500">

            <div className="w-24 h-24 rounded-full bg-[#4a7ac3] text-white flex items-center justify-center text-3xl font-bold shadow-lg">

              {user.firstName?.[0]}
              {user.lastName?.[0]}

            </div>

            

            <div className="text-center md:text-left">

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {user.firstName} {user.lastName}
              </h2>

              <p className="text-gray-600 dark:text-gray-300">
                {user.email}
              </p>

            </div>

          <NavLink to="/editprofile" className="md:ml-40  text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          <button
              className="bg-[#4a7ac3] hover:bg-[#3561a8] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300 ">
              Edit Profile
            </button>
          </NavLink>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            <div className="bg-[#d7e9f5] dark:bg-gray-800 rounded-lg p-4 border border-[#4a7ac3]/50">

              <label className="block text-sm font-semibold text-[#4a7ac3] dark:text-blue-300 mb-1">
                Email
              </label>

              <p className="text-lg text-gray-800 dark:text-white break-all">
                {user.email}
              </p>

            </div>



            <div className="bg-[#d7e9f5] dark:bg-gray-800 rounded-lg p-4 border border-[#4a7ac3]/50">

              <label className="block text-sm font-semibold text-[#4a7ac3] dark:text-blue-300 mb-1">
                Gender
              </label>

              <p className="text-lg text-gray-800 dark:text-white">
                {user.gender || "Not specified"}
              </p>

            </div>



            <div className="md:col-span-2 bg-[#d7e9f5] dark:bg-gray-800 rounded-lg p-4 border border-[#4a7ac3]/50">

              <label className="block text-sm font-semibold text-[#4a7ac3] dark:text-blue-300 mb-1">
                Address
              </label>

              <p className="text-lg text-gray-800 dark:text-white">
                {user.savedAddress || "No address saved"}
              </p>

            </div>

          </div>



          <div className="mt-8 pt-6 border-t border-[#4a7ac3]/40 dark:border-gray-500 flex justify-center">

            <button
              className="bg-[#4a7ac3] hover:bg-[#3561a8] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300"
              onClick={doLogOut}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;
