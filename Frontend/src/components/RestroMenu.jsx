import { useParams } from "react-router-dom";
import { useRestroMenu } from "../utils/useResrtoMenu";
import { RestroCategory } from "./RestroCategory";
import { useState } from "react";

export const RestroMenu = () => {

  const { id } = useParams();

  const data = useRestroMenu(Number(id));

  const RestroCategorys = Object.values(data.categories || {});

  const [showIndex, setShowIndex] = useState(-1);


  if (!data)
    return (
      <h1 className="text-center mt-10 text-2xl font-bold">
        Restaurant Not Found
      </h1>
    );


  return (

    <div className="flex justify-center my-6 md:my-10">

      <div
        className="
        w-[95%] md:w-[98%]
        bg-[#d7e9f5]
        rounded-xl
        border-4 border-[#4a7ac3]
        p-4 md:p-8
        font-serif
        dark:bg-gray-800 dark:border-[#4a7ac3] dark:text-white

        shadow-[0_8px_24px_rgba(0,0,0,0.12)]
        hover:shadow-[0_14px_32px_rgba(0,0,0,0.18)]
        transition-shadow duration-300
      "
      >

        <div className="flex flex-col items-center">


          {/* Restaurant Name */}
          <div
            className="
            text-3xl md:text-4xl
            mt-1
            font-bold
            text-center
            mb-6 md:mb-10
            text-[#4a7ac3] dark:text-white
            tracking-wide
          "
          >
            {data.name}
          </div>



          {/* Restaurant Image */}
          <div
            className="
            w-full md:w-[70%]
            h-48 md:h-90
            mb-6
            rounded-xl
            overflow-hidden
            border-2 border-[#4a7ac3]/50

            shadow-[0_6px_18px_rgba(0,0,0,0.15)]
            hover:shadow-[0_10px_26px_rgba(0,0,0,0.22)]
            transition-shadow duration-300
          "
          >

            <img
              src={data.imageUrl}
              alt={data.name}
              className="
                w-full h-full object-cover
                transition-transform duration-500 ease-out
                hover:scale-[1.04]
              "
            />

          </div>



          {/* Info Box */}
          <div
            className="
            flex flex-col md:flex-row
            gap-2 md:gap-8
            mb-8
            text-center
            bg-white/60 dark:bg-black/20
            p-4
            rounded-lg
            w-full justify-center md:w-[70%]

            shadow-[0_4px_12px_rgba(0,0,0,0.10)]
          "
          >

            <div className="text-lg md:text-xl font-medium">
              {data.cuisine}
            </div>

            <div className="hidden md:block text-gray-400">|</div>

            <div className="text-lg md:text-xl font-medium">
              {data.rating} ⭐
            </div>

            <div className="hidden md:block text-gray-400">|</div>

            <div className="text-lg md:text-xl font-medium">
              Cost For Two: ₹{data.costForTwo}
            </div>

          </div>



          {/* Categories */}
          <div className="w-full mx-auto flex flex-col items-center">

            {RestroCategorys.map((categories, index) => (

              <RestroCategory
                resId={id}
                key={index + 1}
                title={categories.title}
                items={categories.items}
                setShowIndex={() => {
                  setShowIndex(showIndex === index + 1 ? null : index + 1);
                }}
                open={showIndex === index + 1}
                index={index + 1}
              />

            ))}

          </div>


        </div>

      </div>

    </div>

  );

};
