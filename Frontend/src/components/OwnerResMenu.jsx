import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Items = ({ items, resId, title }) => {

  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [localItems, setLocalItems] = useState(items);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const startEdit = (item) => {
    setEditItem(item.name);
    setFormData({
      oldItemName: item.name,
      name: item.name,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl,
      stock: item.stock
    });
  };

  const handleSave = async () => {

    const loading = toast.loading("Updating item...");

    try {

      await axios.patch(
        BASE_URL + "owner/editMenuItem",
        {
          title,
          ...formData
        },
        { withCredentials: true }
      );

      toast.dismiss(loading);
      toast.success("Item updated");

      setLocalItems((prev) =>
        prev.map((item) =>
          item.name === formData.oldItemName
            ? { ...item, ...formData }
            : item
        )
      );

      setEditItem(null);

    } catch (err) {

      toast.dismiss(loading);
      toast.error("Update failed");

    }
  };

  const handleDelete = async (itemName) => {

    const loading = toast.loading("Deleting item...");

    try {

      await axios.delete(
        BASE_URL + "owner/removeMenuItem",
        {
          data: {
            title,
            itemName
          },
          withCredentials: true
        }
      );

      toast.dismiss(loading);
      toast.success("Item deleted");

      setLocalItems((prev) =>
        prev.filter((item) => item.name !== itemName)
      );

    } catch (err) {

      toast.dismiss(loading);
      toast.error("Delete failed");

    }
  };

  return (

    <div className="p-2">

      {localItems.map((item, index) => (

        <div
          key={index}
          className="flex flex-col md:flex-row justify-between bg-white m-2 p-4 rounded-lg shadow-sm dark:bg-gray-600 dark:text-white"
        >

          {/* IMAGE */}
          <div className="flex justify-center md:w-28 mb-3">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/100x100?text=Food";
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="md:flex-1 md:px-6">

            {editItem === item.name ? (

              <>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-1 rounded w-full mb-1"
                />

                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border p-1 rounded w-full mb-1"
                />

                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="border p-1 rounded w-full mb-1"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-1 rounded w-full"
                />

              </>

            ) : (

              <>
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
                  Stock: {item.stock}
                </div>
              </>
            )}

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-4 md:items-center">

            {editItem === item.name ? (

              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditItem(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </>

            ) : (

              <>
                <button
                  onClick={() => startEdit(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </>

            )}

          </div>

        </div>

      ))}

    </div>

  );
};

export default Items;