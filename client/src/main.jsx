import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SocketProvider } from './context/SocketContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<ThemeProvider>
		<AuthProvider>
			<SocketProvider>
				<SearchProvider>
					<App />
				</SearchProvider>
			</SocketProvider>
		</AuthProvider>
	</ThemeProvider>,
)
