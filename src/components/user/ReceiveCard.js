import React from "react";
import { BiRename, BiSolidCity } from "react-icons/bi";
import { GiSandsOfTime } from "react-icons/gi";
import { GrContactInfo } from "react-icons/gr";
import { BsPhone } from "react-icons/bs";
import { MdOutlineConnectWithoutContact } from "react-icons/md";

const ReceiveCard = ({ product }) => {
	const { order: orders, shippingAddress, paymentMethod } = product;

	return (
		<div>
			<h2 className='text-sm md:text-md ml-2'>
				Order Date: {product?.issueDate.fns.fns_PP} |{" "}
				{product?.issueDate.fns.fns_pp}
			</h2>

			{product &&
				orders?.map((order, index) => {
					const { price, quantity, size, productDetails } = order;
					const { name, imageUrl } = productDetails || {};
					return (
						<div
							key={index}
							className='shadow-lg border md:flex justify-between gap-2 rounded-lg bg-white p-3 my-1'
						>
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
									<h2>Quantity : {quantity || 2}</h2>
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
									<span className='flex gap-1 bg-blue-400 text-slate-100 rounded-lg items-center text-sm text-center font-bold py-1 px-3 justify-center md:px-4'>
										<GiSandsOfTime size={15} className='hidden md:block' />
										On Way
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
								</div>

								<div className='hidden md:block'>
									<span className='flex gap-1 bg-blue-300 text-slate-700 rounded-lg items-center text-sm text-center font-bold py-1 px-4'>
										<GiSandsOfTime size={15} />
										On Way
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
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default ReceiveCard;
