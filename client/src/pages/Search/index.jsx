import React from 'react'
import CustomizeInput from '../../components/input/CustomizeInput'
import { PiX } from "react-icons/pi";
import SearchItem from '../../components/searchItem/SearchItem';
import { useLoaderData } from 'react-router-dom';
import useConversation from '../../zustand/useConversation';
const Index = () => {
	const users = useLoaderData()
	const {selectedConversation} = useConversation()
	console.log(selectedConversation);
	return (
		<div className='w-full h-full bg-white dark:bg-primary-dark rounded-xl p-3 flex flex-col gap-5'>
			<section>
				<h1 className='font-bold text-2xl dark:text-white'>Search</h1>
			</section>
			<div className="w-[345px] h-[50px]">
				<CustomizeInput placeholder={"Search for something"} />
			</div>
			<div className="w-full h-full flex gap-3 overflow-hidden">
				<section className='w-[320px] h-full border-r pr-3 flex flex-col'>
					<div className="w-full flex justify-between items-center">
						<h2 className='font-medium dark:text-white'>Recent search</h2>
						<button className='font-medium dark:text-white hover:underline'>
							Clear
						</button>
					</div>
					<div className="w-full h-full flex flex-col mt-4 overflow-y-scroll">
						{
							Array.from({ length: 20 }, (_, index) => (
								<div key={index} className="w-full flex justify-between items-center px-2 py-3 border-b hover:bg-light-gray dark:hover:bg-white/30 transition-all first:border-t">
									<span className='dark:text-white'>adam + {index}</span>
									<button>
										<PiX size={20} className='dark:text-white' />
									</button>
								</div>
							))
						}
					</div>
				</section>
				<section className='w-full h-full flex flex-col gap-3'>
					<div className="w-full flex justify-between items-center">
						<h2 className='font-medium dark:text-white'>Recent search result</h2>
					</div>
					<div className="w-full h-full overflow-y-scroll">
						<div className="w-full h-fit grid grid-cols-[repeat(2,_auto)] lg:grid-cols-[repeat(3,_auto)] gap-5 pr-2 pb-2">
							{
								users.map((item, index) => (
									<SearchItem item={item} key={index} />
								))
							}
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default Index