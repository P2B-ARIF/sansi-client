import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { removeUser } from "../toolkit/UserSlice";
import DNavbar from "../components/user/DNavbar";

const DashboardLayout = () => {
	const { user, loading } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user?.access === false && loading === false) {
			dispatch(removeUser());
		}
	}, [user, dispatch, loading]);

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
	}, [dispatch]);

	// border-2 shadow-lg border-teal-500 rounded-lg overflow-hidden
	return (
		<div className='bg-slate-100 min-h-screen p-2 md:p-5'>
			<div className='container mx-auto md:flex items-start gap-10 my-5 overflow-hidden p-2 md:p-5'>
				<div className='rounded-lg bg-white w-full max-w-[350px] shadow-xl mb-5 md:mb-0'>
					<DNavbar />
				</div>
				<div className='w-full'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
