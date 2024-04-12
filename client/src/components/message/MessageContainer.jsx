import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import MessageDetail from './MessageDetail'
import { useAuthContext } from '../../hooks/useAuthContext'
import useConversation from '../../zustand/useConversation'
import { useLoaderData } from 'react-router-dom'
import { useSocketContext } from '../../context/SocketContext'

const MessageContainer = () => {

	const { setSelectedConversation, setMessages, messages } = useConversation()
	const { socket } = useSocketContext()
	const loader = useLoaderData()
	
	useEffect(() => {
		setMessages(loader)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);
	// console.log(loader)
	useEffect(() => {
		socket.on('message', (data) => {
		})
	}, [messages])


	return (
		<div className='w-full h-full flex flex-row gap-3'>
			<div className="w-full flex flex-col gap-2 bg-white p-3 rounded-xl">
				<Messages messages={messages} />
				<MessageInput />
			</div>
			<MessageDetail />
		</div>
	)
}


export default MessageContainer