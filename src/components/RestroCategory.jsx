import Items from "./Items";

export const RestroCategory = ({ title, items, open, setShowIndex }) => {
  return (
    <div className="my-4 w-full md:w-[70%]">
      {/* Header Bar */}
      <div 
        className="flex justify-between items-center w-full bg-[#4a7ac3] py-4 px-6 rounded-lg dark:bg-[#284bffff] text-white shadow-lg cursor-pointer hover:bg-[#3b63a1] transition-colors"
        onClick={setShowIndex}
      >
        <h2 className="text-lg md:text-xl font-bold capitalize tracking-wide">{title}</h2>
        <div className={`transform transition-transform duration-100 ${open ? "rotate-180" : "rotate-0"}`}>
            ▼
        </div>
      </div>

      {/* Accordion Body with Transition */}
      <div
        className={`
          bg-white/50 dark:bg-gray-700/50 rounded-b-lg overflow-hidden transition-[max-height] duration-500 ease-in-out  
          ${open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <Items items={items} />
      </div>
    </div>
  );
};