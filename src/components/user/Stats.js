import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbPackages } from "react-icons/tb";
import Skeleton from "../Skeleton";

const Stats = () => {
	const [loading, setLoading] = useState(false);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		setLoading(true);
		const fetch = async () => {
			const url = `${process.env.REACT_APP_SERVER_URL}/order/get/allMyOrders`;
			await axios
				.get(url, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem("_token"),
						)}`,
					},
				})
				.then(res => {
					setLoading(false);
					setOrders(res.data);
				})
				.catch(err => {
					setLoading(false);
				});
		};

		fetch();
	}, []);

	return (
		<div className='md:flex items-center justify-between gap-5'>
			<div className='mb-3 md:mb-0 overflow-hidden relative shadow-lg bg-white p-5 min-w-[250px] w-full rounded-lg flex items-center justify-between'>
				{loading ? (
					<Skeleton noOfLines={3} spacing={2} circle={false} />
				) : (
					<>
						<div className=''>
							<h2 className='text-xl font-bold text-teal-500'>
								Pending/ To Receive
							</h2>
							<span className='text-5xl font-bold text-teal-600 my-1 ml-5 block'>
								{orders?.pending || 0}
							</span>
						</div>
						<AiOutlineShoppingCart className='absolute right-0 text-[180px] text-teal-700' />{" "}
					</>
				)}
			</div>

			<div className='overflow-hidden relative shadow-lg bg-white p-5 min-w-[300px] w-full rounded-lg flex items-center justify-between'>
				{loading ? (
					<Skeleton noOfLines={3} spacing={2} circle={false} />
				) : (
					<>
						<div className=''>
							<h2 className='text-xl font-bold text-teal-500'>Total Orders</h2>
							<span className='text-5xl font-bold text-teal-600 my-1 ml-5 block'>
								{orders?.pending + orders?.fulfilled + orders?.rejected || 0}
							</span>
						</div>
						<TbPackages className='absolute right-0 text-[180px] text-teal-700' />
					</>
				)}
			</div>
		</div>
	);
};

export default Stats;
