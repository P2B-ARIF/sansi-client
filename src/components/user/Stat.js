import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Stat = () => {
	return (
		<>
			{[1, 2, 3].map(i => (
				<div
					key={i}
					className='overflow-hidden relative shadow-lg bg-white p-5 min-w-[300px] w-full rounded-lg flex items-center justify-between'
				>
					<div className=''>
						<h2 className='text-xl font-bold text-slate-600'>My Orders</h2>
						<span className='text-5xl font-bold text-slate-700 my-1 block'>
							2
						</span>
					</div>
					<AiOutlineShoppingCart className='absolute right-0 text-[180px] text-slate-500' />
				</div>
			))}
		</>
	);
};

export default Stat;
