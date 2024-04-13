import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Messages = ({ msgConversation }) => {
	console.log(msgConversation)
	const [messages, setMessages] = useState([])
	const { socket } = useSocketContext()
	const { selectedConversation } = useConversation()
	useEffect(() => {
		setMessages(msgConversation)
	}, [msgConversation])
	// useEffect(() =. )
	useEffect(() => {
		socket.on('message', (data) => {
			setMessages(oldMsg => [data, ...oldMsg])

		})
	}, [socket])
	console.log(messages.slice().reverse())
	return (
		<div className='w-full h-full overflow-auto flex flex-col'>
			<h1 className='w-full border-b border-black pb-2 text-lg dark:text-white dark:border-ebony-clay h-[30px]'>{selectedConversation.friend.username}</h1>
			<div className="w-full h-full flex flex-col justify-end overflow-y-scroll">
				{messages.slice().reverse().map((item, index) => (
					<Message message={item} key={index} />
				))}
			</div>
		</div>
	)
}

export default Messages