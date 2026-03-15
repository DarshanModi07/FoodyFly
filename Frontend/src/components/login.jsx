import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [showAuth, setShowAuth] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});



  // Handle Input Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };



  // Validation
  const validate = () => {

    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email 📧";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters 🔐";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please enter valid credentials ❌");
      return false;
    }

    return true;
  };



  // Verify User (check if already logged in)
  useEffect(() => {

    const verifyUser = async () => {

      try {

        const res = await axios.get(
          BASE_URL + "verifyUser",
          { withCredentials: true }
        );

        if (res.data.success) {
          setShowAuth(false);
          navigate("/");
        }

      } catch (err) {
        setShowAuth(true);
      }

    };

    verifyUser();

  }, []);



  // Submit Login
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    const loadingToast = toast.loading("Logging in...");

    try {

      const res = await axios.post(
        BASE_URL + "login",
        formData,
        { withCredentials: true }
      );

      toast.dismiss(loadingToast);

      toast.success(
        "Welcome back " +
        res?.data?.user?.firstName +
        " " +
        res?.data?.user?.lastName +
        " 🎉"
      );

      const user = res.data.user;

      setTimeout(() => {

        if (user.role === "admin") {
          // navigate("/admin/dashboard");
          window.location.href = "/admin/dashboard";
        }

        else if (user.role === "owner") {
          // navigate("/owner/dashboard");
          window.location.href = "/owner/dashboard";
        }

        else {
          // navigate("/");
          window.location.href = "/";
        }

      }, 1000);

    }
    catch (err) {

      toast.dismiss(loadingToast);

      toast.error(
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed ❌"
      );

      console.error(err);
    }
  };



  // Input Styling
  const inputClass = (field) =>
    `w-full px-4 py-2 border rounded-lg
    bg-white text-black
    dark:bg-gray-800 dark:text-white dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-blue-400
    ${errors[field] ? "border-red-500 focus:ring-red-400" : ""}`;



  if (!showAuth) return null;



  return (

<div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white transition-colors duration-200">

  <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-8 mx-auto border dark:border-gray-600">

    <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
      Login Account
    </h2>


    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Email */}
      <div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className={inputClass("email")}
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email}
          </p>
        )}

      </div>


      {/* Password */}
      <div>

        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
          className={inputClass("password")}
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password}
          </p>
        )}

      </div>


      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>



      {/* OR Divider */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-3 text-gray-400 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>



      {/* Google Login */}
      <button
        type="button"
        onClick={() => {
          window.location.href = "http://localhost:7777/auth/google";
        }}
        className="w-full flex items-center justify-center gap-3
        bg-white text-gray-700
        border border-gray-300
        py-2 rounded-lg font-semibold
        shadow-sm
        hover:bg-gray-50 hover:shadow-md
        transition duration-300
        dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
      >

        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-5 h-5"
        />

        Continue with Google

      </button>

    </form>



    <p className="text-center text-gray-500 dark:text-gray-300 mt-4">

      Do not have an account?{" "}

      <span className="text-blue-600 dark:text-blue-400 cursor-pointer font-medium">

        <NavLink to="/signup">
          Signup
        </NavLink>

      </span>

    </p>

  </div>

</div>

  );

};

export default Login;