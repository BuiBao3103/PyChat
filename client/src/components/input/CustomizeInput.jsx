import React from 'react'
import { PiMagnifyingGlass } from "react-icons/pi";

const CustomizeInput = ({ placeholder, onChange }) => {
	return (
		<div className='w-full h-full relative flex items-center gap-1 border px-2 py-2 rounded-lg transition-all hover:border-primary group'>
			<PiMagnifyingGlass size={28} className='text-[#c6c7ca] group-hover:text-primary' />
			<input
				id='searchQuery'
				name='searchQuery'
				type="text"
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
				className='w-full h-full outline-none placeholder:text-[#c6c7ca] dark:bg-primary-dark dark:text-white group-hover:placeholder:text-primary' />
		</div>
	)
}

export default CustomizeInput