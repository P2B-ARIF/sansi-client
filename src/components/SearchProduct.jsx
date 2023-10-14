import React, { useState } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
import SearchedItem from "./SearchedItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SearchProduct = () => {
	const { products } = useSelector(state => state.products);
	const [searchKeywords, setSearchKeywords] = useState(null);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		if (searchKeywords) {
			let searched = products.filter(obj => {
				const lowerKeywords = searchKeywords.toLowerCase();
				const lowerName = obj.product_Id.toLowerCase();
				return lowerName.includes(lowerKeywords);
			});
			setSearchResults(searched);
		}
	}, [products, searchKeywords]);

	return (
		<div className='relative'>
			<InputGroup className='min-w-[250px] md:min-w-[200px]'>
				<InputLeftElement pointerEvents='none'>
					<AiOutlineSearch size={20} />
				</InputLeftElement>
				<Input
					onChange={e => setSearchKeywords(e.target.value)}
					defaultValue={searchKeywords}
					borderColor={"teal.400"}
					focusBorderColor='teal.500'
					type='search'
					placeholder='Search Product'
					bgColor={"white"}
				/>
			</InputGroup>
			{searchKeywords?.length > 0 && (
				<div className='absolute top-11 right-0 z-20 bg-gray-100 rounded-lg min-w-[330px] p-3 shadow-lg'>
					<h3>Products</h3>
					{searchResults &&
						searchResults
							.slice(0, 5)
							.map((searched, index) => (
								<SearchedItem
									key={index}
									product={searched}
									setSearchKeywords={setSearchKeywords}
								/>
							))}
					<Link
						to={"/products/all"}
						className='flex justify-end items-center gap-2 text-sm text-yellow-500 hover:underline'
					>
						See All Products <AiOutlineArrowRight />
					</Link>
				</div>
			)}
		</div>
	);
};

export default SearchProduct;
