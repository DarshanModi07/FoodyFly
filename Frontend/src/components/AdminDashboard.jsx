import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.BASE_URL;

const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-white dark:bg-gray-700 rounded-xl p-5 border-2 ${color} shadow-md text-center`}>
    <div className="text-4xl mb-2">{icon}</div>
    <div className="text-3xl font-bold text-[#4a7ac3] dark:text-white">{value ?? "—"}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{label}</div>
  </div>
);

const AdminDashboard = () => {

  const [stats,setStats] = useState(null);
  const [topSales,setTopSales] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchData = useCallback(async()=>{

    setLoading(true);

    try{

      const [statsRes,topRes] = await Promise.all([
        axios.get(BASE_URL + "admin/dashboardStats",{withCredentials:true}),
        axios.get(BASE_URL + "admin/topSalesRestros",{withCredentials:true})
      ]);

      setStats(statsRes.data.data);
      setTopSales(topRes.data.data || []);

    }
    catch{
      toast.error("Failed to load dashboard");
    }
    finally{
      setLoading(false);
    }

  },[]);

  useEffect(()=>{
    fetchData();
  },[fetchData]);

  if(loading){
    return(
      <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-8 my-6 dark:bg-gray-800 dark:text-white flex flex-col items-center justify-center min-h-[300px]">

        <div className="w-10 h-10 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin mb-3" />

        <p className="text-[#4a7ac3] dark:text-blue-300 font-semibold">
          Loading dashboard...
        </p>

      </div>
    );
  }

  return(

    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-6 my-6 dark:bg-gray-800 dark:text-white space-y-6">

      <h1 className="text-3xl font-bold text-center text-[#4a7ac3]">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <StatCard
          icon="👤"
          label="Total Users"
          value={stats?.totalUsers}
          color="border-blue-300"
        />

        <StatCard
          icon="🏪"
          label="Restaurant Owners"
          value={stats?.totalOwners}
          color="border-purple-300"
        />

        <StatCard
          icon="⏳"
          label="Pending Approval"
          value={stats?.pendingRestros}
          color="border-yellow-300"
        />

        <StatCard
          icon="✅"
          label="Live Restaurants"
          value={stats?.approvedRestros}
          color="border-green-300"
        />

      </div>

      <div className="bg-white dark:bg-gray-700 rounded-xl border-2 border-[#4a7ac3]/40 p-5 shadow-lg">

        <h2 className="text-xl font-bold text-[#4a7ac3] dark:text-white mb-4">
          Top 5 Restaurants by Revenue
        </h2>

        {topSales.length === 0 ? (

          <div className="text-center py-10 text-gray-400">

            <div className="text-4xl mb-2">📦</div>

            <p>No completed orders yet</p>

          </div>

        ) : (

          <div className="space-y-3">

            {topSales.map((r,i)=>(

              <div
                key={r.resId}
                className="flex items-center gap-4 p-3 bg-[#d7e9f5] dark:bg-gray-600 rounded-lg"
              >

                <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm
                  ${i===0 ? "bg-yellow-400 text-white"
                    : i===1 ? "bg-gray-400 text-white"
                    : i===2 ? "bg-amber-600 text-white"
                    : "bg-[#4a7ac3] text-white"}`}
                >
                  {i+1}
                </div>

                <img
                  src={r.imageUrl}
                  alt={r.RestroName}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">

                  <p className="font-bold text-gray-800 dark:text-white truncate">
                    {r.RestroName}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {r.cuisine}
                  </p>

                </div>

                <div className="text-right flex-shrink-0">

                  <p className="font-bold text-[#4a7ac3] dark:text-blue-300 text-sm">
                    ₹{r.revenue?.toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-400">
                    {r.totalSales} orders
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <div className="text-center">

        <button
          onClick={fetchData}
          className="px-5 py-2 bg-[#4a7ac3] hover:bg-[#355b96] text-white rounded-lg font-semibold text-sm"
        >
          Refresh Stats
        </button>

      </div>

    </div>

  );

};

export default AdminDashboard;