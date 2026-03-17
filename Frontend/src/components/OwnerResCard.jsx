import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const OwnerResCard = ({ data }) => {

  const [editMode, setEditMode] = useState(false);

  const [cardData, setCardData] = useState(data || {});

  const [formData, setFormData] = useState({
    RestroName: data.RestroName || "",
    name: data.name || "",
    cuisine: data.cuisine || "",
    imageUrl: data.imageUrl || "",
    price: data.price || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {

    const loadingToast = toast.loading("Updating restaurant...");

    try {

      await axios.patch(
        BASE_URL + "owner/editRestroDetails",
        { ...formData, price: Number(formData.price) },
        { withCredentials: true }
      );

      toast.dismiss(loadingToast);
      toast.success("Restaurant updated successfully");

      // update local state instantly
      setCardData((prev) => ({
        ...prev,
        ...formData
      }));

      setEditMode(false);

    } catch (err) {

      toast.dismiss(loadingToast);
      toast.error(err?.response?.data?.message || "Update failed");

    }
  };

  return (
    <div
      className="
      bg-[#d7e9f5] res-card m-4 p-4 rounded-lg border-2 font-serif border-[#4a7ac3]
      dark:bg-gray-700 transition-all duration-300 ease-out
      hover:-translate-y-2 hover:shadow-[0_12px_28px_rgba(74,122,195,0.35)]
      md:w-[65%]
      "
    >

      {/* IMAGE */}
      <div className="rounded-lg overflow-hidden">
        <img
          className="rounded-lg w-64 h-44 object-cover transition-transform duration-300 hover:scale-105"
          src={editMode ? formData.imageUrl : cardData.imageUrl}
          alt="restaurant"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/256x176?text=Restaurant";
          }}
        />
      </div>

      {editMode ? (

        <div className="mt-3 space-y-2">

          <input
            name="RestroName"
            value={formData.RestroName}
            onChange={handleChange}
            placeholder="Restaurant Name"
            className="w-full p-2 rounded border"
          />

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Feed Card Item Name"
            className="w-full p-2 rounded border"
          />

          <input
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="Cuisine"
            className="w-full p-2 rounded border"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 rounded border"
          />

          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 rounded border"
          />

          <div className="flex gap-2 mt-3">

            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>

          </div>

        </div>

      ) : (

        <>
          <div className="text-lg mt-2 font-semibold">
            {cardData.RestroName}
          </div>

          <div>{cardData.name}</div>

          <div className="text-[#555] dark:text-white">
            {cardData.cuisine}
          </div>

          <div>₹{cardData.price}</div>

          <div className="flex justify-between items-center mt-3">

            <div className="text-[#333] dark:text-white">
              {cardData.rating}⭐
            </div>

            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Edit
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default OwnerResCard;