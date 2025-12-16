const SceletonCard = () => {
    return (
        <div className="bg-[#d7e9f5] res-card m-4 p-4 rounded-lg shadow-2xl border-2 font-serif border-[#4a7ac3]  w-75 hover:scale-105 transition-transform duration-100 dark:bg-gray-700">
            <div className="rounded-lg w-64 h-40 bg-[#b4d1e3]"></div>
            <div className="h-5 w-40 rounded-lg bg-[#b4d1e3] mt-1"></div>
            <div className="h-5 w-30 rounded-lg bg-[#b4d1e3] mt-1"></div>
            <div className="h-5 w-20 rounded-lg bg-[#b4d1e3] mt-1"></div>
            <div className="h-5 w-20 rounded-lg bg-[#b4d1e3] mt-1"></div>
        </div>
    )
}

export default SceletonCard;