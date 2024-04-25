import React, { useEffect, useState } from 'react'
import { PiNotePencil } from "react-icons/pi";
import { Link, Outlet, useActionData, useLoaderData, useLocation } from 'react-router-dom';
import NewConversation from '../NewConversation'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../hooks/useAuthContext';
import Axios from '../../api/index'
import Conversations from '../../components/message/Conversations';
import { useSocketContext } from '../../context/SocketContext';
const Index = () => {

	const location = useLocation()
	const { selectedConversation, loadConversation } = useConversation()
	const conversationsLoader = useLoaderData()
	const [conversations, setConversations] = useState(conversationsLoader)
	useEffect(() => {
		setConversations(conversationsLoader)
	}, [])
	useEffect(() => {
		const loadLastMessage = async () => {
			const res = await Axios.get(`/api/v1/users/me/conversations`)
			if (res.status === 200) {
				setConversations(res.data.data)
			}
		}
		loadLastMessage()
	}, [loadConversation])
	return (
		<div className='w-full h-full flex gap-3'>
			<div className="w-[320px] max-w-[400px] min-w-[320px] h-full bg-white dark:bg-primary-dark rounded-xl flex flex-col">
				<div className="w-full h-[120px] flex flex-col gap-3 p-3">
					<div className="w-full flex justify-between items-center gap-2">
						<span className='font-bold text-2xl dark:text-white'>Chat</span>
						{/* <Link to={"/conversation/to"}>
							<PiNotePencil size={35} className=' dark:text-white cursor-pointer' />
						</Link> */}
					</div>
					<div className="w-full flex gap-2">
						<input type="search" className='bg-light-gray dark:bg-[#282930] dark:text-white dark:focus:outline-white rounded-md px-3 py-2 w-full focus:outline-primary' placeholder='Search by name' />
					</div>
				</div>
				<Conversations conversationsUser={conversations} />
			</div>
			{
				location.pathname.includes("to") ? <NewConversation /> :
					(
						<>
							<div className="w-full h-full rounded-xl flex flex-col">
								{
									selectedConversation == null ? (
										<NoChatSelected />
									) : (
										<Outlet />
									)
								}
							</div>
						</>
					)
			}
		</div>
	)
}

const NoChatSelected = () => {
	const [state, dispatch] = useAuthContext()
	return (
		<div className='flex items-center justify-center w-full h-full bg-white rounded-xl'>
			<div className='px-4 text-center sm:text-lg md:text-3xl text-black dark:text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {JSON.parse(localStorage.getItem("user"))?.username} ❄</p>
				<p>Select a chat to start messaging</p>
				{/* <TiMessages className='text-3xl md:text-6xl text-center' /> */}
			</div>
		</div>
	);
};

export const getChatBriefs = async ({ }) => {
	return (await Axios.get(`/api/v1/users/me/conversations`)).data.data
}

export default Index