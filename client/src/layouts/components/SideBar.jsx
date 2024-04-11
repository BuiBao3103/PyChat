import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { PiUserListBold, PiGearSixBold, PiChatCenteredDotsBold, PiMagnifyingGlassBold, PiSignOutBold } from "react-icons/pi";
import IconMenu from '../../components/iconmenu/IconMenu';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LogoIcon from '../../assets/LogoIcon';
import Setting from '../../pages/Setting'
import { customToast } from '../../utils/customToast';
import Axios from '../../api/index'
import { useAuthContext } from '../../hooks/useAuthContext';
const SideBar = () => {
	const [visibleSetting, setVisibleSetting] = useState(false)
	const [state, dispatch] = useAuthContext()
	const sideMenu = [
		{
			to: "/conversation",
			title: "Chat",
			icon: PiChatCenteredDotsBold
		},
		{
			to: "/search",
			title: "Search",
			icon: PiMagnifyingGlassBold
		},
		{
			to: "/profile/1",
			title: "Profile",
			icon: FaRegUser
		},
		{
			to: "/friend_list",
			title: "Friends List",
			icon: PiUserListBold
		}
	]
	const navigate = useNavigate()
	const logoutUser = async () => {
		await Axios.post('/api/v1/logout').then(res => {
			if (res.status === 200) {
				localStorage.removeItem('user')
				localStorage.removeItem('auth')
				dispatch({ type: "LOGOUT" })
				customToast({ type: "success", message: "Log out success" })
			}
			navigate('/login')
		}).catch(err => {
			console.log(err)
		})
	};

	return (
		<>
			<div className='h-full w-20 bg-white rounded-xl dark:bg-primary-dark'>
				<div className="p-1.5 w-full h-full flex flex-col justify-between items-center">
					<section className="w-full h-full flex flex-col gap-6">
						<div className="w-[60px] h-[60px]">
							<LogoIcon />
						</div>
						<div className="w-full flex flex-col gap-5 justify-center items-center relative">
							{
								sideMenu.map((item, index) => (
									<IconMenu key={index} to={item.to} title={item.title} Icon={item.icon} onClick={item.onClick} />
								))
							}
							<div
								data-tooltip-id="my-tooltip"
								data-tooltip-content={"Setting"}
								data-tooltip-place="right"
								data-tooltip-offset={20}
								onClick={() => setVisibleSetting(!visibleSetting)}
								className={`w-[55px] h-[55px] flex justify-center items-center rounded-lg hover:bg-primary group transition-all`}>
								<PiGearSixBold size={29} className="group-hover:text-white dark:text-dark-gray cursor-pointer" />
							</div>
						</div>
					</section>
					<section className='w-full flex flex-col items-center gap-3'>
						<div className="w-[55px] h-[55px] rounded-full overflow-hidden">
							<img
								className='w-full h-full object-cover'
								src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww" alt="User Avatar" />
						</div>
						<Link
							onClick={logoutUser}
							className="w-[55px] h-[55px] flex justify-center items-center hover:bg-primary group rounded-xl transition-all">
							<PiSignOutBold size={29} className='group-hover:text-white dark:text-dark-gray' />
						</Link>
					</section>
				</div>
			</div>
			{visibleSetting && <Setting visibleSetting={visibleSetting} onClick={setVisibleSetting} />}
		</>
	)
}

export default SideBar