import React from 'react'
import PropTypes from 'prop-types'

const FriendItem = ({ className, friend }) => {

	//create a async function to handle the request unfriend cancel accept, cancel request
	const handleRequest = async (type) => {
		let url = ''
		if (type === 'friends') {
			url = `/api/v1/friendships/${friend.friend.id}`
		} else if (type === 'request_received') {
			url = `/api/v1/friendships/accept`
		} else if (type === 'request_sent') {
			url = `/api/v1/friendships/request`
		}
	}


	return (
		<div className={`${className} p-3 flex flex-col gap-3 justify-center items-center bg-white rounded-lg`}>
			<div className="size-36 overflow-hidden rounded-full border-2 border-gray-100">
				<img loading='lazy' src={friend.friend.avatar} alt="" className='w-full h-full object-cover object-center' />
			</div>
			<div className="flex flex-col items-center">
				<span className='font-semibold'>{friend.friend.username}</span>
				<span className='text-gray-500'>{friend.friend.email}</span>
			</div>
			<div className="w-full flex gap-2">
				{/* //create one button with unfriend when friend.status == 'friends' */}
				{
					friend.status === 'friends' && (
						<button className='w-full bg-primary text-white py-2 rounded-lg font-medium'>Unfriend</button>
					)
				}
				{/* //create two button with Cancel and Accept when friend.status == 'request_received' */}
				{
					friend.status === 'request_received' && (
						<>
							<button className='w-full border-2 text-gray-700 py-2 rounded-lg font-medium'>Cancel</button>
							<button className='w-full bg-primary text-white py-2 rounded-lg font-medium'>Accept</button>
						</>
					)
				}
				{/* //create one button with Remove when friend.status == 'request_sent' */}
				{
					friend.status === 'request_sent' && (
						<button className='w-full bg-primary text-white py-2 rounded-lg font-medium'>Cancel Request</button>
					)
				}
			</div>
		</div>
	)
}

FriendItem.propTypes = {
	className: PropTypes.string
}

export default FriendItem