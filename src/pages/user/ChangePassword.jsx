import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { PiPasswordBold, PiPasswordFill } from "react-icons/pi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	const { register, handleSubmit } = useForm();
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async data => {
		setLoading(true);

		if (data?.password === data?.confirm) {
			const url = `${process.env.REACT_APP_SERVER_URL}/auth/update/password?pass=${data?.password}`;
			await axios
				.put(
					url,
					{},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${JSON.parse(
								localStorage.getItem("_token"),
							)}`,
						},
					},
				)
				.then(res => {
					setLoading(false);
					console.log(res.data);
					if (res.data.acknowledged) {
						toast({
							description: "Successfully new password created.!",
							status: "success",
							position: "bottom-right",
							duration: 5000,
							isClosable: true,
						});
						navigate("/user-dashboard");
					}
				})
				.catch(err => {
					setLoading(false);
					console.log(err.message);
				});
		}
	};

	return (
		<div className='rounded-lg border shadow-lg px-5 py-10 md:p-10 lg:w-1/2'>
			<h1 className='text-center text-2xl text-slate-700'>Change Password</h1>
			<h3 className='text-center text-base text-slate-600 mb-5'>
				choose a good one!
			</h3>

			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
				<div className='flex items-center w-full rounded-lg overflow-hidden'>
					<label htmlFor='password' className='p-4 bg-[#2a2e32]'>
						<PiPasswordBold color='#05927f' />
					</label>
					<input
						className='p-3 bg-[#353a3f] border-none outline-none w-full text-white'
						placeholder='Enter Password'
						type={show ? "text" : "password"}
						id='password'
						name='password'
						{...register("password", {
							pattern: /[^a-zA-Z0-9]/,
							minLength: 6,
							maxLength: 20,
							required:
								"Passwords have to be 6-10 characters long, and contain UPPER CASE, lower case, number.",
						})}
					/>
					<div className='py-3 bg-[#353a3f] px-3'>
						{show ? (
							<AiOutlineEye
								onClick={() => setShow(false)}
								size={24}
								className='text-teal-600'
							/>
						) : (
							<AiOutlineEyeInvisible
								onClick={() => setShow(true)}
								size={24}
								className='text-teal-600'
							/>
						)}
					</div>
				</div>

				<div className='flex items-center w-full rounded-lg overflow-hidden'>
					<label htmlFor='confirm' className='p-4 bg-[#2a2e32]'>
						<PiPasswordFill color='#05927f' />
					</label>
					<input
						className='p-3 bg-[#353a3f] border-none outline-none w-full text-white'
						placeholder='Confirm Password'
						type='password'
						id='confirm'
						name='confirm'
						{...register("confirm", { maxLength: 20, required: true })}
					/>
				</div>

				<div className='w-full rounded-lg overflow-hidden'>
					<button
						type='submit'
						disabled={loading ? true : false}
						className='p-3 bg-[#05927f] w-full font-bold text-white flex items-center justify-center gap-2'
					>
						{loading ? (
							<>
								<Spinner />
								Loading...
							</>
						) : (
							"Register"
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ChangePassword;
