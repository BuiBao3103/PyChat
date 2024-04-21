import React, { useState } from 'react'
import { PiPaperPlaneTiltBold,PiImage, PiMicrophoneBold } from 'react-icons/pi'
import { useSocketContext } from '../../context/SocketContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import useConversation from '../../zustand/useConversation'
const MessageInput = ({ scroll }) => {
	const [state, dispatch] = useAuthContext()
	const { selectedConversation, setLoadConversations } = useConversation()
	const [message, setMessage] = useState('')
	const { socket } = useSocketContext()
	const sendMessage = () => {
		socket.emit('message', {
			user_id: JSON.parse(localStorage.getItem('user')).id,
			channel_id: selectedConversation.id,
			message: message,
			time: Date.now(),
			type: 'text'
		})
		setLoadConversations(true)
		setTimeout(() => {
			setLoadConversations(false)
		}, 500)
		setMessage('')
		scroll.current.scrollIntoView({ behavior: "smooth" });
	}
	const handleSendMessage = (e) => {
		if (message !== '') {
			sendMessage(message)
		}
	}
	const onEnterPress = (e) => {
		if (e.keyCode == 13 && e.shiftKey == false) {
			sendMessage(message)
		}
	}

	return (
		<div className="w-full h-16 flex items-center gap-3 relative">
			<span className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
				<PiImage size={22} className='text-white size-full' />
			</span>
			<input type="text" onKeyDown={onEnterPress} value={message} onChange={(e) => setMessage(e.target.value)} className='w-full bg-light-gray dark:bg-[#282930] h-12 rounded-md px-3 focus:outline-primary' placeholder='Type your message' />
			<button onClick={handleSendMessage} className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
				<PiPaperPlaneTiltBold size={22} className='text-white size-full' />
			</button>
		</div>
	)
}

export default MessageInput