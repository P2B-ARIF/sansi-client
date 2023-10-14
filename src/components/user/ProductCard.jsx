import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
	return (
		<div className='flex gap-2 relative p-3 rounded-lg border shadow-sm hover:shadow-md'>
			<div className='flex-1 h-[150px] overflow-hidden '>
				<img
					src={
						product?.imageUrl.length > 0
							? product?.imageUrl[0]
							: product?.imageUrl
					}
					alt=''
					className='h-full w-full object-cover object-center rounded-lg transition-transform duration-300 hover:scale-105'
				/>
			</div>

			<div className='flex-1 text-sm mt-3'>
				<h3 className='font-bold'>{product?.name}</h3>
				<h4>Brand: {product?.brand}</h4>
				<h3 className='font-bold text-slate-700'>ID: {product?.product_Id}</h3>
				<h4>Stock: {product?.stock}</h4>
				<h4>
					Sizes:{" "}
					{product?.sizes.map(size => (
						<span className='uppercase mr-1' key={size}>
							{size.trim()}
						</span>
					))}
				</h4>
			</div>
			<div className='flex flex-col'>
				<span className='my-1 flex items-center line-through justify-center bg-red-500 rounded-full text-white px-2 py-1 text-sm'>
					<CiDiscount1 />
					{product?.discount}
				</span>
				<span className='flex my-1 items-center justify-center bg-green-500 rounded-full text-white px-2 py-1 text-sm'>
					&#2547; {product?.price}
				</span>
				{/* <span className='flex my-1'>
					<AiFillEdit
						onClick={() => navigate(`/dashboard/product/${product.product_Id}`)}
						className='cursor-pointer flex items-center justify-center w-full h-[30px] bg-teal-500 rounded-full text-white px-2 py-2 text-xl'
					/>
				</span>
				<span className='flex my-1'>
					<MdDeleteForever className='cursor-pointer flex items-center justify-center w-full h-[30px] bg-red-500 rounded-full text-white px-2 py-2 text-xl' />
				</span> */}
			</div>
		</div>
	);
};

export default ProductCard;
