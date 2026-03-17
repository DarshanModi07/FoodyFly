import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const OwnerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [delivering, setDelivering] = useState(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(BASE_URL + "owner/pandingOrder", { withCredentials: true });
            setOrders(res?.data?.Orders || []);
        } catch {
    console.error(err);
    toast.error("Failed to load orders");    
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    const markDelivered = async (orderId) => {
        setDelivering(orderId);
        try {
            await axios.patch(BASE_URL + "owner/orderDelivered", { orderId }, { withCredentials: true });
            toast.success("Order marked as delivered ✅");
            setOrders((prev) => prev.filter((o) => o.order._id !== orderId));
        } catch {
            toast.error("Failed to update order");
        } finally {
            setDelivering(null);
        }
    };

    if (loading) return (
        <div className="font-serif bg-[#d7e9f5] dark:bg-gray-800 md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-8 my-6 flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-10 h-10 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-[#4a7ac3] dark:text-blue-300 font-semibold">Loading orders...</p>
        </div>
    );

    return (
        <div className="font-serif bg-[#d7e9f5] dark:bg-gray-800 md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] shadow-2xl p-4 md:p-6 my-6 dark:text-white">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] dark:text-white flex items-center gap-2">
                    🧾 Pending Orders
                    {orders.length > 0 && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-sm rounded-full">
                            {orders.length}
                        </span>
                    )}
                </h1>
                <button
                    onClick={fetchOrders}
                    className="text-sm px-4 py-2 bg-[#4a7ac3] hover:bg-[#355b96] text-white rounded-lg font-semibold transition-colors"
                >
                    🔄 Refresh
                </button>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-5xl mb-3">✅</div>
                    <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">No pending orders!</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">All caught up.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(({ userData, order }) => (
                        <div key={order._id} className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/30 shadow-md overflow-hidden">

                            <div className="flex flex-col md:flex-row md:items-center gap-4 p-4">

                                <img
                                    src={order.items?.imageUrl}
                                    alt={order.items?.name}
                                    className="w-full md:w-20 h-32 md:h-20 rounded-lg object-cover flex-shrink-0"
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200"; }}
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="font-bold text-gray-800 dark:text-white text-base">
                                            {order.items?.name}
                                        </h3>
                                        <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded-full flex-shrink-0">
                                            ⏳ {order.status}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                        {order.items?.category} · Qty: {order.qty}
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-3">
                                        <div className="bg-[#d7e9f5] dark:bg-gray-600 rounded-lg px-2 py-1.5 text-center">
                                            <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
                                            <p className="font-bold text-[#4a7ac3] dark:text-blue-300">₹{order.subtotal}</p>
                                        </div>
                                        <div className="bg-[#d7e9f5] dark:bg-gray-600 rounded-lg px-2 py-1.5 text-center">
                                            <p className="text-gray-500 dark:text-gray-400">GST</p>
                                            <p className="font-bold text-[#4a7ac3] dark:text-blue-300">₹{order.gst}</p>
                                        </div>
                                        <div className="bg-[#d7e9f5] dark:bg-gray-600 rounded-lg px-2 py-1.5 text-center">
                                            <p className="text-gray-500 dark:text-gray-400">Delivery</p>
                                            <p className="font-bold text-[#4a7ac3] dark:text-blue-300">
                                                {order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}
                                            </p>
                                        </div>
                                        <div className="bg-[#4a7ac3] dark:bg-blue-900/50 rounded-lg px-2 py-1.5 text-center">
                                            <p className="text-white/70 text-xs">Total</p>
                                            <p className="font-bold text-white">₹{order.totalAmount}</p>
                                        </div>
                                    </div>

                                    {userData && (
                                        <div className="flex items-center gap-2 bg-[#d7e9f5] dark:bg-gray-600 rounded-lg px-3 py-2">
                                            <div className="w-7 h-7 rounded-full bg-[#4a7ac3] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                                {userData.firstName?.[0]?.toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-800 dark:text-white text-xs">
                                                    {userData.firstName} {userData.lastName}
                                                </p>
                                                <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{userData.email}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-shrink-0">
                                    <button
                                        onClick={() => markDelivered(order._id)}
                                        disabled={delivering === order._id}
                                        className="w-full md:w-auto px-5 py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                                    >
                                        {delivering === order._id ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Updating...
                                            </>
                                        ) : "✅ Mark Delivered"}
                                    </button>
                                </div>
                            </div>

                            <div className="px-4 pb-3 text-xs text-gray-400 dark:text-gray-500">
                                Order ID: {order._id} · {new Date(order.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerOrders;