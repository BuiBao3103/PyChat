import React, { useEffect, useState } from 'react'
import { PiMinusCircle, PiMinus, PiPlus } from 'react-icons/pi'
import useConversation from '../../zustand/useConversation'
import BlockConfirm from '../modal/BlockConfirm'
import ImagesOverlay from '../caroseul/ImagesOverlay'
import useGetAllImages from '../../hooks/useGetAllImages'
const MessageDetail = () => {

	const { selectedConversation, isOpenCarosuel, setIsOpenCarosuel, setSelectedImage } = useConversation()
	const { imagesData, getAllImages } = useGetAllImages()
	const [isOpenRecentImage, setIsOpenRecentImage] = useState(false)
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
					<div className="w-full flex flex-col overflow-hidden">
						<section
							onClick={() => setIsOpenRecentImage(!isOpenRecentImage)}
							className={`${isOpenRecentImage ? 'bg-light-gray' : 'bg-white'} w-full flex justify-between items-center border-t border-[#ababab] p-2 hover:bg-light-gray dark:hover:bg-white/30  cursor-pointer`}>
							<span className='dark:text-white'>Recent Uploaded Photos</span>
							<span>
								{
									isOpenRecentImage
										? <PiMinus size={20} className='dark:text-white' />
										: <PiPlus size={20} className='dark:text-white' />
								}
							</span>
						</section>
						{
							isOpenRecentImage && (
								<div className="transition-all h-[310px] overflow-y-scroll grid grid-cols-3 gap-1">
									{
										imagesData.map((image, index) => (
											<div key={index}
												onClick={() => {
													setIsOpenCarosuel(true)
													setSelectedImage(index.toString())
												}} className="w-full h-[100px] relative cursor-pointer">
												<img src={image} alt="" className='size-full object-cover' />
											</div>
										))
									}
								</div>
							)
						}
						{/* //create a fake list of images has sent from both user and display as grid view 3 columns with aspect ratio 1:1 */}
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
			{isOpenCarosuel && <ImagesOverlay images={imagesData} />}
		</>
	)
}

export default MessageDetail