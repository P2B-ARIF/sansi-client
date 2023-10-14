import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
} from "@chakra-ui/react";
import logo from "./../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
// import CheckoutCard from "../components/CheckoutCard";
import { useSelector } from "react-redux";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect } from "react";
import CheckoutCard from "../components/CheckoutCard";

const Shipping = () => {
	const { checkouts, shippingAddress } = useSelector(state => state.products);
	const navigate = useNavigate();
	const { address, district, postal_code, contact } = shippingAddress || {};

	useEffect(() => {
		if (checkouts.length === 0) {
			navigate("/cart", { replace: true });
		}
	}, [checkouts, navigate]);

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
							<div className='flex items-center justify-between w-full gap-1'>
								<h4 className='leading-5'>
									{address}, {district} &nbsp; {postal_code}
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
						<h1 className='text-lg font-bold text-slate-700 my-3'>
							Shipping method
						</h1>
						<RadioGroup defaultValue={district === "Dhaka" ? "1" : "2"}>
							<div className=''>
								<div
									className={`p-5 border rounded-tl-md rounded-tr-md flex justify-between ${
										district === "Dhaka" && "border-blue-600 bg-blue-50"
									}`}
								>
									<Radio value='1'>Inside Dhaka</Radio>
									<span>&#2547; 60</span>
								</div>
								<div
									className={`p-5 border rounded-br-md rounded-bl-md flex justify-between ${
										district !== "Dhaka" && "border-blue-600 bg-blue-50"
									}`}
								>
									<Radio value='2'>Outside Dhaka</Radio>
									<span>&#2547; 120</span>
								</div>
							</div>
						</RadioGroup>
					</div>
				</div>

				<div className='flex items-center justify-between my-10'>
					<Link
						to='/checkouts'
						className='flex items-center gap-1 md:gap-2 text-blue-600 hover:underline text-sm md:text-base'
					>
						<IoIosArrowBack />
						Return to Information
					</Link>
					<Button
						onClick={() => navigate("/checkouts/shipping/payment")}
						colorScheme='blue'
						size={{ base: "sm", md: "md" }}
					>
						Continue to payment
					</Button>
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

export default Shipping;
