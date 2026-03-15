import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const inputClass = (err) =>
`w-full px-4 py-2.5 border rounded-lg font-serif
bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600
focus:outline-none focus:ring-2 focus:ring-[#4a7ac3]
transition-colors duration-200
${err ? "border-red-500 focus:ring-red-400" : "border-gray-300"}`;

const OwnerEditItem = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { item, categoryTitle } = location.state || {};

    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState({});

    const [formData,setFormData] = useState({
        name:item?.name || "",
        price:item?.price || "",
        description:item?.description || "",
        imageUrl:item?.imageUrl || "",
        stock:item?.stock !== undefined ? String(item.stock) : "true"
    });

    const handleChange = (e)=>{
    const {name,value} = e.target;

    setFormData(prev=>({...prev,[name]:value}));
    setErrors(prev=>({...prev,[name]:""}));
};

const deleteItem = async () => {

  setLoading(true);

  const t = toast.loading("Deleting item...");

  try {

    await axios.delete(
      BASE_URL + "owner/removeMenuItem",
      {
        data: {
          title: categoryTitle,
          itemName: item.name
        },
        withCredentials: true
      }
    );

    toast.dismiss(t);
    toast.success("Item deleted successfully");

    navigate("/owner/dashboard");

  } catch (err) {

    toast.dismiss(t);
    toast.error(err.response?.data?.message || "Delete failed");

  } finally {
    setLoading(false);
  }
};

const handleDelete = () => {

  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">
        Are you sure you want to delete this item?
      </p>

      <div className="flex gap-2 justify-end">

        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            deleteItem();
          }}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>

      </div>
    </div>
  ));
};

const validate = ()=>{
    const errs={};

    if(!formData.name.trim()) errs.name="Item name required";
    if(!formData.price || Number(formData.price)<=0) errs.price="Valid price required";
    if(!formData.description.trim()) errs.description="Description required";
    if(!formData.imageUrl.trim()) errs.imageUrl="Image required";

    setErrors(errs);

    return Object.keys(errs).length===0;
};

const handleSave = async(e)=>{
    e.preventDefault();

    if(!validate()) return;

    setLoading(true);

    const t = toast.loading("Saving changes...");

    try{

    await axios.patch(
    BASE_URL+"owner/editMenuItem",
    {
    title:categoryTitle,
    oldItemName:item.name,
    ...formData,
    price:Number(formData.price),
    stock:formData.stock==="true"
    },
    {withCredentials:true}
);

toast.dismiss(t);
toast.success("Item updated");

navigate("/owner/dashboard");

}catch(err){

toast.dismiss(t);
toast.error(err.response?.data?.message || "Update failed");

}finally{
setLoading(false);
}

};

return(

    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-4 md:p-8 my-6 dark:bg-gray-800 dark:text-white">

    <h1 className="text-3xl font-bold text-center text-[#4a7ac3] mb-8">
    Edit Menu Item
    </h1>

    <div className="max-w-xl mx-auto bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3] p-6 shadow-xl">

        <form onSubmit={handleSave} className="space-y-4">

            <div>
                <label className="block text-sm font-semibold mb-1">Item Name</label>

                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass(errors.name)}
                />

            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">

            <div>
                <label className="block text-sm font-semibold mb-1">Price</label>

                <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={inputClass(errors.price)}
                />

            </div>

    <div>
        <label className="block text-sm font-semibold mb-1">Stock</label>

        <select
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        className={inputClass()}
        >
        <option value="true">Available</option>
        <option value="false">Out of stock</option>
        </select>

    </div>

    </div>

        <div>
            <label className="block text-sm font-semibold mb-1">Description</label>

            <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className={inputClass(errors.description)}
            />

        </div>

    <div>
    <label className="block text-sm font-semibold mb-1">Image URL</label>

    <input
    type="url"
    name="imageUrl"
    value={formData.imageUrl}
    onChange={handleChange}
    className={inputClass(errors.imageUrl)}
    />

    </div>

    <button
    type="submit"
    disabled={loading}
    className="w-full py-3 bg-[#4a7ac3] hover:bg-[#355b96] text-white font-bold rounded-lg"
    >
    

    {loading ? "Saving..." : "Save Changes"}

    </button>

    <button
    type="button"
    onClick={handleDelete}
    disabled={loading}
    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg mt-2"
    >

    {loading ? "Deleting..." : "Delete Item"}

    </button>


    </form>

    </div>

    </div>

);

};

export default OwnerEditItem;