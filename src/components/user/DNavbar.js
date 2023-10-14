import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	MdOutlineLogout,
	MdOutlineRateReview,
	MdOutlineSpaceDashboard,
} from "react-icons/md";
import { BiPackage } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { PiPasswordDuotone } from "react-icons/pi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaBoxesPacking } from "react-icons/fa6";
import { removeUser } from "../../toolkit/UserSlice";
import { useDispatch } from "react-redux";

const DNavbar = () => {
	const [orderShow, setOrderShow] = useState(false);
	const dispatch = useDispatch();
	const [url, setUrl] = useState("");
	const navigate = useNavigate();
	const path = window.location.pathname;

	useEffect(() => {
		setUrl(path);
	}, [navigate, path]);

	const active = "hover:bg-blue-500 bg-blue-600 text-white";

	return (
		<div className='p-4 flex flex-col gap-2 relative'>
			<Link
				to={"/user-dashboard"}
				className={`flex items-center gap-3 py-1 px-3 rounded-2xl ${
					url === "/user-dashboard" && active
				}`}
			>
				<MdOutlineSpaceDashboard />
				Dashboard
			</Link>
			<button
				onClick={() => setOrderShow(!orderShow)}
				className={`relative flex items-center gap-3 py-1 px-3 rounded-2xl  ${
					url.includes("order") && active
				}`}
			>
				<BiPackage />
				My Orders
				{!orderShow ? (
					<IoIosArrowDown className='absolute top-[50%] right-4 -translate-y-[50%]' />
				) : (
					<IoIosArrowUp className='absolute top-[50%] right-4 -translate-y-[50%]' />
				)}
			</button>

			<ul
				className={`flex flex-col w-full gap-2 ml-3 transition-all duration-200 ${
					orderShow
						? "translate-x-0 relative"
						: "-translate-x-[200px] absolute top-[100px]"
				}`}
			>
				<li
					className={`py-[1px] w-full px-3 rounded-2xl transition-all duration-300 ease-in-out ${
						orderShow
							? "translate-x-0"
							: "-translate-x-[200px] absolute top-[5px]"
					} ${
						url.endsWith("/ship") ? active : "bg-slate-50 hover:bg-slate-100"
					}`}
				>
					<Link
						to={"/user-dashboard/order/ship"}
						className='flex items-center gap-3'
					>
						<FaBoxesPacking /> To Ship
					</Link>
				</li>
				<li
					className={`py-[1px] w-full px-3 rounded-2xl transition-all duration-500 ease-in-out ${
						orderShow
							? "translate-x-0"
							: "-translate-x-[200px] absolute top-[2px]"
					} ${
						url.endsWith("/receive") ? active : "bg-slate-50 hover:bg-slate-100"
					}`}
				>
					<Link
						to={"/user-dashboard/order/receive"}
						className='flex items-center gap-3'
					>
						<LiaShippingFastSolid />
						To Receive
					</Link>
				</li>
				<li
					className={`py-[1px] w-full px-3 rounded-2xl transition-all duration-700 ease-in-out ${
						orderShow
							? "translate-x-0"
							: "-translate-x-[200px] absolute top-[40px]"
					} ${
						url.endsWith("/review") ? active : "bg-slate-50 hover:bg-slate-100"
					}`}
				>
					<Link
						to={"/user-dashboard/order/review"}
						className='flex items-center gap-3'
					>
						<MdOutlineRateReview /> To Review
					</Link>
				</li>
			</ul>

			<Link
				to={"/user-dashboard/profile"}
				className={`flex items-center gap-3 py-1 px-3 rounded-2xl ${
					url.endsWith("/profile") ? active : "bg-slate-50 hover:bg-slate-100"
				}`}
			>
				<RxAvatar />
				Profile
			</Link>
			<Link
				to={"/user-dashboard/auth/change-password"}
				className={`flex items-center gap-3 py-1 px-3 rounded-2xl ${
					url.endsWith("/change-password")
						? active
						: "bg-slate-50 hover:bg-slate-100"
				}`}
			>
				<PiPasswordDuotone />
				Change Password
			</Link>
			<button
				onClick={() => {
					dispatch(removeUser());
					localStorage.removeItem("_token");
				}}
				to={"/user-dashboard/change-password"}
				className='flex justify-center items-center gap-3 py-1 px-3 rounded-2xl bg-red-300'
			>
				<MdOutlineLogout />
				Sign Out
			</button>
		</div>
	);
};

export default DNavbar;
