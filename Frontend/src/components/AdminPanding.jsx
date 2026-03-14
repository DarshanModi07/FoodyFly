import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.BASE_URL;

const AdminPending = () => {

  const [pending,setPending] = useState([]);
  const [loading,setLoading] = useState(true);
  const [actionLoading,setActionLoading] = useState(null);

  const fetchPending = useCallback(async()=>{

    setLoading(true);

    try{

      const res = await axios.get(
        BASE_URL + "admin/allPendingRestro",
        {withCredentials:true}
      );

      setPending(res.data.data || []);

    }
    catch{
      toast.error("Failed to load pending restaurants");
    }
    finally{
      setLoading(false);
    }

  },[]);

  useEffect(()=>{
    fetchPending();
  },[fetchPending]);

  const handleApprove = async(resId)=>{

    setActionLoading(resId+"_approve");

    try{

      await axios.patch(
        BASE_URL + "admin/approveRestro",
        {resId},
        {withCredentials:true}
      );

      toast.success("Restaurant approved ✅");

      setPending(prev=>prev.filter(r=>r.restaurant.id!==resId));

    }
    catch(err){
      toast.error(err.response?.data?.message || "Failed to approve ❌");
    }
    finally{
      setActionLoading(null);
    }

  };

  const handleReject = async(resId)=>{

    setActionLoading(resId+"_reject");

    try{

      await axios.patch(
        BASE_URL + "admin/rejectRestro",
        {resId},
        {withCredentials:true}
      );

      toast.success("Restaurant rejected ❌");

      setPending(prev=>prev.filter(r=>r.restaurant.id!==resId));

    }
    catch(err){
      toast.error(err.response?.data?.message || "Failed to reject ❌");
    }
    finally{
      setActionLoading(null);
    }

  };

  if(loading){
    return(

      <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-8 my-6 dark:bg-gray-800 dark:text-white flex flex-col items-center justify-center min-h-[300px]">

        <div className="w-10 h-10 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin mb-3" />

        <p className="text-[#4a7ac3] dark:text-blue-300 font-semibold">
          Loading pending restaurants...
        </p>

      </div>

    );
  }

  return(

    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-6 my-6 dark:bg-gray-800 dark:text-white">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-[#4a7ac3] dark:text-white">

          Pending Approvals

          {pending.length>0 && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-sm rounded-full">
              {pending.length}
            </span>
          )}

        </h2>

        <button
          onClick={fetchPending}
          className="text-xs px-3 py-1.5 bg-[#4a7ac3] text-white rounded-lg hover:bg-[#355b96]"
        >
          Refresh
        </button>

      </div>

      {pending.length===0 ?(

        <div className="text-center py-16 text-gray-400 dark:text-gray-500">

          <div className="text-5xl mb-3">✅</div>

          <p className="font-semibold text-lg">
            All clear! No pending restaurants.
          </p>

        </div>

      ):(
        
        <div className="space-y-4">

        {pending.map(({restaurant,menu,owner})=>(

          <div
            key={restaurant.id}
            className="bg-white dark:bg-gray-700 rounded-xl border-2 border-yellow-400 shadow-lg overflow-hidden"
          >

            <div className="md:flex">

              <div className="md:w-48 h-44 md:h-auto flex-shrink-0 overflow-hidden">

                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.RestroName}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="p-4 flex-1">

                <div className="flex items-start justify-between mb-3">

                  <div>

                    <h3 className="text-lg font-bold text-[#4a7ac3] dark:text-white">
                      {restaurant.RestroName}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {restaurant.cuisine}
                    </p>

                  </div>

                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                    Pending
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300 mb-4">

                  <div>
                    <span className="font-semibold text-[#4a7ac3]">Featured: </span>
                    {restaurant.name}
                  </div>

                  <div>
                    <span className="font-semibold text-[#4a7ac3]">Price: </span>
                    ₹{restaurant.price}
                  </div>

                  <div>
                    <span className="font-semibold text-[#4a7ac3]">Cost/2: </span>
                    ₹{menu?.costForTwo}
                  </div>

                  <div>
                    <span className="font-semibold text-[#4a7ac3]">Categories: </span>
                    {menu?.categories?.length || 0}
                  </div>

                </div>

                {owner &&(

                  <div className="bg-[#d7e9f5] dark:bg-gray-600 rounded-lg px-3 py-2 text-sm mb-4">

                    <span className="font-semibold text-[#4a7ac3]">
                      Owner:
                    </span>

                    <span className="ml-1 text-gray-700 dark:text-gray-200">
                      {owner.firstName} {owner.lastName}
                    </span>

                    <span className="text-gray-400 mx-2">·</span>

                    <span className="text-gray-500 dark:text-gray-400">
                      {owner.email}
                    </span>

                  </div>

                )}

                <div className="flex gap-3">

                  <button
                    onClick={()=>handleApprove(restaurant.id)}
                    disabled={!!actionLoading}
                    className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
                  >

                    {actionLoading===restaurant.id+"_approve"
                      ? "Approving..."
                      : "Approve"
                    }

                  </button>

                  <button
                    onClick={()=>handleReject(restaurant.id)}
                    disabled={!!actionLoading}
                    className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg"
                  >

                    {actionLoading===restaurant.id+"_reject"
                      ? "Rejecting..."
                      : "Reject"
                    }

                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

        </div>

      )}

    </div>

  );

};

export default AdminPending;