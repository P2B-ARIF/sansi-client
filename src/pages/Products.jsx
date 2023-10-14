import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Box, Breadcrumb } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import { AiFillCheckCircle, AiFillWarning } from "react-icons/ai";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import { addToCart, addToCheckouts } from "../toolkit/ProductsSlice";
import Description from "../components/Description";
import axios from "axios";

const Products = () => {
	const [count, setCount] = useState(1);
	const [size, setSize] = useState("xl");
	const { productId } = useParams();
	const { products, isLoading, error, carts } = useSelector(
		state => state.products,
	);
	const toast = useToast();
	const [randomProducts, setRandomProducts] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			await axios
				.get(
					`${process.env.REACT_APP_SERVER_URL}/product/specific/${productId}`,
				)
				.then(res => {
					if (res.data) {
						setProduct(res.data);
						setLoading(false);
					} else {
						navigate("/collections/all");
					}
				})
				.catch(err => {
					console.log(err.message);
					setLoading(false);
					navigate("/collections/all");
				});
		};
		fetchData();
	}, [productId, navigate]);

	useEffect(() => {
		if (count > product?.stock) {
			setCount(count - 1);
			toast({
				title: `Now Available ${product?.stock} Product Only`,
				status: "error",
				isClosable: true,
			});
		}
	}, [count, toast, product?.stock]);

	useEffect(() => {
		if (products?.length > 0) {
			let prev = [];

			for (let i = 0; i < products?.length; i++) {
				let random = Math.round(Math.random() * products?.length);
				let el = products[random];

				if (
					randomProducts?.length < 9 &&
					prev.includes(random) === false &&
					el !== undefined
				) {
					prev.push(random);
					setRandomProducts([...randomProducts, el]);
				}
			}
		}
	}, [products, randomProducts]);

	const handleAddCart = () => {
		const selected = {
			quantity: count,
			size: size.trim(),
			product_Id: product.product_Id,
		};
		const newProduct = {
			...product,
			selected: selected,
		};

		dispatch(addToCart(newProduct));

		if (error) {
			toast({
				title: error,
				status: "warning",
				position: "bottom-right",
				isClosable: true,
			});
		}

		const getData = JSON.parse(localStorage.getItem("products"));

		if (!getData) {
			localStorage.setItem("products", JSON.stringify([selected]));
			navigate("/cart");
			return;
		} else {
			const find = getData.find(f => f.product_Id === product.product_Id);
			if (!find) {
				localStorage.setItem(
					"products",
					JSON.stringify([...getData, selected]),
				);
				navigate("/cart");
				return;
			} else {
				toast({
					title: `This product already have in cart`,
					status: "warning",
					position: "bottom-right",
					isClosable: true,
				});
			}
		}
	};

	const handleAddToCheckouts = product => {
		const selected = {
			quantity: count,
			size: size.trim(),
			product_Id: product.product_Id,
		};
		const newProduct = {
			...product,
			selected: selected,
		};
		dispatch(addToCheckouts([newProduct]));
		navigate("/checkouts");
	};

	const scrollToTop = () => {
		const scrollToTopAnimation = () => {
			if (window.scrollY > 0) {
				window.scrollTo(0, window.scrollY - 50);
				// Adjust the scroll speed by changing the value (e.g., -10)
				requestAnimationFrame(scrollToTopAnimation);
			}
		};

		requestAnimationFrame(scrollToTopAnimation);
	};
	useEffect(() => {
		scrollToTop();
	}, [productId]);

	return (
		<div className='container mx-auto h-full min-h-[80vh]'>
			<div className='text-sm text-slate-600 mt-10 ml-5'>
				<Breadcrumb>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Products</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem isCurrentPage>
						<BreadcrumbLink href='/' className='uppercase'>
							{productId}
						</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
			</div>

			{loading ? (
				<div className='flex items-center justify-center container mx-auto px-20 my-20 overflow-hidden'>
					<Skeleton noOfLines={5} />
				</div>
			) : (
				<div className='my-10 grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-10'>
					<div className='mx-4 md:mx-0'>
						<Carousel
							infiniteLoop={true}
							showIndicators={false}
							showStatus={false}
							thumbWidth={60}
							className='productCarousel'
						>
							{product?.imageUrl?.map((img, i) => (
								<img key={i} src={img} alt='' />
							))}
						</Carousel>
					</div>
					<div>
						<div className='mx-4 md:mx-0'>
							<h3 className='inline-block bg-red-700 text-white font-bold text-sm py-[1px] px-3'>
								Sale
							</h3>
							<h1 className='py-3 md:py-5 text-xl md:text-2xl font-medium'>
								{product?.name}
							</h1>
							<h3 className='text-sm line-through'>
								Tk
								{product?.discount}
							</h3>
							<h2 className='text-red-700 text-xl md:text-2xl pb-2 font-bold'>
								Tk {product?.price}
							</h2>
							{product?.stock < 5 ? (
								<div className='flex items-center gap-1'>
									<AiFillWarning className='w-[18px] h-[18px] text-red-500' />
									<span className='text-red-400 font-medium '>
										Limited stock!
									</span>
								</div>
							) : (
								<div className='flex items-center gap-2'>
									<AiFillCheckCircle className='w-[20px] h-[20px] text-teal-500' />
									<span className='text-teal-400'>In stock!</span>
								</div>
							)}
							<div className='my-4 md:my-7'>
								<h4 className='flex items-center gap-5 text-lg font-bold mb-2'>
									Size
								</h4>
								<div className='flex flex-wrap gap-3'>
									{product?.sizes?.map((s, index) => (
										<button
											key={index}
											onClick={() => setSize(s)}
											className={`${
												size.trim() === s.trim() &&
												"bg-slate-700 text-white hover:bg-slate-800"
											} py-1 md:py-2 px-6 md:px-10 border-2 border-gray-400 text-center rounded-full uppercase hover:bg-slate-200`}
										>
											{s}
										</button>
									))}
								</div>
							</div>
							<div className='flex items-center gap-2 md:gap-4'>
								<div className='flex items-center border border-gray-400 rounded-full py-3 px-4'>
									<AiOutlineMinus
										onClick={() => {
											count > 1 && setCount(count - 1);
										}}
										className='cursor-pointer'
									/>
									<input
										type='number'
										className='outline-none border-none w-[20px] md:w-[50px] mx-2 md:mx-3 text-center'
										readOnly
										value={count}
									/>
									<AiOutlinePlus
										onClick={() => setCount(count + 1)}
										className='cursor-pointer'
									/>
								</div>

								<button
									onClick={handleAddCart}
									className='flex w-1/2 md:w-1/4 text-white gap-2 bg-teal-500 border-none rounded-full py-3 text-center justify-center '
								>
									<BsBag className='text-xl' />
									<span className=''>Add to cart</span>
								</button>
								<button
									onClick={() => handleAddToCheckouts(product)}
									className='flex w-1/3 gap-3 text-white bg-teal-500 border-none rounded-full py-3 text-center justify-center '
								>
									<span>Buy It Now</span>
								</button>
							</div>
						</div>

						<br />
						<br />

						<Accordion allowToggle>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as='span' textAlign='left' className='py-4 flex-1'>
											<div className='flex gap-3'>
												<svg
													className='theme-icon'
													width='20'
													height='20'
													viewBox='0 0 20 20'
													fill='none'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path d='M9 6H11V8H9V6Z' fill='#142C73'></path>
													<path d='M9 10H11V14H9V10Z' fill='#142C73'></path>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M6.94025 1.7225C4.37589 0.845158 1.85807 3.08711 2.26939 5.69648C-0.233271 6.66933 -0.786303 10.0018 1.21574 11.7554C-0.0607289 14.0711 1.55177 17.0371 4.25545 17.0938C4.7611 19.7004 7.90088 20.9123 10 19.2138C12.0991 20.9123 15.2389 19.7004 15.7445 17.0938C18.4482 17.0371 20.0607 14.0711 18.7843 11.7554C20.7863 10.0018 20.2333 6.66933 17.7306 5.69648C18.1419 3.0871 15.6241 0.845158 13.0597 1.7225C11.6814 -0.574167 8.31857 -0.574167 6.94025 1.7225ZM11.4325 2.91637C10.8597 1.6937 9.14033 1.6937 8.56752 2.91637C8.19582 3.70974 7.26291 4.05335 6.47421 3.68736C5.25876 3.12333 3.94167 4.24168 4.27952 5.55088C4.49875 6.40041 4.00236 7.27045 3.1657 7.50309C1.87633 7.86162 1.57777 9.57503 2.6682 10.3582C3.37577 10.8664 3.54817 11.8557 3.05503 12.5781C2.29505 13.6915 3.15472 15.1982 4.48751 15.0889C5.35234 15.0179 6.11286 15.6637 6.19399 16.5379C6.31901 17.885 7.93466 18.4801 8.88618 17.5294C9.5036 16.9125 10.4964 16.9125 11.1138 17.5294C12.0653 18.4801 13.681 17.885 13.806 16.5379C13.8871 15.6637 14.6477 15.0179 15.5125 15.0889C16.8453 15.1982 17.7049 13.6915 16.945 12.5781C16.4518 11.8557 16.6242 10.8664 17.3318 10.3582C18.4222 9.57503 18.1237 7.86162 16.8343 7.50309C15.9976 7.27045 15.5012 6.40041 15.7205 5.55088C16.0583 4.24168 14.7412 3.12333 13.5258 3.68736C12.7371 4.05335 11.8042 3.70974 11.4325 2.91637Z'
														fill='#142C73'
													></path>
												</svg>
												Product Description
											</div>
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									{product?.spec && <Description product={product?.spec} />}
								</AccordionPanel>
							</AccordionItem>
						</Accordion>

						<br />
						<br />
					</div>
				</div>
			)}

			<h3 className='my-10 text-center'>You May Also Like</h3>

			<div className='my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-3 md:gap-5'>
				{isLoading
					? [1, 2, 3, 4].map(k => <Skeleton key={k} noOfLines={5} />)
					: randomProducts &&
					  randomProducts?.map((product, index) => (
							<ProductCard key={index} product={product} />
					  ))}
			</div>
		</div>
	);
};

export default Products;
