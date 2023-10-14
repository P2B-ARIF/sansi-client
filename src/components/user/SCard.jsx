import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { GiSandsOfTime } from "react-icons/gi";
import { BiRename, BiSolidCity } from "react-icons/bi";
import { GrContactInfo } from "react-icons/gr";
import { BsPhone } from "react-icons/bs";
import { MdOutlineConnectWithoutContact } from "react-icons/md";

const SCard = ({ product, order, setHit }) => {
	const { shippingAddress, paymentMethod } = product;
	const { price, quantity, size, product_Id, productDetails } = order;
	const { name, imageUrl } = productDetails || {};
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const handleCancelOrder = async e => {
		e.preventDefault();

		setLoading(true);
		// const permission = window.confirm("Are you sure to cancel order...?");
		if (true) {
			const url = `${process.env.REACT_APP_SERVER_URL}/order/cancel/?id=${product._id}&product_Id=${product_Id}`;
			await axios
				.patch(
					url,
					{},
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
							// title: "Order Submit.",
							description: "You cancelled order",
							status: "success",
							position: "bottom-right",
							duration: 5000,
							isClosable: true,
						});
						setHit("cancel order");
						// window.location.reload();
					}
					console.log(res.data, "sCard");
				})
				.catch(err => {
					setLoading(false);
				});
		}
		setLoading(false);
	};

	return (
		<div className='shadow-lg border md:flex justify-between gap-2 rounded-lg bg-white p-3 my-1'>
			<div className='flex gap-5'>
				<div className='h-[130px] w-[130px] rounded-lg overflow-hidden'>
					<img
						src={imageUrl[0]}
						alt=''
						className='w-full h-full object-cover'
					/>
				</div>
				<div className='text-sm'>
					<h2 className='font-bold text-slate-700 text-base'>{name}</h2>
					<h2>Size : {size.toLocaleUpperCase()}</h2>
					<h2>Price : {price}</h2>
					<h2>Quantity : {quantity}</h2>
				</div>
			</div>

			<div className='hidden md:block'>
				{/* Name: Phone: Contact: Address: District:*/}

				<p className='text-sm flex gap-2'>
					<BiRename /> {shippingAddress?.name}
				</p>
				<p className='text-sm flex gap-2'>
					<BsPhone /> {shippingAddress?.phone}
				</p>
				<p className='text-sm flex gap-2 break-all'>
					<MdOutlineConnectWithoutContact />
					{shippingAddress?.contact}
				</p>
				<p className='text-sm flex gap-2'>
					<GrContactInfo /> {shippingAddress?.address}
				</p>
				<p className='text-sm flex gap-2'>
					<BiSolidCity />
					{shippingAddress?.district}
				</p>
			</div>

			<div className='flex justify-between mt-5 md:mt-0'>
				<div className='md:hidden w-2/3'>
					{/* Name: Phone: Contact: Address: District:*/}

					<p className='text-sm flex gap-2'>
						<BiRename /> {shippingAddress?.name}
					</p>
					<p className='text-sm flex gap-2'>
						<BsPhone /> {shippingAddress?.phone}
					</p>
					<p className='text-sm flex gap-2 break-all'>
						<MdOutlineConnectWithoutContact />
						{shippingAddress?.contact}
					</p>
					<p className='text-sm flex gap-2'>
						<GrContactInfo /> {shippingAddress?.address}
					</p>
					<p className='text-sm flex gap-2'>
						<BiSolidCity />
						{shippingAddress?.district}
					</p>
				</div>

				<div className='md:hidden pl-2'>
					<span className='flex gap-1 bg-yellow-300 justify-center text-slate-700 rounded-lg items-center text-sm text-center font-bold py-1 px-4'>
						<GiSandsOfTime size={15} className="hidden" />
						Pending
					</span>
					<h3 className='font-medium whitespace-nowrap'>
						Payment:
						<span className='font-bold ml-2 text-slate-700 text-sm'>
							{paymentMethod}
						</span>
					</h3>
					<h3 className='font-medium'>
						Amount:
						<span className='font-bold ml-2 text-slate-700'>
							{price * quantity}
						</span>
					</h3>
					<Button
						onClick={e => handleCancelOrder(e)}
						isLoading={loading ? true : false}
						size={"sm"}
						colorScheme='red'
						width={"full"}
						type='submit'
					>
						Cancel
					</Button>
				</div>


				<div className='hidden md:block'>
					<span className='flex gap-1 bg-yellow-300 text-slate-700 rounded-lg items-center text-sm text-center font-bold py-1 px-4'>
						<GiSandsOfTime size={15} />
						Pending
					</span>
					<h3 className='font-medium'>
						Payment :
						<span className='font-bold ml-2 text-slate-700 text-sm'>
							{paymentMethod}
						</span>
					</h3>
					<h3 className='font-medium'>
						Amount:
						<span className='font-bold ml-2 text-slate-700'>
							{price * quantity}
						</span>
					</h3>
					<Button
						onClick={e => handleCancelOrder(e)}
						isLoading={loading ? true : false}
						size={"sm"}
						colorScheme='red'
						width={"full"}
						type='submit'
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SCard;
