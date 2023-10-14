import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user", async () => {
	const response = await fetch(
		`${process.env.REACT_APP_SERVER_URL}/auth/getUsers`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
			},
		},
	);
	const data = await response.json();
	return data;
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		token: "",
		loading: null,
		user: null,
		orders: null,
		myOrders: null,
	},
	reducers: {
		addUser(state, action) {
			state.user = action.payload;
		},
		removeUser(state, action) {
			state.user = null;
		},
		addAllOrders(state, action) {
			state.orders = action.payload;
		},
		addMyOrders(state, action) {
			state.myOrders = action.payload;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUser.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			if (action.payload.access === false) {
				state.user = null;
				localStorage.removeItem("_token");
			} else {
				state.user = action.payload;
			}
			state.loading = false;
		});
		builder.addCase(fetchUser.rejected, state => {
			state.user = null;
			state.loading = false;
		});
	},
});

export const { addUser, removeUser, addAllOrders, addMyOrders } =
	userSlice.actions;
export default userSlice.reducer;
