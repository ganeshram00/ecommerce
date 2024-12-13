import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    // If the cart exists and is a valid JSON array, return it
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    }
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
  }
  return []; // Return an empty array if no valid cart is found
};


const cartslice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromLocalStorage()
  },
  reducers: {
    // Add item to cart
    addtocart: (state, action) => {
      const existingItem = state.cart.find(item => item._id === action.payload.products._id);
    console.log(action.payload);
    
      // Check if the item already exists in the cart
      if (existingItem) {
        const maxQuantity = action.payload.products.stock;
        // Ensure we do not exceed the available stock
        existingItem.quantity = Math.min( action.payload.quantity, maxQuantity);
    
        toast.success('Item quantity updated...');
        
        // Update localStorage after quantity change
        localStorage.setItem('cart', JSON.stringify(state.cart));
      } else {
        // Ensure that the quantity to be added doesn't exceed available stock
        const quantityToAdd = Math.min(action.payload.quantity, action.payload.products.stock);
        
        // Create a new item with the adjusted quantity
        const newItem = { ...action.payload.products, quantity: quantityToAdd };
        
        // Add the item to the cart
        state.cart.push(newItem);
        toast.success("Item Added to Your Cart...");
    
        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    
    
    // Remove item from cart
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action.payload);
      toast.success("Item Removed from Your Cart");

      // Update localStorage after removal
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

   
    // Clear all items from the cart
    clearallcart: (state) => {
      state.cart = [];
  
      localStorage.removeItem('cart');
    }
  }
});

export const { addtocart, removeFromCart, clearallcart } = cartslice.actions;
export default cartslice.reducer;
