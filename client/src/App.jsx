import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import * as ROUTE from './constants/routes'
import AuthLayout from './layouts/AuthLayout'
import Login from './auth/login'
import Signup from './auth/signup'
import DefaultLayout from './layouts/DefaultLayout'
const router = createBrowserRouter([
	{
		path: ROUTE.HOME,
		element: <DefaultLayout />,
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
