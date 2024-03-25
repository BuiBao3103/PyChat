import React from 'react'
import { PiPhone, PiVideoCamera, PiNotePencil, PiPlus, PiMinusCircle, PiMicrophoneBold, PiPaperPlaneTiltBold } from "react-icons/pi";
import ChatBrief from '../../components/chatBrief/ChatBrief';
const Index = () => {
	return (
		<div className='w-full h-full flex gap-3'>
			<div className="w-[320px] max-w-[400px] min-w-[320px] h-full bg-white rounded-xl flex flex-col">
				<div className="w-full h-[120px] flex flex-col gap-3 p-3">
					<div className="w-full flex justify-between items-center gap-2">
						<span className='font-bold text-2xl'>Chat</span>
						<PiNotePencil size={35} className='' />
					</div>
					<div className="w-full flex gap-2">
						<input type="text" className='bg-light-gray rounded-md px-3 py-2 w-full focus:outline-primary' placeholder='Search by name' />
					</div>
				</div>
				<div className="w-full h-full flex flex-col overflow-y-scroll pb-3">
					{
						Array.from({ length: 20 }, (_, index) => (
							<ChatBrief key={index} className='first:border-t' />
						))
					}
				</div>
			</div>
			<div className="w-full h-full bg-white rounded-xl p-3 flex flex-col">
				<h1 className='w-full border-b border-black pb-2 text-lg'>Name</h1>
				<div className="w-full h-full"></div>
				<div className="w-full h-16 flex items-center gap-3">
					<span className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
						<PiMicrophoneBold size={22} className='text-white size-full' />
					</span>
					<input type="text" className='w-full bg-light-gray h-12 rounded-md px-3 focus:outline-primary' placeholder='Type your message' />
					<span className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
						<PiPaperPlaneTiltBold size={22} className='text-white size-full' />
					</span>
				</div>
			</div>
			<div className="min-w-[300px] h-full rounded-xl bg-white">
				<div className="w-full flex flex-col justify-center items-center gap-3">
					<div className="w-full flex flex-col justify-center items-center gap-1 p-3">
						<div className="size-36 rounded-xl overflow-hidden">
							<img src="https://source.unsplash.com/random" alt="" className='size-full object-cover' />
						</div>
						<span className='text-lg'>Name</span>
						<span className='text-sm'>status</span>
					</div>
					<div className="w-full flex justify-center items-center gap-3">
						<PiPhone
							data-tooltip-id="my-tooltip"
							data-tooltip-content={"Call"}
							data-tooltip-place="bottom"
							data-tooltip-offset={20}
							size={25} className='size-fit p-3 border border-black rounded-md hover:bg-black hover:text-white transition-all cursor-pointer' />
						<PiVideoCamera
							data-tooltip-id="my-tooltip"
							data-tooltip-content={"Video Call"}
							data-tooltip-place="bottom"
							data-tooltip-offset={20}
							size={25} className='size-fit p-3 border border-black rounded-md hover:bg-black hover:text-white transition-all cursor-pointer' />
					</div>
					<div className="w-full flex flex-col">
						<section className='w-full flex justify-between items-center border-y border-[#ababab] p-2 hover:bg-light-gray cursor-pointer'>
							<span>Recent File</span>
							<span>
								<PiPlus size={20} />
							</span>
						</section>
						<section className='w-full flex justify-between items-center border-b border-[#ababab] p-2 hover:bg-light-gray cursor-pointer'>
							<span>Recent Uploaded Photos</span>
							<span>
								<PiPlus size={20} />
							</span>
						</section>
						<section className='w-full flex justify-between items-center border-b border-[#ababab] p-2 hover:bg-light-gray cursor-pointer'>
							<span>Block</span>
							<span>
								<PiMinusCircle size={20} />
							</span>
						</section>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index