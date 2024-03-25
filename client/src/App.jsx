import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import * as ROUTE from './constants/routes'

import { tokenLoader, authChecker } from "./utils/auth"

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
const router = createBrowserRouter([
	{
		path: ROUTE.HOME,
		element: <DefaultLayout />,
		id: "root",
		loader: tokenLoader,
		children: [
			{
				index: true,
				// path: ROUTE
				element: <ChatConversation />
			},
			{
				path: ROUTE.SEARCH,
				element: <Search />
			},
			{
				path: ROUTE.FRIEND_LIST,
				element: <FriendList />
			},
			{
				path: ROUTE.PROFILE,
				element: <Profile />
			}
		]
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <Login />
			},
			{
				path: ROUTE.SIGNUP,
				element: <Signup />
			}
		]
	}
])

function App() {
	return (
		<main className='flex h-screen'>
			<RouterProvider router={router} />
		</main>
	)
}

export default App
