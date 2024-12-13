import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const loadShippingDetailsFromLocalStorage = () => {
  try {
    const savedDetails = localStorage.getItem("shippingDetail");
    // console.log(savedDetails);
    
    if (savedDetails) {
      return JSON.parse(savedDetails);
    }
  } catch (error) {
    console.error("Error loading shipping details from localStorage", error);
  }
  return {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: ""
  };
};

const shippingSlice = createSlice({
  name: "shippingDetail",
  initialState: loadShippingDetailsFromLocalStorage(),
  reducers: {
    updateShippingDetails: (state, action) => {
      // console.log("Shipping details saved to localStorage", state);
      // Update shipping details
      Object.assign(state, action.payload);
      localStorage.setItem("shippingDetail", JSON.stringify(state));
      toast.success("Shipping details updated!");
    }
  }
});

export const { updateShippingDetails } = shippingSlice.actions;
export default shippingSlice.reducer;
