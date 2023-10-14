import React from "react";
import Skeleton from "../components/Skeleton";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import WishCard from "../components/WishCard";
import { Link } from "react-router-dom";
import empty from "./../assets/box.png";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const WishLists = () => {
	const [wishLists, setWishLists] = useState([]);
	const { products, isLoading } = useSelector(state => state.products);

	useEffect(() => {
		const getWish = JSON.parse(localStorage.getItem("wishList"));
		if (getWish) {
			setWishLists([...getWish]);
		}
	}, []);

	const scrollToTop = () => {
		const scrollToTopAnimation = () => {
			if (window.scrollY > 0) {
				window.scrollTo(0, window.scrollY - 10);
				requestAnimationFrame(scrollToTopAnimation);
			}
		};

		requestAnimationFrame(scrollToTopAnimation);
	};
	useEffect(() => {
		scrollToTop();
	}, []);

	return (
		<div className='container mx-auto h-full min-h-[80vh]'>
			<div className='text-sm text-slate-600 mt-10 md:mt-0 ml-5 md:ml-0'>
				<Breadcrumb>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink isCurrentPage>Your WishLists</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</div>
			<div className='mb-20 mt-10'>
				{wishLists?.length > 0 && (
					<h1 className='text-3xl text-center uppercase py-10'>WishList</h1>
				)}

				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-3'>
					{isLoading
						? [1, 2, 3, 4, 5].map(k => <Skeleton key={k} noOfLines={5} />)
						: products &&
						  products?.map(product => {
								const find = wishLists?.find(p => p === product?.product_Id);
								if (find) {
									return (
										<WishCard key={product.product_Id} product={product} />
									);
								} else return null;
						  })}
				</div>

				{wishLists?.length < 1 && !isLoading && (
					<div className='my-10 flex flex-col items-center'>
						<img src={empty} alt='' className='w-[100px] opacity-70' />
						<h3 className='text-xl md:text-3xl text-slate-600 my-5 font-bold'>
							This WishLists Product Empty
						</h3>
						<Link
							to={"/collections/all"}
							className='flex gap-3 w-[320px] bg-teal-500 text-white border-none rounded-full py-4 text-center justify-center '
						>
							Continue Shopping
						</Link>
						<br />
						<br />
					</div>
				)}
			</div>
		</div>
	);
};

export default WishLists;
