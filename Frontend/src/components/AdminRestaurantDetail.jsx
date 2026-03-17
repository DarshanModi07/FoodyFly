import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const StatBox = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-[#4a7ac3]/30 text-center">
    <div className="text-3xl mb-1">{icon}</div>
    <div className="text-2xl font-bold text-[#4a7ac3] dark:text-white">{value}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
  </div>
);

const StatsRow = ({ feed, menu, totalItems }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <StatBox icon="⭐" label="Rating"       value={`${feed.rating || 0}/5`} />
    <StatBox icon="📂" label="Categories"   value={menu?.categories?.length || 0} />
    <StatBox icon="🍽️" label="Items"        value={totalItems} />
    <StatBox icon="💰" label="Cost For Two" value={`₹${menu?.costForTwo}`} />
  </div>
);

const MenuSection = ({ menu }) => (
  <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/40 p-5 shadow-lg">
    <h3 className="text-xl font-bold text-[#4a7ac3] dark:text-white mb-4">
      Restaurant Menu
    </h3>
    <div className="space-y-5">
      {menu.categories.map((cat, i) => (
        <div key={i}>
          <h4 className="font-bold text-[#4a7ac3] dark:text-blue-300 text-sm uppercase border-b border-[#4a7ac3]/20 pb-2 mb-3">
            {cat.title} ({cat.items?.length || 0} items)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cat.items?.map((item, j) => (
              <div key={j} className="flex items-center gap-3 bg-[#d7e9f5] dark:bg-gray-600 p-3 rounded-lg">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100"; }}
                />
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-800 dark:text-white truncate">{item.name}</p>
                  <p className="text-[#4a7ac3] dark:text-blue-300 font-bold text-sm">₹{item.price}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</p>
                  <span className={`text-xs font-semibold ${item.stock ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                    {item.stock ? "✓ In Stock" : "✗ Out of Stock"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminRestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [feed, setFeed] = useState(null);
  const [menu, setMenu] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [acting, setActing] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(BASE_URL + "admin/restro/" + id, { withCredentials: true });
        setFeed(res.data.data.restaurant);
        setMenu(res.data.data.menu);
        setOwner(res.data.data.owner);
      } catch {
        toast.error("Failed to load restaurant");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const rejectRestaurant = async () => {
    setActing(true);
    try {
      await axios.patch(BASE_URL + "admin/rejectRestro", { resId: id }, { withCredentials: true });
      toast.success("Restaurant rejected ❌");
      navigate(-1);
    } catch {
      toast.error("Reject failed");
    } finally {
      setActing(false);
    }
  };

  const deleteRestaurant = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setActing(true);
    try {
      await axios.delete(BASE_URL + "admin/deleteOwnerAndRestro", {
        data: { resId: id },
        withCredentials: true,
      });
      toast.success("Restaurant deleted 🗑️");
      navigate(-1);
    } catch {
      toast.error("Delete failed");
    } finally {
      setActing(false);
      setConfirmDelete(false);
    }
  };

  if (loading) return (
    <div className="font-serif bg-[#d7e9f5] dark:bg-gray-800 md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-8 my-6 flex flex-col items-center justify-center min-h-[300px]">
      <div className="w-10 h-10 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-[#4a7ac3] dark:text-blue-300 font-semibold">Loading restaurant...</p>
    </div>
  );

  if (!feed) return null;

  const totalItems = menu?.categories?.reduce((acc, cat) => acc + (cat.items?.length || 0), 0) || 0;

  const statusStyle = {
    approved: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    rejected: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    pending:  "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  };
  const currentStatus = menu?.status || "pending";

  return (
    <div className="font-serif bg-[#d7e9f5] dark:bg-gray-800 md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-6 my-6 dark:text-white">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-[#4a7ac3] dark:text-blue-300 hover:text-[#355b96] font-semibold text-sm transition-colors"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-center text-[#4a7ac3] dark:text-white mb-8">
        Restaurant Details
      </h1>

      <div className="space-y-6">

        {/* ── Info Card + Actions ── */}
        <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/40 p-5 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-4">
              <img
                src={feed.imageUrl}
                alt={feed.RestroName}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200"; }}
              />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="text-xl font-bold text-[#4a7ac3] dark:text-white">{feed.RestroName}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${statusStyle[currentStatus]}`}>
                    {currentStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{feed.cuisine}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cost for Two: ₹{menu?.costForTwo}</p>
                {owner && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    👤 {owner.firstName} {owner.lastName} · {owner.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={rejectRestaurant}
                disabled={acting}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60"
              >
                Reject
              </button>

              {confirmDelete ? (
                <div className="flex gap-2">
                  <button
                    onClick={deleteRestaurant}
                    disabled={acting}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm animate-pulse disabled:opacity-60 transition-colors"
                  >
                    {acting ? "Deleting..." : "⚠️ Confirm"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={deleteRestaurant}
                  disabled={acting}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>

        <StatsRow feed={feed} menu={menu} totalItems={totalItems} />

        {menu?.categories?.length > 0
          ? <MenuSection menu={menu} />
          : (
            <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/40 p-10 text-center shadow-lg">
              <div className="text-4xl mb-3">🍜</div>
              <p className="text-gray-500 dark:text-gray-400 font-semibold">No menu items yet</p>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default AdminRestaurantDetail;