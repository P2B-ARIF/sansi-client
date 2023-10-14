import React, { useEffect, useState } from "react";
import { useToast, Spinner } from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/react";
import registerImg from "./../../assets/img3.jpg";
import "./Auth.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { MdAlternateEmail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineMobile } from "react-icons/ai";
import { PiPasswordBold, PiPasswordFill } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [message, setMessage] = useState(null);
	const toast = useToast();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const onSubmit = async data => {
		const { confirm, ...rest } = data;
		const fns_PP = format(new Date(), "PP");
		const fns_P = format(new Date(), "P");
		const fns_pp = format(new Date(), "pp");

		setLoading(true);
		const newData = {
			...rest,
			createdAt: {
				date: new Date(),
				fns: {
					fns_PP,
					fns_P,
					fns_pp,
				},
			},
		};

		if (data.password === confirm) {
			await axios
				.post(`${process.env.REACT_APP_SERVER_URL}/auth/api/register`, newData)
				.then(res => {
					setLoading(false);
					if (res.data.message) {
						setMessage(res.data.message);
					}
					if (res.data.data.acknowledged) {
						setTimeout(() => {
							navigate("/auth/login");
						}, 2000);
					}
					console.log(res.data, message, "res");
				})
				.catch(err => {
					setLoading(false);
					console.log(err.message, "err message");
				});
		} else {
			setMessage({ message: "Password doesn't match", status: "error" });
			setLoading(false);
		}
	};

	useEffect(() => {
		if (message) {
			toast({
				// title: "Order Submit.",
				description: message.message,
				status: message.status,
				position: "bottom-right",
				duration: 4000,
				isClosable: true,
			});
		}
		setMessage(null);
	}, [message, toast]);

	return (
		<div className='container mx-auto flex items-center justify-center'>
			<div className='border border-teal-500 rounded-lg md:flex items-center my-10 m-2 md:my-10 md:m-10 overflow-hidden '>
				<div className='block md:hidden flex-1 w-full max-h-[40vh] md:max-h-[80vh] overflow-hidden'>
					<img
						className='h-full w-full object-cover'
						src={registerImg}
						alt=''
					/>
				</div>
				<div className='flex-1'>
					<Box p={4} maxWidth='400px' margin='0 auto 0'>
						<Heading mb={4}>Register</Heading>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex flex-col gap-3'
						>
							<div className='flex items-center w-full rounded-lg overflow-hidden'>
								<label htmlFor='name' className='p-4 bg-[#2a2e32]'>
									<RxAvatar color='#05927f' />
								</label>
								<input
									className='p-3 bg-[#353a3f] border-none outline-none w-full text-white'
									placeholder='Full Name'
									type='name'
									id='name'
									name='name'
									{...register("name", { maxLength: 25, required: true })}
								/>
							</div>

							<div className='flex items-center w-full rounded-lg overflow-hidden'>
								<label htmlFor='email' className='p-4 bg-[#2a2e32]'>
									<MdAlternateEmail color='#05927f' />
								</label>
								<input
									className='p-3 bg-[#353a3f] border-none outline-none w-full text-white'
									placeholder='Email address'
									type='email'
									id='email'
									name='email'
									{...register("email", { maxLength: 30, required: true })}
								/>
							</div>

							<div className='flex items-center w-full rounded-lg overflow-hidden'>
								<label htmlFor='phone' className='p-4 bg-[#2a2e32]'>
									<AiOutlineMobile color='#05927f' />
								</label>
								<input
									className='p-3 bg-[#353a3f] border-none outline-none w-full text-white'
									placeholder='Phone'
									type='phone'
									id='phone'
									name='phone'
									{...register("phone", { maxLength: 15, required: true })}
								/>
							</div>

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
							{errors?.password && (
								<p className='text-sm text-red-500'>
									{errors?.password?.message}
								</p>
							)}

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
						<br />
						<p className='flex justify-end my-2 gap-1'>
							Already have an account.?
							<Link to={"/auth/login"} className='underline text-teal-500'>
								login
							</Link>
						</p>
					</Box>
				</div>
				<div className='hidden md:block flex-1 w-full max-h-[40vh] md:max-h-[80vh] overflow-hidden'>
					<img
						className='h-full w-full object-cover'
						src={registerImg}
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};

export default Register;
