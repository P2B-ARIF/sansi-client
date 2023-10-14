import { Button, Textarea } from "@chakra-ui/react";
import React from "react";
import { GiSandsOfTime } from "react-icons/gi";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiRename, BiSolidCity } from "react-icons/bi";
import { GrContactInfo } from "react-icons/gr";
import { BsPhone } from "react-icons/bs";
import { MdOutlineConnectWithoutContact } from "react-icons/md";

const RevCard = ({ order, product }) => {
	const [open, setOpen] = useState(false);
	const { shippingAddress, paymentMethod } = product;
	const { price, quantity, size, productDetails } = order;
	const { name, imageUrl } = productDetails || {};

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
					<h2>Quantity : {quantity || 2}</h2>
				</div>
			</div>

			{/* <div>
				<p className='text-sm'>Name: {shippingAddress?.name}</p>
				<p className='text-sm'>Phone: {shippingAddress?.phone}</p>
				<p className='text-sm'>Contact: {shippingAddress?.contact}</p>
				<p className='text-sm'>Address: {shippingAddress?.address}</p>
				<p className='text-sm'>District: {shippingAddress?.district}</p>
			</div> */}
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
					<span className='flex gap-1 bg-green-400 text-slate-700 rounded-lg items-center text-sm text-center font-bold py-1 px-4 justify-center'>
						<GiSandsOfTime size={15} className='hidden' />
						Delivered
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
						onClick={() => setOpen(true)}
						size={"sm"}
						colorScheme='teal'
						width={"full"}
					>
						Review
					</Button>

					<Modal isOpen={open} onClose={() => setOpen(false)}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader className='uppercase'>
								{order?.product_Id}
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Textarea />
							</ModalBody>

							<ModalFooter>
								<Button
									colorScheme='red'
									size={"sm"}
									mr={3}
									onClick={() => setOpen(false)}
								>
									Close
								</Button>
								<Button colorScheme='green' size={"sm"}>
									Submit Review
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</div>

				<div className='hidden md:block'>
					<span className='flex gap-1 bg-green-400 text-slate-700 rounded-lg items-center text-sm text-center font-bold py-1 px-4'>
						<GiSandsOfTime size={15} />
						Delivered
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
						onClick={() => setOpen(true)}
						size={"sm"}
						colorScheme='teal'
						width={"full"}
					>
						Review
					</Button>

					<Modal isOpen={open} onClose={() => setOpen(false)}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader className='uppercase'>
								{order?.product_Id}
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Textarea />
							</ModalBody>

							<ModalFooter>
								<Button
									colorScheme='red'
									size={"sm"}
									mr={3}
									onClick={() => setOpen(false)}
								>
									Close
								</Button>
								<Button colorScheme='green' size={"sm"}>
									Submit Review
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default RevCard;
