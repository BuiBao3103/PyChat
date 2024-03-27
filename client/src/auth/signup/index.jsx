import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import SocialMediaButton from '../../components/button/SocialMediaButton'
import { Link, Form } from 'react-router-dom'

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
		<div className="w-full md:px-10 md:py-20 px-10 py-5 h-full">
			<header className="w-full flex flex-col justify-center items-center gap-px">
				<h1 className="text-6xl font-oleo-script-regular">
					Are you new here?
				</h1>
				<h4 className='text-base'>Be part of something great, join us!</h4>
			</header>
			<main className='mt-4 md:mt-8'>
				<Form className='space-y-3 md:space-y-5' method='POST'>
					<div className="w-full flex justify-between gap-4">
						<div className='w-full'>
							<label htmlFor="firstName" className="block font-medium leading-6 text-gray-900">First Name</label>
							<div className="mt-2">
								<input
									id="firstName"
									name="firstName" placeholder='Enter your first name'
									type="text"
									autoComplete="firstName" required
									className="block w-full rounded-md p-3 border focus:outline-primary" />
							</div>
						</div>
						<span className='w-px bg-gray-400 py-1'></span>
						<div className='w-full'>
							<label htmlFor="lastName" className="block font-medium leading-6 text-gray-900">Last Name</label>
							<div className="mt-2">
								<input
									id="lastName"
									name="lastName" placeholder='Enter your last name'
									type="text"
									autoComplete="lastName" required
									className="block w-full rounded-md p-3 border focus:outline-primary" />
							</div>
						</div>
					</div>
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
					<button className='w-full border border-primary py-3 rounded-lg bg-primary transition-all hover:bg-transparent group block' type="submit">
						<span className='font-medium text-white group-hover:text-primary'>Sign up</span>
					</button>
				</Form>
				<div className="space-y-3 md:space-y-6 mt-5">
					<div className="w-full flex justify-center items-center">
						<span className='h-px w-full bg-gray-400'></span>
						<span className='w-72 text-center text-base'>Or sign up with</span>
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
					<Link to={"/login"}>
						<span className='text-primary hover:underline'> Login now</span>
					</Link>
				</p>
			</footer>
		</div>
	)
}

export default Index