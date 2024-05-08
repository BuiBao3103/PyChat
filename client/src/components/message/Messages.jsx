import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'
import MessageInput from './MessageInput';
import Axios from '../../api/index'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const Messages = ({ msgConversation, selectedFiles }) => {
	const [messages, setMessages] = useState([]);
	const { socket } = useSocketContext();
	const [status, setStatus] = useState('')
	const { selectedConversation, setLoadConversations, loadingCheckBlock,setLoadingCheckBlock } = useConversation();
	const messageEnd = useRef();
	const params = useParams()
	useEffect(() => {
		setMessages(msgConversation);
		setTimeout(() => {
			scrollToBottom();
		}, 200);
	}, [msgConversation]);

	useEffect(() => {
		const handleNewMessage = (data) => {
			setMessages(oldMsg => [data, ...oldMsg]);
			scrollToBottom(); // Scroll to bottom after updating messages
			setLoadConversations(true)
			setTimeout(() => {
				setLoadConversations(false);
			}, 500);
		};
		socket.on('message', handleNewMessage);
		return () => {
			socket.off('message', handleNewMessage);
		};
	}, [socket]);
	const scrollToBottom = () => {
		messageEnd.current.scrollIntoView({ behavior: "smooth" });
	};
	const reloadMessage = async () => {
		const res = await Axios.get(`/api/v1/conversations/${params.conversationID}/messages?sort_by=-time`)
		if (res.status === 200) {
			setMessages(res.data.data)
		}
	}
	useEffect(() => {
		reloadMessage()
	}, [])
	useEffect(() => {
		scrollToBottom()
	}, [messages])
	
	const handelUnblock = async () => {
		try {
			const userID = JSON.parse(localStorage.getItem('user')).id;
			const friendID = selectedConversation.friend.id
		
			const res = await Axios.delete('/api/v1/friendships/block', { data: { userID, friendID } });
			console.log(res)
			if (res.status === 204) {
				setStatus('')
				toast.success('Unblocked successfully')
				setLoadingCheckBlock([false, ''])
			}
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		reloadMessage()
	}, [loadingCheckBlock[0]])
	return (
		<>
			<div className='w-full h-full overflow-hidden flex flex-col gap-2 relative first:!mt-auto'>
				<h1 className='w-full absolute pb-2 z-10 text-lg dark:text-white dark:border-ebony-clay h-fit bg-light-gray p-2 rounded-md font-medium shadow-md'>{selectedConversation.friend.username}</h1>
				<div className="w-full h-full pt-12">
					<div className="w-full h-full overflow-y-auto flex flex-col-reverse">
						<div className='messageEnd' style={{ float: "left", clear: "both" }} ref={messageEnd}></div> {/* This empty div will always be at the end of your messages list */}
						{messages.map((item, index) => (
							<Message message={item} key={index} reloadMessage={reloadMessage} />
						))}
					</div>
				</div>
			</div>
			{
				loadingCheckBlock[1] == 'blocked' || loadingCheckBlock[1] == 'be_blocked' ? (
					<div className='w-full h-fit flex flex-col justify-center items-center gap-2 border-t py-2'>
						{
							loadingCheckBlock[1] == 'blocked' ? (
								<span className='text-black font-medium'>You have blocked this user</span>
							) : (
								<span className='text-black font-medium inline-block pt-2'>This user has blocked you</span>
							)
						}
						{
							loadingCheckBlock[1] == 'blocked' && (
								<button onClick={handelUnblock} className='w-full h-fit text-center bg-primary rounded-md p-2 font-medium text-white hover:opacity-75 transition-opacity'>Unblock</button>
							)
						}
					</div>
				) : (
					<MessageInput scroll={messageEnd} selectedImageFiles={selectedFiles} />
				)
			}
		</>
	);
};

export default Messages