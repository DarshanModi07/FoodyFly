import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { NavLink } from "react-router-dom";
import { addItem,removeItem} from "../../redux/cartSlice";

const RestroCard = ({ data }) => {

    const Dispatch = useDispatch();

    const handleAddItem = (data) => {
        // Dispatch an Action
        Dispatch(addItem(data));
        console.log("Item Added", data);
    }

    const hanldeRemoveItem = (item) => {
            Dispatch(removeItem(item));
            console.log("Item Removed", item);
        }

    return (
        <div className="
  bg-[#d7e9f5] res-card m-4 p-4 rounded-lg border-2 font-serif border-[#4a7ac3] dark:bg-gray-700

  transition-all duration-300 ease-out
  hover:-translate-y-2
  hover:shadow-[0_12px_28px_rgba(74,122,195,0.35)]
">



            <NavLink to={`/restro/${data.id}`}>
                <div className="rounded-lg overflow-hidden">
                    <img
                        className="rounded-lg w-64 h-44 object-cover transition-transform duration-300 hover:scale-105"

                        src={data.imageUrl}
                    />
                </div>
            </NavLink>

            <NavLink to={`/restro/${data.id}`}>
                <div className="text-lg mt-1 font-semibold">{data.RestroName}</div>
            </NavLink>

            <NavLink to={`/restro/${data.id}`}>
                <div>{data.name}</div>
            </NavLink>

            <NavLink to={`/restro/${data.id}`}>
                <div className="text-[#555] dark:text-white">{data.cuisine}</div>
            </NavLink>

            <NavLink to={`/restro/${data.id}`}>
                <div>₹{data.price}</div>
            </NavLink>

            <div className="flex justify-between items-center mt-2">

                <NavLink to={`/restro/${data.id}`}>
                    <div className="text-[#333] dark:text-white">{data.rating}⭐</div>
                </NavLink>

                    </div>

            </div>
    );
};

export const withPromotedLabel = (Component) => {
  return (props) => (
    <div
      className="
        relative
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-xl
      "
    >
      <span className="absolute top-2 left-2 bg-black dark:bg-gray-200 dark:text-black text-white px-2 rounded z-10">
        PROMOTED
      </span>

      <Component {...props} />
    </div>
  );
};


export default RestroCard;
