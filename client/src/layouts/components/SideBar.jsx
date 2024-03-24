import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { PiUserListBold, PiGearSixBold, PiChatCenteredDotsBold, PiMagnifyingGlassBold, PiSignOutBold } from "react-icons/pi";
import IconMenu from '../../components/iconmenu/IconMenu';
import { Link } from 'react-router-dom';
import LogoIcon from '../../assets/LogoIcon';
const SideBar = () => {

	const sideMenu = [
		{
			to: "/chat",
			title: "Chat",
			icon: PiChatCenteredDotsBold
		},
		{
			to: "/search",
			title: "Search",
			icon: PiMagnifyingGlassBold
		},
		{
			to: "/profile",
			title: "Profile",
			icon: FaRegUser
		},
		{
			to: "/friend_list",
			title: "Friends List",
			icon: PiUserListBold
		},
		{
			to: "/setting",
			title: "Setting",
			icon: PiGearSixBold
		}
	]

	return (
		<div className='h-full w-20 bg-white rounded-xl'>
			<div className="p-1.5 w-full h-full flex flex-col justify-between items-center">
				<section className="w-full h-full flex flex-col gap-6">
					<div className="w-[60px] h-[60px]">
						<LogoIcon />
					</div>
					<div className="w-full flex flex-col gap-5 justify-center items-center relative">
						{
							sideMenu.map((item, index) => (
								<IconMenu to={item.to} title={item.title} Icon={item.icon} />
							))
						}
					</div>
				</section>
				<section className='w-full flex flex-col items-center gap-3'>
					<div className="w-[55px] h-[55px] rounded-full overflow-hidden">
						<img
							className='w-full h-full object-cover'
							src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww" alt="User Avatar" />
					</div>
					<Link className="w-[55px] h-[55px] flex justify-center items-center hover:bg-primary group rounded-xl transition-all">
						<PiSignOutBold size={29} className='group-hover:text-white' />
					</Link>
				</section>
			</div>
		</div>
	)
}

export default SideBar