import React, { useEffect, useState } from 'react'
import InformationLine from '../../components/generalInfomationLine/InformationLine'
import { ContactItem } from '../../components/contactItem/ContactItem'
import { PiPhone, PiEnvelopeSimple } from "react-icons/pi";
import FriendItem from '../../components/friendItem/FriendItem';
import Axios from '../../api/index'
import { useLoaderData, useParams } from 'react-router-dom';
const Index = () => {
	const data = useLoaderData()
	const params = useParams()
	const [friends, setFriends] = useState([])
	const fakeData = [
		{
			Icon: PiPhone,
			title: 'Phone Number',
			value: '0344248396'
		}, {
			Icon: PiEnvelopeSimple,
			title: 'Personal Email',
			value: data[0].email
		}
	]

	useEffect(() => {
		const getFriends = async () => {
			try {
				await Axios.get(`api/v1/friendships?user_id=eq:1&status=friends`).then((res) => {
					if (res.status === 200) {
						setFriends(res.data.data)
						console.log(res)
					}
				})
			} catch (error) {
				console.log(error)
			}
		}
		getFriends()
	}, [])

	return (
		<div className='w-full h-full rounded-xl bg-white dark:bg-primary-dark p-3 overflow-hidden'>
			<div className="w-full h-full flex flex-col gap-2">
				<div className="w-full h-[350px] relative">
					<div id='coverImage' className="w-full h-[250px] rounded-xl overflow-hidden">
						<img src={data[0].background} alt="cover image" className='w-full h-full object-fill object-center' />
					</div>
					<div className="w-full h-[100px] absolute bottom-8">
						<div className="w-full h-full flex justify-between items-center px-10">
							<section className="h-full flex gap-4 items-center">
								<div className="size-32 overflow-hidden rounded-full border-[5px] border-gray-100">
									<img src={data[0].avatar} alt="" className='w-full h-full object-cover' />
								</div>
								<div className="w-fit h-full flex flex-col place-content-end pb-4">
									<span className='whitespace-nowrap text-xl font-bold dark:text-white'>{data[0].username}</span>
									<span className='whitespace-nowrap dark:text-white'>{data[0].email}</span>
								</div>
							</section>
							{
								JSON.parse(localStorage.getItem('user')).id == params.id && (
									<section className='h-full flex flex-col place-content-end pb-5'>
										<button className='w-fit h-fit px-10 py-2 border dark:border-white dark:text-white dark:hover:border-primary border-black rounded-md hover:bg-primary hover:border-primary transition-all hover:text-white'>Edit</button>
									</section>
								)
							}
						</div>
					</div>
				</div>
				<div className="w-full h-full flex flex-1 gap-3 overflow-hidden">
					<section className="w-[550px] h-full flex flex-col gap-3">
						<div className="w-full h-fit border border-[#c2c2c2] rounded-xl px-5 py-4">
							<div className="w-full h-full flex flex-col gap-1 border-r border-[#c2c2c2]">
								<h1 className='text-4xl font-bold dark:text-white'>{friends.length}</h1>
								<span className=' dark:text-white'>Friends</span>
							</div>
						</div>
						<div className="w-full h-full border border-[#c2c2c2] rounded-xl">
							<div className="w-full h-full px-5 py-2 flex flex-col gap-2">
								<h1 className='font-bold text-lg block py-2 dark:text-white'>General Information</h1>
								<div className="w-full h-full flex flex-col">
									{
										data && (
											<>
												<InformationLine title={"First name"} value={data[0].first_name} />
												<InformationLine title={"Last name"} value={data[0].last_name} />
												{/* <InformationLine title={"Phone number"} value={'Thần '} /> */}
												<InformationLine title={"Email"} value={data[0].email} />
											</>
										)
									}
								</div>
							</div>
						</div>
					</section>
					<section className='w-full h-f border border-[#c2c2c2] rounded-xl flex p-4'>
						{/* <div className="w-full h-fit px-5 py-1 flex flex-col gap-3">
							<h1 className='w-full block py-2 font-bold text-lg dark:text-white'>Quick Contact</h1>
							<div className="w-full flex flex-col gap-2">
								{
									fakeData.map((item, index) => (
										<ContactItem key={index} Icon={item.Icon} title={item.title} value={item.value} />
									))
								}
							</div>
						</div> */}
						<div className="w-full h-full flex flex-col gap-3 overflow-hidden relative group">
							<h1 className='w-full h-fit py-1 block font-bold text-lg dark:text-white'>Friends</h1>
							<div className="w-full h-full flex flex-wrap gap-4 border border-[#c2c2c2] rounded-lg overflow-y-scroll">
								{
									friends.map((item, index) => (
										<FriendItem key={index} friend={item} className={'w-fit h-fit'} />
									))
								}
							</div>
							<button className='absolute w-fit px-6 py-3 bg-primary text-white font-bold -bottom-16 right-9 rounded-md group-hover:bottom-7 transition-all duration-300 hover:opacity-60'>
								View All
							</button>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default Index