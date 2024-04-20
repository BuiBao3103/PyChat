import { createContext, useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import io from 'socket.io-client'
const SocketContext = createContext()

export const useSocketContext = () => {
	return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null)
	const [onlineUsers, setOnlineUsers] = useState([])
	const [state, dispatch] = useAuthContext()
	console.log(state.user)
	useEffect(() => {
		const socket = io("http://localhost:5000", {
			query: {
				userID: JSON.parse(localStorage.getItem("user")).id
			},
		})
		setSocket(socket)
		console.log(socket)
		console.log('run')
		// socket.on("getOnlineUsers", (users) => {
		// 	setOnlineUsers(users)
		// })
		return () => socket.close()
		// } else {
		// 	if(socket) {
		// 		socket.close()
		// 		setSocket(null)
		// 	console.log('run error')
		// 	}
		// }
	}, [])
	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	)
}