import React, { useEffect, useState } from 'react';
import CustomizeInput from '../../components/input/CustomizeInput';
import FriendItem from '../../components/friendItem/FriendItem';
import { useLoaderData } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import Axios from '../../api/index'
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Index = () => {
	const [filter, setFilter] = useState("All")
	let friendList = useLoaderData()
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	const debounceSearch = useDebounce(search, 500)
	const [list, setList] = useState(friendList)
	const getListByFilter = async () => {
		let url = `/api/v1/friendships?user_id=eq:1&status=friends`
		try {
			if (filter === "All") {
				url = `/api/v1/friendships?user_id=eq:${JSON.parse(localStorage.getItem('user')).id}&status=friends`
			} else if (filter === "Respond") {
				url = `/api/v1/friendships?user_id=eq:${JSON.parse(localStorage.getItem('user')).id}&status=request_received`
			} else {
				url = `/api/v1/friendships?user_id=eq:${JSON.parse(localStorage.getItem('user')).id}&status=request_sent`
			}
			const res = await Axios.get(url)
			setLoading(true)
			if (res.status === 200) {
				setList(res.data.data)
				setTimeout(() => {
					setLoading(false)
				}, 1000) // Set the amount of time to show the loading animation (in milliseconds)
			}
			console.log(loading)
		} catch (error) {
			toast.error(error.message)
		} finally {
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		}
	}
	useEffect(() => {
		getListByFilter()
	}, [])
	useEffect(() => {
		getListByFilter()
	}, [filter])
	// console.log(list)
	return (
		<div className='w-full h-full bg-white p-3 rounded-xl overflow-hidden'>
			<div className="w-full h-full flex flex-col gap-10">
				<section className='w-full flex justify-between items-center'>
					<h1 className='font-bold text-2xl'>Friends</h1>
					<div className="w-[345px] h-[50px]">
						<CustomizeInput placeholder={"Search for something"} onChange={setSearch} />
					</div>
				</section>
				<div className="w-full flex flex-col gap-2">
					<ul className="w-full flex gap-2">
						{
							[`All`, `Respond`, `Request`].map((item, index) => (
								<li key={index}>
									<button onClick={() => setFilter(item)} className={`w-[120px] h-[40px] text-base hover:bg-gray-200 hover:rounded-md transition-all ${filter === item ? "border-b-2 border-primary font-medium text-primary" : ""}`}>
										{item}
									</button>
								</li>
							))
						}
					</ul>
					<div className="w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 overflow-y-scroll pr-3 pt-3">
						{
							!loading ? (
								list.map((friend, index) => (
									<FriendItem key={index} friend={friend} className={'border hover:border-[#666666] hover:shadow-lg hover:-translate-y-[2px] transition-all h-[260px]'} />
								))
							) : (
								Array.from({ length: list.length }, (_, index) => (
									<Skeleton key={index} width={342} height={260} borderRadius={8} />
								))
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
