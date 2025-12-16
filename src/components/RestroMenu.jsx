import { useParams } from "react-router-dom";
import { useRestroMenu } from "../utils/useResrtoMenu";
import { RestroCategory } from "./RestroCategory";
import restroInfo from "../../public/restroInfo.json";
import { useState } from "react";

export const RestroMenu = () => {
  const { id } = useParams();
  const data = useRestroMenu(id);
  const RestroCategorys = Object.values(restroInfo[id]?.categories || {});
  const [showIndex, setShowIndex] = useState(-1);

  if (!data) return <h1 className="text-center mt-10 text-2xl font-bold">Restaurant Not Found</h1>;

  return (
    <div className="flex justify-center my-6 md:my-10">
      {/* Responsive Container */}
      <div className="w-[95%] md:w-[98%] bg-[#d7e9f5] rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 md:p-8 font-serif dark:bg-gray-800 dark:border-[#4a7ac3] dark:text-white transition-colors duration-200">
        
        <div className="flex flex-col items-center">
          {/* Restaurant Name */}
          <div className="text-3xl md:text-4xl mt-1 font-bold text-center mb-6 md:mb-10 text-[#4a7ac3] dark:text-white">
            {data.name}
          </div>

          {/* Responsive Image Container */}
          <div className="w-full md:w-[70%] h-48 md:h-90 mb-6 rounded-xl overflow-hidden shadow-lg border-2 border-[#4a7ac3]/50">
            <img 
                src={data.imageUrl} 
                alt={data.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Restaurant Details - Flex Row on Desktop */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 mb-8 text-center bg-white/50 dark:bg-black/20 p-4 rounded-lg w-full justify-center md:w-[70%]">
            <div className="text-lg md:text-xl font-medium">{data.cuisine}</div>
            <div className="hidden md:block text-gray-400">|</div>
            <div className="text-lg md:text-xl font-medium">{data.rating} ⭐</div>
            <div className="hidden md:block text-gray-400">|</div>
            <div className="text-lg md:text-xl font-medium">Cost For Two: ₹{data.costForTwo}</div>
          </div>

          {/* Categories Accordion */}
          <div className="w-full mx-auto flex flex-col items-center">
            {RestroCategorys.map((categories, index) => (
              <RestroCategory
                key={index}
                title={categories.title}
                items={categories.items}
                setShowIndex={() => { setShowIndex(showIndex === index ? null : index) }}
                open={showIndex === index}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};