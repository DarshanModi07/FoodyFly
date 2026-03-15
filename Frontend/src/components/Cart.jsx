import { useEffect, useState } from "react";
import Items from "./Items";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { stripePromise } from "../utils/stripe";

const BASE_URL = import.meta.env.VITE_BASE_URL;;

const Cart = () => {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

    const handlePayment = async () => {

      try {

        const res = await axios.post(
          BASE_URL + "api/payment/create-checkout-session",
          { amount: total },
          { withCredentials: true }
        );

        console.log("Stripe session:", res.data);

        window.location.href = res.data.url;

      } catch (err) {

        console.log("Stripe Error:", err);
        toast.error("Payment failed");

      }

    };

  const fetchCartItems = async () => {
    try {

      const res = await axios.get(BASE_URL + "allOrders", {
        withCredentials: true
      });

      const data = res.data;

      setItems(data.data || []);
      setSubtotal(data.subtotal || 0);
      setGst(data.gst || 0);
      setDelivery(data.deliveryCharge || 0);
      setTotal(data.amountToPay || 0);

    } catch {

      setItems([]);
      setSubtotal(0);
      setGst(0);
      setDelivery(0);
      setTotal(0);

    }
  };

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      await fetchCartItems();
      setLoading(false);
    };
    loadCart();
  }, []);

  const handleClearCart = async () => {

    const loadingToast = toast.loading("Clearing cart...");

    try {

      await axios.post(
        BASE_URL + "clearOrder",
        {},
        { withCredentials: true }
      );

      toast.dismiss(loadingToast);
      toast.success("Cart cleared");

      fetchCartItems();

    } catch {

      toast.dismiss(loadingToast);
      toast.error("Failed to clear cart");

    }
  };

  const formattedItems = items.map((order) => ({
    name: order.items?.name,
    price: order.items?.price,
    description: order.items?.description,
    imageUrl: order.items?.imageUrl,
    qty: order.qty,
    resId: order.resId,
    categories: order.items?.category
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-serif">
        <div className="w-10 h-10 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-6 my-6 dark:bg-gray-800 dark:text-white">

      {items.length === 0 ? (

        <div className="flex justify-center items-center h-52">
          <p className="text-lg">Your cart is empty 🍽️</p>
        </div>

      ) : (

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="flex-1">
            <Items
              items={formattedItems}
              onCartUpdate={fetchCartItems}
            />
          </div>

          <div className="flex flex-col items-center">

            <div className="lg:w-80 bg-white dark:bg-gray-900 border-2 border-[#4a7ac3] rounded-xl p-5 shadow-lg h-fit">

              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 text-gray-700 dark:text-gray-300">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹{gst}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                </div>

                <hr className="my-2 border-gray-300 dark:border-gray-600"/>

                <div className="flex justify-between font-bold text-lg text-[#4a7ac3]">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-5 bg-[#4a7ac3] hover:bg-[#355b96] text-white py-3 rounded-lg font-semibold transition"
              >
                Pay Securely
              </button>

            </div>

            <button
              onClick={handleClearCart}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 my-7 rounded-lg transition"
            >
              Clear Cart
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;