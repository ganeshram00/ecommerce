import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Async thunk for createOrder
export const createOrder = createAsyncThunk('user/createOrder', async (order, { rejectWithValue }) => {
    console.log('Order data being sent:', order);

    try {
        // Setting the Content-Type header to application/json since it's a JSON payload
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const response = await axios.post('http://localhost:4000/order/new', order, config);
        console.log('API Response:', response.data);

        // Returning the response data on success
        return response.data;
    } catch (error) {
        // Handle error by logging it and returning the message to the slice
        console.log('Error occurred:', error.response ? error.response.data.error : error.message);

        // Returning a structured error message to be caught in the slice
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

//Async thunk for My Order
export const myOrder = createAsyncThunk('user/myOrder', async (_, { rejectWithValue }) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const response = await axios.get('http://localhost:4000/order/me', config);
        // console.log(response);

        return response.data.orders;
    } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
    }
});

//Async thunk for get Single Order
export const getSingleOrder = createAsyncThunk('user/singleOrder', async (id, { rejectWithValue }) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const response = await axios.get(`http://localhost:4000/order/singleorder/${id}`, config);
        console.log(response);

        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
    }
});


//Async thunk for get all  Order  ( Admin )
export const AllOrderAdmins = createAsyncThunk('user/allAdminOrder', async (rejectWithValue) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const response = await axios.get('http://localhost:4000/order/allOrder', config);

        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
    }
});

//Async thunk for get all  Order  ( Admin )
export const OrderDeleted = createAsyncThunk('user/OrderDelete', async (id, { rejectWithValue }) => {
    console.log(id);

    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const response = await axios.delete(`http://localhost:4000/order/admin/${id}`, config);

        return response.data;
    } catch (error) {
        console.log(error);

        console.error('Error fetching orders:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
    }
});


//Async thunk for get all  OrderStatusUpdate  ( Admin )
export const OrderStatusUpdate = createAsyncThunk('user/OrderDelete', async ({ id, status }, { rejectWithValue }) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // Ensures cookies are sent
        };
        const response = await axios.put(`http://localhost:4000/order/admin/${id}`, { status }, config);
        return response.data;
    } catch (error) {
        // console.log(error);

        console.error('Error fetching orders:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Slice definition
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderData: null,
        status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
        error: null,
        userOrder: [],
        singleOrder: null,
        getAllOrder: null,
        orderstatus:null
    },
    reducers: {
        reset: (state) => {
            state.status = "idle";  // Use '=' to assign the value
            state.error = null;     // Use '=' to assign the value
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading'; // Set loading when request is pending
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Set succeeded when request is successful
                state.orderData = action.payload;  // Store the response data in state
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';  // Set failed if request fails
                state.error = action.payload;  // Store the error message
            })

            // //my Order 
            .addCase(myOrder.pending, (state) => {
                state.status = 'loading'; // Set loading when request is pending
            })
            .addCase(myOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Set succeeded when request is successful
                state.userOrder = action.payload;
                console.log(action.payload);
                // Store the response data in state
            })
            .addCase(myOrder.rejected, (state, action) => {
                state.status = 'failed';  // Set failed if request fails
                state.error = action.payload;  // Store the error message
            })


            //Single Order  
            .addCase(getSingleOrder.pending, (state) => {
                state.status = 'loading'; // Set loading when request is pending
            })
            .addCase(getSingleOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Set succeeded when request is successful
                state.singleOrder = action.payload;
                console.log(action.payload);
                // Store the response data in state
            })
            .addCase(getSingleOrder.rejected, (state, action) => {
                state.status = 'failed';  // Set failed if request fails
                state.error = action.payload;  // Store the error message
            })

            //Get All Order Admin  
            .addCase(AllOrderAdmins.pending, (state) => {
                state.status = 'loading'; // Set loading when request is pending
            })
            .addCase(AllOrderAdmins.fulfilled, (state, action) => {
                state.status = 'succeeded';  // Set succeeded when request is successful
                state.getAllOrder = action.payload;
                // console.log(action.payload);
                // Store the response data in state
            })
            .addCase(AllOrderAdmins.rejected, (state, action) => {
                state.status = 'failed';  // Set failed if request fails
                state.error = action.payload;  // Store the error message
            })


        // Get All OrderStatusUpdate Admin  
         .addCase(OrderStatusUpdate.pending, (state) => {
            state.status = 'loading'; // Set loading when request is pending
        })
        .addCase(OrderStatusUpdate.fulfilled, (state, action) => {
            state.status = 'succeeded';  // Set succeeded when request is successful
            state.orderstatus = action.payload;
            console.log(action.payload);
            // Store the response data in state
        })
        .addCase(OrderStatusUpdate.rejected, (state, action) => {
            state.status = 'failed';  // Set failed if request fails
            state.error = action.payload;  // Store the error message
        });
    }
});
export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
