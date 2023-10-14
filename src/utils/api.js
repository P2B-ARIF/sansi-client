import axios from "axios";

export const addCartToDB = async id => {
	await axios
		.post(
			`${process.env.REACT_APP_SERVER_URL}/product/addCart?id=${id}`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
				},
			},
		)
		.then(res => console.log(res.data, "add cart to db"))
		.catch(err => console.log(err.message));
};

// client collections get specific category fetch
export const fetchDataFromApi = async endpoint => {
	const options = {
		method: "GET",
		headers: {
			Authorization: "Bearer" + process.env.REACT_APP_SECURE_FETCHING,
		},
	};
	const res = await fetch(
		`${process.env.REACT_APP_SERVER_URL}/${endpoint}`,
		options,
	);
	const data = await res.json();
	return data;
};

// export const fetchGetUser = async () => {
// 	await axios
// 		.get(`${process.env.REACT_APP_SERVER_URL}/auth/getUsers`, {
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
// 			},
// 		})
// 		.then(res => {
// 			console.log(res.data);
// 			return res.data;
// 		})
// 		.catch(err => {
// 			return err.message;
// 		});
// };
