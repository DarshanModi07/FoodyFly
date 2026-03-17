const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[#d7e9f5] dark:bg-gray-900 transition-colors duration-300">

      <div className="relative w-20 h-20">
        <div className="absolute inset-[-6px] border-2 border-[#4a7ac3]/20 rounded-full animate-pulse" />
        <div className="absolute inset-0 border-[3px] border-transparent border-t-[#4a7ac3] border-r-[#4a7ac3]/40 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          🍔
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-[#4a7ac3] dark:text-blue-300 font-semibold text-xl font-serif tracking-[3px]">
          FoodyFly
        </span>
        <span className="text-gray-400 dark:text-gray-500 text-sm font-serif">
          Loading...
        </span>
        <span className="text-gray-400 dark:text-gray-600 text-xs font-serif italic mt-1">
          Good food is just a moment away
        </span>
      </div>

    </div>
  );
};

export default Loading;