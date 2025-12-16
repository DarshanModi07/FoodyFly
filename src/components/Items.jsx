import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../redux/cartSlice";

const Items = ({ items }) => {
    const dispatch = useDispatch(); // Standard convention is lowercase 'dispatch'

    const handleAddItem = (item) => {
        dispatch(addItem(item));
        console.log("Item Added", item);
    }

    const handleRemoveItem = (item) => {
        dispatch(removeItem(item));
        console.log("Item Removed", item);
    }

    return (
        <div className="p-2 ">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-center bg-white m-2 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-600 dark:text-white border-b-2 border-gray-100 dark:border-gray-500 last:border-0 "
                >
                    
                    <div className="font-semibold text-lg mb-3 sm:mb-0 text-left w-full sm:w-auto">
                        {item}
                    </div>

                    
                    <div className="flex gap-3 w-full sm:w-auto justify-end">
                        <button 
                            className="w-24 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg shadow-md transition-transform hover:scale-105 active:scale-95 dark:bg-[#284bffff]" 
                            onClick={() => handleAddItem(item)}
                        >
                            Add +
                        </button>
                        
                        <button 
                            className="w-24 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg shadow-md transition-transform hover:scale-105 active:scale-95 dark:bg-[#284bffff]"
                            onClick={() => handleRemoveItem(item)}
                        >
                            Discard
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Items;