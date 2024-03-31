import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { useAuthContext } from '../../hooks/useAuthContext'

const MessageContainer = () => {

	return (
		<div className='w-full h-full flex flex-col gap-4'>
			<h1 className='w-full border-b border-black pb-2 text-lg dark:text-white dark:border-ebony-clay'>Name</h1>
			<Messages />
			<MessageInput />
		</div>
	)
}

export default MessageContainer