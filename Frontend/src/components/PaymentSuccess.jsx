import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PaymentSuccess = () => {

  useEffect(() => {

    const confirmOrder = async () => {

      try {

        await axios.post(
          BASE_URL + "placeOrder",
          {},
          { withCredentials: true }
        );

        toast.success("Payment successful 🎉 Order confirmed!");

        setTimeout(() => {

          window.location.href = "/";

        }, 2000);

      } catch {

        toast.error("Payment succeeded but order confirmation failed");

      }

    };

    confirmOrder();

  }, []);

  return (

    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-8 my-6 dark:bg-gray-800 dark:text-white">

      <div className="flex flex-col items-center justify-center min-h-[320px] text-center">

        <div className="text-6xl mb-4">
          🎉
        </div>

        <h1 className="text-3xl font-bold text-[#4a7ac3] dark:text-white mb-4">
          Payment Successful
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Confirming your order...
        </p>

        <div className="w-10 h-10 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin"></div>

      </div>

    </div>

  );
};

export default PaymentSuccess;