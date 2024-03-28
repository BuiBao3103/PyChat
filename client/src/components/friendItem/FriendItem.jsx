import React from 'react'
import PropTypes from 'prop-types'

const FriendItem = ({ className, friend }) => {
	return (
		<div className={`${className} p-3 flex flex-col gap-3 justify-center items-center bg-white rounded-lg`}>
			<div className="size-36 overflow-hidden rounded-full">
				<img loading='lazy' src={"https://source.unsplash.com/random"} alt="" className='w-full h-full object-cover object-center' />
			</div>
			<span className='font-semibold'>{friend.username}</span>
		</div>
	)
}

FriendItem.propTypes = {
	className: PropTypes.string
}

export default FriendItem