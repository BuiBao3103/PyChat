import React, { useState } from 'react'
import { PiPaperPlaneTiltBold, PiImage, PiX } from 'react-icons/pi'
import { useSocketContext } from '../../context/SocketContext'
import useConversation from '../../zustand/useConversation'
import { toast } from 'react-toastify'
const MessageInput = ({ scroll }) => {
	const { selectedConversation, setLoadConversations } = useConversation()
	const [selectedFile, setSelectedFile] = useState(null)
	const [message, setMessage] = useState('')
	const { socket } = useSocketContext()
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && !file.type.startsWith('image/')) {
			toast.error('Please select a valid image file.');
			return;
		}
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedFile(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	console.log(selectedFile)
	const sendImage = () => {
		const imageInput = document.querySelector('#imageFile');
		console.log(imageInput.files[0])
		if (selectedFile != null) {
			socket.emit('message', {
				user_id: JSON.parse(localStorage.getItem('user')).id,
				channel_id: selectedConversation.id,
				imageData: selectedFile.split(',')[1],
				time: Date.now(),
				type: 'image',
				fileExtension: imageInput.files[0].name.split('.').pop()
			})
			setLoadConversations(true)
			setTimeout(() => {
				setLoadConversations(false)
			}, 500)
			setSelectedFile(null)
			scroll.current.scrollIntoView({ behavior: "smooth" });
		}
	}
	const sendMessage = () => {
		if (message.trim() != '') {
			socket.emit('message', {
				user_id: JSON.parse(localStorage.getItem('user')).id,
				channel_id: selectedConversation.id,
				message: message,
				time: Date.now(),
				type: 'text'
			})
			setLoadConversations(true)
			setTimeout(() => {
				setLoadConversations(false)
			}, 500)
			setMessage('')
			scroll.current.scrollIntoView({ behavior: "smooth" });
		}
	}
	const handleSendMessage = (e) => {
		if (message !== '') {
			sendMessage(message)
		}
		if (selectedFile != null) {
			sendImage()
		}
	}
	const onEnterPress = (e) => {
		if (e.keyCode == 13 && e.shiftKey == false) {
			sendMessage(message)
		}
	}

	return (
		<div className="w-full h-16 flex items-center gap-3 relative">
			{
				selectedFile != null && (
					<div className="w-full h-fit bg-light-gray absolute left-0 -top-[120px] rounded-md flex gap-2 p-2">
						<div className="size-24 relative">
							<img src={selectedFile} alt="" className='size-full rounded-md object-cover inline-block' />
							<span
								onClick={() => setSelectedFile(null)}
								className='absolute -top-2 -right-2 cursor-pointer hover:opacity-75 size-6 flex justify-center items-center p-1 bg-dark-gray rounded-full'>
								<PiX size={18} className='text-white' />
							</span>
						</div>
					</div>
				)
			}
			<label htmlFor='imageFile' className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 hover:opacity-75 transition-all cursor-pointer relative'>
				<PiImage size={22} className='text-white size-full' />
				<input
					accept="image/*"
					type="file" name='imageFile'
					onChange={handleFileChange}
					id='imageFile' className='w-full h-full absolute opacity-0 cursor-pointer' />
			</label>
			<input type="text" onKeyDown={onEnterPress} value={message} onChange={(e) => setMessage(e.target.value)} className='w-full bg-light-gray dark:bg-[#282930] h-12 rounded-md px-3 focus:outline-primary' placeholder='Type your message' />
			<button
				onClick={handleSendMessage}
				className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
				<PiPaperPlaneTiltBold size={22} className='text-white size-full' />
			</button>
		</div>
	)
}

export default MessageInput