import React, { useEffect, useState } from 'react';
import CustomizeInput from '../../components/input/CustomizeInput';
import FriendItem from '../../components/friendItem/FriendItem';
import { useLoaderData } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';

const Index = () => {

	let friendList = useLoaderData()
	const [search, setSearch] = useState('')
	const [loading,setLoading] = useState(false)
	const [users, setUsers] = useState([])
	const debounceSearch = useDebounce(search, 500)

	useEffect(() => {

	}, [debounceSearch])


	return (
		<div className='w-full h-full bg-white p-3 rounded-xl overflow-hidden'>
			<div className="w-full h-full flex flex-col gap-10">
				<section className='w-full flex justify-between items-center'>
					<h1 className='font-bold text-2xl'>Friends</h1>
					<div className="w-[345px] h-[50px]">
						<CustomizeInput placeholder={"Search for something"} onChange={setSearch} />
					</div>
				</section>
				<div className="w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 overflow-y-scroll pr-3 pt-3">
					{friendList.map((friend, index) => (
						<FriendItem key={index} friend={friend} className={'border hover:border-[#666666] hover:shadow-lg hover:-translate-y-[2px] transition-all h-[260px]'} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Index;
