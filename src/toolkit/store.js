import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import ProductsSlice from "./ProductsSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
	reducer: {
		products: ProductsSlice,
		category: CategorySlice,
		user: UserSlice,
	},
});
