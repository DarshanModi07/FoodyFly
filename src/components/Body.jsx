import RestroCard, { withPromotedLabel } from "./RestroCard";
import dishes from "../../public/dishes.json";
import { useState, useEffect, useRef } from "react";
import SceletonCard from "./SceletonCard";
import { NavLink } from "react-router-dom";

const Body = () => {
    // console.log("hello"); // Cleaned up console log
    let [allData] = useState(dishes);
    let [DISH, setDISH] = useState(allData);
    let [searchText, setSearchText] = useState("");
    let [order, setOrder] = useState("");
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !loading) {
                    loadMore();
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [loading]);

    const loadMore = () => {
        if (visibleCount >= DISH.length) return;
        setLoading(true);

        // simulate delay
        setTimeout(() => {
            setVisibleCount((prev) => prev + 8);
            setLoading(false);
        }, 1000);
    };

    if (DISH.length === 0) {
        return <h1 className="text-center mt-10 text-2xl font-bold text-red-500">Something went Wrong...</h1>
    }

    function TopRated() {
        const filter = allData.filter((res) => res.rating > 4)
        setDISH(filter);
    }

    function cheaper() {
        const filter = allData.filter((res) => res.price < 250)
        setDISH(filter);
    }

    function showAll() {
        setDISH(allData);
    }

    function searchIt() {
        const filter = allData.filter((res) =>
            res.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setDISH(filter);
    }

    const PromotedRestroCard = withPromotedLabel(RestroCard);

    return (
        <>
            <div className="font-serif bg-[#d7e9f5] md:w-[98%] mx-auto rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 my-6 dark:bg-gray-800 dark:text-white transition-colors duration-200">


                <div className="flex flex-col md:flex-row items-center justify-around gap-4 mb-8">

                    {/* Search Input */}
                    <div className="w-full md:w-auto">
                        <input 
                            type="text" 
                            className="w-full md:w-170 border-2 border-[#333333] font-serif px-3 py-2 bg-white rounded-lg text-lg dark:bg-gray-800 dark:border-[#4a7ac3] focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            placeholder="Search..." 
                            value={searchText} 
                            onChange={(e) => { setSearchText(e.target.value) }}
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
                        <button className="bg-[#4a7ac3] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#355b96] transition-all dark:bg-[#284bffff]" onClick={searchIt}>Search</button>
                        <button className="bg-[#4a7ac3] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#355b96] transition-all dark:bg-[#284bffff]" onClick={TopRated}>Top Rated</button>
                        <button className="bg-[#4a7ac3] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#355b96] transition-all dark:bg-[#284bffff]" onClick={cheaper}>Cheaper</button>
                        <button className="bg-[#4a7ac3] text-white font-semibold rounded-lg px-4 py-2 hover:bg-[#355b96] transition-all dark:bg-[#284bffff]" onClick={showAll}>Show All</button>
                    </div>
                </div>

                {/* --- Cards Container --- */}
                <div className="flex flex-wrap justify-center gap-6">
                    {loading && visibleCount === 8 ? ( 
                        /* Initial Load Skeleton logic if needed, otherwise this uses the infinite scroll logic below */
                         Array.from({ length: 8 }).map((_, index) => (
                             <SceletonCard key={index} />
                         ))
                    ) : (
                        DISH.slice(0, visibleCount).map((dish, index) => (
                            dish.promoted
                                ? <PromotedRestroCard key={dish.id || index} data={dish} dishId={dish.id} index={index} order={order} />
                                : <RestroCard data={dish} dishId={dish.id} index={index} order={order} key={dish.id || index} />
                        ))
                    )}
                    
                    {/* Skeleton Loading Indicator at bottom */}
                    {loading && visibleCount > 8 && Array.from({ length: 4 }).map((_, index) => (
                         <SceletonCard key={`loading-${index}`} />
                    ))}
                </div>

                {/* Observer Target */}
                <div ref={loaderRef} className="h-10 w-full"></div>
            </div>
        </>
    )
}

export default Body;