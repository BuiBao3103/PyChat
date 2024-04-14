import React from 'react'
import PropTypes from 'prop-types'
import DefaultAvatar from '../../assets/defaultAvatar.jpg'
import { useNavigate } from 'react-router-dom'
import useConversation from '../../zustand/useConversation'
import { formatMessageTime } from '../../utils/extractTIme'
const ChatBrief = ({ className = '', currentConversation, joinRoom,leaveRoom }) => {
	// console.log(currentConversation)
	const navigate = useNavigate()
	const { setSelectedConversation, selectedConversation } = useConversation()
	const leaveRoomWithID = (conversation) => {
		if(conversation != null){
			leaveRoom(conversation.id)
		}else{
			console.log("No conversation")
		}
	}
	return (
		<div
			onClick={() => {
				navigate(`/conversation/${currentConversation.id}`)
				leaveRoomWithID(selectedConversation)
				joinRoom(currentConversation.id)
				setSelectedConversation(currentConversation)
			}}
			className={`${className}  w-full h-auto p-3 flex gap-2 border-b dark:border-ebony-clay hover:bg-light-gray dark:hover:bg-white/30 transition-all cursor-pointer`}>
			<div className="size-[60px] rounded-full relative">
				<img src={DefaultAvatar} alt="" className='w-full h-full object-cover object-center rounded-full' />
				<div className={`size-4 border-[3px] border-white absolute bottom-0 right-0 rounded-full ${currentConversation.friend.last_online == null ? "bg-primary-900" : "hidden"}`} />
			</div>
			<div className="flex-1 h-full flex flex-col justify-center items-center">
				<div className="w-full flex justify-between items-center">
					<span className='font-medium font-inter dark:text-white'>{currentConversation.friend.username}</span>
					<span className='text-sm text-[#8d8d8d]'>{currentConversation.last_message != null && formatMessageTime(new Date(currentConversation.last_message.time))}</span>
				</div>
				<div className="w-full flex justify-between items-center gap-1">
					<p className={`text-sm w-[180px] truncate text-[#8d8d8d]`}>{currentConversation.last_message != null ? currentConversation.last_message.message : "test"}</p>
					{/* <span className='text-sm bg-black text-white rounded-full size-[6px]' /> */}
				</div>
			</div>
		</div>
	)
}

export default ChatBrief