import React from 'react'
import { PiPaperPlaneTiltBold } from 'react-icons/pi'

const MessageInput = () => {
	return (
		<form className="w-full h-16 flex items-center gap-3" method='POST'>
			{/* <span className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
				<PiMicrophoneBold size={22} className='text-white size-full' />
			</span> */}
			<input type="text" className='w-full bg-light-gray dark:bg-[#282930] h-12 rounded-md px-3 focus:outline-primary' placeholder='Type your message' />
			<button type='submit' className='size-12 bg-primary flex justify-center items-center rounded-md p-2.5 cursor-pointer hover:opacity-75 transition-all'>
				<PiPaperPlaneTiltBold size={22} className='text-white size-full' />
			</button>
		</form>
	)
}

export default MessageInput