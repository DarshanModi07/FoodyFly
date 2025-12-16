import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:'cart',
    initialState : {
        items:[]
    },
    reducers : {
        addItem : (state,action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            const index = state.items.indexOf(action.payload);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        clearCart : (state,action) => {
            state.items.length = 0;
        }
    },
});

export const {addItem,removeItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;