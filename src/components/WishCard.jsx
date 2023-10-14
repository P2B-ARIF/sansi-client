import { IconButton, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToWishLists, removeFromWishLists } from "../toolkit/ProductsSlice";

const WishCard = ({ product }) => {
	const [mouseOver, setMouseOver] = useState(false);
	const [isWished, setIsWished] = useState(false);
	const toast = useToast();
	const dispatch  = useDispatch()

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
			dispatch(removeFromWishLists(product_Id));

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
				dispatch(addToWishLists(product_Id));
			} else {
				localStorage.setItem("wishList", JSON.stringify([product_Id]));
				dispatch(addToWishLists(product_Id));

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
		<div className='w-full flex flex-col border-[1px] rounded-md p-3 shadow-sm hover:shadow-md transition-shadow'>
			<Link
				to={`/products/${product?.product_Id}`}
				className='relative w-full h-[250px] md:h-[300px] pointer-events-auto overflow-hidden'
				onMouseOver={() => setMouseOver(true)}
				onMouseLeave={() => setMouseOver(false)}
			>
				<img
					src={
						mouseOver
							? product.imageUrl?.length > 1
								? product?.imageUrl[1]
								: product?.imageUrl[0]
							: product?.imageUrl[0]
					}
					alt=''
					className='w-full h-full object-cover object-top rounded-md'
				/>
				<div
					className={`absolute flex items-center justify-center bottom-0 left-0 w-full duration-500 transform ${
						mouseOver ? "h-full" : "h-0 overflow-hidden"
					} bg-[#9edbff6a]`}
				>
					<IconButton
						isRound={true}
						variant='solid'
						colorScheme='teal'
						aria-label='Done'
						fontSize='20px'
						icon={<AiOutlineEye size={20} />}
					/>
				</div>
			</Link>
			<div className='pt-4'>
				<h3>{product?.name}</h3>
				<div className='flex justify-between items-center'>
					<div className='flex gap-2'>
						<span className='line-through text-slate-500'>
							&#2547;{product?.price}
						</span>
						<span className='text-lg text-red-500'>
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

export default WishCard;
