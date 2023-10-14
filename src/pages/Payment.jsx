import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	useToast,
} from "@chakra-ui/react";
import logo from "./../assets/logo.png";
import { Link } from "react-router-dom";
import CheckoutCard from "../components/CheckoutCard";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect } from "react";
import { format } from "date-fns";
import { PiBrowsersLight } from "react-icons/pi";
import axios from "axios";
import { removeCheckouts } from "../toolkit/ProductsSlice";
import { useState } from "react";

const Payment = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const { checkouts, shippingAddress } = useSelector(state => state.products);
	const { user } = useSelector(state => state.user);
	const { address, district, postal_code, contact } = shippingAddress || {};
	const [payment, setPayment] = useState(false);
	const [loading, setLoading] = useState(false);

	// console.log(window.location.pathname, "params");

	const handleCompleteOrder = async () => {
		setLoading(true);
		const order = checkouts.map(p => p.selected);
		const fns_PP = format(new Date(), "PP");
		const fns_P = format(new Date(), "P");
		const fns_pp = format(new Date(), "pp");

		const getOrder = {
			email: user?.email,
			user: user,
			order: order,
			address: `${contact}\n${district}\n${postal_code}`,
			paymentMethod: "COD",
			shippingAddress: shippingAddress,
			status: "pending",
			issueDate: {
				date: new Date(),
				fns: {
					fns_PP,
					fns_P,
					fns_pp,
				},
			},
			actionInfo: {
				actionDate: {
					date: new Date(),
					fns: {
						fns_PP,
						fns_P,
						fns_pp,
					},
				},
			},
		};

		if (user) {
			await axios
				.post(
					`${process.env.REACT_APP_SERVER_URL}/order/create-order`,
					getOrder,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("_token"),
							)}`,
						},
					},
				)
				.then(res => {
					setLoading(false);
					if (res.data.acknowledged) {
						toast({
							title: "Order Submit.",
							description: "We've created order for you.",
							status: "success",
							position: "bottom-right",
							duration: 5000,
							isClosable: true,
						});
						if (order?.length > 1) {
							localStorage.setItem("products", JSON.stringify([]));
						} else if (order?.length === 1) {
							const getData = JSON.parse(localStorage.getItem("products"));
							const filter = getData?.filter(
								p => p.product_Id !== order[0].product_Id,
							);
							localStorage.setItem("products", JSON.stringify(filter));
						}
						dispatch(removeCheckouts());
						return window.location.replace("/cart");
						// return navigate("/", { replace: true });
					}
				})
				.catch(err => {
					setLoading(false);
					console.log(err.message, "payment");
				});
		} else {
			dispatch(removeCheckouts());
			return window.location.replace("/cart");
		}
	};

	useEffect(() => {
		if (checkouts?.length === 0) {
			window.location.replace("/");
			// navigate("/cart", { replace: true });
		}
	}, [checkouts]);

	return (
		<div className='container mx-auto flex flex-wrap-reverse'>
			<div className='flex-1 md:min-h-screen py-10 px-5 md:px-10 border-r-2'>
				<div className='hidden md:block'>
					<div className='w-[100px] h-[100px]'>
						<img className='w-full h-full' src={logo} alt='' />
					</div>

					<div className='text-sm text-slate-600'>
						<Breadcrumb>
							<BreadcrumbItem>
								<BreadcrumbLink href='#'>Carts</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem isCurrentPage>
								<BreadcrumbLink>Information</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem>
								<BreadcrumbLink>Shipping</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<BreadcrumbLink>Payment</BreadcrumbLink>
							</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>

				<div className='mt-5 md:mt-10'>
					<div className='border rounded-lg p-4 px-3 md:px-5'>
						<div className='flex items-center gap-4 md:gap-8'>
							<h3 className='text-slate-500'>Contact</h3>
							<div className='flex items-center justify-between w-full break-all gap-1'>
								<h4 className='leading-5 md:leading-6'>{contact}</h4>
								<Link
									to={"/checkouts"}
									className='text-blue-500 underline text-sm whitespace-nowrap'
								>
									Change
								</Link>
							</div>
						</div>
						<hr className='my-2' />
						<div className='flex items-center gap-4 md:gap-8'>
							<h3 className='text-slate-500 whitespace-nowrap'>Ship to</h3>
							<div className='flex items-center justify-between w-full'>
								<h4 className='leading-5'>
									{address}, {district} &nbsp; {postal_code}
								</h4>
								<Link
									to={"/checkouts"}
									className='text-blue-500 underline text-sm whitespace-nowrap'
								>
									Change
								</Link>
							</div>
						</div>
						<hr className='my-2' />
						<div className='flex items-center gap-4 md:gap-8'>
							<h3 className='text-slate-500 whitespace-nowrap'>Method</h3>
							<div className='flex items-center justify-between w-full'>
								<h4 className='leading-5'>
									{district === "Dhaka" ? "Inside" : "Outside"} Dhaka &#2547;{" "}
									{district === "Dhaka" ? 60 : 120}
								</h4>
								<Link
									to={"/checkouts"}
									className='text-blue-500 underline text-sm'
								>
									Change
								</Link>
							</div>
						</div>
					</div>
					<br />
					<div>
						<h1 className='text-lg font-bold text-slate-700 mt-3'>Payment</h1>
						<p className='mb-3 text-slate-500'>
							All transactions are secure and encrypted.
						</p>
						<RadioGroup defaultValue='2'>
							<div className='overflow-hidden relative'>
								<div
									className={`relative z-10 p-5 border rounded-tl-md rounded-tr-md flex justify-between ${
										payment ? "border-blue-600 bg-blue-50" : "bg-white"
									}`}
								>
									<Radio onChange={() => setPayment(true)} value='1'>
										SSLCOMMERZ
									</Radio>
									<img
										className='h-[20px]'
										src={
											"https://www.dentalconfidence.com.au/wp-content/uploads/2016/09/amex-mastercard-visa-logo.png"
										}
										alt=''
									/>
								</div>

								<div
									className={`${
										payment
											? "translate-y-0 relative"
											: "-translate-y-[320px] absolute opacity-0"
									} transition-all duration-300 border flex flex-col items-center justify-center px-20 py-3`}
								>
									<PiBrowsersLight size={160} className='opacity-70' />
									<p className='pb-2 text-slate-600'>
										After clicking "Pay now", you will be redirected to
										SSLCOMMERZ to complete your purchase securely.
									</p>
								</div>

								<div
									className={`relative z-10 p-5 border rounded-br-md rounded-bl-md flex justify-between  ${
										!payment && "border-blue-600 bg-blue-50"
									}`}
								>
									<Radio onChange={() => setPayment(false)} value='2'>
										Cash on Delivery (COD)
									</Radio>
								</div>
							</div>
						</RadioGroup>
					</div>
				</div>

				<div className='flex items-center justify-between my-10'>
					<Link
						to='/checkouts/shipping'
						className='flex items-center gap-2 text-blue-600 hover:underline text-sm md:text-base'
					>
						<IoIosArrowBack />
						Return to Shipping
					</Link>
					{payment ? (
						<Button
							size={{ base: "sm", md: "md" }}
							colorScheme='green'
							isDisabled
						>
							{" "}
							Pay Now!
						</Button>
					) : (
						<Button
							size={{ base: "sm", md: "md" }}
							isLoading={loading}
							colorScheme='teal'
							onClick={handleCompleteOrder}
						>
							Complete order
						</Button>
					)}
				</div>

				<div className='border-t-2 mt-10 py-5 text-sm flex gap-3 text-blue-500 underline font-normal whitespace-nowrap flex-wrap leading-3'>
					<Link to={""}>Refund policy</Link>
					<Link to={""}>Shipping policy</Link>
					<Link to={""}>Privacy policy</Link>
					<Link to={""}>Terms of service</Link>
					<Link to={""}>Contact information</Link>
				</div>
			</div>

			<div className='flex-1 md:min-h-screen py-5 md:py-12 px-5 md:px-10'>
				<div className='md:hidden mb-5'>
					<div className='w-[80px] h-[80px]'>
						<img className='w-full h-full' src={logo} alt='' />
					</div>

					<div className='text-sm text-slate-600'>
						<Breadcrumb>
							<BreadcrumbItem>
								<BreadcrumbLink href='#'>Carts</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem isCurrentPage>
								<BreadcrumbLink>Information</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem>
								<BreadcrumbLink>Shipping</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<BreadcrumbLink>Payment</BreadcrumbLink>
							</BreadcrumbItem>
						</Breadcrumb>
					</div>
				</div>

				{checkouts &&
					checkouts?.map(checkout => (
						<CheckoutCard key={checkout.product_Id} checkout={checkout} />
					))}

				<div className='flex justify-between w-full my-10'>
					<div className='flex flex-col gap-1'>
						<h3>Subtotal</h3>
						<h3>Shipping</h3>
						<h3 className='text-lg font-bold text-slate-600'>Total</h3>
					</div>
					<div className='text-right flex flex-col gap-1'>
						<h3 className='font-bold text-slate-600'>
							{checkouts
								.reduce(
									(prev, checkout) =>
										prev + checkout.price * checkout.selected.quantity,
									0,
								)
								.toFixed(0)}
						</h3>
						<h3>60</h3>
						<h3>
							TOTAL BDT &nbsp;{" "}
							<span className='text-lg font-bold text-slate-600'>
								{checkouts
									.reduce(
										(prev, checkout) =>
											prev + checkout.price * checkout.selected.quantity,
										60,
									)
									.toFixed(2)}
							</span>
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;
