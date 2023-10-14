import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./../components/Footer";

const Main = () => {
	return (
		<div className='flex flex-col justify-between w-full min-h-[100vh]'>
			<Header />
			<div className='mt-[60px] md:mt-[100px]'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default Main;
