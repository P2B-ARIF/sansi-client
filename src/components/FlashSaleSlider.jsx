import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import FlashSaleCard from "./FlashSaleCard";

const FlashSaleSlider = () => {
	const { flashSale } = useSelector(state => state.products);

	return (
		<Carousel
			additionalTransfrom={0}
			autoPlaySpeed={2000}
			centerMode={true}
			className=''
			containerClass='container-with-dots'
			dotListClass=''
			draggable
			focusOnSelect={false}
			infinite
			autoPlay
			itemClass='mx-2 md:mx-5'
			keyBoardControl
			minimumTouchDrag={80}
			pauseOnHover
			renderArrowsWhenDisabled={false}
			renderButtonGroupOutside={false}
			renderDotsOutside={false}
			arrows={false}
			responsive={{
				desktop: {
					breakpoint: {
						max: 3000,
						min: 1024,
					},
					items: 3,
					partialVisibilityGutter: 40,
				},
				mobile: {
					breakpoint: {
						max: 464,
						min: 0,
					},
					items: 1,
					partialVisibilityGutter: 30,
				},
				tablet: {
					breakpoint: {
						max: 1024,
						min: 464,
					},
					items: 2,
					partialVisibilityGutter: 30,
				},
			}}
			rewind={false}
			rewindWithAnimation={false}
			rtl={false}
			// shouldResetAutoplay
			showDots={false}
			sliderClass=''
			slidesToSlide={1.2}
			swipeable
		>
			{flashSale?.map((product, index) => (
				<FlashSaleCard key={index} product={product} />
			))}
		</Carousel>
	);
};

export default FlashSaleSlider;
