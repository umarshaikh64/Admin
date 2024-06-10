/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";

const initialState = {
    allBlog: [],
    allCategory: [],
    isLoading: false,
    error: [],
    isError: false,
    isRequestLoading: false,
    isRequestError: false,
};
const token = localStorage.getItem("jazakAuthToken")?.toString();

// async thunk to fetch all Hadith data from an API
export const fetchAllBlogs = createAsyncThunk("blog/all", async () => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/blog/all`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
});


export const addNewBlog = createAsyncThunk("blog/add", async (formData) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/blog/add`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
});


//async thunk to update a hadith
export const updateBlog = createAsyncThunk(
    "blog/update",
    async ({ data, id }, { dispatch, rejectWithValue }) => {
        const token = localStorage.getItem("jazakAuthToken")?.toString();
        const response = await fetch(`${baseUrl}/blog/update/${id}`, {
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        return responseData;
    }
);


//async thunk to delete a hadith
export const deleteBlog = createAsyncThunk("blog/delete", async (id) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/blog/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (data?.message) {
        return id;
    } else {
        return data;
    }
});



export const addCategory = createAsyncThunk("blog/category/add", async (formData) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/blog/category/add`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
});



//async thunk to fetch one hadith
export const fetchCategory = createAsyncThunk("blog/category/all", async () => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/blog/category/all`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
});

//async thunk to delete a hadith
export const deleteBlogCategory = createAsyncThunk("blog/category/delete", async (id) => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/blog/category/delete/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (data?.message) {
        return id;
    } else {
        return data;
    }
});

//async thunk to update a hadith
export const updateBlogCategory = createAsyncThunk(
    "blog/category/update",
    async ({ data, id }, { dispatch, rejectWithValue }) => {
        const token = localStorage.getItem("jazakAuthToken")?.toString();
        const response = await fetch(`${baseUrl}/blog/category/update/${id}`, {
            method: "POST",
            body: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const responseData = await response.json();
        return responseData;
    }
);

// // async thunk to add a new Hadith
// export const addNewHadith = createAsyncThunk("hadith/add", async (formData) => {
//     const token = localStorage.getItem("jazakAuthToken")?.toString();
//     const response = await fetch(`${baseUrl}/hadiths/add`, {
//         method: "POST",
//         body: formData,
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     const data = await response.json();
//     return data;
// });


// //async thunk to delete a hadith
// export const deleteHadith = createAsyncThunk("hadith/delete", async (id) => {
//     const token = localStorage.getItem("jazakAuthToken")?.toString();
//     const response = await fetch(`${baseUrl}/hadiths/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     const data = await response.json();
//     if (data?.message) {
//         return id;
//     } else {
//         return data;
//     }
// });

const blogSlice = createSlice({
    name: "blog",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //GET DATA

        builder.addCase(fetchCategory.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.allCategory = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });

        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        });

        builder.addCase(fetchAllBlogs.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
            state.allBlog = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });

        builder.addCase(fetchAllBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        });

        //POST DATA
        builder.addCase(addCategory.pending, (state, action) => {
            state.isRequestLoading = true;
            state.isRequestError = false;
        });

        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.allCategory = [...state.allCategory, action.payload];
            state.isRequestLoading = false;
            state.isRequestError = false;
        });

        builder.addCase(addCategory.rejected, (state, action) => {
            state.isRequestLoading = false;
            state.isRequestError = true;
        });

        builder.addCase(updateBlogCategory.pending, (state, action) => {
            state.isRequestLoading = true;
            state.isRequestError = false;
        });

        builder.addCase(updateBlogCategory.fulfilled, (state, action) => {
            state.allCategory = [...state.allCategory, action.payload];
            state.isRequestLoading = false;
            state.isRequestError = false;
        });

        builder.addCase(updateBlogCategory.rejected, (state, action) => {
            state.isRequestLoading = false;
            state.isRequestError = true;
        });

        builder.addCase(updateBlog.pending, (state, action) => {
            state.isRequestLoading = true;
            state.isRequestError = false;
        });

        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.allBlog = [...state.allBlog, action.payload];
            state.isRequestLoading = false;
            state.isRequestError = false;
        });

        builder.addCase(updateBlog.rejected, (state, action) => {
            state.isRequestLoading = false;
            state.isRequestError = true;
        });

        builder.addCase(addNewBlog.pending, (state, action) => {
            state.isRequestLoading = true;
            state.isRequestError = false;
        });

        builder.addCase(addNewBlog.fulfilled, (state, action) => {
            state.allBlog = [...state.allBlog, action.payload];
            state.isRequestLoading = false;
            state.isRequestError = false;
        });

        builder.addCase(addNewBlog.rejected, (state, action) => {
            state.isRequestLoading = false;
            state.isRequestError = true;
        });



        //delete
        builder.addCase(deleteBlogCategory.pending, (state, action) => {
            state.isRequestLoading = true;
            state.isRequestError = false;
        });
        builder.addCase(deleteBlogCategory.fulfilled, (state, action) => {
            state.allCategory = state.allCategory.filter(
                (item) => item.id !== action.payload
            );
            state.isRequestLoading = false;
            state.isRequestError = false;
        });

        builder.addCase(deleteBlogCategory.rejected, (state, action) => {
            state.isRequestLoading = false;
            state.isRequestError = true;
        });

        builder.addCase(deleteBlog.pending, (state, action) => {
            state.isRequestLoading = true;
            state.isRequestError = false;
        });
        builder.addCase(deleteBlog.fulfilled, (state, action) => {
            state.allBlog = state.allBlog.filter(
                (item) => item.id !== action.payload
            );
            state.isRequestLoading = false;
            state.isRequestError = false;
        });

        builder.addCase(deleteBlog.rejected, (state, action) => {
            state.isRequestLoading = false;
            state.isRequestError = true;
        });
    },
});

export default blogSlice.reducer;
