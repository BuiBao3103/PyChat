import React, { useState } from 'react'
import { PiMinusCircle, PiPhone, PiPlus, PiVideoCamera } from 'react-icons/pi'
import useConversation from '../../zustand/useConversation'
import BlockConfirm from '../modal/BlockConfirm'

const MessageDetail = () => {

	const { selectedConversation } = useConversation()
	const [isVisibleBlockModal, setIsVisibleBlockModal] = useState(false)
	const handleVisibleBlockModal = () => {
		setIsVisibleBlockModal(!isVisibleBlockModal)
	}

	return (
		<>
			<div className="min-w-[300px] w-[300px] h-full rounded-xl bg-white dark:bg-primary-dark xl:block hidden">
				<div className="w-full flex flex-col justify-center items-center gap-3">
					<div className="w-full flex flex-col justify-center items-center gap-1 p-3">
						<div className="size-36 rounded-xl overflow-hidden">
							<img src={selectedConversation.friend.avatar} alt="" className='size-full object-cover' />
						</div>
						<span className='text-lg dark:text-white'>{selectedConversation.friend.username}</span>
						<span className='text-sm dark:text-white'>{selectedConversation.last_online != null ? "online" : "offline"}</span>
					</div>
					{/* <div className="w-full flex justify-center items-center gap-3">
						<PiPhone
							data-tooltip-id="my-tooltip"
							data-tooltip-content={"Call"}
							data-tooltip-place="bottom"
							data-tooltip-offset={20}
							size={25} className='size-fit p-3 border border-black rounded-md hover:bg-black hover:text-white transition-all cursor-pointer dark:border-[#aaaaaf] dark:hover:bg-white dark:hover:text-black dark:text-[#aaaaaf]' />
						<PiVideoCamera
							data-tooltip-id="my-tooltip"
							data-tooltip-content={"Video Call"}
							data-tooltip-place="bottom"
							data-tooltip-offset={20}
							size={25} className='size-fit p-3 border border-black rounded-md hover:bg-black hover:text-white transition-all cursor-pointer dark:border-[#aaaaaf] dark:hover:bg-white dark:hover:text-black dark:text-[#aaaaaf]' />
					</div> */}
					<div className="w-full flex flex-col">
						{/* <section className='w-full flex justify-between items-center border-y border-[#ababab] p-2 hover:bg-light-gray dark:hover:bg-white/30  cursor-pointer'>
							<span className='dark:text-white'>Recent File</span>
							<span>
								<PiPlus size={20} className='dark:text-white' />
							</span>
						</section> */}
						<section className='w-full flex justify-between items-center border-y border-[#ababab] p-2 hover:bg-light-gray dark:hover:bg-white/30  cursor-pointer'>
							<span className='dark:text-white'>Recent Uploaded Photos</span>
							<span>
								<PiPlus size={20} className='dark:text-white' />
							</span>
						</section>
						{/* //create a fake list of images has sent from both user and display as grid view 3 columns with aspect ratio 1:1 */}
						<div className="grid grid-cols-3 gap-1">
							{Array.from({ length: 5 }).map((item, index) => (
								<div key={index} className="aspect-square">
									<img src={"https://source.unsplash.com/random"} alt="" className="object-cover w-full h-full " />
								</div>
							))}
						</div>
						<section onClick={handleVisibleBlockModal} className='w-full flex justify-between items-center border-y border-[#ababab] p-2 hover:bg-light-gray dark:hover:bg-white/30 cursor-pointer'>
							<span className='dark:text-white'>Block</span>
							<span>
								<PiMinusCircle size={20} className='dark:text-white' />
							</span>
						</section>
						<section onClick={handleVisibleBlockModal} className='w-full flex justify-between items-center border-b border-[#ababab] p-2 hover:bg-light-gray dark:hover:bg-white/30 cursor-pointer'>
							<span className='dark:text-white'>Delete conversation</span>
							<span>
								<PiMinusCircle size={20} className='dark:text-white' />
							</span>
						</section>
					</div>
				</div>
			</div>
			{isVisibleBlockModal && <BlockConfirm user={selectedConversation} handleVisibleBlockModal={setIsVisibleBlockModal} />}
		</>
	)
}

export default MessageDetail