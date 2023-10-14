import React from "react";

const CategoryCard = ({ category }) => {
	console.log(category, "category");

	return (
		<div className='w-[300px]'>
			<h3 className='text-4xl font-extrabold'>{category?.category}</h3>
		</div>
	);
};

export default CategoryCard;
