import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import {
	AiFillCheckCircle,
	AiFillWarning,
	AiOutlineArrowRight,
	AiOutlineClose,
	AiOutlineMinus,
	AiOutlinePlus,
} from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, useToast } from "@chakra-ui/react";
import {
	addToCart,
	addToCheckouts,
	addToModal,
	setModalClose,
} from "../toolkit/ProductsSlice";

const ProductModal = ({ product }) => {
	const [count, setCount] = useState(1);
	const [size, setSize] = useState("l");
	const toast = useToast();
	const { error } = useSelector(state => state.products);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

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

	const handleAddCart = async () => {
		setLoading(true);
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
			// navigate("/cart");
			toast({
				title: `This product added in cart`,
				status: "success",
				position: "bottom-right",
				isClosable: true,
			});
			const closeModal = setTimeout(() => {
				dispatch(setModalClose());
				setLoading(false);
			}, 1000);

			return () => {
				clearTimeout(closeModal);
			};
		} else {
			const find = getData.find(f => f.product_Id === product?.product_Id);
			if (!find) {
				localStorage.setItem(
					"products",
					JSON.stringify([...getData, selected]),
				);
				// navigate("/cart");

				toast({
					title: `This product added in cart`,
					status: "success",
					position: "bottom-right",
					isClosable: true,
				});
				const closeModal = setTimeout(() => {
					dispatch(setModalClose());
					setLoading(false);
				}, 1000);

				return () => {
					clearTimeout(closeModal);
				};
			} else {
				toast({
					title: `This product already have in cart`,
					status: "warning",
					position: "bottom-right",
					isClosable: true,
				});
				const closeModal = setTimeout(() => {
					dispatch(setModalClose());
					setLoading(false);
				}, 1000);

				return () => {
					clearTimeout(closeModal);
				};
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

	return (
		<div className='min-w-full min-h-screen flex items-center justify-center fixed top-0 left-[50%] -translate-x-[50%] z-20 bg-slate-400/[0.5] overflow-hidden'>
			<div className='relative container mx-auto p-10 grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-10 border-2 rounded-lg bg-white'>
				<AiOutlineClose
					onClick={() => dispatch(addToModal(null))}
					className='absolute cursor-pointer top-5 right-5 bg-teal-600 text-white w-[30px] h-[30px] flex items-center justify-center rounded-full p-1 z-50'
					size={24}
				/>
				<div>
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
					{/* <h3 className='inline-block bg-red-700 text-white font-bold text-sm py-[1px] px-3'>
						Sale
					</h3> */}
					<h1 className='py-3 md:py-5 text-lg md:text-2xl font-medium'>
						{product?.name}
					</h1>

					<div className='flex justify-between'>
						<div>
							<h3 className='text-sm line-through'>
								Tk
								{product?.discount}
							</h3>

							<h2 className='text-red-700 text-2xl pb-2 font-bold'>
								Tk {product?.price}
							</h2>
						</div>
						<div className='md:hidden mt-3 flex items-center border border-gray-400 rounded-full py-2 px-3'>
							<AiOutlineMinus
								onClick={() => {
									count > 1 && setCount(count - 1);
								}}
								className='cursor-pointer'
							/>
							<input
								type='number'
								className='outline-none border-none w-[50px] mx-3 text-center'
								readOnly
								value={count}
							/>
							<AiOutlinePlus
								onClick={() => setCount(count + 1)}
								className='cursor-pointer'
							/>
						</div>
					</div>
					{product?.stock < 5 ? (
						<div className='flex items-center gap-1'>
							<AiFillWarning className='w-[18px] h-[18px] text-red-500' />
							<span className='text-red-400 font-medium '>Limited stock!</span>
						</div>
					) : (
						<div className='flex items-center gap-2'>
							<AiFillCheckCircle className='w-[20px] h-[20px] text-teal-500' />
							<span className='text-teal-400'>In stock!</span>
						</div>
					)}
					<div className='my-3 md:my-7'>
						<h4 className='flex items-center gap-5 text-lg font-bold mb-0 md:mb-2'>
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
									} py-1 md:py-2 px-5 md:px-10 border-2 border-gray-400 text-center rounded-full uppercase hover:bg-slate-200`}
								>
									{s}
								</button>
							))}
						</div>
					</div>
					<div className='flex gap-3'>
						<div className='hidden md:flex items-center  border border-gray-400 rounded-full py-3 px-4'>
							<AiOutlineMinus
								onClick={() => {
									count > 1 && setCount(count - 1);
								}}
								className='cursor-pointer'
							/>
							<input
								type='number'
								className='outline-none border-none w-[50px] mx-3 text-center'
								readOnly
								value={count}
							/>
							<AiOutlinePlus
								onClick={() => setCount(count + 1)}
								className='cursor-pointer'
							/>
						</div>

						<div className='flex gap-3 items-center w-full'>
							<button
								onClick={handleAddCart}
								className='flex w-full text-white gap-2 bg-teal-500 border-none rounded-full py-3 text-center justify-center '
							>
								{loading ? (
									<>
										<Spinner /> Loading...
									</>
								) : (
									<>
										<BsBag className=' text-xl' />
										<span>Add to cart</span>
									</>
								)}
							</button>
							<button
								onClick={() => handleAddToCheckouts(product)}
								className='md:hidden flex w-full gap-3 text-white bg-teal-500 border-none rounded-full py-3 text-center justify-center '
							>
								<span>Buy It Now</span>
							</button>
						</div>
					</div>
					<button
						onClick={() => handleAddToCheckouts(product)}
						className='hidden mt-5 md:flex w-full gap-3 text-white bg-teal-500 border-none rounded-full py-3 text-center justify-center '
					>
						<span>Buy It Now</span>
					</button>
					<Link
						className='mt-5 flex gap-1 hover:gap-5 transition-all duration-200 items-center underline underline-offset-2 mx-5 text-teal-600'
						to={`/products/${product?.product_Id}`}
					>
						View Details <AiOutlineArrowRight size={20} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductModal;
