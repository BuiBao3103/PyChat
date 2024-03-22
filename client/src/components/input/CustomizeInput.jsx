import React from 'react'
import { PiMagnifyingGlass } from "react-icons/pi";

const CustomizeInput = ({ placeholder }) => {
	return (
		<div className='w-full h-full relative flex items-center gap-1 border px-2 py-2 rounded-lg transition-all hover:border-primary group'>
			<PiMagnifyingGlass size={28}  className='text-[#e5e7eb] group-hover:text-primary' />
			<input id='searchQuery' name='searchQuery' type="text" placeholder={placeholder} className='w-full h-full outline-none placeholder:text-[#e5e7eb] group-hover:placeholder:text-primary' />
		</div>
	)
}

export default CustomizeInput