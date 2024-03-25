import React from 'react'
import InformationLine from '../../components/generalInfomationLine/InformationLine'
import { ContactItem } from '../../components/contactItem/ContactItem'
import { PiPhone, PiEnvelopeSimple } from "react-icons/pi";
import FriendItem from '../../components/friendItem/FriendItem';
const Index = () => {

	const fakeData = [
		{
			Icon: PiPhone,
			title: 'Phone Number',
			value: '0344248396'
		}, {
			Icon: PiEnvelopeSimple,
			title: 'Personal Email',
			value: 'tienphatng.693@gmail.com'
		}
	]

	return (
		<div className='w-full h-full rounded-xl bg-white p-3 overflow-hidden'>
			<div className="w-full h-full flex flex-col gap-2">
				<div className="w-full h-[350px] relative">
					<div id='coverImage' className="w-full h-[250px] rounded-xl overflow-hidden">
						<img src="https://source.unsplash.com/random" alt="cover image" className='w-full h-full object-cover object-center' />
					</div>
					<div className="w-full h-[100px] absolute bottom-8">
						<div className="w-full h-full flex justify-between items-center px-10">
							<section className="h-full flex gap-4 items-center">
								<div className="size-32 overflow-hidden rounded-full border-[5px] border-white">
									<img src="https://source.unsplash.com/random" alt="" className='w-full h-full object-cover' />
								</div>
								<div className="w-fit h-full flex flex-col place-content-end pb-4">
									<span className='whitespace-nowrap text-xl font-bold'>Jack Phat</span>
									<span className='whitespace-nowrap '>tienphatng.693@gmail.com</span>
								</div>
							</section>
							<section className='h-full flex flex-col place-content-end pb-5'>
								<button className='w-fit h-fit px-10 py-2 border border-black rounded-md hover:bg-primary hover:border-primary transition-all hover:text-white'>Edit</button>
							</section>
						</div>
					</div>
				</div>
				<div className="w-full h-full flex flex-1 gap-3 overflow-hidden">
					<section className="w-[550px] h-full flex flex-col gap-3">
						<div className="w-full h-fit border border-[#c2c2c2] rounded-xl px-5 py-4">
							<div className="w-full h-full flex flex-col gap-1 border-r border-[#c2c2c2]">
								<h1 className='text-4xl font-bold'>269</h1>
								<span>Friends</span>
							</div>
						</div>
						<div className="w-full h-full border border-[#c2c2c2] rounded-xl">
							<div className="w-full h-full px-5 py-2 flex flex-col gap-2">
								<h1 className='font-bold text-lg block py-2'>General Information</h1>
								<div className="w-full h-full flex flex-col">
									{
										Array.from({ length: 5 }, (_, index) => (
											<InformationLine key={index} title={'title'} value={'value'} />
										))
									}
								</div>
							</div>
						</div>
					</section>
					<section className='w-full h-f border border-[#c2c2c2] rounded-xl flex flex-col'>
						<div className="w-full h-fit px-5 py-1 flex flex-col gap-3">
							<h1 className='w-full block py-2 font-bold text-lg'>Quick Contact</h1>
							<div className="w-full flex flex-col gap-2">
								{
									fakeData.map((item, index) => (
										<ContactItem key={index} Icon={item.Icon} title={item.title} value={item.value} />
									))
								}
							</div>
						</div>
						<div className="w-full h-full px-5 pb-4	 flex flex-col gap-3 overflow-hidden relative group">
							<h1 className='w-full h-fit py-1 block font-bold text-lg'>Friends</h1>
							<div className="w-full h-full flex flex-wrap gap-4 border border-[#c2c2c2] rounded-lg overflow-y-scroll">
								{
									Array.from({ length: 8 }, (_, index) => (
										<FriendItem key={index} className={'w-fit h-fit'} />
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