import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTIme'
const Message = ({ message }) => {

	const [state, dispatch] = useAuthContext()
	const { selectedConversation } = useConversation()
	const formattedTime = extractTime(message.time)
	const fromMe = message.user_id === JSON.parse(localStorage.getItem('user')).id

	return (
		<div className={` chat ${fromMe ? 'chat-end' : 'chat-start'}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img src={fromMe ? JSON.parse(localStorage.getItem('user')).avatar : selectedConversation.friend.avatar} alt="" />
				</div>
			</div>
			<div className="chat-header flex gap-1">
				<h1 className=''>{fromMe ? JSON.parse(localStorage.getItem('user')).username : selectedConversation.friend.username}</h1>
				<time className="text-xs flex items-center">{formattedTime}</time>
			</div>
			<div className={`chat-bubble w-fit rounded-md text-white ${fromMe ? "bg-primary" : "bg-gray-700"} text-right`}>{
				message.type == 'text' ? <span>{message.message}</span> : <img src={message.attachments} alt="" />
			}</div>
		</div>
	)
}

export default Message