import {useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Items from "./Items";
import { clearCart } from "../../redux/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const Dispatch = useDispatch();

    const handleClearCart = () => {
        Dispatch(clearCart())
    }

    return (
        <>
        { 
            (cartItems.length < 1) ?
            (
            <div className="bg-[#d7e9f5] ml-4 mr-4 rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 font-serif dark:bg-gray-800 dark:border-[#4a7ac3] dark:text-white flex flex-col items-center justify-center h-64 transition-colors duration-200">  
                <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
                <p>Your cart is currently empty. Start adding delicious dishes to your cart!</p>
            </div>
            )
            :
            (   
                <div className="bg-[#d7e9f5] my-6 ml-4 mr-4 rounded-xl border-4 shadow-2xl border-[#4a7ac3] p-4 font-serif dark:bg-gray-800 dark:border-[#4a7ac3] dark:text-white text-center transition-colors duration-200"> 
                <div className="p-4 m-4">
                    <h1 className="text-2xl font-bold">Cart Items</h1>
                    <div className="h-10 w-40 bg-[#4a7ac3] text-white shadow-2xl rounded-lg p-2 text-center dark:bg-[#284bffff]  cursor-pointer ml-155 m-5" onClick={handleClearCart}>Clear Cart</div>
                    <Items items={cartItems} />
                </div>
                <div className="h-10 w-40 bg-[#4a7ac3] text-white shadow-2xl rounded-lg p-2 text-center dark:bg-[#284bffff]  cursor-pointer ml-163 m-5">Order Now</div>
                </div>
                
            )
        }
        
        </>
    )
}

export default Cart;