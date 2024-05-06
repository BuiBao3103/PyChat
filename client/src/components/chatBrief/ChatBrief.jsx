import React, { useEffect, useState } from 'react'
import Axios from '../../api/index'
import { useNavigate } from 'react-router-dom'
import useConversation from '../../zustand/useConversation'
import { formatMessageTime } from '../../utils/extractTIme'
const ChatBrief = ({ className = '', currentConversation, joinRoom, leaveRoom }) => {
	const navigate = useNavigate()
	const [conversation, setConversation] = useState(null)
	const { setLoadingCheckBlock } = useConversation()
	useEffect(() => {
		setConversation(currentConversation)
	}, [])
	const { setSelectedConversation, selectedConversation } = useConversation()
	const leaveRoomWithID = (conversation) => {
		if (conversation != null) {
			leaveRoom(conversation.id)
		} else {
			console.log("No conversation")
		}
	}
	// console.log(currentConversation)
	const userSend = () => {
		return currentConversation.last_message.user_id == JSON.parse(localStorage.getItem('user')).id ? 'You: ' : ''
	}
	const isUserSend = () => {
		return currentConversation.last_message.user_id == JSON.parse(localStorage.getItem('user')).id
	}
	const getFriendship = async () => {
		setLoadingCheckBlock([true, ''])
		try {
			const res = await Axios.get(`/api/v1/friendships?user_id=eq:${JSON.parse(localStorage.getItem('user')).id}&friend_id=eq:${currentConversation.friend.id}`)
			if (res.status === 200) {
				// setStatus(res.data.data.status)
				// console.log(res.data.data)
				setLoadingCheckBlock([false, res.data.data[0].status])
			}
		} catch (error) {
			console.log(error)
			setLoadingCheckBlock([false, ''])
		}	
	}
	return (
		<div
			onClick={() => {
				navigate(`/conversation/${currentConversation.id}`)
				leaveRoomWithID(selectedConversation)
				joinRoom(currentConversation.id)
				setSelectedConversation(currentConversation)
				getFriendship()
			}}
			className={`${className}  w-full h-auto p-3 flex gap-2 border-b dark:border-ebony-clay hover:bg-light-gray dark:hover:bg-white/30 transition-all cursor-pointer`}
		>
			<div className="size-[60px] rounded-full relative">
				<img
					src={currentConversation.friend.avatar}
					alt=""
					className="w-full h-full object-cover object-center rounded-full"
				/>
				<div
					className={`size-4 border-[3px] border-white absolute bottom-0 right-0 rounded-full ${currentConversation.friend.last_online == null ? "bg-primary-900" : "hidden"
						}`}
				/>
			</div>
			<div className="flex-1 h-full flex flex-col justify-center items-center">
				<div className="w-full flex justify-between items-center">
					<span className="font-medium font-inter dark:text-white">{currentConversation.friend.username}</span>
					<span className="text-sm text-[#8d8d8d]">
						{currentConversation.last_message && formatMessageTime(new Date(currentConversation.last_message.time))}
					</span>
				</div>
				<div className="w-full flex justify-between items-center gap-1">
					<p className={`text-sm w-[200px] truncate text-[#8d8d8d]`}>
						{
							currentConversation.last_message
							&& currentConversation.last_message.type == "text"
							&& isUserSend()
							&& currentConversation.last_message?.revoke_at == null
							&& currentConversation.last_message?.deleted_messages.length == 0
							&& `${userSend()}${currentConversation.last_message.message}`
						}
						{
							currentConversation.last_message
							&& currentConversation.last_message.type == "text"
							&& !isUserSend() && currentConversation.last_message?.deleted_messages.length == 0
							&& currentConversation.last_message?.revoke_at == null
							&& `${currentConversation.last_message.message}`
						}
						{
							currentConversation.last_message && currentConversation.last_message.type == "image"
							&& isUserSend() && currentConversation.last_message?.revoke_at == null
							&& currentConversation.last_message?.deleted_messages.length == 0
							&& `You sent ${currentConversation.last_message.attachments.length != 1 ? `${currentConversation.last_message.attachments.length} photos` : 'a photo'}.`
						}
						{
							currentConversation.last_message && currentConversation.last_message.type == "image"
							&& !isUserSend() && currentConversation.last_message?.revoke_at == null
							&& currentConversation.last_message?.deleted_messages.length == 0
							&& `${currentConversation.friend.username} sent ${currentConversation.last_message.attachments.length != 1 ? `${currentConversation.last_message.attachments.length} photos` : 'a photo'}.`
						}
						{
							currentConversation.last_message && currentConversation.last_message?.revoke_at != null
							&& currentConversation.last_message?.deleted_messages.length == 0
							&& "Message has been revoked."
						}
						{
							currentConversation.last_message && currentConversation.last_message?.revoke_at == null
							&& currentConversation.last_message?.deleted_messages.length != 0
							&& "Message has been deleted."
						}
					</p>
				</div>
			</div>
		</div>
	);
}

export default ChatBrief