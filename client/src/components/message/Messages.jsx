import React, { useEffect } from 'react'
import Message from './Message'
import useConversation from '../../zustand/useConversation'

const Messages = ({ messages }) => {
	console.log(messages)
	const { selectedConversation } = useConversation()


	return (
		<div className='w-full h-full overflow-auto flex flex-col'>
			<h1 className='w-full border-b border-black pb-2 text-lg dark:text-white dark:border-ebony-clay h-[30px]'>{selectedConversation.friend.username}</h1>
			<div className="w-full h-full flex flex-col justify-end">
				{messages.slice().reverse().map((item, index) => (
					<Message message={item} key={index} />
				))}
				{/* <Message />
				<Message />
				<Message />
				<Message />
				<Message /> */}
			</div>
		</div>
	)
}

export default Messages