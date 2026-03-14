import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BASE_URL = process.env.BASE_URL;

const EditProfile = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    savedAddress: ""
  });

  const [loading, setLoading] = useState(true);


  // ================= FETCH PROFILE =================

  useEffect(() => {
    fetchProfile();
  }, []);


  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        BASE_URL + "profile",
        { withCredentials: true }
      );

      setFormData({
        firstName: res.data?.firstName || "",
        lastName: res.data?.lastName || "",
        gender: res.data?.gender || "",
        savedAddress: res.data?.savedAddress || ""
      });

    }
    catch (err) {

      toast.error(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to load profile ❌"
      );

    }
    finally {

      setLoading(false);

    }

  };


  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };


  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const loadingToast = toast.loading("Updating profile...");

    try {

      const res = await axios.patch(
        BASE_URL + "EditProfile",
        formData,
        { withCredentials: true }
      );

      toast.dismiss(loadingToast);

      toast.success("Profile updated successfully 🎉");

      console.log("Update response:", res.data);

      navigate("/profile");

    }
    catch (err) {

      toast.dismiss(loadingToast);

      toast.error(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Update failed ❌"
      );

    }

  };


  // ================= LOADING UI =================

  if (loading) {
    return (
      <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white">
        <div className="text-xl font-semibold animate-pulse">
          Loading Profile...
        </div>
      </div>
    );
  }


  // ================= STYLES =================

  const inputClass =
    "w-full px-4 py-2 border rounded-lg bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#4a7ac3]";


  // ================= UI =================

  return (

    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white">

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 border-2 border-[#4a7ac3] rounded-xl shadow-2xl p-6 md:p-8">

        <h1 className="text-3xl font-bold text-[#4a7ac3] dark:text-white text-center mb-6">
          Edit Profile
        </h1>


        <form onSubmit={handleSubmit} className="space-y-4">


          {/* First Name */}

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClass}
            required
          />


          {/* Last Name */}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClass}
          />


          {/* Gender */}

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>

          </select>


          {/* Address */}

          <textarea
            name="savedAddress"
            placeholder="Address"
            value={formData.savedAddress}
            onChange={handleChange}
            className={inputClass}
            rows="3"
          />


          {/* Buttons */}

          <div className="flex gap-4 justify-center mt-6">


            <button
              type="submit"
              className="bg-[#4a7ac3] hover:bg-[#3561a8] text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300"
            >
              Save Changes
            </button>


            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors duration-300"
            >
              Cancel
            </button>


          </div>


        </form>

      </div>

    </div>

  );

};

export default EditProfile;
