import React, { useEffect, useState } from 'react'
import Axios from '../../api/index'
import { useNavigate } from 'react-router-dom'
import useConversation from '../../zustand/useConversation'
import { formatMessageTime } from '../../utils/extractTIme'
import { useSocketContext } from '../../context/SocketContext'
const ChatBrief = ({ className = '', currentConversation, joinRoom, leaveRoom }) => {
	const navigate = useNavigate()
	const [conversation, setConversation] = useState(currentConversation)
	useEffect(() => {
		setConversation(currentConversation)
	}, [])
	const { setSelectedConversation, selectedConversation, setLoadingCheckBlock } = useConversation()
	const [loading, setLoading] = useState(false)
	const { socket } = useSocketContext()
	const leaveRoomWithID = (conversation) => {
		if (conversation != null) {
			leaveRoom(conversation.id)
		} else {
			console.log("No conversation")
		}
	}
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
				setLoadingCheckBlock([false, res.data.data[0].status])
			}
		} catch (error) {
			console.log(error)
			setLoadingCheckBlock([false, ''])
		}
	}
	const isUserSeen = () => {
		if (conversation.seen_at == null) {
			socket.emit("seen", {
				conversation_id: conversation.id,
				user_id: JSON.parse(localStorage.getItem('user')).id
			})
			setConversation({ ...conversation, seen_at: new Date() })
		}
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 500);
	}
	return (
		<div
			onClick={() => {
				navigate(`/conversation/${conversation.id}`)
				leaveRoomWithID(selectedConversation)
				joinRoom(conversation.id)
				setSelectedConversation(conversation)
				getFriendship()
				isUserSeen()
			}}
			className={`${className}  w-full h-auto p-3 flex gap-2 border-b dark:border-ebony-clay hover:bg-light-gray dark:hover:bg-white/30 transition-all cursor-pointer`}
		>
			<div className="size-[60px] rounded-full relative">
				<img
					src={conversation.friend.avatar}
					alt=""
					className="w-full h-full object-cover object-center rounded-full"
				/>
				<div
					className={`size-4 border-[3px] border-white absolute bottom-0 right-0 rounded-full ${conversation.friend.last_online == null ? "bg-primary-900" : "hidden"
						}`}
				/>
			</div>
			<div className="flex-1 h-full flex flex-col justify-center items-center">
				<div className="w-full flex justify-between items-center">
					<span className="font-medium font-inter dark:text-white">{conversation.friend.username}</span>
					<span className="text-sm text-[#8d8d8d]">
						{conversation.last_message && formatMessageTime(new Date(conversation.last_message.time))}
					</span>
				</div>
				<div className="w-full flex justify-between items-center gap-1">
					<p className={`text-sm w-[200px] truncate text-[#8d8d8d]`}>
						{
							conversation.last_message
							&& conversation.last_message.type == "text"
							&& isUserSend()
							&& conversation.last_message?.revoke_at == null
							&& conversation.last_message?.deleted_messages.length == 0
							&& `${userSend()}${conversation.last_message.message}`
						}
						{
							conversation.last_message
							&& conversation.last_message.type == "text"
							&& !isUserSend() && conversation.last_message?.deleted_messages.length == 0
							&& conversation.last_message?.revoke_at == null
							&& `${conversation.last_message.message}`
						}
						{
							conversation.last_message && conversation.last_message.type == "image"
							&& isUserSend() && conversation.last_message?.revoke_at == null
							&& conversation.last_message?.deleted_messages.length == 0
							&& `You sent ${conversation.last_message.attachments.length != 1 ? `${conversation.last_message.attachments.length} photos` : 'a photo'}.`
						}
						{
							conversation.last_message && conversation.last_message.type == "image"
							&& !isUserSend() && conversation.last_message?.revoke_at == null
							&& conversation.last_message?.deleted_messages.length == 0
							&& `${conversation.friend.username} sent ${conversation.last_message.attachments.length != 1 ? `${conversation.last_message.attachments.length} photos` : 'a photo'}.`
						}
						{
							conversation.last_message && conversation.last_message?.revoke_at != null
							&& conversation.last_message?.deleted_messages.length == 0
							&& "Message has been revoked."
						}
						{
							conversation.last_message && conversation.last_message?.revoke_at == null
							&& conversation.last_message?.deleted_messages.length != 0
							&& "Message has been deleted."
						}
					</p>
					{
						conversation.seen_at == null && (
							<span className='size-3 rounded-full bg-primary'></span>
						)
					}
				</div>
			</div>
		</div>
	);
}

export default ChatBrief