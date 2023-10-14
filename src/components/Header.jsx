import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import { BsHandbag } from "react-icons/bs";
import { useSelector } from "react-redux";
import SearchProduct from "./SearchProduct";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import Menu from "./Menu";
import { Avatar, AvatarBadge, Button, IconButton } from "@chakra-ui/react";
import MobileMenu from "./MobileMenu";
import "./../styles/Navbar.css";
// import { removeUser } from "../toolkit/UserSlice";
import { MdOutlineSearchOff } from "react-icons/md";

const Header = () => {
	const { carts, wishLists } = useSelector(state => state.products);
	const { user } = useSelector(state => state.user);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [show, setShow] = useState("translate-y-0");
	const [mobileMenu, setMobileMenu] = useState(false);
	const [blur, setBlur] = useState(false);
	const [search, setSearch] = useState(false);
	// const [wishLists, setWishLists] = useState([]);
	// const dispatch = useDispatch();
	// const [profileView, setProfileView] = useState(false);
	const navigate = useNavigate();

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileMenu) {
				setShow("-translate-y-[80px]");
			} else {
				setShow("shadow-sm");
			}
		} else {
			setShow("translate-y-0");
		}
		if (window.scrollY > 40) {
			setBlur(true);
		} else {
			setBlur(false);
		}
		setLastScrollY(window.scrollY);
		// console.log(lastScrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [lastScrollY]);

	// useEffect(() => {
	// 	const res = JSON.parse(localStorage.getItem("wishList"));
	// 	setWishLists(res);
	// }, [lastScrollY]);

	return (
		<div>
			<div
				className={`px-5 md:px-0 w-full h-[65px] md:h-[80px] flex items-center justify-between z-20 fixed right-[50%] translate-x-[50%] top-0 transition-transform duration-300 ${show} ${
					blur ? "backdrop-blur-md bg-[#ffffff57]" : "bg-white"
				}`}
			>
				<nav className={` container mx-auto flex items-center justify-between`}>
					<Menu />

					<div className='block md:hidden'>
						{mobileMenu ? (
							<AiOutlineClose
								onClick={() => setMobileMenu(false)}
								size={25}
								className='cursor-pointer'
							/>
						) : (
							<AiOutlineMenu
								onClick={() => setMobileMenu(true)}
								size={25}
								className='cursor-pointer'
							/>
						)}
					</div>

					<Link to={"/"} className='w-[50px] h-[50px] -mr-20 md:mr-20'>
						<img
							src={logo}
							alt='logo'
							className='w-full h-full object-contain'
						/>
					</Link>

					<div className='flex items-center gap-4 relative'>
						<div className='hidden md:block'>
							<SearchProduct />
						</div>
						<div className='block md:hidden ml-5'>
							{search ? (
								<>
									<div className='absolute top-16 right-2 flex gap-1'>
										<SearchProduct />
										<IconButton
											onClick={() => setSearch(false)}
											className='block md:hidden'
											size={"md"}
											aria-label='Search database'
											colorScheme='teal'
											icon={<AiOutlineClose size={25} />}
										/>
									</div>
								</>
							) : (
								<IconButton
									onClick={() => setSearch(true)}
									className='block md:hidden'
									size={"sm"}
									aria-label='Search database'
									colorScheme='teal'
									variant={'ghost'}
									icon={<AiOutlineSearch size={25} />}
								/>
							)}
						</div>

						<Link to='/wishlists' className='hidden md:block relative'>
							<AiOutlineHeart size={25} />
							{wishLists?.length > 0 && (
								<span className='w-[8px] h-[8px] bg-teal-600 text-white rounded-full flex items-center justify-center text-sm p-[9px] absolute top-0 -right-2'>
									{wishLists?.length}
								</span>
							)}
						</Link>
						<Link to='/cart' className='relative'>
							<BsHandbag size={25} />

							<span className='w-[10px] h-[10px] bg-teal-600 text-white rounded-full flex items-center justify-center text-sm p-[10px] absolute top-0 -right-2'>
								{carts.length}
							</span>
						</Link>
						{!user ? (
							<Link to={"/auth/login"}>
								<Button variant={'ghost'} colorScheme='teal' size='sm'>
									Login
								</Button>
							</Link>
						) : (
							<>
								<Avatar
									size={{ base: "sm", md: "md" }}
									src={user?.image && user?.image}
									cursor={"pointer"}
									onClick={() => navigate("/user-dashboard", { replace: true })}
								>
									<AvatarBadge boxSize='1em' bg='green.500' />
								</Avatar>

								{/* {profileView && (
									<div className='absolute top-16 right-0 shadow-md w-[270px] p-5 bg-teal-500 text-white rounded-md'>
										<div className='bg-white rounded-md text-slate-800 flex flex-col gap-1 p-2 mb-4'>
											<h3 className='text-xl font-medium leading-5'>
												{user?.name}
											</h3>
											<p className='leading-4'>{user?.email}</p>
											<p>{user?.phone}</p>
										</div>

										<hr />

										<div className='flex flex-col gap-3 my-5'>
											<Link to={"/user-dashboard"}>
												<Button className='w-full' size={"md"}>
													Dashboard
												</Button>
											</Link>
											<Link to={"/user-dashboard/order"}>
												<Button className='w-full' size={"md"}>
													Orders
												</Button>
											</Link>
											<Link to={"/user-dashboard/profile"}>
												<Button className='w-full' size={"md"}>
													Profile
												</Button>
											</Link>
										</div>

										<div className='flex items-center justify-around'>
											<Button
												onClick={() => setProfileView(false)}
												colorScheme='gray'
												size='sm'
												className='flex items-center'
											>
												<AiOutlineClose size={20} className='pb-1' /> Close
											</Button>

											<Button
												onClick={() => {
													dispatch(removeUser());
													localStorage.removeItem("_token");
												}}
												colorScheme='red'
												size='sm'
												className='w-[120px]'
											>
												Log Out
											</Button>
										</div>
									</div>
								)} */}
							</>

							// <Button
							// 	onClick={() => {
							// 		dispatch(removeUser());
							// 		localStorage.removeItem("_token");
							// 	}}
							// 	colorScheme='teal'
							// 	size='sm'
							// >
							// 	Log Out
							// </Button>
						)}
					</div>
				</nav>
			</div>
			<div
				className={`fixed top-0 left-0 ${
					mobileMenu ? "translate-x-[0px]" : "-translate-x-[320px]"
				} bg-white w-[300px] min-h-screen z-30 backdrop-blur-md pt-3 transition-transform duration-300 ease-in-out`}
			>
				<div className='flex justify-end ml-auto mr-7'>
					<IconButton
						onClick={() => setMobileMenu(false)}
						aria-label='close'
						className='cursor-pointer'
						colorScheme='teal'
						size={"sm"}
						icon={<AiOutlineClose size={20} />}
					/>
				</div>
				<MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
			</div>
		</div>
	);
};

export default Header;
