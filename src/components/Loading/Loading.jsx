import React from "react";
import "./Loading.css";

const Loading = () => {
	return (
		<div className='flex items-center justify-center min-h-screen min-w-[100vw] fixed top-0 left-0 z-50 bg-slate-100'>
			<div className='three-body'>
				<div className='three-body__dot'></div>
				<div className='three-body__dot'></div>
				<div className='three-body__dot'></div>
			</div>
		</div>
	);
};

export default Loading;
