import React from 'react'
import { Outlet } from 'react-router-dom'
import { LoginImg } from '../assets'

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