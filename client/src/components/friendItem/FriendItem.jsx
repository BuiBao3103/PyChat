import React from 'react'
import PropTypes from 'prop-types'

const FriendItem = ({ className, friend }) => {
	return (
		<div className={`${className} p-3 flex flex-col gap-3 justify-center items-center bg-white rounded-lg`}>
			<div className="size-36 overflow-hidden rounded-full border-2 border-gray-100">
				<img loading='lazy' src={friend.friend.avatar} alt="" className='w-full h-full object-cover object-center' />
			</div>
			<div className="flex flex-col items-center">
				<span className='font-semibold'>{friend.friend.username}</span>
				<span className='text-gray-500'>{friend.friend.email}</span>
			</div>
		</div>
	)
}

FriendItem.propTypes = {
	className: PropTypes.string
}

export default FriendItem