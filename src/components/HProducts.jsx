import React from "react";
import Skeleton from "./Skeleton";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HProductCard from "./HProductCard";

const HProducts = ({ isLoading, products }) => {
	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<div className='my-10'>
			<h1 className='text-3xl text-center uppercase py-10 '>
				{products[0]?.category}
			</h1>
			<div
				data-aos='fade-up'
				className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-3'
			>
				{isLoading
					? [1, 2, 3, 4].map(k => <Skeleton key={k} noOfLines={4} />)
					: products
							?.slice(0, 16)
							.map((product, index) => (
								<HProductCard key={index} product={product} />
							))}
			</div>
		</div>
	);
};

export default HProducts;
