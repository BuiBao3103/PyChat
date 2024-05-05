import React, { useEffect, useState } from 'react'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTIme'
import { PiDotsThreeCircle } from "react-icons/pi";
import Axios from '../../api/index'
import DeleteModalConfirm from '../modal/DeleteMessageConfirm'
import { useSocketContext } from '../../context/SocketContext';
const Message = ({ message, reloadMessage }) => {

	const { selectedConversation, setIsOpenCarosuel, setSelectedImage } = useConversation()
	const [msg, setMsg] = useState(message)
	const [type, setType] = useState("")
	const formattedTime = extractTime(msg.time)
	const fromMe = msg.user_id === JSON.parse(localStorage.getItem('user')).id
	const [isVisibleMenu, setIsVisibleMenu] = useState(false)
	function handleVisibleMenu() {
		setIsVisibleMenu(!isVisibleMenu)
	}
	useEffect(() => {
		setMsg(message)
	}, [message])
	const { socket } = useSocketContext();
	const handleAction = async (type = "Delete") => {
		try {
			if (type == "Delete") {
				const res = await Axios.delete(`api/v1/messages/${msg.id}`)
				if (res.status === 204) {
					setIsVisibleMenu(false)
					setType("")
					reloadMessage()
				}
			} else {
				const res = await Axios.patch(`/api/v1/messages/${msg.id}/revoke`)
				if (res.status === 200) {
					setMsg(res.data.data)
					setIsVisibleMenu(false)
					setType("")
				}
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsVisibleMenu(false)
			setType("")
		}
	}
	return (
		<>
			{msg.deleted_messages.length === 0 && (
				<div className={`chat ${fromMe ? 'chat-end' : 'chat-start'} relative group`}>
					<div className="chat-image avatar">
						<div className="w-10 rounded-full">
							<img src={fromMe ? JSON.parse(localStorage.getItem('user')).avatar : selectedConversation.friend.avatar} alt="" />
						</div>
					</div>
					<div className="chat-header flex gap-1">
						<h1>{fromMe ? JSON.parse(localStorage.getItem('user')).username : selectedConversation.friend.username}</h1>
						<time className="text-xs flex items-center">{formattedTime}</time>
					</div>
					<div className={`chat-bubble w-fit rounded-md text-white max-h-full ${fromMe ? "bg-primary" : "bg-gray-700"} text-right relative ${msg.type != "text" && "flex gap-1"}`}>
						{
							msg.revoke_at != null && (
								<span className="text-white">You unsent a message</span>
							)
						}
						{msg.revoke_at == null && msg.type === 'text' ? (
							<span>{msg.message}</span>
						) : (
							msg.revoke_at == null && msg.attachments.map((item, index) => (
								<img
									key={index}
									src={item.url}
									onClick={() => {
										setIsOpenCarosuel(true);
										setSelectedImage(item.url);
									}}
									alt=""
									loading="lazy"
									className={`size-full ${msg.attachments.length >= 2 ? 'max-h-[350px]' : 'max-h-[350px]'} rounded-md`}
								/>
							))
						)}
						<span
							onClick={handleVisibleMenu}
							className="size-10 bg-none justify-center items-center absolute -left-10 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex transition-all cursor-pointer rounded-full hover:bg-gray-300"
						>
							<PiDotsThreeCircle size={30} className="text-black" />
						</span>
						{isVisibleMenu && (
							<div
								className={`absolute ${msg.type === 'text' ? '-top-[6.2rem]' : 'top-[15%]'} 
											-left-10 -translate-x-1/2 
											bg-white w-fit h-fit shadow-lg z-10 rounded-md`}>
								<div className={`w-fit ${msg.revoke_at == null ? 'h-24' : 'h-fit'} flex flex-col p-2`}>
									<button
										onClick={() => setType("Delete")}
										className="w-24 h-full rounded-md hover:bg-gray-200 text-black text-left px-2 py-1 font-medium"
									>
										Delete
									</button>
									{
										msg.revoke_at == null && (
											<button
												onClick={() => setType("Unsend")}
												className="w-24 h-full rounded-md hover:bg-gray-200 text-black text-left px-2 py-1 font-medium"
											>
												Unsend
											</button>
										)
									}
								</div>
							</div>
						)}
					</div>
					{/* Render DeleteModalConfirm based on type */}
					{type !== "" && (
						<DeleteModalConfirm
							handleVisibleDeleteModal={setType}
							confirmDelete={handleAction}
							type={type}
						/>
					)}
				</div >
			)}
		</>
	);

}

export default Message