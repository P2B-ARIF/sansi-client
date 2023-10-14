import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AiOutlineArrowLeft } from "react-icons/ai";

import img1 from "./../assets/img1.jpg";
import img2 from "./../assets/img2.jpg";
import img3 from "./../assets/img3.jpg";

const HeaderSlider = () => {
	return (
		<div className='relative text-white text-[20px] w-full container mx-auto '>
			<Carousel
				autoPlay={true}
				infiniteLoop={true}
				interval={3000}
				showThumbs={false}
				showIndicators={false}
				showStatus={false}
				renderArrowPrev={(clickHandler, hasPrev) => (
					<div
						onClick={clickHandler}
						className='absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90'
					>
						<AiOutlineArrowLeft className='text-sm md:text-lg' />
					</div>
				)}
				renderArrowNext={(clickHandler, hasNext) => (
					<div
						onClick={clickHandler}
						className='absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90'
					>
						<AiOutlineArrowLeft className='rotate-180 text-sm md:text-lg' />
					</div>
				)}
			>
				<div className='max-h-[50vh] md:max-h-[85vh] h-full w-full'>
					<img src={img1} alt='' className='w-full h-full object-cover' />
					<a
						href='/collection/t-shirt'
						className='block shadow px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-white absolute bottom-[25px] md:bottom-[75px] last-0 text-black/[0.50] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90'
					>
						Shop Now
					</a>
				</div>
				<div className='max-h-[50vh] md:max-h-[85vh] h-full w-full'>
					<img src={img2} alt='' className='w-full h-full object-cover' />
					<a
						href='/collection/shirt'
						className='block shadow px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-white absolute bottom-[25px] md:bottom-[75px] last-0 text-black/[0.50] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90'
					>
						Shop Now
					</a>
				</div>
				<div className='max-h-[50vh] md:max-h-[85vh] h-full w-full'>
					<img src={img3} alt='' className='w-full h-full object-cover' />
					<a
						href='/collection/panjabi'
						className='block shadow px-[15px] md:px-[40px] py-[10px] md:py-[25px] bg-white absolute bottom-[25px] md:bottom-[75px] last-0 text-black/[0.50] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90'
					>
						Shop Now
					</a>
				</div>
			</Carousel>
		</div>
	);
};

export default HeaderSlider;
