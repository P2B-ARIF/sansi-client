import React, { useState } from "react";
import HeaderSlider from "./../components/HeaderSlider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import HProducts from "../components/HProducts";
import { useEffect } from "react";
import Loading from "../components/Loading/Loading";
import ProductModal from "../components/ProductModal";
import FlashSaleSlider from "../components/FlashSaleSlider";
import { FcFlashOn } from "react-icons/fc";
import PopUpMessage from "../components/PopUpMessage";

const Home = () => {
	const { category, products: productStore } = useSelector(state => state);
	// const { products, isLoading, modal } = useSelector(state => state.products);
	const { products, isLoading, modal } = productStore;
	const [panjabi, setPanjabi] = useState(null);
	const [shirt, setShirt] = useState(null);
	const [poloShirt, setPoloShirt] = useState(null);
	const [tShirt, setTShirt] = useState(null);

	useEffect(() => {
		if (products?.length > 0) {
			setPanjabi(products?.filter(p => p.category === "panjabi"));
			setShirt(products?.filter(p => p.category === "shirt"));
			setPoloShirt(products?.filter(p => p.category === "polo-shirt"));
			setTShirt(products?.filter(p => p.category === "t-shirt"));
		}
	}, [products]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{/* popup message */}
					<PopUpMessage />

					<HeaderSlider categories={category} />
					<div className='container mx-auto mt-10 my-48'>
						{/* category section */}
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mx-4'>
							{category?.isLoading
								? [1, 2, 3, 4].map(k => (
										<Box
											width={"full"}
											key={k}
											padding='6'
											boxShadow='lg'
											bg='white'
										>
											<SkeletonCircle size='10' />
											<SkeletonText
												mt='4'
												noOfLines={5}
												spacing='5'
												skeletonHeight='2'
											/>
										</Box>
								  ))
								: category?.data.length > 0 &&
								  category?.data.map(c => (
										<Link
											to={`/collection/${c.category}`}
											key={c._id}
											className='category_box w-full  transition-transform duration-300 hover:scale-105 border rounded-lg overflow-hidden'
										>
											<img
												src={c.imageUrl}
												alt=''
												className='w-full h-[180px] md:h-[300px] object-cover object-top'
											/>
											<div className='pb-2 pt-1 flex items-center justify-center bg-black'>
												<p className='category_name text-medium uppercase text-slate-300'>
													{c.category}
												</p>
											</div>
										</Link>
								  ))}
						</div>

						{/* flash sale slider  */}
						<div className='mt-20'>
							<h4 className='text-2xl font-bold text-teal-700 my-5 flex items-center animate-pulse'>
								<FcFlashOn className='animate-bounce' />
								Flash Sale
							</h4>

							<FlashSaleSlider />
						</div>

						{modal && <ProductModal product={modal} />}

						{/* specific panjabi category items */}
						{panjabi && (
							<HProducts isLoading={products?.isLoading} products={panjabi} />
						)}
						{/* specific shirt category items*/}
						{shirt && (
							<HProducts isLoading={products?.isLoading} products={shirt} />
						)}
						{/* specific polo shirt category items*/}
						{poloShirt && (
							<HProducts isLoading={products?.isLoading} products={poloShirt} />
						)}
						{/* specific t-shirt category items*/}
						{tShirt && (
							<HProducts isLoading={products?.isLoading} products={tShirt} />
						)}
					</div>
				</>
			)}
		</>
	);
};

export default Home;
