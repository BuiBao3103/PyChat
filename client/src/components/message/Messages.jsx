import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'
import MessageInput from './MessageInput';

const Messages = ({ msgConversation }) => {
	const [messages, setMessages] = useState([]);
	const { socket } = useSocketContext();
	const { selectedConversation } = useConversation();
	const messageEnd = useRef();

	useEffect(() => {
		setMessages(msgConversation);
		setTimeout(() => {
			scrollToBottom();
		}, 200);
		return () => {
		}
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
	}, [socket]);
	const scrollToBottom = () => {
		messageEnd.current.scrollIntoView({ behavior: "smooth" });
	};
	console.log(messageEnd);
	return (
		<>
			<div className='w-full h-full overflow-auto flex flex-col gap-2'>
				<h1 className='w-full pb-2 text-lg dark:text-white dark:border-ebony-clay h-fit bg-light-gray p-2 rounded-md font-medium shadow-md'>{selectedConversation.friend.username}</h1>
				<div className="w-full h-full flex items-end overflow-y-hidden">
					<div className="w-full h-full flex flex-col overflow-y-scroll">
						{messages.slice().reverse().map((item, index) => (
							<div key={index}>
								<Message message={item} />
							</div>
						))}
						<div className='messageEnd' ref={messageEnd}></div> {/* This empty div will always be at the end of your messages list */}
					</div>
				</div>
			</div>
			<MessageInput scroll={messageEnd} />
		</>
	);
};

export default Messages