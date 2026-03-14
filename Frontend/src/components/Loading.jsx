const Loading = () => {
  return (
    <div className="bg-[#d7e9f5] w-full rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 dark:bg-gray-800 dark:border-[#4a7ac3] dark:text-white animate-pulse">
      {/* Title Bar Skeleton */}
      <div className="h-10 w-full rounded-lg bg-[#b4d1e3] mb-4 dark:bg-gray-600"></div>
      
      {/* Content Lines */}
      <div className="h-5 w-full rounded-lg bg-[#b4d1e3] mb-2 dark:bg-gray-600"></div>
      <div className="h-5 w-full rounded-lg bg-[#b4d1e3] mb-2 dark:bg-gray-600"></div>
      <div className="h-5 w-3/4 rounded-lg bg-[#b4d1e3] mb-2 dark:bg-gray-600"></div>
      <div className="h-5 w-full rounded-lg bg-[#b4d1e3] mb-2 dark:bg-gray-600"></div>
      <div className="h-5 w-5/6 rounded-lg bg-[#b4d1e3] mb-2 dark:bg-gray-600"></div>
      <div className="h-5 w-full rounded-lg bg-[#b4d1e3] mb-2 dark:bg-gray-600"></div>
    </div>
  );
};

export default Loading;