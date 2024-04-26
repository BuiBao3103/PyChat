import React, { useEffect, useState } from 'react'
import { PiPaperPlaneTiltBold, PiImage, PiX } from 'react-icons/pi'
import { useSocketContext } from '../../context/SocketContext'
import useConversation from '../../zustand/useConversation'
import { toast } from 'react-toastify'
const MessageInput = ({ scroll, selectedImageFiles }) => {
	const { selectedConversation, setLoadConversations } = useConversation()
	const [isDragging, setIsDragging] = useState(false)
	const [message, setMessage] = useState('')
	const { socket } = useSocketContext()
	const [selectedFiles, setSelectedFiles] = useState([]);
	const handleFileChange = (e) => {
		const files = e.target.files;
		if (files.length === 0) return;
		for (let i = 0; i < files.length; i++) {
			if (files[i].type.split('/')[0] !== 'image') {
				toast.error('Only images are allowed')
				continue;
			}
			if (!selectedFiles.some((e) => e.name === files[i].name)) {
				const reader = new FileReader();
				reader.readAsDataURL(files[i]);
				reader.onload = () => {
					setSelectedFiles((prev) => [...prev, reader.result]);
				};
			}
		}
	}
	const sendImages = () => {
		const imageInputs = Array.from(document.querySelectorAll('#imageFile'));
		if (selectedFiles.length > 0) {
			selectedFiles.forEach((file, index) => {
				const imageInput = imageInputs[index];
				socket.emit('message', {
					user_id: JSON.parse(localStorage.getItem('user')).id,
					channel_id: selectedConversation.id,
					imageData: file.split(',')[1],
					time: Date.now(),
					type: 'image',
					fileExtension: imageInput.files[0].name.split('.').pop()
				});
			});
			setLoadConversations(true);
			setTimeout(() => {
				setLoadConversations(false);
			}, 500);
			setSelectedFiles([]);
			scroll.current.scrollIntoView({ behavior: "smooth" });
		}
	};
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
		if (selectedFiles != null) {
			sendImages()
		}
	}
	const onEnterPress = (e) => {
		if (e.keyCode == 13 && e.shiftKey == false) {
			sendMessage(message)
		}
	}
	const deleteImage = (index) => {
		setSelectedFiles(selectedFiles.filter((_, i) => i != index))
	}
	useEffect(() => {
		if (selectedImageFiles.length > 0) {
			setSelectedFiles(selectedImageFiles)
		}
		console.log(selectedImageFiles)
	}, [selectedImageFiles])
	return (
		<>
			<div className="w-full h-16 flex items-center gap-3 relative">
				{
					selectedFiles.length != 0 && (
						<div className="w-full h-fit bg-light-gray absolute left-0 -top-[120px] rounded-md flex gap-2 p-2">
							{
								selectedFiles.map((file, index) => (
									<div className="size-24 relative" key={index}>
										<img src={file} alt="" className='size-full rounded-md object-cover inline-block' />
										<span
											onClick={() => {
												deleteImage(index)
											}}
											className='absolute -top-2 -right-2 cursor-pointer hover:opacity-75 size-6 flex justify-center items-center p-1 bg-dark-gray rounded-full'>
											<PiX size={18} className='text-white' />
										</span>
									</div>
								))
							}
						</div>
					)
				}
				<label htmlFor='imageFile' className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 hover:opacity-75 transition-all cursor-pointer relative'>
					<PiImage size={22} className='text-white size-full' />
					<input
						accept="image/*"
						multiple={true}
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
		</>
	)
}

export default MessageInput