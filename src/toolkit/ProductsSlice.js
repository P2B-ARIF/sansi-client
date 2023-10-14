import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products", async () => {
	const response = await fetch(
		`${process.env.REACT_APP_SERVER_URL}/product/allProducts`,
		{
			method: "GET",
			headers: {
				Authorization: "Bearer " + process.env.REACT_APP_SECURE_FETCHING,
			},
		},
	);
	return response.json();
});

const productsSlice = createSlice({
	name: "products",
	initialState: {
		checkouts: [],
		shippingAddress: null,
		carts: [],
		products: [],
		isLoading: false,
		error: null,
		modal: null,
		flashSale: [],
		popUp: null,
		wishLists: [],
	},
	reducers: {
		addToCart(state, action) {
			const find = state.carts.find(
				p => p.product_Id === action.payload.product_Id,
			);
			if (find?.product_Id) {
				state.error = null;
			} else {
				state.carts.push(action.payload);
			}
		},

		removeToCart(state, action) {
			state.carts = state.carts.filter(p => p.product_Id !== action.payload);
		},
		incQuantity(state, action) {
			const find = state.carts.find(p => p.product_Id === action.payload);
			find.selected.quantity += 1;
		},
		decQuantity(state, action) {
			const find = state.carts.find(p => p.product_Id === action.payload);
			find.selected.quantity -= 1;
		},
		changeSize(state, action) {
			const find = state.carts.find(
				p => p.product_Id === action.payload.product_Id,
			);
			find.selected.size = action.payload.size;
		},

		addToCheckouts(state, action) {
			state.checkouts.push(...action.payload);
		},
		addShippingAddress(state, action) {
			state.shippingAddress = action.payload;
		},
		removeCheckouts(state, action) {
			state.checkouts = [];
		},
		addToModal(state, action) {
			state.modal = action.payload;
		},
		addFlashSale(state, action) {
			state.flashSale = action.payload;
		},
		addPopUpMessage(state, action) {
			state.popUp = action.payload;
		},
		addToWishLists(state, action) {
			state.wishLists.push(action.payload);
		},
		removeFromWishLists(state, action) {
			state.wishLists = state.wishLists.filter(wish => wish !== action.payload);
		},
		setModalClose(state, action) {
			state.modal = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchProducts.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.products = action.payload;
		});
		builder.addCase(fetchProducts.rejected, state => {
			state.products = [];
			state.isLoading = false;
		});
	},
});

export const {
	addToCart,
	removeToCart,
	incQuantity,
	decQuantity,
	changeSize,
	addToCheckouts,
	addShippingAddress,
	removeCheckouts,
	addToModal,
	addFlashSale,
	addPopUpMessage,
	addToWishLists,
	removeFromWishLists,
	setModalClose,
} = productsSlice.actions;

export default productsSlice.reducer;
