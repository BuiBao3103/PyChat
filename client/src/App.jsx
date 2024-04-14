import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import * as ROUTE from './constants/routes';

import { tokenLoader, authChecker } from "./utils/auth";
import { action as authAction } from "./layouts/AuthLayout";
import { action as getMessages } from './components/message/MessageContainer';
import Axios from './api/index';
// Layout
import AuthLayout from './layouts/AuthLayout';
import DefaultLayout from './layouts/DefaultLayout';

// Auth Page
const Login = lazy(() => import('./auth/login'));
const Signup = lazy(() => import('./auth/signup'));

// Detail Page
const Search = lazy(() => import('./pages/Search'));
const FriendList = lazy(() => import('./pages/FriendList'));
const Profile = lazy(() => import('./pages/Profile'));
const ChatConversation = lazy(() => import('./pages/ChatConversation'));
const NewConversation = lazy(() => import('./pages/NewConversation'));

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MessageContainer from './components/message/MessageContainer';
import { getChatBriefs } from './pages/ChatConversation';

const router = createBrowserRouter([
	{
		path: ROUTE.HOME,
		element: <DefaultLayout />,
		id: "root",
		loader: authChecker,
		children: [
			{
				path: "conversation",
				element: <ChatConversation />,
				loader: getChatBriefs,
				children: [
					{
						path: "to",
						element: <NewConversation />,
						loader: async () => {
							return (await Axios.get('/api/v1/users')).data.data;
						}
					},
					{
						path: ":conversationID",
						element: <MessageContainer />,
						loader: getMessages
					}
				]
			},
			{
				path: ROUTE.SEARCH,
				element: <Search />,
				loader: async () => {
					return (await Axios.get('/api/v1/users')).data.data;
				}
			},
			{
				path: ROUTE.FRIEND_LIST,
				element: <FriendList />,
				loader: async () => {
					return (await Axios.get(`/api/v1/friendships?user_id=1`)).data.data;
				}
			},
			{
				path: "profile/:id",
				element: <Profile />,
				loader: async ({ params }) => {
					return (await Axios.get(`/api/v1/users?id=${params.id}`)).data.data;
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
]);

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
	);
}

export default App;
