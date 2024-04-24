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
							<Message message={item} key={index} />
						))}
					</div>
				</div>
			</div>
			<MessageInput scroll={messageEnd} />
		</>
	);
};

export default Messages