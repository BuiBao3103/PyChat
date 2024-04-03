import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import * as ROUTE from './constants/routes'

import { tokenLoader, authChecker } from "./utils/auth"
import { action as authAction } from "./layouts/AuthLayout"
import Axios from './api/index'
// Layout
import AuthLayout from './layouts/AuthLayout'
import DefaultLayout from './layouts/DefaultLayout'

// Auth Page
import Login from './auth/login'
import Signup from './auth/signup'

// Detail Page
import Search from './pages/Search'
import FriendList from './pages/FriendList'
import Profile from './pages/Profile'
import ChatConversation from './pages/ChatConversation'
import NewConversation from './pages/NewConversation'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
	{
		path: ROUTE.HOME,
		element: <DefaultLayout />,
		id: "root",
		loader: authChecker,
		children: [
			{
				path: ROUTE.CHAT,
				element: <ChatConversation />,
				children: [
					{
						path: "to",
						element: <NewConversation />,
						loader: async () => {
							return (await Axios.get('/api/v1/users')).data.data
						}
					},
					{
						path: ":id"
					}
				]
			},
			{
				path: ROUTE.SEARCH,
				element: <Search />
			},
			{
				path: ROUTE.FRIEND_LIST,
				element: <FriendList />,
				loader: async () => {
					return (await Axios.get(`/api/v1/friendships?user_id=1`)).data.data
				}
			},
			{
				path: "profile/:id",
				element: <Profile />,
				loader: async ({ params }) => {
					return (await Axios.get(`/api/v1/users?id=${params.id}`)).data.data
				}
			}
		]
	},
	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: ROUTE.LOGIN,
				element: <Login />,
				action: authAction,

			},
			{
				path: ROUTE.SIGNUP,
				element: <Signup />,
				action: authAction,
			}
		]
	}
])

function App() {
	return (
		<div className='flex h-screen'>
			<RouterProvider router={router} />
			<ToastContainer
				autoClose={2500}
				pauseOnFocusLoss={false}
				position="top-right"
			/>
		</div>
	)
}

export default App
