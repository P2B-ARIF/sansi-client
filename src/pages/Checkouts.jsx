import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Button, Checkbox, Input, Select } from "@chakra-ui/react";
import logo from "./../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import CheckoutCard from "../components/CheckoutCard";
import { useDispatch, useSelector } from "react-redux";
import { addShippingAddress } from "../toolkit/ProductsSlice";
import { useEffect } from "react";
import { useState } from "react";

const Checkouts = () => {
	const { control, handleSubmit } = useForm();
	const { checkouts, shippingAddress } = useSelector(state => state.products);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedDistrict, setSelectedDistrict] = useState(
		shippingAddress?.district || "",
	);
	const districts = [
		"Bagerhat",
		"Bandarban",
		"Barguna",
		"Barisal",
		"Bhola",
		"Bogra",
		"Brahmanbaria",
		"Chandpur",
		"Chapainawabganj",
		"Chattogram",
		"Chuadanga",
		"Comilla",
		"Cox's Bazar",
		"Dhaka",
		"Dinajpur",
		"Faridpur",
		"Feni",
		"Gaibandha",
		"Gazipur",
		"Gopalganj",
		"Habiganj",
		"Jamalpur",
		"Jashore",
		"Jhalokathi",
		"Jhenaidah",
		"Joypurhat",
		"Khagrachari",
		"Khulna",
		"Kishoreganj",
		"Kurigram",
		"Kushtia",
		"Lakshmipur",
		"Lalmonirhat",
		"Madaripur",
		"Magura",
		"Manikganj",
		"Meherpur",
		"Moulvibazar",
		"Munshiganj",
		"Mymensingh",
		"Naogaon",
		"Narail",
		"Narayanganj",
		"Narsingdi",
		"Natore",
		"Netrokona",
		"Nilphamari",
		"Noakhali",
		"Pabna",
		"Panchagarh",
		"Patuakhali",
		"Pirojpur",
		"Rajbari",
		"Rajshahi",
		"Rangamati",
		"Rangpur",
		"Satkhira",
		"Shariatpur",
		"Sherpur",
		"Sirajganj",
		"Sunamganj",
		"Sylhet",
		"Tangail",
		"Thakurgaon",
	];

	const onSubmit = data => {
		dispatch(addShippingAddress({ ...data, district: selectedDistrict }));

		navigate("/checkouts/shipping");
		localStorage.setItem(
			"shipping_address",
			JSON.stringify({
				...data,
				district: selectedDistrict || shippingAddress?.district,
			}),
		);
	};

	useEffect(() => {
		if (checkouts.length === 0) {
			navigate("/cart", { replace: true });
		}
	}, [checkouts, navigate]);

	return (
		<div className='container mx-auto grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense md:flex md:flex-row-reverse'>
			<div className='flex-1 md:min-h-screen py-10 px-5 md:px-10 border-r-2 order-2 md:order-1'>
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

				<h1 className='text-lg text-slate-700 font-bold'>
					Shipping Information
				</h1>

				<div className='mt-5 md:mt-10'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<div className='my-1 '>
							<h3 className='text-lg font-medium'>Contact</h3>
							<div className='my-2'>
								{/* <Input type='text' placeholder='Email or mobile phone number' /> */}
								<Controller
									name='contact'
									control={control}
									defaultValue={shippingAddress?.contact}
									rules={{ required: "Contact name is required" }}
									render={({ field }) => (
										<Input
											placeholder='Email or mobile phone number'
											{...field}
										/>
									)}
								/>
							</div>
						</div>

						<h3 className='text-lg font-medium'>Shipping address</h3>

						<div className='grid grid-cols-2 gap-5'>
							<div>
								<label htmlFor='name'>Full Name*</label>
								{/* <Input id='f_name' name='name' required /> */}
								<Controller
									name='name'
									control={control}
									defaultValue={shippingAddress?.name}
									rules={{ required: "Full name is required" }}
									render={({ field }) => <Input {...field} />}
								/>
							</div>
							<div>
								<label htmlFor='district'>District*</label>
								<Select
									required
									placeholder='Select a district'
									// defaultValue={selectedDistrict}
									onChange={e => setSelectedDistrict(e.target.value)}
								>
									{districts.map((district, index) => (
										<option
											selected={district === shippingAddress?.district}
											key={index}
											value={district}
										>
											{district}
										</option>
									))}
								</Select>
							</div>
						</div>
						<div>
							<label htmlFor='address'>Address*</label>
							{/* <Input id='address' name='name' required /> */}
							<Controller
								name='address'
								control={control}
								defaultValue={shippingAddress?.address}
								rules={{ required: "Address is required" }}
								render={({ field }) => <Input {...field} />}
							/>
						</div>
						<div>
							<label htmlFor='apartment'>
								Apartment, suite, etc.(optional)*
							</label>
							{/* <Input id='apartment' name='name' required /> */}
							<Controller
								name='apartment'
								control={control}
								defaultValue={shippingAddress?.apartment}
								// rules={{ required: "Apartment is required" }}
								render={({ field }) => <Input {...field} />}
							/>
						</div>

						<div className='grid grid-cols-2 gap-5'>
							<div>
								<label htmlFor='postal_code'>Postal code*</label>
								{/* <Input id='postal_code' name='name' required /> */}
								<Controller
									name='postal_code'
									control={control}
									defaultValue={shippingAddress?.postal_code}
									rules={{ required: "Postal code is required" }}
									render={({ field }) => <Input {...field} />}
								/>
							</div>

							<div>
								<label htmlFor='phone'>Phone*</label>
								{/* <Input id='phone' name='name' required /> */}
								<Controller
									name='phone'
									control={control}
									defaultValue={shippingAddress?.phone}
									rules={{ required: "Phone is required" }}
									render={({ field }) => <Input {...field} />}
								/>
							</div>
						</div>

						<div>
							<Checkbox defaultChecked>
								Save this information for next time
							</Checkbox>
						</div>
						<div>
							<Checkbox defaultChecked>Text me with news and offers</Checkbox>
						</div>

						<Button
							type='submit'
							colorScheme='teal'
							className='max-w-[220px] ml-auto'
						>
							Continue to shipping
						</Button>
					</form>
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
						<h3>{selectedDistrict === "Dhaka" ? "60" : "120"}</h3>
						<h3>
							TOTAL BDT &nbsp;{" "}
							<span className='text-lg font-bold text-slate-600'>
								{checkouts
									.reduce(
										(prev, checkout) =>
											prev + checkout.price * checkout.selected.quantity,
										selectedDistrict === "Dhaka" ? 60 : 120,
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

export default Checkouts;
