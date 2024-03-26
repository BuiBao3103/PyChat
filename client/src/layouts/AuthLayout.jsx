import React from 'react'
import { Outlet, json, redirect } from 'react-router-dom'
import { LoginImg } from '../assets'
import Axios from '../api/index'
const AuthLayout = () => {
	return (
		<div className='text-black w-full h-screen bg-[#efeff1]'>
			<div className="w-full h-full flex justify-center items-center p-10">
				<div className="w-[1100px] h-[760px] bg-white rounded-2xl flex overflow-hidden shadow-lg">
					<div className="w-full lg:w-1/2 h-full">
						<Outlet />
					</div>
					<div className="hidden lg:block w-1/2 h-full">
						<img src={LoginImg} alt="" className='w-full h-full object-cover' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthLayout

export const action = async ({ request }) => {
	const data = await request.formData();
	const action = request.url.includes("login") ? "login" : "signup"
	console.log(action)
	let userInformaiton = {}
	if (action === "login") {
		userInformaiton.email = data.get("email")
		userInformaiton.password = data.get("password")
		console.log(userInformaiton)
	} else {
		userInformaiton.firstName = data.get("firstName")
		userInformaiton.lastName = data.get("lastName")
		userInformaiton.email = data.get("email")
		userInformaiton.password = data.get("password")
		console.log(userInformaiton)
	}
	const response = await Axios.post("/api/v1/users/login", userInformaiton)
	console.log(response)
	if (response.status === 400 || response.status === 401) {
		return response
	}
	if (!response.ok) {
		throw json(
			{
				message: "There has been an internal server error. We'll try to fix it ASAP...",
			},
			{
				status: 500,
			}
		)
	}
	const resData = await response.json();
	const token = resData.token;
	const user = resData.user;
	sessionStorage.setItem("user", JSON.stringify(user))
	sessionStorage.setItem("token", token)
	console.log(response)
	return redirect("/")
}