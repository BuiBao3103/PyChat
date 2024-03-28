import React from 'react'

const SearchItem = () => {
	return (
		<div className='w-full p-5 bg-[#f0f0f0] dark:bg-[#3a3b3c] flex justify-between items-center rounded-lg shadow-md'>
			<div className="w-full flex items-center gap-4">
				<div className="w-[85px] h-[85px] rounded-full overflow-hidden">
					<img loading='lazy' src="https://source.unsplash.com/random" alt="" className='w-full h-full object-cover object-center' />
				</div>
				<h1 className='dark:text-white'>Name</h1>
			</div>
			<button className='w-auto px-3 py-2 bg-primary-700 dark:bg-primary hover:bg-primary-900 rounded-md'>
				<span className='text-white text-sm font-medium whitespace-nowrap'>Add Friend</span>
			</button>
		</div>
	)
}

export default SearchItem