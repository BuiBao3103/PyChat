import React, { useState } from 'react'
import { PiPaperPlaneTiltBold } from 'react-icons/pi'
import { useSocketContext } from '../../context/SocketContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import useConversation from '../../zustand/useConversation'
const MessageInput = () => {
	const [state, dispatch] = useAuthContext()
	const { selectedConversation } = useConversation()
	const [message, setMessage] = useState('')
	const { socket } = useSocketContext()
	const handleSendMessage = (e) => {
		e.preventDefault();
		const messageInput = message.trim()
		if (messageInput !== '') {
			socket.emit('message', {
				user_id: state.user.id,
				channel_id: selectedConversation.id,
				message: messageInput,
				time: Date.now(),
				type: 'text'
			})
			setMessage('')
		}
	}

	return (
		<form className="w-full h-16 flex items-center gap-3" onSubmit={handleSendMessage}>
			{/* <span className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
				<PiMicrophoneBold size={22} className='text-white size-full' />
			</span> */}
			<input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='w-full bg-light-gray dark:bg-[#282930] h-12 rounded-md px-3 focus:outline-primary' placeholder='Type your message' />
			<button type='submit' className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
				<PiPaperPlaneTiltBold size={22} className='text-white size-full' />
			</button>
		</form>
	)
}

export default MessageInput