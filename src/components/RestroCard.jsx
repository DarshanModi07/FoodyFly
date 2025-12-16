import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { NavLink } from "react-router-dom";
import { addItem,removeItem} from "../../redux/cartSlice";

const RestroCard = ({ data, index }) => {

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
        <div className="bg-[#d7e9f5] res-card m-4 p-4 rounded-lg shadow-2xl border-2 font-serif border-[#4a7ac3] dark:bg-gray-700">

            <NavLink to={`/restro/${index}`}>
                <div className="rounded-lg overflow-hidden">
                    <img
                        className="rounded-lg w-64 h-44 hover:scale-105 transition-transform duration-200"
                        src={data.imageUrl}
                    />
                </div>
            </NavLink>

            <NavLink to={`/restro/${index}`}>
                <div className="text-lg mt-1 font-semibold">{data.RestroName}</div>
            </NavLink>

            <NavLink to={`/restro/${index}`}>
                <div>{data.name}</div>
            </NavLink>

            <NavLink to={`/restro/${index}`}>
                <div className="text-[#555] dark:text-white">{data.cuisine}</div>
            </NavLink>

            <NavLink to={`/restro/${index}`}>
                <div>₹{data.price}</div>
            </NavLink>

            <div className="flex justify-between items-center mt-2">

                <NavLink to={`/restro/${index}`}>
                    <div className="text-[#333] dark:text-white">{data.rating}⭐</div>
                </NavLink>


                <div className="flex cursor-pointer gap-2">
                        <div
                        className="h-10 w-20 bg-green-500 shadow-2xl rounded-lg p-2 text-center dark:bg-[#284bffff] dark:text-white" onClick={() => handleAddItem(data.name)}>
                        Add +
                        </div>
                        <div className="h-10 w-20 bg-red-500 shadow-2xl rounded-lg p-2 text-center dark:bg-[#284bffff] dark:text-white cursor-pointer"
                onClick={() => {hanldeRemoveItem(data.name)}}>Discard</div>
                </div>
                    </div>

            </div>
    );
};

export const withPromotedLabel = (Component) => {
  return (props) => (
    <div className="relative">
      <span className="absolute top-2 left-2 bg-black dark:bg-gray-200 dark:text-black text-white px-2 rounded">
        PROMOTED
      </span>
      <Component {...props} />
    </div>
  );
};


export default RestroCard;
