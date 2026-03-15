import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const BASE_URL = process.env.BASE_URL;


const inputClass = (err) =>
    `w-full px-4 py-2.5 border rounded-lg font-serif
    bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-[#4a7ac3]
    transition-colors duration-200
    ${err ? "border-red-500 focus:ring-red-400" : "border-gray-300"}`;

const OwnerSignup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName:    "",
        lastName:     "",
        email:        "",
        password:     "",
        gender:       "",
        savedAddress: "",
    });
    const [errors, setErrors]   = useState({});
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const errs = {};
        if (!formData.firstName.trim())
            errs.firstName = "First name is required 👤";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            errs.email = "Enter a valid email 📧";
        if (formData.password.length < 6)
            errs.password = "Password must be at least 6 characters 🔐";
        if (!formData.gender)
            errs.gender = "Please select your gender";
        if (!formData.savedAddress.trim())
            errs.savedAddress = "Address is required 🏠";
        setErrors(errs);
        if (Object.keys(errs).length > 0) {
            toast.error("Please fill all required fields ❌");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        const t = toast.loading("Creating owner account...");

        try {
            await axios.post(BASE_URL + "owner/signup", formData, {
                withCredentials: true,
            });

            toast.dismiss(t);
            toast.success("Account created! Welcome aboard 🎉");

            // Redirect to owner dashboard after short delay
            setTimeout(() => {
                window.location.href = "/owner/dashboard";
            }, 1000);

        } catch (err) {
            toast.dismiss(t);
            toast.error(err.response?.data?.message || "Signup failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white transition-colors duration-200">

            <div className="max-w-md mx-auto bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3] p-6 md:p-8 shadow-xl">

                <h2 className="text-3xl font-bold text-center text-[#4a7ac3] dark:text-white mb-2">
                    Become a Restaurant Partner
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                    Create your owner account to list your restaurant on FoodyFly
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={inputClass(errors.firstName)}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={inputClass()}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass(errors.email)}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password with show/hide */}
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="Password (min. 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            className={inputClass(errors.password) + " pr-12"}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                        >
                            {showPass ? "🙈" : "👁️"}
                        </button>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={inputClass(errors.gender)}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <textarea
                            name="savedAddress"
                            placeholder="Your address"
                            value={formData.savedAddress}
                            onChange={handleChange}
                            rows={3}
                            className={inputClass(errors.savedAddress)}
                        />
                        {errors.savedAddress && <p className="text-red-500 text-xs mt-1">{errors.savedAddress}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#4a7ac3] hover:bg-[#355b96] text-white font-bold rounded-lg transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading
                            ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating...</>
                            : "Create Owner Account 🚀"
                        }
                    </button>

                </form>

                <p className="text-center text-gray-500 dark:text-gray-300 mt-4 text-sm">
                    Already have an account?{" "}
                    <NavLink to="/login" className="text-[#4a7ac3] dark:text-blue-400 font-semibold hover:underline">
                        Login
                    </NavLink>
                </p>

            </div>
        </div>
    );
};

export default OwnerSignup;
