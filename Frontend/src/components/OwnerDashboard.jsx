import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StatBox = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-[#4a7ac3]/30 text-center">
    <div className="text-3xl mb-1">{icon}</div>
    <div className="text-2xl font-bold text-[#4a7ac3] dark:text-white">{value}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</div>
  </div>
);

const StatsRow = ({ feed, menu, totalItems }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <StatBox icon="⭐" label="Rating" value={`${feed.rating || 0}/5`} />
    <StatBox icon="📂" label="Categories" value={menu?.categories?.length || 0} />
    <StatBox icon="🍽️" label="Total Items" value={totalItems} />
    <StatBox icon="💰" label="Cost for Two" value={`₹${menu?.costForTwo || 0}`} />
  </div>
);

const MenuSection = ({ menu, navigate }) => (
  <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/40 p-5 shadow-lg">
    <h3 className="text-xl font-bold text-[#4a7ac3] dark:text-white mb-4">
      Your Menu
    </h3>

    <div className="space-y-5">
      {menu.categories.map((cat, ci) => (
        <div key={ci}>
          <h4 className="font-bold text-[#4a7ac3] text-sm uppercase border-b pb-2 mb-3">
            {cat.title} ({cat.items?.length || 0} items)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cat.items?.map((item, ii) => (
              <div
                key={ii}
                onClick={() =>
                  navigate("/owner/editItem", {
                    state: { item, categoryTitle: cat.title },
                  })
                }
                className="flex items-center gap-3 bg-[#d7e9f5] dark:bg-gray-600 p-3 rounded-lg cursor-pointer hover:shadow-md transition-all"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">
                    {item.name}
                  </p>
                  <p className="text-[#4a7ac3] font-bold text-sm">
                    ₹{item.price}
                  </p>
                </div>

                <span className="text-xs text-[#4a7ac3] font-semibold">
                  ✏️ Edit
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EmptyMenuTemplate = ({ navigate }) => (
  <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/40 p-10 text-center shadow-lg">

    <div className="text-5xl mb-4">🍜</div>

    <h3 className="text-2xl font-bold text-[#4a7ac3] dark:text-white mb-2">
      No Menu Items Yet
    </h3>

    <p className="text-gray-500 dark:text-gray-300 mb-6">
      Your restaurant is ready! Start by adding your first menu item.
    </p>

    <button
      onClick={() => navigate("/owner/addItem")}
      className="bg-[#4a7ac3] hover:bg-[#355b96] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
    >
      ➕ Add First Menu Item
    </button>

  </div>
);

const RestaurantInfo = ({ feed, menu, navigate, onClosed }) => {

  const handleCloseRestaurant = () => {

    toast((t) => (
      <div className="flex flex-col gap-3">

        <p className="font-semibold">
          Are you sure you want to close this restaurant?
        </p>

        <div className="flex justify-end gap-2">

          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={async () => {

              toast.dismiss(t.id);

              const loading = toast.loading("Closing restaurant...");

              try {

                await axios.delete(
                  BASE_URL + "owner/closeRestro",
                  { withCredentials: true }
                );

                toast.dismiss(loading);
                toast.success("Restaurant closed successfully");

                if (onClosed) onClosed();

              } catch (err) {

                toast.dismiss(loading);
                toast.error(err.response?.data?.message || "Failed to close restaurant");

              }

            }}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Close Restaurant
          </button>

        </div>

      </div>
    ));

  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/40 p-5 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div className="flex items-center gap-4">

        <img
          src={feed.imageUrl}
          alt={feed.RestroName}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div>
          <h2 className="text-xl font-bold text-[#4a7ac3] dark:text-white">
            {feed.RestroName}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-300">
            {feed.cuisine}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-300">
            Cost for Two: ₹{menu?.costForTwo}
          </p>
        </div>

      </div>

      <div className="flex gap-3">

        <button
          onClick={() =>
            navigate("/owner/editRestaurant", {
              state: { feed, menu }
            })
          }
          className="bg-[#4a7ac3] hover:bg-[#355b96] text-white px-4 py-2 rounded-lg font-semibold"
        >
          ✏️ Edit
        </button>

        <button
          onClick={handleCloseRestaurant}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          ❌ Close
        </button>

      </div>

    </div>
  );
};

const NoRestaurantTemplate = ({ navigate }) => (
  <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-8 my-6 dark:bg-gray-800 dark:text-white text-center">

    <div className="text-5xl mb-4">🍽️</div>

    <h2 className="text-2xl font-bold text-[#4a7ac3] mb-2">
      No Restaurant Found
    </h2>

    <p className="text-gray-600 dark:text-gray-300 mb-6">
      You haven't created a restaurant yet. Start by adding your restaurant details.
    </p>

    <button
      onClick={() => navigate("/owner/createRestaurant")}
      className="bg-[#4a7ac3] hover:bg-[#355b96] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
    >
      ➕ Create Your Restaurant
    </button>

  </div>
);

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(null);
  const [menu, setMenu] = useState(null);

  const fetchRestaurant = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "owner/myRestaurant", {
        withCredentials: true,
      });

      setFeed(res.data.data.restaurant);
      setMenu(res.data.data.menu);
    } catch {}
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await fetchRestaurant();
      } catch {
        toast.error("Session expired");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [fetchRestaurant]);

  /* -------- LOADING STATE -------- */

  if (loading) {
    return (
      <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-8 my-6 dark:bg-gray-800 dark:text-white flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-lg font-semibold text-[#4a7ac3] dark:text-white">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  /* -------- NO RESTAURANT -------- */

  if (!feed) {
    return <NoRestaurantTemplate navigate={navigate} />;
  }

  const totalItems =
    menu?.categories?.reduce(
      (acc, cat) => acc + (cat.items?.length || 0),
      0
    ) || 0;

  return (
    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-4 md:p-8 my-6 dark:bg-gray-800 dark:text-white">

      <h1 className="text-3xl font-bold text-center text-[#4a7ac3] mb-8">
        Owner Dashboard
      </h1>

      <div className="space-y-6">

        <RestaurantInfo
            feed={feed}
            menu={menu}
            navigate={navigate}
            onClosed={() => {
                setFeed(null);
                setMenu(null);
            }}
        />
        <StatsRow feed={feed} menu={menu} totalItems={totalItems} />

        {menu?.categories?.length > 0 ? (
          <MenuSection menu={menu} navigate={navigate} />
        ) : (
          <EmptyMenuTemplate navigate={navigate} />
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;