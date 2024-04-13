import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Messages = ({ msgConversation }) => {
	console.log(msgConversation)
	const [messages, setMessages] = useState([])
	const { socket } = useSocketContext()
	const { selectedConversation } = useConversation()
	const messageEnd = useRef()
	useEffect(() => {
		setMessages(msgConversation)
		setTimeout(() => {
			messageEnd.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [msgConversation])
	useEffect(() => {
		socket.on('message', (data) => {
			setMessages(oldMsg => [data, ...oldMsg])
			scrollToBottom()
		})
	}, [socket])

	const scrollToBottom = () => {
		messageEnd.current.scrollIntoView({ behavior: "smooth" });
	}
	return (
		<div className='w-full h-full overflow-auto flex flex-col gap-2'>
			<h1 className='w-full pb-2 text-lg dark:text-white dark:border-ebony-clay h-fit bg-light-gray p-2 rounded-md font-medium shadow-md'>{selectedConversation.friend.username}</h1>
			<div className="w-full h-full flex flex-col overflow-y-scroll">
				{messages.slice().reverse().map((item, index) => (
					<div key={index} ref={messageEnd}>
						<Message message={item} />
					</div>
				))}
				\
			</div>
		</div>
	)
}

export default Messages