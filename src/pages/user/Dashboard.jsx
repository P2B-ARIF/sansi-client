import React, { useState, useEffect } from "react";
import Stats from "../../components/user/Stats";
import HistoryTable from "../../components/user/HistoryTable";
import Review from "../../components/user/Review";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addAllOrders } from "../../toolkit/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
	const [loading, setLoading] = useState(false);
	// const [orders, setOrders] = useState([]);
	const { orders } = useSelector(state => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// console.log(orders,"order")

	useEffect(() => {
		setLoading(true);
		const fetch = async () => {
			const url = `${process.env.REACT_APP_SERVER_URL}/order/getAllOrder`;
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
					dispatch(addAllOrders(res.data));
				})
				.catch(err => {
					setLoading(false);
					navigate("/");
					window.location.reload();
				});
		};

		fetch();
	}, [dispatch, navigate]);

	return (
		<section>
			<Stats />

			<div className='bg-white rounded-lg my-5 py-5 shadow-lg'>
				<h3 className='text-2xl font-bold text-slate-700 py-5 ml-5'>History</h3>
				<div className='border mx-2 md:mx-5 rounded-lg'>
					<HistoryTable orders={orders} loading={loading} />
				</div>
			</div>

			<div className='bg-white rounded-lg my-5 py-5 shadow-lg'>
				<h3 className='text-2xl font-bold text-slate-700 py-5 ml-5'>
					My Reviews
				</h3>

				{/* <ReviewsList reviews={reviews} /> */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-5'>
					{[1, 2, 3, 4].map(ok => (
						<Review key={ok} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
