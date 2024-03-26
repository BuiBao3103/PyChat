import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import SocialMediaButton from '../../components/button/SocialMediaButton';
import { Link, Form } from 'react-router-dom';
import { toast } from 'react-toastify';
const Index = () => {

	const logWithApp = [
		{
			name: "Google",
			icon: FcGoogle,
		},
		{
			name: "Facebook",
			icon: FaFacebook,
			color: "#0866ff"
		},
		{
			name: "Instagram",
			icon: FaInstagram,
			color: "#ff3d43"
		}
	]

	return (
		<div className='w-full md:px-10 md:py-20 p-10 h-full'>
			<header className="w-full flex flex-col justify-center items-center gap-px">
				<h1	className="text-6xl font-oleo-script-regular">
					Welcome back
				</h1>
				<h4 className='text-base'>Chat, share and do more.</h4>
			</header>
			<main className='mt-8'>
				<Form className='space-y-5' method='POST'>
					<div>
						<label htmlFor="email" className="block font-medium leading-6 text-gray-900">Email</label>
						<div className="mt-2">
							<input
								id="email"
								name="email" placeholder='Enter your email'
								type="email"
								autoComplete="email" required
								className="block w-full rounded-md p-3 border focus:outline-primary" />
						</div>
					</div>
					<div>
						<label htmlFor="password" className="block font-medium leading-6 text-gray-900">Password</label>
						<div className="mt-2">
							<input
								id="password"
								name="password" placeholder='Enter your password'
								type="password"
								autoComplete="password" required
								className="block w-full rounded-md p-3 border focus:outline-primary" />
						</div>
					</div>
					<div className="w-full flex justify-between items-center">
						<div className="flex gap-2 items-center">
							<label htmlFor="remember-me" className='order-1 font-medium'>Remember me</label>
							<input id='remember-me' type="checkbox" className='w-5 h-5' />
						</div>
						<button type="button">
							<span className='hover:underline text-primary font-medium'>Forgot password?</span>
						</button>
					</div>
					<button className='w-full border border-primary py-3 rounded-lg bg-primary transition-all hover:bg-transparent group' type="submit">
						<span className='font-medium text-white group-hover:text-primary'>Sign in</span>
					</button>
				</Form>
				<div className="space-y-3 md:space-y-6 mt-5">
					<div className="w-full flex justify-center items-center">
						<span className='h-px w-full bg-gray-400'></span>
						<span className='w-72 text-center text-base'>Or sign in with</span>
						<span className='h-px w-full bg-gray-400'></span>
					</div>
					<div className="w-full flex justify-between flex-col md:flex-row lg:gap-0 gap-3">
						{
							logWithApp.map((item, index) => (
								<SocialMediaButton key={index} name={item.name} Icon={item.icon} color={item.color} />
							))
						}
					</div>
				</div>
			</main>
			<footer className='w-full text-center mt-3 md:mt-6 font-medium'>
				<p>
					Don't have account?
					<Link to={"/auth/signup"}>
						<span className='text-primary hover:underline'> Register now</span>
					</Link>
				</p>
			</footer>
		</div>
	)
}

export default Index