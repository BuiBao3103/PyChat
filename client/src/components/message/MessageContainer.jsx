import React from 'react'
import Messages from './Messages'

const MessageContainer = () => {
	return (
		<div className='w-full h-full flex flex-col gap-4'>
			<h1 className='w-full border-b border-black pb-2 text-lg dark:text-white dark:border-ebony-clay'>Name</h1>
			<Messages />
		</div>
	)
}

export default MessageContainer