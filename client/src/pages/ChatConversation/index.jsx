import React from 'react'
import { PiPhone, PiVideoCamera, PiNotePencil, PiPlus, PiMinusCircle } from "react-icons/pi";
import ChatBrief from '../../components/chatBrief/ChatBrief';
import MessageContainer from '../../components/message/MessageContainer';
import { Link, useLocation } from 'react-router-dom';
import NewConversation from '../NewConversation'
const Index = () => {

	const location = useLocation()

	return (
		<div className='w-full h-full flex gap-3'>
			<div className="w-[320px] max-w-[400px] min-w-[320px] h-full bg-white dark:bg-primary-dark rounded-xl flex flex-col">
				<div className="w-full h-[120px] flex flex-col gap-3 p-3">
					<div className="w-full flex justify-between items-center gap-2">
						<span className='font-bold text-2xl dark:text-white'>Chat</span>
						<Link to={"/conversation/to"}>
							<PiNotePencil size={35} className=' dark:text-white cursor-pointer' />
						</Link>
					</div>
					<div className="w-full flex gap-2">
						<input type="search" className='bg-light-gray dark:bg-[#282930] dark:text-white dark:focus:outline-white rounded-md px-3 py-2 w-full focus:outline-primary' placeholder='Search by name' />
					</div>
				</div>
				<div className="w-full h-full flex flex-col overflow-y-scroll pb-3 scrollChatConversions">
					{
						Array.from({ length: 20 }, (_, index) => (
							<ChatBrief key={index} className='first:border-t' />
						))
					}
				</div>
			</div>
			{
				location.pathname.includes("to") ? <NewConversation /> :
					(
						<>
							<div className="w-full h-full bg-white dark:bg-primary-dark rounded-xl p-3 flex flex-col">
								<MessageContainer />
							</div>
							<div className="min-w-[300px] w-[300px] h-full rounded-xl bg-white dark:bg-primary-dark">
								<div className="w-full flex flex-col justify-center items-center gap-3">
									<div className="w-full flex flex-col justify-center items-center gap-1 p-3">
										<div className="size-36 rounded-xl overflow-hidden">
											<img src="https://source.unsplash.com/random" alt="" className='size-full object-cover' />
										</div>
										<span className='text-lg dark:text-white'>Name</span>
										<span className='text-sm dark:text-white'>status</span>
									</div>
									<div className="w-full flex justify-center items-center gap-3">
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
									</div>
									<div className="w-full flex flex-col">
										<section className='w-full flex justify-between items-center border-y border-[#ababab] p-2 hover:bg-light-gray dark:hover:bg-white/30  cursor-pointer'>
											<span className='dark:text-white'>Recent File</span>
											<span>
												<PiPlus size={20} className='dark:text-white' />
											</span>
										</section>
										<section className='w-full flex justify-between items-center border-b border-[#ababab] p-2 hover:bg-light-gray dark:hover:bg-white/30  cursor-pointer'>
											<span className='dark:text-white'>Recent Uploaded Photos</span>
											<span>
												<PiPlus size={20} className='dark:text-white' />
											</span>
										</section>
										<section className='w-full flex justify-between items-center border-b border-[#ababab] p-2 hover:bg-light-gray dark:hover:bg-white/30 cursor-pointer'>
											<span className='dark:text-white'>Block</span>
											<span>
												<PiMinusCircle size={20} className='dark:text-white' />
											</span>
										</section>
									</div>
								</div>
							</div>
						</>
					)
			}
		</div>
	)
}

export default Index