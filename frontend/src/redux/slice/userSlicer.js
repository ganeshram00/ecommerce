import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user registration
export const registerUser = createAsyncThunk('user/registerUser', async (myForm, { rejectWithValue }) => {
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await axios.post('http://localhost:4000/user/register', myForm, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Async thunk for user login
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const response = await axios.post('http://localhost:4000/user/login', { email, password }, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

// Async thunk for loading user profile
export const MeProfile = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('http://localhost:4000/user/me', { withCredentials: true });
        return data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "An error occurred");
    }
});

// Async thunk for logging out
export const logOut = createAsyncThunk('user/logOut', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('http://localhost:4000/user/logout', { withCredentials: true });
        return data.message;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "An error occurred");
    }
});

// Async thunk for Profile Update 
export const profileUpdate = createAsyncThunk('user/profileUpdate', async (myForm, { rejectWithValue }) => {
    try {
        const { data } = await axios.put('http://localhost:4000/user/me/update', myForm, { withCredentials: true });
        return data.message;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "An error occurred");
    }
});

// Async thunk for password Update 
export const updatePassword = createAsyncThunk('user/updatePassword', async (myForm, { rejectWithValue }) => {
    try {
        const { data } = await axios.put('http://localhost:4000/user/password/update', myForm, { withCredentials: true });
        return data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response?.data?.error || error.response?.data.message);
    }
});


// Async thunk for forgot password  
export const forgotPassword = createAsyncThunk('user/forgotPassword', async (myForm, { rejectWithValue }) => {
    try {
        const { data } = await axios.post('http://localhost:4000/user/password/forgot', myForm, { withCredentials: true });
        return data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response?.data?.error || error.response?.data.message);
    }
});

// Async thunk for reset password  
export const resetPassword = createAsyncThunk('user/resetPassword', async ({ token, myForm }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`http://localhost:4000/user/password/reset/${token}`, myForm);
        return data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response?.data?.error || error.response?.data.message);
    }
});


// Async thunk for GetAllUser (Admin)  
export const GetAllUser = createAsyncThunk('user/GetAllUser', async (rejectWithValue) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    try {
        const { data } = await axios.get(`http://localhost:4000/user/admin/users`, config);
        return data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response?.data?.error || error.response?.data.message);
    }
});

// Async thunk for DeleteUser (Admin)  
export const DeleteUser = createAsyncThunk('user/Deleteuser', async (id, { rejectWithValue }) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    try {
        const { data } = await axios.delete(`http://localhost:4000/user/admin/users/${id}`, config);
        return data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response?.data?.error || error.response?.data.message);
    }
});

// Async thunk for singleUser (Admin)  
export const singleUser = createAsyncThunk('user/singleuser', async (id, { rejectWithValue }) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    try {
        const { data } = await axios.get(`http://localhost:4000/user/admin/users/${id}`, config);
        return data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response?.data?.error || error.response?.data.message);
    }
});

// Async thunk for updateUserRole (Admin)  
export const updateUserRole = createAsyncThunk('user/updateUserRole', async ({ id, formData }, { rejectWithValue }) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    try {
        const { data } = await axios.put(`http://localhost:4000/user/admin/users/${id}`, formData, config);
        return data;
    } catch (error) {
        console.log(error);

        return rejectWithValue(error.response?.data?.error || error.response?.data.message);
    }
});


// Create a slice for user  
const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: null,
        status: 'idle',
        isAuthenticated: false,
        error: null,
        allUser: null,
        singleUsers: null,
        deleteUser: null
    },
    reducers: {
        reset: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.isAuthenticated = false;
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // Login User
            .addCase(loginUser.pending, (state) => {
                state.isAuthenticated = false;
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // Me Profile
            .addCase(MeProfile.pending, (state) => {
                state.status = 'loading';
                state.isAuthenticated = false;
            })
            .addCase(MeProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(MeProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // LogOut
            .addCase(logOut.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logOut.fulfilled, (state) => {
                state.status = 'succeeded';
                state.isAuthenticated = false;
                state.users = null; // Clear user data on logout
                state.error = null;
            })
            .addCase(logOut.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // Profile Update
            .addCase(profileUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(profileUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(profileUpdate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // password Update
            .addCase(updatePassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                state.error = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


            // forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


            // reset password
            .addCase(resetPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // get all user 
            .addCase(GetAllUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(GetAllUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUser = action.payload;
                // console.log(action.payload);

                state.error = null;
            })
            .addCase(GetAllUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // delete  user 
            .addCase(DeleteUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUser = action.payload;
                console.log(action.payload);

                state.error = null;
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


             // single  user 
             .addCase(singleUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(singleUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singleUsers = action.payload;
                // console.log(action.payload);

                state.error = null;
            })
            .addCase(singleUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


             // update User Role 
             .addCase(updateUserRole.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.singleUsers = action.payload;
                // console.log(action.payload);

                state.error = null;
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

    },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
