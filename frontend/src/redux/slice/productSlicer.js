import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// Thunk for fetching all products
export const fetchProducts = createAsyncThunk('products/fetchAll', async ({ keyword = '', currentPage = 1, priceRange = [0, 25000000], categories = '', ratings = 0 } = {}, { rejectWithValue }) => {

    console.log(categories);

    try {
        let url = `http://localhost:4000/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${[priceRange[1]]}&ratings[gte]=${ratings}`

        if (categories) {
            url = `http://localhost:4000/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${[priceRange[1]]}&category=${categories}&ratings[gte]=${ratings}`

        }
        const response = await axios.get(url, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        // console.log(error.response.data);
        console.log(rejectWithValue(error.response.data));

        // You can also access `error.response` to handle specific HTTP errors
        return rejectWithValue(error.response.data ? error?.response?.data : error);
    }
});

// Thunk for fetching a single product by ID
export const getSingleProducts = createAsyncThunk('products/fetchById', async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:4000/products/singleproduct/${productId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response);

        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});


// Thunk for fetching New Reviews
export const createReviews = createAsyncThunk('products/newReviews', async (review, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:4000/products/review`, review, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response);

        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

// Thunk for fetching adminProducts
export const adminProducts = createAsyncThunk('products/adminproducts', async (rejectWithValue) => {
    try {
        const response = await axios.get(`http://localhost:4000/products/admin/product`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

// Thunk for fetching CreateProducts 
export const adminCreateProducts = createAsyncThunk('products/adminCreateProducts', async (myForm, { rejectWithValue }) => {
    // console.log(myForm)
    try {
        const response = await axios.post(`http://localhost:4000/products/admin`, myForm, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        toast.success("Products Created...")
        return response.data;
    } catch (error) {
        // console.log(error);

        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

// Thunk for fetching DeleteProducts 
export const deleteProducts = createAsyncThunk('products/deleteProducts', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:4000/products/admin/${id}`, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});


// Thunk for fetching getAllReviews  ( Admin )
export const getAllReviews = createAsyncThunk('products/getAllReviews', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:4000/products/review/all?id=${id}`, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});



// Thunk for fetching deleteReviews  ( Admin )
export const deleteReview = createAsyncThunk('products/deleteReviews', async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`http://localhost:4000/products/reviews?id=${reviewId}&productId=${productId}`, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

// Thunk for fetching update Products 
export const updateProducts = createAsyncThunk('products/updateProducts', async ({ id, myForm }, { rejectWithValue }) => {
    console.log(id)
    try {
        const response = await axios.put(`http://localhost:4000/products/admin/${id}`, myForm, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        });
        toast.success("Product Updated Successfully!");
        return response.data;
    } catch (error) {
        // console.log(error);

        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});



// Product slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: { data: null },
        status: 'idle',
        error: null,
        reviews: null,
        adminProducts: null,
        products: null,
        deleteProducts: null,
        allReviewProduct: null,
        updateProducts: null,

    },
    reducers: {
        reset: (state) => {
            state.status = 'idle';
            state.error = null;
            state.reviews = null;
            state.selectedProduct = { data: null };
            state.allReviewProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchProducts cases
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message;
            })

            // Handle getSingleProducts cases
            .addCase(getSingleProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSingleProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedProduct = action.payload; // Store the single product data
            })
            .addCase(getSingleProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })


            // Handle New Reviews cases
            .addCase(createReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reviews = action.payload; // Store the single product data
            })
            .addCase(createReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })


            // Handle admin products
            .addCase(adminProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(adminProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adminProducts = action.payload; // Store the single product data

            })
            .addCase(adminProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                console.log(action.error);

            })

            // Handle admin Create products
            .addCase(adminCreateProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(adminCreateProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Store the single product data

            })
            .addCase(adminCreateProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                console.log(action.error);

            })

            //products delete
            .addCase(deleteProducts.pending, (state) => {
                state.status = 'loading';  // You can add loading state for pending
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Handle fulfilled state here
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                console.log(action.error);
            })

            //get products all reviews

            .addCase(getAllReviews.pending, (state) => {
                state.status = 'loading';  // You can add loading state for pending
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allReviewProduct = action.payload
                // Handle fulfilled state here
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                console.log(action.error);
            })


            //update products

            .addCase(updateProducts.pending, (state) => {
                state.status = 'loading';  // You can add loading state for pending
            })
            .addCase(updateProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Handle fulfilled state here
            })
            .addCase(updateProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                console.log(action.payload);
            })


    },
});

export const { reset } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
