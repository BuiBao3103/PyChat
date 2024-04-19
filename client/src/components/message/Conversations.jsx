import React, { useCallback, useEffect, useState } from 'react'
import ChatBrief from '../chatBrief/ChatBrief'
import { useSocketContext } from '../../context/SocketContext'
import useConversation from '../../zustand/useConversation'

const Conversations = ({ conversationsUser }) => {
	const [conversations, setConversations] = useState(conversationsUser)
	const { socket } = useSocketContext()
	console.log(socket)
	useEffect(() => {
		setConversations(conversationsUser)
	}, [conversationsUser])
	// console.log(conversations)
	const joinRoom = useCallback((conversationID) => {
		console.log(conversationID)
		socket.emit('join', { channel_id: conversationID })
	}, [])

	const leaveRoom = useCallback((conversationID) => {
		socket.emit('leave', { channel_id: conversationID })
	}, [])
	return (
		<div className="w-full h-full flex flex-col overflow-y-scroll pb-3 scrollChatConversions">
			{
				conversations.map((item, index) => (
					<ChatBrief key={index} className='first:border-t' currentConversation={item} joinRoom={joinRoom} leaveRoom={leaveRoom} />
				))
			}
		</div>
	)
}

export default Conversations