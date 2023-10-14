import { IconButton, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
	const [mouseOver, setMouseOver] = useState(false);
	const toast = useToast();
	const [isWished, setIsWished] = useState(false);

	useEffect(() => {
		const getWish = JSON.parse(localStorage.getItem("wishList"));
		const map = getWish?.find(p => p === product?.product_Id);
		setIsWished(map);
	}, [product?.product_Id]);

	const handleWish = product_Id => {
		const getWish = JSON.parse(localStorage.getItem("wishList"));
		const find = getWish?.find(p => p === product_Id);
		if (find) {
			const filter = getWish?.filter(p => p !== product_Id);
			localStorage.setItem("wishList", JSON.stringify(filter));
			setIsWished("");

			toast({
				title: `This product remove from wishlist`,
				status: "success",
				position: "bottom-right",
				isClosable: true,
			});
		} else {
			setIsWished(product_Id);
			if (getWish) {
				localStorage.setItem(
					"wishList",
					JSON.stringify([...getWish, product_Id]),
				);
			} else {
				localStorage.setItem("wishList", JSON.stringify([product_Id]));
			}
			toast({
				title: `This product added in wishlist`,
				status: "success",
				position: "bottom-right",
				isClosable: true,
			});
		}
	};

	return (
		<div className='w-full flex flex-col border-[1px] rounded-md p-2 md:p-3 shadow-sm hover:shadow-md transition-shadow'>
			<Link
				to={`/products/${product?.product_Id}`}
				className='relative w-full h-[200px] md:h-[300px] pointer-events-auto overflow-hidden'
				onMouseOver={() => setMouseOver(true)}
				onMouseLeave={() => setMouseOver(false)}
			>
				<img
					src={product?.imageUrl && product?.imageUrl[0]}
					alt=''
					className={`transition-transform duration-300 w-full h-full object-cover object-top rounded-md ${
						mouseOver ? "-translate-y-[300px]" : "translate-y-0"
					}`}
				/>
				<div
					className={`absolute flex items-center justify-center bottom-0 left-0 w-full duration-300 transform ${
						mouseOver ? "h-full" : "h-0 overflow-hidden "
					} bg-[#9edbff6a]`}
				>
					<img
						src={
							product?.imageUrl?.length > 1
								? product?.imageUrl[1]
								: product?.imageUrl[0]
						}
						alt=''
						className={`transition-transform duration-300 w-[120%] h-[120%] object-cover object-top rounded-md ${
							mouseOver ? "scale-100" : "scale-80"
						}`}
					/>
				</div>
			</Link>
			<div className='pt-3 md:pt-4'>
				<h3 className="leading-5">{product?.name}</h3>
				<div className='flex justify-between items-center'>
					<div className='flex gap-2'>
						<span className='text-sm md:text-base line-through text-slate-500'>
							&#2547;{product?.price}
						</span>
						<span className='text-base md:text-lg text-red-500'>
							&#2547; {product?.discount}
						</span>
					</div>
					<IconButton
						onClick={() => handleWish(product?.product_Id)}
						isRound={true}
						variant={isWished === product?.product_Id ? "solid" : "outline"}
						colorScheme='teal'
						aria-label='heart'
						size={"sm"}
						icon={<AiOutlineHeart size={20} />}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
