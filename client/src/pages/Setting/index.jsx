import React from 'react'
import Overlay from '../../components/overlay'
import PropTypes from 'prop-types'
import Toggle from '../../components/toggle'
import { PiMinusCircle, PiArrowCircleRight } from "react-icons/pi";
const Index = ({ onClick }) => {
	return (
		<Overlay onClick={onClick}>
			<div className='w-[500px] h-[560px] flex flex-col items-center gap-8'>
				<h1 className='text-2xl font-bold'>Setting</h1>
				<div className="w-full h-fit flex flex-col items-center gap-3">
					<div className="size-32 rounded-full overflow-hidden">
						<img src="https://source.unsplash.com/random" alt="Avatar user" className='w-full h-full object-cover object-center' />
					</div>
					<span className='text-lg font-semibold'>Your Name</span>
				</div>
				<div className="w-full h-fit flex flex-col gap-2">
					<div className="w-full flex justify-between items-center border-y p-2">
						<span className='font-medium'>Dark mode</span>
						<Toggle></Toggle>
					</div>
					<div className="w-full flex justify-between items-center p-2 border-b">
						<span className='font-medium'>Active status</span>
						<Toggle></Toggle>
					</div>
					<div className="w-full flex justify-between items-center p-2 rounded-md hover:bg-light-gray transition-all cursor-pointer">
						<div className="w-full flex items-center gap-2">
							<PiMinusCircle size={22} />
							<span className='font-medium'>Manage blocking</span>
						</div>
						<PiArrowCircleRight size={28} />
					</div>
				</div>
			</div>
		</Overlay>
	)
}

Index.propTypes = {
	onClick: PropTypes.func,
}

export default Index