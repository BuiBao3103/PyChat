import React from 'react'
import Message from './Message'

const Messages = () => {
	return (
		<div className='w-full h-full overflow-auto'>
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
		</div>
	)
}

export default Messages