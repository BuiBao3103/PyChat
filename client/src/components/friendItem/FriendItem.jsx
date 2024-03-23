import React from 'react'
import PropTypes from 'prop-types'

const FriendItem = ({ className }) => {
	return (
		<div className={`${className} p-3 flex flex-col gap-3 justify-center items-center bg-white rounded-lg`}>
			<div className="size-36 overflow-hidden rounded-full">
				<img loading='lazy' src="https://source.unsplash.com/random/300x300" alt="" className='w-full h-full object-cover object-center' />
			</div>
			<span>Friend name</span>
		</div>
	)
}

FriendItem.propTypes = {
	className: PropTypes.string
}

export default FriendItem