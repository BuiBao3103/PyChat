import React from 'react'
import PropTypes from 'prop-types'
const ChatBrief = ({ className = '' }) => {
	return (
		<div className={`${className} w-full h-auto p-3 flex gap-2 border-b hover:bg-light-gray transition-all cursor-pointer`}>
			<div className="size-[60px] rounded-full relative">
				<img src="https://source.unsplash.com/random/300x300" alt="" className='w-full h-full object-cover object-center rounded-full' />
				<div className='size-4 border-[3px] border-white bg-primary-900 absolute bottom-0 right-0 rounded-full' />
			</div>
			<div className="flex-1 h-full flex flex-col justify-center items-center">
				<div className="w-full flex justify-between items-center">
					<span className='font-medium font-inter'>Name</span>
					<span className='text-sm text-[#ababab]'>Time</span>
				</div>
				<div className="w-full flex justify-between items-center gap-1">
					<p className={`text-sm w-[180px] truncate text-[#ababab]`}>Message hello world from python</p>
					<span className='text-sm bg-black text-white rounded-full size-[6px]' />
				</div>
			</div>
		</div>
	)
}

ChatBrief.propTypes = {
	className: PropTypes.string,
}

export default ChatBrief