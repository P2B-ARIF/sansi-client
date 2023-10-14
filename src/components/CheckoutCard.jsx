
import React from "react";

const CheckoutCard = ({ checkout }) => {
	const { imageUrl, selected, name, price } = checkout || {};

	return (
		<div className='flex gap-3 border-b py-3'>
			<div className='w-[90px] h-[80px] md:h-[90px] rounded-lg relative'>
				<img
					className='object-cover w-full h-full object-top overflow-hidden rounded-lg'
					// src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWV6o_iF5Sd3mT_w8GVKJUXM0-gWKARbSsBg&usqp=CAU'
					src={imageUrl?.length > 0 ? imageUrl[0] : imageUrl}
					alt=''
				/>
				<span className='absolute -top-2 -right-2 z-10 w-[20px] h-[20px] rounded-full flex items-center justify-center bg-[#24232391] text-white'>
					{selected.quantity}
				</span>
			</div>
			<div className='flex items-center justify-between w-full'>
				<div className='leading-4 md:leading-5'>
					<p className='font-bold text-slate-600'>{name}</p>
					<h3 className='text-slate-500'>Size: {selected.size}</h3>
					<h3 className='text-slate-500'>Price: {price}</h3>
				</div>
				<div className='whitespace-nowrap'>
					TK {parseInt(price * selected.quantity).toFixed(2)}
				</div>
			</div>
		</div>
	);
};

export default CheckoutCard;
