import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import * as ROUTE from './constants/routes'
import AuthLayout from './layouts/AuthLayout'
import Login from './auth/login'
import Signup from './auth/signup'
import Search from './pages/Search'
import FriendList from './pages/FriendList'
import Profile from './pages/Profile'
import DefaultLayout from './layouts/DefaultLayout'
const router = createBrowserRouter([
	{
		path: ROUTE.HOME,
		element: <DefaultLayout />,
		children: [
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
