import React from "react";
import RevCard from "./RevCard";

const ReviewCard = ({ product }) => {

	console.log(product)

	return (
		<div>
			<h2 className="ml-2">
				Order Date: {product?.issueDate.fns.fns_PP} |{" "}
				{product?.issueDate.fns.fns_pp}
			</h2>

			{product &&
				product?.order?.map((order, index) => (
					<RevCard key={index} product={product} order={order} />
				))}
		</div>
	);
};

export default ReviewCard;
