import React from "react";
import { Box, Heading, Spinner } from "@chakra-ui/react";
import loginImg from "./../../assets/img2.jpg";
import "./Auth.css";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../toolkit/UserSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let location = useLocation();
	let from = location.state?.from?.pathname || "/";
	const [show, setShow] = useState(false);

	const onSubmit = async data => {
		setLoading(true);
		setMessage(null);

		await axios
			.put(`${process.env.REACT_APP_SERVER_URL}/auth/api/login`, data)
			.then(res => {
				setLoading(false);
				if (res.data.message) {
					setMessage(res.data.message);
				}
				if (res.data.token) {
					localStorage.setItem("_token", JSON.stringify(res.data.token));

					setTimeout(() => {
						navigate(from, { replace: true });
					}, 2000);
				}
				if (res.data.user) {
					console.log(res.data.user, "user login");
					dispatch(addUser(res.data.user));
				}
			})
			.catch(err => {
				setLoading(false);
				console.log(err.message, "err message");
			});
	};

	return (
		<div className='container mx-auto flex items-center justify-center'>
			<div className='border border-teal-500 rounded-lg md:flex items-center my-10 m-2 md:my-10 md:m-10 overflow-hidden '>
				<div className='flex-1 w-full max-h-[40vh] md:max-h-[80vh] overflow-hidden'>
					<img className='h-full w-full object-cover' src={loginImg} alt='' />
				</div>
				<div className='flex-1'>
					<Box p={4} maxWidth='400px' margin='0 auto 0'>
						<Heading mb={4}>Login</Heading>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex flex-col gap-3'
						>
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
									defaultValue={'arif@gmail.com'}
									{...register("email", { maxLength: 30, required: true })}
								/>
							</div>
							<div className='flex items-center w-full rounded-lg overflow-hidden'>
								<label htmlFor='password' className='p-4 bg-[#2a2e32]'>
									<RiLockPasswordFill color='#05927f' />
								</label>
								<input
									className='p-3 bg-[#353a3f] border-none outline-none w-full text-white'
									placeholder='Password'
									type={show ? "text" : "password"}
									id='password'
									name='password'
									defaultValue={'AArif12!'}
									{...register("password", { maxLength: 20, required: true })}
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

							{message && (
								<p className='text-sm text-red-500 font-medium mb-2'>
									{message}
								</p>
							)}

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
										"Login"
									)}
								</button>
							</div>
						</form>
						<br />
						<p className='flex justify-end my-2 gap-1'>
							Your don't have account.?
							<Link to={"/auth/register"} className='underline text-teal-500'>
								register
							</Link>
						</p>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default Login;
