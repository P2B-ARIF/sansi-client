import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
// import CategoriesSlider from "./../components/CategoriesSlider";

const AllProducts = () => {
	// const { data: categories, isLoading } = useSelector(state => state.category);
	const { products, isLoading } = useSelector(state => state.products);

	return (
		<div className='container mx-auto h-full'>
			<div className='text-sm text-slate-600 mt-10 md:mt-0 ml-5 md:ml-0'>
				<Breadcrumb>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink>Collections</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</div>
			{/* <CategoriesSlider /> */}

			<div className='my-10'>
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-3'>
					{isLoading
						? [1, 2, 3, 4, 5].map(k => <Skeleton key={k} noOfLines={5} />)
						: products &&
						  products?.map(product => (
								<ProductCard key={product.product_Id} product={product} />
						  ))}
				</div>
			</div>
		</div>
	);
};

export default AllProducts;
