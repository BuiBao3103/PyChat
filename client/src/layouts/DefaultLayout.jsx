import React from 'react'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
	return (
		<div className='w-full h-full p-3 bg-light-gray flex gap-3'>
			<SideBar />
			<Outlet />
		</div>
	)
}

export default DefaultLayout