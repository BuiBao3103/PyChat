import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Axios from '../api/index'
const useGetConversation = () => {
	const [loading, setLoading] = useState(false)
	const [conversations, setConversations] = useState([])

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true)
			try {
				const res = Axios.get('/api/v1/conversations')
			} catch (error) {
				toast.error(error.message)
			} finally {
				setLoading(false)
			}
		}
	})

	return (
		<div>useGetConversation</div>
	)
}

export default useGetConversation