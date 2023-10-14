import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "./toolkit/CategorySlice";
import {
	addFlashSale,
	addShippingAddress,
	addToCart,
	fetchProducts,
} from "./toolkit/ProductsSlice";
import { fetchUser } from "./toolkit/UserSlice";
import axios from "axios";

function App() {
	const dispatch = useDispatch();
	const { products, carts } = useSelector(state => state.products);

	useEffect(() => {
		dispatch(fetchProducts());
		dispatch(fetchCategory());
		dispatch(fetchUser());
	}, [dispatch]);

	// useEffect(() => {
	// 	const get = async () => {
	// 		const user = await fetchGetUser();
	// 		dispatch(addUser(user));
	// 	};
	// 	get();
	// }, [dispatch]);

	useEffect(() => {
		const fetch = async () => {
			const url = `${process.env.REACT_APP_SERVER_URL}/product/get/flashSale`;
			await axios
				.get(url)
				.then(res => {
					dispatch(addFlashSale(res.data));
				})
				.catch(err => console.log(err.message));
		};
		fetch();
	}, [dispatch]);

	// useEffect(() => {
	// 	const get = async () => {
	// 		const user = await fetchGetUser();
	// 		dispatch(addUser(user));
	// 	};
	// 	get();
	// }, [dispatch]);

	useEffect(() => {
		const getData = JSON.parse(localStorage.getItem("products"));
		if (getData && products) {
			for (let i = 0; i < getData.length; i++) {
				const el = getData[i];

				const find = products.find(p => p.product_Id === el.product_Id);
				if (find) {
					const localAdd = { ...find, selected: el };
					dispatch(addToCart(localAdd));
				}
			}
		}
	}, [dispatch, products, carts]);

	useEffect(() => {
		dispatch(
			addShippingAddress(JSON.parse(localStorage.getItem("shipping_address"))),
		);
	}, [dispatch]);

	return (
		<>
			
			<RouterProvider router={router} />;
		</>
	);
}

export default App;

// 873865984104656
// eb9971bd1ef97649cb7c260b46d1a756
// f1b74a3fcae83d10fd28cf58fc75b002
// 513936646457134
