import React from "react";

const Description = ({ product }) => {
	// const product? = {
	// 	headline:
	// 		"Panjabi Collection for men. This type of Panjabi is best for you...",
	// 	paragraph: [
	// 		"This Panjabi fabric is so much soft and comfy...",
	// 		"We get inspired by our customers' fidelity. Only we ensure...",
	// 	],
	// 	specification: [
	// 		{ "Product Type": "Panjabi" },
	// 		{ Color: "Black" },
	// 		{ Material: "100% Cotton" },
	// 		{ Gender: "Men" },
	// 		{ Fit: "Semi Fitting" },
	// 		"Very trendy and unique product ",
	// 		"High standard and Qualitiful",
	// 		"So much more comfortable to wear",
	// 		"Very Soft to feel Comfort",
	// 	],
	// 	question: "Why should you purchase Panjabi from Ambarlife?",
	// 	lastParagraph:
	// 		"You are getting Semi Slack Panjabi from us for Eid-ul-Fitr...",
	// measurement_chart: {
	// 	S: { length: 68, width: 50, height: 4 },
	// 	M: { length: 70, width: 52, height: 5 },
	// 	L: { length: 72, width: 54, height: 5 },
	// 	XL: { length: 74, width: 56, height: 6 },
	// 	XXL: { length: 74, width: 56, height: 6 },
	// },
	// };

	console.log(product, "products");

	return (
		<div>
			<h2 className='text-xl'>{product?.headline}</h2>
			{product?.paragraph?.map((para, index) => (
				<p className='my-5 text-[15px]' key={index}>
					{para}
				</p>
			))}
			{/* <h3>Specifications:</h3> */}
			<ol className='list-disc ml-20 my-5'>
				{product?.specification?.map((spec, index) => (
					<li key={index}>
						{typeof spec === "object" ? Object.values(spec)[0] : spec}
					</li>
				))}
			</ol>
			<p className='text-xl'>{product?.question}</p>
			<p className='my-5 text-[15px]'>{product?.lastParagraph}</p>
			<h3 className='text-lg'>Measurement Chart:</h3>
			<table className='mt-5 w-full border'>
				<thead className=''>
					<tr className='bg-gray-200 text-slate-600'>
						<th className='py-2 px-4 border'>Size</th>
						<th className='py-2 px-4 border'>Length</th>
						<th className='py-2 px-4 border'>Width</th>
						<th className='py-2 px-4 border'>Height</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(product?.measurement_chart).map(
						([size, measurements], index) => (
							<tr key={size} className={`${index % 2 && "bg-gray-100"} text-center`}>
								<td className='py-2 px-4'>{size}</td>
								<td className='py-2 px-4'>{measurements.length}</td>
								<td className='py-2 px-4'>{measurements.width}</td>
								<td className='py-2 px-4'>{measurements.height}</td>
							</tr>
						),
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Description;
