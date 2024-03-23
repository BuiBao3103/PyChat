import React from 'react'

const FriendItem = () => {
	return (
		<div className='w-full h-full p-3 flex flex-col gap-3 justify-center items-center bg-white border rounded-lg hover:border-[#666666] hover:shadow-lg transition-all'>
			<div className="size-40 overflow-hidden rounded-full">
				<img loading='lazy' src="https://source.unsplash.com/random/300x300" alt="" className='w-full h-full object-cover object-center' />
			</div>
			<span>Friend name</span>
		</div>
	)
}

export default FriendItem