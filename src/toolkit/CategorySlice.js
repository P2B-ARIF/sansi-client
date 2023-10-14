import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk("category", async () => {
	const response = await fetch(
		`${process.env.REACT_APP_SERVER_URL}/product/category`,
	);
	return response.json();
});

const categorySlice = createSlice({
	name: "category",
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: builder => {
		builder.addCase(fetchCategory.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(fetchCategory.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchCategory.rejected, state => {
			state.data = [];
			state.isLoading = false;
		});
	},
	
});

export default categorySlice.reducer;
