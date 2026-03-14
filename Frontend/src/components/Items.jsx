import { useState } from "react";
const BASE_URL = process.env.BASE_URL;
import axios from "axios";
import toast from "react-hot-toast";

const Items = ({ items, resId, title, onCartUpdate }) => {

  const [updatingItem, setUpdatingItem] = useState(null);


  const triggerGlobalCartUpdate = () => {
    window.dispatchEvent(new Event("cartUpdated"));
  };


  const verifyUser = async () => {
    try {

      const res = await axios.get(
        BASE_URL + "verifyUser",
        { withCredentials: true }
      );

      return res.data.success === true;

    }
    catch (err) {

      return false;

    }
  };



  const handleAddItem = async (item) => {

    const isVerified = await verifyUser();

    if (!isVerified) {
      toast.error("Please login to add items 🔒");
      return;
    }


    const loadingToast = toast.loading("Adding item...");

    try {

      setUpdatingItem(item.name);

      const data = {
        id: resId ?? item.resId,
        item: item.name,
        categories: title ?? item.categories,
      };

      await axios.post(
        BASE_URL + "orderAdd",
        data,
        { withCredentials: true }
      );

      toast.dismiss(loadingToast);

      toast.success(item.name + " added to cart 🛒");

      if (onCartUpdate) await onCartUpdate();

      triggerGlobalCartUpdate();

    }
    catch (err) {

      toast.dismiss(loadingToast);

      toast.error("Failed to add item ❌");

    }
    finally {

      setUpdatingItem(null);

    }
  };



  const handleRemoveItem = async (item) => {

    const isVerified = await verifyUser();

    if (!isVerified) {
      toast.error("Please login to modify cart 🔒");
      return;
    }


    const loadingToast = toast.loading("Removing item...");

    try {

      setUpdatingItem(item.name);

      const data = {
        id: resId ?? item.resId,
        item: item.name,
        categories: title ?? item.categories,
      };

      await axios.post(
        BASE_URL + "orderDelete",
        data,
        { withCredentials: true }
      );

      toast.dismiss(loadingToast);

      toast.success(item.name + " removed from cart 🗑️");

      if (onCartUpdate) await onCartUpdate();

      triggerGlobalCartUpdate();

    }
    catch (err) {

      toast.dismiss(loadingToast);

      toast.error("Failed to remove item ❌");

    }
    finally {

      setUpdatingItem(null);

    }
  };



  return (

    <div className="p-2">

      {items.map((item, index) => (

        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-white m-2 p-4 rounded-lg shadow-sm dark:bg-gray-600 dark:text-white"
        >

          <div className="flex justify-center md:w-28 mb-3">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>


          <div className="md:flex-1 md:px-6">

            <div className="font-semibold text-lg mb-2">
              {item.name}
            </div>

            <div>
              ₹{item.price}
            </div>

            <div className="text-sm">
              {item.description}
            </div>

            <div className="text-sm mt-1">
              Quantity: {item.qty}
            </div>

          </div>


          <div className="flex gap-3 mt-4 md:items-center">

            <button
              disabled={updatingItem === item.name}
              className="w-24 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
              onClick={() => handleAddItem(item)}
            >
              {updatingItem === item.name ? "..." : "Add +"}
            </button>


            <button
              disabled={updatingItem === item.name}
              className="w-24 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg disabled:opacity-50"
              onClick={() => handleRemoveItem(item)}
            >
              {updatingItem === item.name ? "..." : "Discard"}
            </button>

          </div>

        </div>

      ))}

    </div>

  );

};

export default Items;
