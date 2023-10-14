import React from "react";
import { Link, useParams } from "react-router-dom";

const Menu = () => {
	const { category } = useParams();
	const { productId } = useParams();

	return (
		<div className='nav_menu hidden md:block'>
			<ul className='flex flex-wrap items-center gap-1'>
				<li
					className={`nav_link ${category ? " " : productId ? " " : "active"}`}
				>
					<Link to={"/"}>Home</Link>
				</li>
				<li className={`nav_link ${category === "panjabi" ? "active" : " "}`}>
					<Link to={"/collection/panjabi"}>Panjabi</Link>
				</li>
				<li className={`nav_link ${category === "pajama" ? "active" : " "}`}>
					<Link to={"/collection/pajama"}>Pajama</Link>
				</li>
				<li
					className={`nav_link ${category === "polo-shirt" ? "active" : " "}`}
				>
					<Link to={"/collection/polo-shirt"}>Polo Shirt</Link>
				</li>
				<li className={`nav_link ${category === "t-shirt" ? "active" : " "}`}>
					<Link to={"/collection/t-shirt"}>T-Shirt</Link>
				</li>
				<li className={`nav_link ${category === "shirt" ? "active" : " "}`}>
					<Link to={"/collection/shirt"}>Shirt</Link>
				</li>
				<li className={`nav_link ${category === "blog" ? "active" : " "}`}>
					<Link to={"/collection/blog"}>Blog</Link>
				</li>
			</ul>
		</div>
	);
};

export default Menu;
