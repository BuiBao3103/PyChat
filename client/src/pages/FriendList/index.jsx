import React from 'react'
import CustomizeInput from '../../components/input/CustomizeInput'
import FriendItem from '../../components/friendItem/FriendItem'

const Index = () => {
	return (
		<div className='w-full h-full bg-white p-3 rounded-xl overflow-hidden'>
			<div className="w-full h-full flex flex-col gap-10">
				<section className='w-full flex justify-between items-center'>
					<h1 className='font-bold text-2xl'>Friends</h1>
					<div className="w-[345px] h-[50px]">
						<CustomizeInput placeholder={"Search for something"} />
					</div>
				</section>
				<div className="w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 overflow-y-scroll pr-3">
					{
						Array.from({ length: 32 }, (_, index) => (
							<FriendItem />
						))
					}
				</div>
			</div>
		</div>
	)
}

export default Index