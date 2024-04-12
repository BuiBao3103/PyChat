import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTIme'
const Message = ({ message }) => {

	const [state, dispatch] = useAuthContext()
	const { selectedConversation } = useConversation()
	const formattedTime = extractTime(message.time)
	const fromMe = message.user_id === state.user.id
	const username = message.user_id === selectedConversation.friend.id

	return (
		<div className={`chat ${fromMe ? 'chat-end' : 'chat-start'}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img src="https://images.unsplash.com/photo-1711124478481-09eb00111938?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
				</div>
			</div>
			<div className="chat-header flex gap-1">
				<h1 className=''>{username ? selectedConversation.friend.username : state.user.username}</h1>
				<time className="text-xs flex items-center">{formattedTime}</time>
			</div>
			<div className={`chat-bubble w-fit rounded-md text-white ${fromMe ? "bg-primary" : "bg-gray-700"} text-right`}>{message.message}</div>
		</div>
	)
}

export default Message