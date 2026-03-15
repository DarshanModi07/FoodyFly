import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminRestaurants = () => {

  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "admin/allApprovedRestro", { withCredentials: true });
      setRestaurants(res.data.data || []);
    } catch {
      toast.error("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);

  const handleDelete = async (resId, e) => {
    e.stopPropagation();
    if (confirmDelete !== resId) {
      setConfirmDelete(resId);
      return;
    }
    setDeleting(true);
    try {
      await axios.delete(BASE_URL + "admin/deleteOwnerAndRestro", {
        data: { resId },
        withCredentials: true,
      });
      toast.success("Restaurant & owner deleted");
      setRestaurants(prev => prev.filter(r => r.restaurant.id !== resId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="font-serif bg-[#d7e9f5] dark:bg-gray-800 md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-8 my-6 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-[#4a7ac3] dark:text-blue-300 font-semibold">Loading restaurants...</p>
      </div>
    );
  }

  return (
    <div className="font-serif bg-[#d7e9f5] dark:bg-gray-800 md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-6 my-6 dark:text-white">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#4a7ac3] dark:text-white">
          Active Restaurants ({restaurants.length})
        </h1>
        <button
          onClick={fetchRestaurants}
          className="px-4 py-2 text-sm bg-[#4a7ac3] hover:bg-[#355b96] text-white rounded-lg font-semibold transition-colors"
        >
          Refresh
        </button>
      </div>

      {restaurants.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <div className="text-5xl mb-3">🏪</div>
          <p className="font-semibold">No approved restaurants yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {restaurants.map(({ restaurant, menu, owner }) => (
            <div
              key={restaurant.id}
              onClick={() => navigate(`/admin/restro/${restaurant.id}`)}
              className="cursor-pointer bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/40 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-3 p-4">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.RestroName}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200"; }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-[#4a7ac3] dark:text-white truncate">
                      {restaurant.RestroName}
                    </h3>
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold flex-shrink-0">
                      ✓ Live
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{restaurant.cuisine}</p>
                  {owner && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      👤 {owner.firstName} {owner.lastName} · {owner.email}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {menu?.categories?.length || 0} categories · ₹{menu?.costForTwo} for two
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 flex gap-2">
                {confirmDelete === restaurant.id ? (
                  <>
                    <button
                      onClick={(e) => handleDelete(restaurant.id, e)}
                      disabled={deleting}
                      className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg animate-pulse disabled:opacity-60 transition-colors"
                    >
                      {deleting ? "Deleting..." : "⚠️ Confirm Delete"}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setConfirmDelete(null); }}
                      className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => handleDelete(restaurant.id, e)}
                    className="w-full py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg transition-colors"
                  >
                    🗑️ Delete Restaurant & Owner
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRestaurants;