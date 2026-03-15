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

const OwnerEditRestaurant = () => {

const location = useLocation();
const navigate = useNavigate();

const { feed, menu } = location.state || {};

const [loading,setLoading] = useState(false);

const [formData,setFormData] = useState({

RestroName:feed?.RestroName || "",
name:feed?.name || "",
cuisine:feed?.cuisine || "",
imageUrl:feed?.imageUrl || "",
price:feed?.price || "",
promoted:String(feed?.promoted || false),
keywords:feed?.keywords?.join(", ") || "",
BannerImageUrl:menu?.imageUrl || "",
costForTwo:menu?.costForTwo || ""

});

const handleChange=(e)=>{
const {name,value}=e.target;

setFormData(prev=>({...prev,[name]:value}));
};

const handleSubmit=async(e)=>{

e.preventDefault();

setLoading(true);

const t = toast.loading("Updating restaurant...");

try{

await axios.patch(
BASE_URL+"owner/editRestroDetails",
{
...formData,
price:Number(formData.price),
costForTwo:Number(formData.costForTwo),
promoted:formData.promoted==="true"
},
{withCredentials:true}
);

toast.dismiss(t);
toast.success("Restaurant updated");

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
Edit Restaurant
</h1>

<div className="max-w-xl mx-auto bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3] p-6 shadow-xl">

<form onSubmit={handleSubmit} className="space-y-4">

<div>
<label className="block text-sm font-semibold mb-1">
Restaurant Name
</label>

<input
type="text"
name="RestroName"
value={formData.RestroName}
onChange={handleChange}
className={inputClass()}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Featured Item
</label>

<input
type="text"
name="name"
value={formData.name}
onChange={handleChange}
className={inputClass()}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Cuisine
</label>

<input
type="text"
name="cuisine"
value={formData.cuisine}
onChange={handleChange}
className={inputClass()}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Feed Image URL
</label>

<input
type="url"
name="imageUrl"
value={formData.imageUrl}
onChange={handleChange}
className={inputClass()}
/>
</div>

<div className="grid grid-cols-2 gap-4">

<div>
<label className="block text-sm font-semibold mb-1">
Price
</label>

<input
type="number"
name="price"
value={formData.price}
onChange={handleChange}
className={inputClass()}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Cost For Two
</label>

<input
type="number"
name="costForTwo"
value={formData.costForTwo}
onChange={handleChange}
className={inputClass()}
/>
</div>

</div>

<div>
<label className="block text-sm font-semibold mb-1">
Banner Image
</label>

<input
type="url"
name="BannerImageUrl"
value={formData.BannerImageUrl}
onChange={handleChange}
className={inputClass()}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Keywords
</label>

<input
type="text"
name="keywords"
value={formData.keywords}
onChange={handleChange}
className={inputClass()}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Promoted
</label>

<select
name="promoted"
value={formData.promoted}
onChange={handleChange}
className={inputClass()}
>
<option value="false">No</option>
<option value="true">Yes</option>
</select>

</div>

<button
type="submit"
disabled={loading}
className="w-full py-3 bg-[#4a7ac3] hover:bg-[#355b96] text-white font-bold rounded-lg"
>

{loading ? "Updating..." : "Update Restaurant"}

</button>

</form>

</div>

</div>

);

};

export default OwnerEditRestaurant;