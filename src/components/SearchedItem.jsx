import React from "react";
import { Link } from "react-router-dom";

const SearchedItem = ({ product, setSearchKeywords }) => {
	return (
		<Link
			to={`/products/${product?.product_Id}`}
			onClick={() => setSearchKeywords(null)}
			className='flex items-center justify-between gap-3 my-2 border-t py-2 text-sm'
		>
			<div className='flex gap-2'>
				<div className='w-[60px] h-[60px]'>
					<img
						src={
							product?.imageUrl.length > 0
								? product?.imageUrl[0]
								: product?.imageUrl
						}
						alt=''
						className='w-full h-full object-cover object-top'
					/>
				</div>

				<div>
					<p className='text-xs'>{product.brand}</p>
					<h3 className='font-medium leading-4'>{product.name}</h3>
					<h4>{product.product_Id}</h4>
				</div>
			</div>
			<div className='flex flex-col'>
				<span className='line-through'>{product.discount}</span>
				<span>{product.price}</span>
			</div>
		</Link>
	);
};

export default SearchedItem;
