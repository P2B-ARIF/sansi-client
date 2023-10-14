import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Select } from "@chakra-ui/react";
import {
	changeSize,
	decQuantity,
	incQuantity,
	removeToCart,
} from "../toolkit/ProductsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItems = ({ product }) => {
	const [quantity, setQuantity] = useState(product.selected.quantity || 0);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { imageUrl, brand, price, sizes, stock, name, product_Id } =
		product || {};

	console.log(stock, "product");

	const handleIncDec = (type, id) => {
		console.log("type");
		const getData = JSON.parse(localStorage.getItem("products"));
		console.log(getData, "data");
		if (getData) {
			console.log(getData, "data2");
			let newData = [];

			if (type === "increment") {
				return (newData = getData?.map(p => {
					if (p.product_Id === id) {
						return { ...p, quantity: quantity + 1 };
					}
					return p;
				}));
			} else if (type === "decrement") {
				return (newData = getData?.map(p => {
					if (p.product_Id === id) {
						return { ...p, quantity: quantity - 1 };
					}
					return p;
				}));
			}

			// switch (type) {
			// 	case "increment":
			// 		newData = getData?.map(p => {
			// 			if (p.product_Id === id) {
			// 				return { ...p, quantity: quantity + 1 };
			// 			}
			// 			return p;
			// 		});

			// 		break;
			// 	case "decrement":
			// 		newData = getData?.map(p => {
			// 			if (p.product_Id === id) {
			// 				return { ...p, quantity: quantity - 1 };
			// 			}
			// 			return p;
			// 		});
			// 		break;

			// 	default:
			// 		break;
			// }
			localStorage.setItem("products", JSON.stringify(newData));
		} else {
			navigate("/products/all");
		}
	};

	const handleSizeChange = ({ size, product_Id }) => {
		const getData = JSON.parse(localStorage.getItem("products"));
		let newData = getData.map(p => {
			if (p.product_Id === product_Id) {
				return { ...p, size: size.trim() };
			}
			return p;
		});
		localStorage.setItem("products", JSON.stringify(newData));
	};

	const handleRemoveFromCart = product_Id => {
		const getData = JSON.parse(localStorage.getItem("products"));
		const newData = getData?.filter(
			product => product.product_Id !== product_Id,
		);
		localStorage.setItem("products", JSON.stringify([...newData]));
	};

	return (
		<>
			<div className='md:flex items-center justify-between my-3'>
				<div className='flex w-1/2 items-center gap-5 mb-3 md:mb-0'>
					<img
						src={imageUrl?.length > 0 ? imageUrl[0] : imageUrl}
						alt=''
						className='w-[100px]'
					/>
					<div className='flex flex-col'>
						<h4 className='capitalize'>{brand}</h4>
						<h1 className='font-bold text-slate-600 leading-4'>{name}</h1>
						<h4>Tk {price}</h4>
						<h3 className='flex items-center gap-2'>
							Size:
							<Select
								textTransform={"uppercase"}
								width={150}
								size={"xs"}
								placeholder='Select Size'
								onChange={e => {
									dispatch(changeSize({ product_Id, size: e.target.value }));
									handleSizeChange({ size: e.target.value, product_Id });
								}}
							>
								{sizes?.map(size => (
									<option
										selected={product.selected.size.trim() === size.trim()}
										key={size}
										defaultValue={size}
									>
										{size}
									</option>
								))}
							</Select>
						</h3>
					</div>
				</div>
				<div className='flex items-center justify-between w-full'>
					<div className='flex items-center gap-3 md:gap-5 mx-auto'>
						<div className='flex items-center border border-gray-400 rounded-full py-1 md:py-3 px-3 md:px-5'>
							<AiOutlineMinus
								onClick={() => {
									if (quantity > 1) {
										setQuantity(quantity - 1);
										dispatch(decQuantity(product_Id));
										handleIncDec("decrement", product_Id);
									}
								}}
								className='cursor-pointer'
							/>
							<input
								type='number'
								className='outline-none border-none w-[50px] mx-2 md:mx-5 text-center'
								readOnly
								value={quantity}
							/>
							<AiOutlinePlus
								onClick={() => {
									if (stock > quantity) {
										setQuantity(quantity + 1);
										dispatch(incQuantity(product_Id));
										handleIncDec("increment", product_Id);
									}
								}}
								className='cursor-pointer'
							/>
						</div>
						<BsTrash
							className='cursor-pointer'
							onClick={() => {
								dispatch(removeToCart(product_Id));
								handleRemoveFromCart(product_Id);
							}}
						/>
					</div>
					<h4 className='font-medium md:font-normal'>
						Tk{" "}
						<span className='cartPrice'>{(quantity * price).toFixed(2)}</span>
					</h4>
				</div>
			</div>
			<hr />
		</>
	);
};

export default CartItems;
