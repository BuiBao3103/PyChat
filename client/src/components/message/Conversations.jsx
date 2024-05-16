import React, { useCallback, useEffect, useState } from 'react'
import ChatBrief from '../chatBrief/ChatBrief'
import { useSocketContext } from '../../context/SocketContext'
import useConversation from '../../zustand/useConversation'

const Conversations = ({ conversationsUser }) => {
	const [conversations, setConversations] = useState(conversationsUser)
	const { socket } = useSocketContext()
	const { selectedConversation, loadConversation, setCountConversations } = useConversation()
	useEffect(() => {
		setConversations(conversationsUser)
		setCountConversations(conversationsUser)
	}, [])
	const joinRoom = useCallback((conversationID) => {
		console.log(conversationID)
		socket.emit('join', { channel_id: conversationID })
	}, [])

	const leaveRoom = useCallback((conversationID) => {
		socket.emit('leave', { channel_id: conversationID })
	}, [])
	const removeConversationById = (conversationID) => {
		setConversations(conversations.filter(item => item.id != conversationID))
	}
	// console.log(conversations)
	useEffect(() => {
		const handleLastMessage = (data) => {
			removeConversationById(data.id)
			setConversations(oldConv => [data, ...oldConv])
		}
		socket.on('new_conversation_coming', handleLastMessage)
		return () => {
			socket.off('new_conversation_coming', handleLastMessage)
		}
	}, [loadConversation])

	return (
		<div className="w-full h-full flex flex-col overflow-y-scroll pb-3 scrollChatConversions">
			{
				conversations.map((item, index) => (
					<ChatBrief key={index} className={`first:border-t ${selectedConversation != null && selectedConversation.id === item.id ? 'bg-light-gray' : 'bg-white'}`} currentConversation={item} joinRoom={joinRoom} leaveRoom={leaveRoom} />
				))
			}
		</div>
	)
}

export default Conversations