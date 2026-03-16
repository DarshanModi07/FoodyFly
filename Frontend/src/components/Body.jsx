import RestroCard, { withPromotedLabel } from "./RestroCard";
import { useState, useEffect, useRef } from "react";
import SceletonCard from "./SceletonCard";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ChatBot from "./ChatBot";
import toast from "react-hot-toast"; 
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Body = () => {

    let [allData,setAllData] = useState([]);
    let [DISH, setDISH] = useState([]);
    let [searchText, setSearchText] = useState("");
    let [order, setOrder] = useState("");
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null);

    useEffect(() => {

        const fetchDishes = async () => {

            try {

                const res = await axios.get(BASE_URL+"feed", {
                    withCredentials: true
                });

                const data = await res.data;

                setAllData(data);
                setDISH(data);

            }
            catch (error) {

                console.log("Error fetching dishes:", error);

                toast.error("Failed to load restaurants ❌"); 
            } 
        };

        fetchDishes();

    }, []);



  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        const entry = entries[0];

        if (entry.isIntersecting && !loading && visibleCount < DISH.length) {
          loadMore();
        }
      },
      {
        root: null, 
        threshold: 0.1,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };

  }, [loading, visibleCount, DISH.length]); 



  const loadMore = () => {

    if (visibleCount >= DISH.length) return;
    
    setLoading(true);

    setTimeout(() => {

      setVisibleCount((prev) => prev + 8);

      setLoading(false);

    }, 1000);
  };



    function TopRated() {

        const filter = allData.filter((res) => res.rating > 4);

        setDISH(filter);
    }



    function cheaper() {

        const filter = allData.filter((res) => res.price < 250);

        setDISH(filter);
    }



    function showAll() {

        setDISH(allData);
    }



    function searchIt() {
        
        const query = searchText.toLowerCase();

        const filteredList = allData.filter((res) => {
            
            const isNameMatch = res.RestroName.toLowerCase().includes(query);

            const isKeywordMatch = res.keywords?.some((key) => 
                key.toLowerCase().includes(query)
            );
            
            return isNameMatch || isKeywordMatch;
        });


        if(filteredList.length == 0){

            toast.error("No dish, restaurant or cuisine found ❌"); 

            setDISH(allData);

        }
        else{

            toast.success("Results found 🍽️"); 

            setDISH(filteredList);
        }
    }



    const PromotedRestroCard = withPromotedLabel(RestroCard);



    return (
        <>
            <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white transition-colors duration-200">


                <div className="flex flex-col md:flex-row items-center justify-around gap-4 mb-8">
                    
                    <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchIt();
                    }}
                    className="flex w-full md:w-auto items-center gap-2"
                    >

                    <input
                        type="text"
                        className="w-full md:w-96 border-2 border-[#333333] font-serif px-4 py-2 bg-white rounded-l-lg text-lg dark:bg-gray-800 dark:border-[#4a7ac3] focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Search Restaurant , Dish or Cuisine"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />


                    <button
                        type="submit"
                        className="bg-[#4a7ac3] text-white font-semibold rounded-r-lg px-6 py-3 hover:bg-[#355b96] transition-all dark:bg-[#284bffff] whitespace-nowrap"
                    >
                        Search
                    </button>

                    </form>



                    <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">

                        <button className="bg-[#4a7ac3] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#355b96] transition-all dark:bg-[#284bffff]" onClick={TopRated}>
                            Top Rated
                        </button>

                        <button className="bg-[#4a7ac3] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#355b96] transition-all dark:bg-[#284bffff]" onClick={cheaper}>
                            Great Value
                        </button>

                        <button className="bg-[#4a7ac3] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#355b96] transition-all dark:bg-[#284bffff]" onClick={showAll}>
                            Show All
                        </button>

                    </div>
                </div>



                <div className="flex flex-wrap justify-center gap-6">

                    {((loading && visibleCount === 8) || DISH.length === 0) ? ( 
                        
                         Array.from({ length: 8 }).map((_, index) => (
                             <SceletonCard key={index} />
                         ))

                    ) : (

                        DISH.slice(0,visibleCount).map((dish, index) => (

                            dish.promoted
                                ? <PromotedRestroCard key={dish._id || index} data={dish} dishId={dish.id} id={Number(dish.id)} index={index} order={order} />
                                : <RestroCard data={dish} dishId={dish.id} id={Number(dish.id)} index={index} order={order} key={dish._id || index} />
                        ))
                    )}
                    
                    <ChatBot feedData={allData} />

                </div>


                <div ref={loaderRef} className="h-10 w-full"></div>

            </div>
        </>
    )
}

export default Body;
