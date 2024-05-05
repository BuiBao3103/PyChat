import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'
import MessageInput from './MessageInput';
import Axios from '../../api/index'
import { useParams } from 'react-router-dom';
const Messages = ({ msgConversation, selectedFiles }) => {
	const [messages, setMessages] = useState([]);
	const { socket } = useSocketContext();
	const { selectedConversation } = useConversation();
	const [loading, setLoading] = useState(false)
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
		};
		socket.on('message', handleNewMessage);
		return () => {
			socket.off('message', handleNewMessage);
		};
	}, [socket, loading]);
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
		console.log('reload')
	}, [])
	console.log(loading)
	useEffect(() => {
		scrollToBottom()
	}, [messages])
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
			<MessageInput scroll={messageEnd} selectedImageFiles={selectedFiles} />
		</>
	);
};

export default Messages