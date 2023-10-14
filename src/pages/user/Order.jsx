import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ShipCard from "../../components/user/ShipCard";
import ReceiveCard from "../../components/user/ReceiveCard";
import ReviewCard from "../../components/user/ReviewCard";
import Skeleton from "./../../components/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { addMyOrders } from "../../toolkit/UserSlice";
import empty from "./../../assets/box.png";

const Order = () => {
	const { orderIs } = useParams();
	const [loading, setLoading] = useState(false);
	// const [products, setProducts] = useState([]);
	const { myOrders } = useSelector(state => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [hit, setHit] = useState("");

	useEffect(() => {
		setLoading(true);
		const fetch = async () => {
			const url = `${process.env.REACT_APP_SERVER_URL}/order/${orderIs}`;
			await axios
				.get(url, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem("_token"),
						)}`,
					},
				})
				.then(res => {
					setLoading(false);
					dispatch(addMyOrders(res.data.reverse()));
				})
				.catch(err => {
					setLoading(false);
					navigate("/");
					window.location.reload();
				});
		};

		fetch();
	}, [orderIs, navigate, dispatch, hit]);

	return (
		<div className='flex flex-col gap-3'>
			{myOrders &&
				!loading &&
				myOrders.map((product, index) => {
					if (orderIs === "ship") {
						return (
							<ShipCard
								key={product?._id}
								index={index}
								setHit={setHit}
								product={product}
							/>
						);
					} else if (orderIs === "receive") {
						return (
							<ReceiveCard key={product?._id} index={index} product={product} />
						);
					} else if (orderIs === "review") {
						return (
							<ReviewCard key={product?._id} index={index} product={product} />
						);
					}
					return product;
				})}
			{loading && <Skeleton noOfLines={5} />}

			{loading === false && myOrders?.length === 0 && (
				<div className='py-10 flex flex-col justify-center items-center border shadow-md rounded-lg'>
					<img src={empty} alt='' className='w-[100px] opacity-60' />
					<h4 className='flex items-center justify-center text-center font-bold text-slate-700'>
						Category Empty
					</h4>
				</div>
			)}
		</div>
	);
};

export default Order;
