import React from 'react'
import { Outlet, redirect, useActionData } from 'react-router-dom'
import { LoginImg } from '../assets'
import Axios from '../api/index'
import { customToast } from "../utils/customToast";
import { toast } from 'react-toastify';
const AuthLayout = () => {

	return (
		<div className='text-black w-full h-screen bg-[#efeff1]'>
			<div className="w-full h-full flex justify-center items-center p-[2%] md:p-[5%] lg:p-[10%]">
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
		if (userInformaiton.firstName.trim() === "") {
			return {
				emptyField: "This field is required"
			}
		}
		if (userInformaiton.lastName.trim() === "") {
			return {
				emptyField: "This field is required"
			}
		}
		console.log(userInformaiton)
	}
	// if (userInformaiton.password.length < 8) {
	// 	return {
	// 		invalidPassword: "Password length must be greater than 8 characters"
	// 	}
	// }
	let response
	try {
		if (action === 'login') {
			response = await Axios.post("/api/v1/users/login", userInformaiton)
		} else {
			response = await Axios.post("/api/v1/users/register", userInformaiton)
		}
	} catch (error) {
		console.log(error)
		if (error.response.data.message.includes("Invalid")) {
			return {
				invalidEmailOrPassword: error.response.data.message,
			}
		}
		return {
			emailExist: error.response.data.message
		}
	}

	localStorage.setItem("auth", true)
	customToast({ type: "success", message: action === 'login' ? "Login successfully" : "Sign up successfully" })
	return redirect("/")
}