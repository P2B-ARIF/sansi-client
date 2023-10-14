import React from "react";
import { Button, Input, Select, Spinner, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { fetchUser } from "../../toolkit/UserSlice";

const Profile = () => {
	const { register, handleSubmit } = useForm();
	const districts = [
		"Bagerhat",
		"Bandarban",
		"Barguna",
		"Barisal",
		"Bhola",
		"Bogra",
		"Brahmanbaria",
		"Chandpur",
		"Chapainawabganj",
		"Chattogram",
		"Chuadanga",
		"Comilla",
		"Cox's Bazar",
		"Dhaka",
		"Dinajpur",
		"Faridpur",
		"Feni",
		"Gaibandha",
		"Gazipur",
		"Gopalganj",
		"Habiganj",
		"Jamalpur",
		"Jashore",
		"Jhalokathi",
		"Jhenaidah",
		"Joypurhat",
		"Khagrachari",
		"Khulna",
		"Kishoreganj",
		"Kurigram",
		"Kushtia",
		"Lakshmipur",
		"Lalmonirhat",
		"Madaripur",
		"Magura",
		"Manikganj",
		"Meherpur",
		"Moulvibazar",
		"Munshiganj",
		"Mymensingh",
		"Naogaon",
		"Narail",
		"Narayanganj",
		"Narsingdi",
		"Natore",
		"Netrokona",
		"Nilphamari",
		"Noakhali",
		"Pabna",
		"Panchagarh",
		"Patuakhali",
		"Pirojpur",
		"Rajbari",
		"Rajshahi",
		"Rangamati",
		"Rangpur",
		"Satkhira",
		"Shariatpur",
		"Sherpur",
		"Sirajganj",
		"Sunamganj",
		"Sylhet",
		"Tangail",
		"Thakurgaon",
	];
	const { user } = useSelector(state => state.user);
	const [selectedDistrict, setSelectedDistrict] = useState("");
	const [userDetails, setUserDetails] = useState([]);
	const [img, setImg] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			setSelectedDistrict(user?.district);
			setImageUrl(user?.image);
			setUserDetails(user);
		}
	}, [user?.district, user?.image, user, dispatch]);

	useEffect(() => {
		const imageFunc = async () => {
			if (img) {
				setIsLoading(true);
				const url =
					"https://api.imgbb.com/1/upload?key=6226ca30d95b139a79184223cfbc266a";

				const formData = new FormData();
				formData.append("image", img);

				await axios
					.post(url, formData)
					.then(res => {
						setIsLoading(false);
						setImageUrl(res.data.data.url);
					})
					.catch(err => {
						toast({
							title: "Image Upload Field",
							description: "Please select jpg, jpeg, & png format image.",
							status: "error",
							position: "bottom-right",
							duration: 5000,
							isClosable: true,
						});
						setIsLoading(false);
						console.log(err);
					});
			}
			setImg(null);
		};
		imageFunc();
	}, [img, toast]);

	console.log(imageUrl);

	const onSubmit = async data => {
		setLoading(true);
		const profile = {
			...data,
			district: selectedDistrict || user?.district,
			image: imageUrl || user?.image,
		};

		const url = `${process.env.REACT_APP_SERVER_URL}/auth/update/profile?id=${user?._id}`;
		await axios
			.put(url, profile, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${JSON.parse(localStorage.getItem("_token"))}`,
				},
			})
			.then(res => {
				if (res.data.acknowledged) {
					dispatch(fetchUser());
					window.location.reload();
				}
				setLoading(false);
				console.log(res.data);
			})
			.catch(err => {
				setLoading(false);
				console.log(err.message);
			});
	};

	return (
		<div className='p-10 bg-white rounded-lg border'>
			<div className='flex items-center gap-3 md:gap-5 relative'>
				<img
					className='w-[130px] h-[130px] rounded-full border-2 border-teal-400 m-1 object-cover'
					src={
						imageUrl ||
						"https://teachingandlearning.schulich.yorku.ca/wp-content/uploads/2019/10/avatar6.png"
					}
					alt=''
				/>

				<div className=''>
					<h3 className='text-2xl text-slate-700'>{userDetails?.name}</h3>
					<p className='text-slate-600'>{userDetails?.email}</p>
					<h4 className='text-slate-600'>{userDetails?.phone}</h4>
				</div>
			</div>

			<div className='w-[150px] md:ml-[150px]'>
				<label
					htmlFor='image'
					className='flex text-sm items-center justify-center gap-1 bg-teal-500 py-[5px] px-3 rounded-md text-slate-800 font-medium'
				>
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<AiOutlineCamera /> Upload Image
						</>
					)}
				</label>
				<input
					disabled={isLoading ? true : false}
					type='file'
					id='image'
					className='hidden'
					// onChange={e => imageFunc(e.target.files[0])}
					onChange={e => setImg(e.target.files[0])}
				/>
			</div>
			<br />

			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
				<h3 className='text-lg font-bold'>Edit Profile</h3>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
					<div>
						<label htmlFor='country'>Country*</label>
						<Input
							id='name'
							name='name'
							defaultValue={user?.country}
							disabled
							// {...register("name", { required: true })}
						/>
					</div>
					<div>
						<label htmlFor='name'>Name*</label>
						<Input
							id='name'
							name='name'
							defaultValue={user?.name}
							{...register("name", { required: true })}
						/>
					</div>

					<div>
						<label htmlFor='city'>City*</label>
						<Input
							id='city'
							name='city'
							defaultValue={user?.city}
							{...register("city", { required: true })}
						/>
					</div>

					<div>
						<label htmlFor='lastName'>District*</label>
						<Select
							placeholder='Select a district'
							onChange={e => setSelectedDistrict(e.target.value)}
							// defaultValue={selectedDistrict || user?.district}
							required
						>
							{districts?.map((district, index) => (
								<option
									selected={district === user?.district}
									key={index}
									value={district}
								>
									{district}
								</option>
							))}
						</Select>
					</div>
				</div>
				<div>
					<label htmlFor='address'>Address*</label>
					<Input
						id='address'
						name='address'
						defaultValue={user?.address}
						{...register("address", { required: true })}
					/>
				</div>
				<div>
					<label htmlFor='apartment'>Apartment, suite, etc.(optional)*</label>
					<Input
						id='apartment'
						name='apartment'
						defaultValue={user?.apartment}
						{...register("apartment", { required: false })}
					/>
				</div>

				<div className='grid grid-cols-2 gap-5'>
					<div>
						<label htmlFor='postal_code'>Postal code*</label>
						<Input
							id='postal_code'
							name='postal_code'
							defaultValue={user?.postal_code}
							{...register("postal_code", { required: true })}
						/>
					</div>
					<div>
						<label htmlFor='phone'>Phone*</label>
						<Input
							id='phone'
							name='phone'
							defaultValue={user?.phone}
							{...register("phone", { required: true })}
						/>
					</div>
				</div>

				<Button
					isLoading={loading ? true : false}
					size={"sm"}
					type='submit'
					colorScheme='teal'
					className='max-w-[220px] ml-auto'
				>
					Changes Save
				</Button>
			</form>
		</div>
	);
};

export default Profile;
