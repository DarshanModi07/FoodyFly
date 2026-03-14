import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.BASE_URL;

const inputClass = (err) =>
`w-full px-4 py-2.5 border rounded-lg font-serif
bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600
focus:outline-none focus:ring-2 focus:ring-[#4a7ac3]
transition-colors duration-200
${err ? "border-red-500 focus:ring-red-400" : "border-gray-300"}`;

const OwnerAddItem = ({ onUpdated }) => {

const [loading,setLoading] = useState(false);
const [errors,setErrors] = useState({});

const [formData,setFormData] = useState({
title:"",
name:"",
price:"",
description:"",
imageUrl:"",
stock:"true"
});

const handleChange=(e)=>{
const {name,value}=e.target;

setFormData(prev=>({...prev,[name]:value}));
setErrors(prev=>({...prev,[name]:""}));
};

const validate=()=>{

const errs={};

if(!formData.title.trim()) errs.title="Category required";
if(!formData.name.trim()) errs.name="Item name required";
if(!formData.price || Number(formData.price)<=0) errs.price="Valid price required";
if(!formData.description.trim()) errs.description="Description required";
if(!formData.imageUrl.trim()) errs.imageUrl="Image URL required";

setErrors(errs);

return Object.keys(errs).length===0;
};

const handleSubmit=async(e)=>{

e.preventDefault();

if(!validate()) return;

setLoading(true);

const t = toast.loading("Adding menu item...");

try{

await axios.post(
BASE_URL+"owner/addMenuItem",
{
...formData,
price:Number(formData.price),
stock:formData.stock==="true"
},
{withCredentials:true}
);

toast.dismiss(t);
toast.success("Item added! Waiting for admin approval");

setFormData({
title:"",
name:"",
price:"",
description:"",
imageUrl:"",
stock:"true"
});

if(onUpdated) onUpdated();

}catch(err){

toast.dismiss(t);
toast.error(err.response?.data?.message || "Failed to add item");

}finally{
setLoading(false);
}

};

return(

<div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 md:p-8 my-6 dark:bg-gray-800 dark:text-white">

<h1 className="text-3xl md:text-4xl font-bold text-center text-[#4a7ac3] mb-2">
Add Menu Item
</h1>

<p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">
New items require admin approval
</p>

<div className="max-w-xl mx-auto bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3] p-6 md:p-8 shadow-xl">

<form onSubmit={handleSubmit} className="space-y-4">

<div>
<label className="block text-sm font-semibold mb-1">
Category Title
</label>

<input
type="text"
name="title"
placeholder="e.g. Starters, Main Course"
value={formData.title}
onChange={handleChange}
className={inputClass(errors.title)}
/>

{errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Item Name
</label>

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
<label className="block text-sm font-semibold mb-1">
Price
</label>

<input
type="number"
name="price"
min="1"
value={formData.price}
onChange={handleChange}
className={inputClass(errors.price)}
/>

{errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Stock
</label>

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
<label className="block text-sm font-semibold mb-1">
Description
</label>

<textarea
name="description"
rows={3}
value={formData.description}
onChange={handleChange}
className={inputClass(errors.description)}
/>

{errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Image URL
</label>

<input
type="url"
name="imageUrl"
value={formData.imageUrl}
onChange={handleChange}
className={inputClass(errors.imageUrl)}
/>

{errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}

{formData.imageUrl && (
<img
src={formData.imageUrl}
alt="preview"
className="mt-2 h-28 w-full object-cover rounded-lg border-2 border-[#4a7ac3]/30"
/>
)}

</div>

<button
type="submit"
disabled={loading}
className="w-full py-3 bg-[#4a7ac3] hover:bg-[#355b96] text-white font-bold rounded-lg"
>

{loading ? "Adding..." : "Add Menu Item"}

</button>

</form>

</div>

</div>

);

};

export default OwnerAddItem;