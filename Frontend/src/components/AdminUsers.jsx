import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const UserRow = ({ user, onDelete, confirmDelete, onCancelDelete, deleting }) => (

  <div className="bg-white dark:bg-gray-700 rounded-lg border border-[#4a7ac3]/20 px-4 py-3 flex items-center gap-3">

    <div className="w-10 h-10 rounded-full bg-[#4a7ac3] flex items-center justify-center text-white font-bold text-sm">
      {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
    </div>

    <div className="flex-1 min-w-0">

      <p className="font-semibold text-gray-800 dark:text-white text-sm">

        {user.firstName} {user.lastName}

        <span
          className={`ml-2 px-1.5 py-0.5 rounded text-xs font-bold
          ${user.role === "admin"
            ? "bg-purple-100 text-purple-600"
            : user.role === "owner"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
            : "bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
          }`}
        >
          {user.role}
        </span>

      </p>

      <p className="text-xs text-gray-400 truncate">{user.email}</p>

    </div>


    {confirmDelete ? (

      <div className="flex gap-1">

        <button
          onClick={onDelete}
          disabled={deleting}
          className="px-2 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg animate-pulse"
        >
          {deleting ? "..." : "Sure?"}
        </button>

        <button
          onClick={onCancelDelete}
          className="px-2 py-1.5 bg-gray-200 dark:bg-gray-600 text-xs rounded-lg"
        >
          No
        </button>

      </div>

    ) : (

      <button
        onClick={onDelete}
        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-semibold rounded-lg"
      >
        Delete
      </button>

    )}

  </div>

);


const AdminUsers = () => {

  const [users,setUsers] = useState([]);
  const [owners,setOwners] = useState([]);
  const [loading,setLoading] = useState(true);
  const [userTab,setUserTab] = useState("users");

  const [searchQuery,setSearchQuery] = useState("");
  const [searchResults,setSearchResults] = useState(null);
  const [searching,setSearching] = useState(false);

  const [confirmDelete,setConfirmDelete] = useState(null);
  const [deleting,setDeleting] = useState(false);


  const fetchUsers = useCallback(async()=>{

    setLoading(true);

    try{

      const [usersRes,ownersRes] = await Promise.all([
        axios.get(BASE_URL + "admin/showAllUsers",{withCredentials:true}),
        axios.get(BASE_URL + "admin/showAllRestroOwners",{withCredentials:true})
      ]);

      setUsers(usersRes.data.data || []);
      setOwners(ownersRes.data.data || []);

    }
    catch{
      toast.error("Failed to load users");
    }
    finally{
      setLoading(false);
    }

  },[]);


  useEffect(()=>{
    fetchUsers();
  },[fetchUsers]);


  const handleSearch = async(e)=>{

    e.preventDefault();

    if(!searchQuery.trim()) return;

    setSearching(true);

    try{

      const res = await axios.get(
        BASE_URL + `admin/searchUsers?query=${encodeURIComponent(searchQuery)}`,
        {withCredentials:true}
      );

      setSearchResults(res.data.data || []);

    }
    catch{
      toast.error("Search failed");
    }
    finally{
      setSearching(false);
    }

  };


  const clearSearch = ()=>{
    setSearchQuery("");
    setSearchResults(null);
  };


  const handleDelete = async(user_id)=>{

    if(confirmDelete !== user_id){
      setConfirmDelete(user_id);
      return;
    }

    setDeleting(true);

    try{

      await axios.delete(
        BASE_URL + "admin/deleteUser",
        {
          data:{user_id},
          withCredentials:true
        }
      );

      toast.success("User deleted");

      setUsers(prev => prev.filter(u => u._id !== user_id));
      setOwners(prev => prev.filter(u => u._id !== user_id));

      if(searchResults){
        setSearchResults(prev => prev.filter(u => u._id !== user_id));
      }

    }
    catch(err){
      toast.error(err.response?.data?.message || "Delete failed");
    }
    finally{
      setDeleting(false);
      setConfirmDelete(null);
    }

  };


  if(loading){

    return(

      <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-8 my-6 dark:bg-gray-800 dark:text-white flex flex-col items-center justify-center min-h-[300px]">

        <div className="w-10 h-10 border-4 border-[#4a7ac3] border-t-transparent rounded-full animate-spin mb-3"/>

        <p className="text-[#4a7ac3] dark:text-blue-300 font-semibold">
          Loading users...
        </p>

      </div>

    );

  }


  return(

    <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 border-[#4a7ac3] p-4 md:p-8 my-6 dark:bg-gray-800 dark:text-white">

      <h1 className="text-2xl md:text-3xl font-bold text-[#4a7ac3] mb-6">
        Users
      </h1>


      <form onSubmit={handleSearch} className="flex gap-2 mb-5">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e)=>{
            setSearchQuery(e.target.value);
            if(!e.target.value) setSearchResults(null);
          }}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
        />

        <button
          type="submit"
          disabled={searching}
          className="px-4 py-2 bg-[#4a7ac3] hover:bg-[#355b96] text-white rounded-lg font-semibold"
        >
          {searching ? "..." : "Search"}
        </button>

        {searchResults && (

          <button
            type="button"
            onClick={clearSearch}
            className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-sm rounded-lg"
          >
            Clear
          </button>

        )}

      </form>


      {!searchResults && (

        <div className="flex gap-2 mb-4">

          <button
            onClick={()=>setUserTab("users")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold
            ${userTab === "users"
              ? "bg-[#4a7ac3] text-white"
              : "bg-white dark:bg-gray-700"
            }`}
          >
            Users ({users.length})
          </button>

          <button
            onClick={()=>setUserTab("owners")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold
            ${userTab === "owners"
              ? "bg-[#4a7ac3] text-white"
              : "bg-white dark:bg-gray-700"
            }`}
          >
            Owners ({owners.length})
          </button>

          <button
            onClick={fetchUsers}
            className="ml-auto px-3 py-2 text-xs bg-[#4a7ac3] text-white rounded-lg"
          >
            Refresh
          </button>

        </div>

      )}


      <div className="space-y-2">

        {(searchResults
          ? searchResults
          : userTab === "users"
          ? users
          : owners
        ).map((u)=>(
          <UserRow
            key={u._id}
            user={u}
            onDelete={()=>handleDelete(u._id)}
            confirmDelete={confirmDelete === u._id}
            onCancelDelete={()=>setConfirmDelete(null)}
            deleting={deleting && confirmDelete === u._id}
          />
        ))}

      </div>

    </div>

  );

};

export default AdminUsers;