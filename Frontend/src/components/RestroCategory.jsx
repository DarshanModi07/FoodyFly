import Items from "./Items";

export const RestroCategory = ({ resId, title, items, open, setShowIndex }) => {

  return (

    <div className="my-4 w-full md:w-[70%]">

      {/* Header Bar */}
      <div 
        className="
          flex justify-between items-center w-full
          bg-[#4a7ac3] dark:bg-[#284bffff]
          py-4 px-6
          rounded-lg
          text-white
          
          shadow-[0_4px_12px_rgba(0,0,0,0.15)]
          hover:shadow-[0_8px_20px_rgba(0,0,0,0.22)]
          hover:-translate-y-[1px]

          cursor-pointer
          transition-all duration-300 ease-out
        "
        onClick={setShowIndex}
      >

        <h2 className="text-lg md:text-xl font-bold capitalize tracking-wide">
          {title}
        </h2>


        {/* Arrow */}
        <div
          className="
            transform transition-all duration-300 ease-out
            text-lg
            select-none
            ${open ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
          "
        >
          ▼
        </div>

      </div>


      {/* Accordion Body */}
      <div
        className="
          bg-white/60 dark:bg-gray-700/60
          rounded-b-lg
          overflow-hidden

          shadow-[0_6px_18px_rgba(0,0,0,0.12)]

          transition-all duration-500 ease-in-out
        "
        style={{
          maxHeight: open ? "1000px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >

        <Items
          items={items}
          resId={resId}
          title={title}
        />

      </div>

    </div>

  );

};
