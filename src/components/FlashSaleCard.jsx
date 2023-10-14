import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

const FlashSaleCard = ({ product }) => {
	const navigate = useNavigate();

	const handleAddToCart = product => {
		navigate(`/products/${product}`);
	};

	return (
		<div className='h-[130px] md:max-h-[150px] md:h-full flex gap-3 rounded-lg shadow-md border p-2 relative border-teal-500'>
			<div className='w-[150px] overflow-hidden rounded-lg'>
				<img
					src={product?.imageUrl ? product?.imageUrl[0] : product?.imageUrl}
					alt=''
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='w-full'>
				<h1 className='text-sm md:text-md font-medium'>{product.name}</h1>
				<p className='text-sm md:text-md font-bold text-slate-700'>
					{" "}
					&#2547; {product.price}
				</p>
				{/* <Link href={`/products/${product._id}`}></Link> */}
				<Button
					size={"xs"}
					colorScheme='green'
					onClick={() => handleAddToCart(product.product_Id)}
				>
					<AiOutlineEye  size={18}/>
				</Button>
			</div>
			<span className='bg-red-500 text-white px-2 absolute top-1 -left-3 text-sm'>
				Sale
			</span>
		</div>
	);
};

export default FlashSaleCard;
