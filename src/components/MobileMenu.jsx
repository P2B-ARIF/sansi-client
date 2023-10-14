import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const MobileMenu = ({ setMobileMenu }) => {
	const { category } = useParams();
	const { wishLists } = useSelector(state => state.products);

	return (
		<div onClick={() => setMobileMenu(false)}>
			<ul className='mobileMenu_ul'>
				<li
					className={`mobileMenu_li  ${
						window.location.pathname.endsWith("/") &&
						"bg-gradient-to-r from-transparent to-teal-200"
					}`}
				>
					<Link to={"/"} className='flex'>
						Home
					</Link>
				</li>
				<li
					className={`mobileMenu_li  ${
						category === "panjabi" &&
						"bg-gradient-to-r from-transparent to-teal-200"
					}`}
				>
					<Link to={"/collection/panjabi"} className='flex'>
						Panjabi
					</Link>
				</li>
				<li
					className={`mobileMenu_li  ${
						category === "pajama" &&
						"bg-gradient-to-r from-transparent to-teal-200"
					}`}
				>
					<Link to={"/collection/pajama"} className='flex'>
						Pajama
					</Link>
				</li>
				<li
					className={`mobileMenu_li  ${
						category === "polo-shirt" &&
						"bg-gradient-to-r from-transparent to-teal-200"
					}`}
				>
					<Link to={"/collection/polo-shirt"} className='flex'>
						Polo Shirt
					</Link>
				</li>
				<li
					className={`mobileMenu_li  ${
						category === "t-shirt" &&
						"bg-gradient-to-r from-transparent to-teal-200"
					}`}
				>
					<Link to={"/collection/t-shirt"} className='flex'>
						T-Shirt
					</Link>
				</li>
				<li
					className={`mobileMenu_li  ${
						category === "shirt" &&
						"bg-gradient-to-r from-transparent to-teal-200"
					}`}
				>
					<Link to={"/collection/shirt"} className='flex'>
						Shirt
					</Link>
				</li>
				<li
					className={`mobileMenu_li  ${
						category === "blog" &&
						"bg-gradient-to-r from-transparent to-teal-200"
					}`}
				>
					<Link to={"/collection/blog"} className='flex'>
						Blog
					</Link>
				</li>
				<li
					className={`mobileMenu_li  ${
						window.location.pathname.endsWith("wishlist") &&
						"bg-gradient-to-r from-transparent to-teal-200"
					}`}
				>
					<Link to={"/wishlists"} className='flex gap-3'>
						<AiOutlineHeart size={25} /> WishList ({wishLists?.length})
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default MobileMenu;
