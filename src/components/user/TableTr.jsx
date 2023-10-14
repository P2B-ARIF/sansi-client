import React from "react";
import { Button, Td, Tr } from "@chakra-ui/react";

const TableTr = ({ order: orders }) => {
	const { delivery_fee, status, paymentMethod, shippingAddress } = orders || {};
	const { address, contact, phone } = shippingAddress || {};

	return (
		<>
			{orders?.order?.map((order, index) => {
				const { quantity, size, price, productDetails } = order || {};
				const { imageUrl, name } = productDetails || {};

				return (
					<Tr key={index}>
						<Td className='text-sm'>
							<h4>
								{orders?.fieldInfo?.fieldDate?.fns?.fns_PP ||
									orders?.cancelInfo?.rejectedDate?.fns?.fns_PP ||
									orders?.completedInfo?.completedDate?.fns?.fns_PP ||
									orders?.issueDate?.fns?.fns_PP}
							</h4>
							<h4>
								{orders?.fieldInfo?.fieldDate?.fns?.fns_pp ||
									orders?.cancelInfo?.rejectedDate?.fns?.fns_pp ||
									orders?.completedInfo?.completedDate?.fns?.fns_pp ||
									orders?.issueDate?.fns?.fns_pp}
							</h4>
						</Td>
						<Td className='flex items-center gap-2'>
							<div className='w-[70px] h-[70px] overflow-hidden'>
								<img
									src={imageUrl[0]}
									alt=''
									className='w-full h-full rounded-md object-cover'
								/>
							</div>

							<article>
								<h3 className='text-sm text-slate-600 whitespace-pre-wrap'>
									{name}
								</h3>
								<h4 className='text-sm text-slate-600 leading-4'>
									Quantity: {quantity}
								</h4>
								<h4 className='text-sm text-slate-600 leading-4'>
									Size: {size}
								</h4>
								<h4 className='text-sm text-slate-600 leading-4'>
									Price: {price}
								</h4>
							</article>
						</Td>
						<Td className='text-sm text-slate-700'>
							<h5> {address}</h5>
							<h5> {contact}</h5>
							<h5> {shippingAddress?.name}</h5>
							<h5> {phone}</h5>
						</Td>
						<Td className='text-sm'>
							{paymentMethod === "COD" && "Cash on delivery"}
						</Td>
						<Td className='font-medium'>
							<h5 className='text-sm whitespace-normal font-bold'>
								Includes Delivery Fee +{delivery_fee}
							</h5>
							<h5>{delivery_fee + quantity * price}</h5>
						</Td>
						<Td className='text-sm'>
							<Button
								size={"xs"}
								textTransform={"uppercase"}
								colorScheme={
									status === "on-way"
										? "teal"
										: status === "pending"
										? "yellow"
										: "green"
								}
							>
								{status}
							</Button>
						</Td>
					</Tr>
				);
			})}
		</>
	);
};

export default TableTr;
