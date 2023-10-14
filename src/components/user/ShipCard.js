import React from "react";
import SCard from "./SCard";

const ShipCard = ({ product, index, setHit }) => {
	return (
		<div>
			<h2 className='ml-2'>
				Order Date: {product?.issueDate.fns.fns_PP} |{" "}
				{product?.issueDate.fns.fns_pp}
			</h2>

			{product &&
				product?.order?.map((order, index) => (
					<SCard key={index} order={order} product={product} setHit={setHit} />
				))}
		</div>
	);
};

export default ShipCard;
