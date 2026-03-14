import { useState , useNavigate } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router";

const BASE_URL = process.env.BASE_URL;

const inputClass = (err) =>
`w-full px-4 py-2.5 border rounded-lg font-serif
bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600
focus:outline-none focus:ring-2 focus:ring-[#4a7ac3]
transition-colors duration-200
${err ? "border-red-500 focus:ring-red-400" : "border-gray-300"}`;

const OwnerCreateRestro = () => {
const navigate = useNavigate();
const [loading,setLoading] = useState(false);
const [errors,setErrors] = useState({});

const [formData,setFormData] = useState({
RestroName:"",
name:"",
cuisine:"",
imageUrl:"",
price:"",
promoted:"false",
keywords:"",
BannerImageUrl:"",
costForTwo:""
});

const handleChange=(e)=>{
const {name,value}=e.target;

setFormData(prev=>({...prev,[name]:value}));
setErrors(prev=>({...prev,[name]:""}));
};

const validate=()=>{

const errs={};

if(!formData.RestroName.trim()) errs.RestroName="Restaurant name required";
if(!formData.name.trim()) errs.name="Featured item required";
if(!formData.cuisine.trim()) errs.cuisine="Cuisine required";
if(!formData.imageUrl.trim()) errs.imageUrl="Image URL required";
if(!formData.price || Number(formData.price)<=0) errs.price="Valid price required";
if(!formData.costForTwo || Number(formData.costForTwo)<=0) errs.costForTwo="Cost for two required";

setErrors(errs);

return Object.keys(errs).length===0;
};

const handleSubmit=async(e)=>{
e.preventDefault();

if(!validate()) return;

setLoading(true);

const t = toast.loading("Creating restaurant...");

try{

await axios.post(
BASE_URL+"owner/addRestroDetails",
{
...formData,
price:Number(formData.price),
costForTwo:Number(formData.costForTwo),
promoted:formData.promoted==="true"
},
{withCredentials:true}
);

toast.dismiss(t);
toast.success("Restaurant created! Waiting for admin approval");

}catch(err){

toast.dismiss(t);
toast.error(err.response?.data?.message || "Failed to create restaurant");

}finally{
setLoading(false);
}

};

return(

<div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-4 md:p-8 my-6 dark:bg-gray-800 dark:text-white">

<h1 className="text-3xl md:text-4xl font-bold text-center text-[#4a7ac3] mb-8">
Create Restaurant
</h1>

<div className="max-w-xl mx-auto bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3] p-6 md:p-8 shadow-xl">

<form onSubmit={handleSubmit} className="space-y-4">

<div>
<label className="block text-sm font-semibold mb-1">Restaurant Name</label>
<input
type="text"
name="RestroName"
value={formData.RestroName}
onChange={handleChange}
className={inputClass(errors.RestroName)}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">
Featured Item (shown on feed)
</label>
<input
type="text"
name="name"
value={formData.name}
onChange={handleChange}
className={inputClass(errors.name)}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">Cuisine</label>
<input
type="text"
name="cuisine"
value={formData.cuisine}
onChange={handleChange}
className={inputClass(errors.cuisine)}
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">Feed Image URL</label>
<input
type="url"
name="imageUrl"
value={formData.imageUrl}
onChange={handleChange}
className={inputClass(errors.imageUrl)}
/>
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
<label className="block text-sm font-semibold mb-1">Cost For Two</label>
<input
type="number"
name="costForTwo"
value={formData.costForTwo}
onChange={handleChange}
className={inputClass(errors.costForTwo)}
/>
</div>

</div>

<div>
<label className="block text-sm font-semibold mb-1">
Banner Image URL
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
Keywords (comma separated)
</label>
<input
type="text"
name="keywords"
value={formData.keywords}
onChange={handleChange}
className={inputClass()}
placeholder="pizza, italian, spicy"
/>
</div>

<div>
<label className="block text-sm font-semibold mb-1">Promoted</label>

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
onClick={()=>navigate("/owner/dashboard")}
className="w-full py-3 bg-[#4a7ac3] hover:bg-[#355b96] text-white font-bold rounded-lg transition-colors shadow-lg disabled:opacity-60"
>

{loading ? "Creating..." : "Create Restaurant"}

</button>

</form>

</div>

</div>

);

};

export default OwnerCreateRestro;