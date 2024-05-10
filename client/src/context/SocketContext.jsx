import { createContext, useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import io from 'socket.io-client'
const SocketContext = createContext()

export const useSocketContext = () => {
	return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null)
	const [state, dispatch] = useAuthContext()
	useEffect(() => {
		const socketConnect = io("http://localhost:5000", {
			query: {
				userID: state.user?.id
			},
		})
		if (state.user) {
			setSocket(socketConnect)
			console.log(socket)
			console.log('run')
		} else {
			if (socket) {
				console.log(socket)
				setSocket(null)
			}
			console.log('not run yet')
		}
	}, [state.user])

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	)
}