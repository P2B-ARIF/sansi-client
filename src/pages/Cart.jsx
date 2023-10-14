import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import CartItems from "../components/CartItems";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
	addToCart,
	addToCheckouts,
	removeCheckouts,
} from "../toolkit/ProductsSlice";
import cart from "./../assets/shopping-cart.png";

const Cart = () => {
	const { carts, products } = useSelector(state => state.products);
	const [total, setTotal] = useState(0);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [getData, setGetData] = useState([]);

	useEffect(() => {
		dispatch(removeCheckouts());
	}, [navigate, dispatch]);

	useEffect(() => {
		let sum = 0;
		for (let i = 0; i < carts.length; i++) {
			const el = carts[i];

			sum += el.price * el?.selected?.quantity;
		}
		setTotal(sum);
	}, [carts]);

	const handleAddToCheckouts = () => {
		dispatch(addToCheckouts(carts));
		navigate("/checkouts");
	};

	useEffect(() => {
		const getLocalData = JSON.parse(localStorage.getItem("products"));
		setGetData(getLocalData);
	}, [carts]);

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
	}, [dispatch, products, carts, navigate]);

	return (
		<div className='container mx-auto h-full mt-10 md:mt-0'>
			<div className='text-sm text-slate-600 mx-3 md:mx-0'>
				<Breadcrumb>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink href='#'>Your Shopping Cart</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</div>

			{getData?.length > 0 ? (
				<div className='my-20 mx-3 md:mx-0'>
					<div className='flex items-center justify-between'>
						<h1 className='text-xl font-medium md:text-4xl'>Your cart</h1>
						<Link
							to={"/products/all"}
							className='flex gap-1 md:gap-3 items-center'
						>
							<BsArrowLeft className='text-slate-500 hover:text-slate-700' />
							<span>Continue shopping</span>
						</Link>
					</div>

					<div className='flex mt-10'>
						<h3 className='w-1/2'>Product</h3>
						<h3 className='w-1/4 flex justify-center'>Quantity</h3>
						<h3 className='w-1/4 flex justify-end'>Total</h3>
					</div>
					<hr />

					{carts?.map((p, index) => {
						return <CartItems key={index} product={p} />;
					})}

					<div className='mt-10 flex justify-end'>
						<div>
							<h2 className='text-lg md:text-2xl text-end'>
								Subtotal Tk {parseInt(total).toFixed(2)} BDT
							</h2>
							<h4 className='text-sm md:text-md'>
								Taxes and shipping calculated at checkout
							</h4>
							<br />
							<button
								onClick={handleAddToCheckouts}
								className='flex justify-end ml-auto gap-3 bg-teal-500 border-none rounded-full py-2 md:py-4 px-5 md:px-10 text-center'
							>
								<span>Check out</span>
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='my-20 flex flex-col items-center justify-center min-h-[50vh]'>
					<img src={cart} alt='' className='w-[100px] md:w-[200px] opacity-80' />
					<h6 className='my-5 text-xl md:text-3xl text-slate-600'>
						No item in your cart yet.
					</h6>
					<Link
						to={"/collections/all"}
						className='flex gap-3 w-[180px] md:w-[320px] bg-teal-500 text-white border-none rounded-full py-3 md:py-4 text-center justify-center '
					>
						Continue Shopping
					</Link>
				</div>
			)}
		</div>
	);
};

export default Cart;
