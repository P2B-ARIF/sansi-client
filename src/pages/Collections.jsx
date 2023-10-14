import React, { useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import empty from "./../assets/box.png";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import { useState } from "react";
import { fetchDataFromApi } from "./../utils/api";

const Collections = () => {
	const { category: categoryName } = useParams();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState([]);

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
	}, [categoryName]);

	useEffect(() => {
		setIsLoading(true);
		setProducts([]);
		const fetch = async () => {
			const products = await fetchDataFromApi(
				`product/collection/${categoryName}`,
			);
			if (products) {
				setProducts([...products]);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		};
		fetch();
	}, [categoryName]);

	return (
		<div className='container mx-auto h-full min-h-[80vh]'>
			<div className='text-sm text-slate-600 mt-10 md:mt-0 ml-5 md:ml-0'>
				<Breadcrumb>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink href='/collections/all'>Collection</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink className='uppercase'>
							{categoryName}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</div>

			<div className='mb-10'>
				{/* <ProductModal product={products[0]} /> */}

				<h1 className='text-3xl text-center uppercase py-10'>{categoryName}</h1>

				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-3'>
					{isLoading
						? [1, 2, 3, 4, 5].map(k => <Skeleton key={k} noOfLines={5} />)
						: products &&
						  products?.map(product => (
								<ProductCard key={product.product_Id} product={product} />
						  ))}
					<br /> <br />
				</div>

				{products?.length < 1 && !isLoading && (
					<div className='my-10 flex flex-col items-center'>
						<img src={empty} alt='' className='w-[100px] opacity-70' />
						<h3 className='text-base md:text-3xl text-slate-600 my-5 font-bold'>
							This Category Product Empty
						</h3>
						<Link
							to={"/collections/all"}
							className='flex gap-3 w-[300px] md:w-[320px] bg-yellow-500 text-white border-none rounded-full py-3 md:py-4 text-center justify-center '
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

export default Collections;
