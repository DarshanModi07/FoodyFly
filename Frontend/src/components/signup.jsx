 
import { useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    savedAddress: "",
  });

  const [errors, setErrors] = useState({});

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate
  const validate = () => {

    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required 👤";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email 📧";

    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters 🔐";

    if (!formData.gender)
      newErrors.gender = "Please select gender 😊";

    if (!formData.savedAddress.trim())
      newErrors.savedAddress = "Address is required 🏠";

    setErrors(newErrors);

    // toast if validation fails
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields correctly ❌");
      return false;
    }

    return true;
  };


  // Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  const loadingToast = toast.loading("Creating account...");

  try {
    const res = await axios.post(BASE_URL + "signup", formData, {
      withCredentials: true,
    });

    toast.dismiss(loadingToast);
    toast.success("Account created successfully 🎉");

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);

  } catch (err) {
    toast.dismiss(loadingToast);

    setTimeout(() => {
      toast.error(err.response?.data?.message || "Signup failed ❌");
    }, 100);

    console.error(err.response?.data);
  }
};


  const inputClass = (field) =>
    `w-full px-4 py-2 border rounded-lg 
    bg-white text-black 
    dark:bg-gray-800 dark:text-white dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-blue-400
    ${errors[field] ? "border-red-500 focus:ring-red-400" : ""}`;


  return (
    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white">

      <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-8 mx-auto">

        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClass("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>


          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass("lastName")}
            />
          </div>


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
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>


          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputClass("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>


          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass("gender")}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>


          <div>
            <textarea
              name="savedAddress"
              placeholder="Address"
              value={formData.savedAddress ?? ""}
              onChange={(e) => {
                const value = e.target.value;

                setFormData(prev => ({
                  ...prev,
                  savedAddress: value
                }));
              }}
              rows={3}
              className={inputClass("savedAddress")}
            />
          </div>



          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Sign Up
          </button>

        </form>

          
          <div className="flex items-center my-4">
  <div className="flex-grow border-t border-gray-300"></div>
  <span className="mx-3 text-gray-400 text-sm">OR</span>
  <div className="flex-grow border-t border-gray-300"></div>
</div>

<button
  onClick={() => {
    window.location.href = BASE_URL+ "auth/google";
  }}
  className="
    w-full flex items-center justify-center gap-3
    bg-white text-gray-700 
    border border-gray-300 
    py-2 rounded-lg font-semibold
    shadow-sm
    hover:bg-gray-50 hover:shadow-md
    transition duration-300
    dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700
  "
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
    className="w-5 h-5"
  />

  Continue with Google
</button>




        <p className="text-center text-gray-500 mt-4">

          Already have an account?{" "}

          <NavLink to="/login" className="text-blue-600 font-medium">
            Login
          </NavLink>

        </p>

        <button
          onClick={() => navigate("/owner/signup")}
          className="w-full py-2 mt-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
        >
          Become a Restaurant Partner
        </button>

      </div>

    </div>
  );
};

export default Signup;