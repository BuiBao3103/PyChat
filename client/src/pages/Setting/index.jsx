import React, { useEffect, useState } from 'react'
import Overlay from '../../components/overlay'
import PropTypes from 'prop-types'
import Toggle from '../../components/toggle'
import { PiMinusCircle, PiArrowCircleRight, PiMagnifyingGlass } from "react-icons/pi";
const Index = ({ onClick }) => {

	const [visibleBlockList, setVisibleBlockList] = useState(false)

	return (
		<Overlay onClick={onClick} isVisibleBlockList={visibleBlockList} setVisibleBlockList={setVisibleBlockList}>
			<>
				<div className='w-[500px] h-[560px] flex flex-col items-center gap-8'>
					{
						!visibleBlockList ? (
							<>
								<h1 className='text-2xl font-bold dark:text-white'>Setting</h1>
								<div className="w-full h-fit flex flex-col items-center gap-3">
									<div className="size-32 rounded-full overflow-hidden">
										<img src={JSON.parse(localStorage.getItem('user')).avatar} alt="Avatar user" className='w-full h-full object-cover object-center' />
									</div>
									<span className='text-lg font-semibold dark:text-white'>{JSON.parse(localStorage.getItem('user')).username}</span>
								</div>
								<div className="w-full h-fit flex flex-col gap-2">
									<div className="w-full flex justify-between items-center border-y p-2">
										<span className='font-medium dark:text-white'>Dark mode</span>
										<Toggle></Toggle>
									</div>
									<div className="w-full flex justify-between items-center p-2 border-b">
										<span className='font-medium dark:text-white'>Active status</span>
										{/* <Toggle></Toggle> */}
									</div>
									<div onClick={() => setVisibleBlockList(!visibleBlockList)} className="w-full flex justify-between items-center p-2 rounded-md hover:bg-light-gray dark:hover:bg-white/30 transition-all cursor-pointer">
										<div className="w-full flex items-center gap-2">
											<PiMinusCircle size={22} className='dark:text-white' />
											<span className='font-medium dark:text-white'>Manage blocking</span>
										</div>
										<PiArrowCircleRight size={28} className='dark:text-white' />
									</div>
								</div>
							</>
						) : (
							<>
								{/* <div className="w-full flex flex-col gap-8 items-center relative"> */}
									<h1 className='text-2xl font-bold dark:text-white'>Manage blocking list</h1>
									<div className="w-full h-fit flex flex-col">
										<div className="w-full flex gap-2 px-2 py-3 border rounded-md">
											<PiMagnifyingGlass size={25} />
											<label className='w-full' htmlFor="searchBlockList">
												<input type="text" placeholder='Search by name' name='searchBlockList' className='w-full focus:outline-none text-base' />
											</label>
										</div>
										<span className="absolute w-[550px] h-px bg-black -left-6 -bottom-3"></span>
									</div>
								{/* </div> */}
								<div className="w-full h-full overflow-y-scroll flex flex-col gap-1 border-t pt-1">
									{/* /create an array with 10 elements each item has avatar circle and username and a button to block or unblock base on the data */}
									{Array.from({ length: 10 }, (_, i) => (
										<div key={i} className="w-full flex justify-between items-center">
											<div className="w-full flex items-center gap-2">
												<div className="size-16 rounded-full overflow-hidden">
													<img src={JSON.parse(localStorage.getItem('user')).avatar} alt="Avatar user" className='w-full h-full object-cover object-center' />
												</div>
												<span className='font-medium dark:text-white'>{JSON.parse(localStorage.getItem('user')).username}</span>
											</div>
											<button className='w-fit h-fit py-2 px-3 rounded-md flex items-center justify-center bg-primary font-medium text-white'>Unblock</button>
										</div>
									))}

								</div>
							</>
						)
					}
				</div>
			</>
		</Overlay>
	)
}

Index.propTypes = {
	onClick: PropTypes.func,
}

export default Index