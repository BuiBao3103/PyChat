import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Axios from '../api/index'
import useConversation from '../zustand/useConversation'
const useGetConversation = () => {
	const [loading, setLoading] = useState(false)
	const { messages, setMessages, selectedConversation } = useConversation()

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true)
			try {
				const res = await Axios.get(`/api/v1/conversations/${selectedConversation.id}/messages?sort_by=-time`)
				if (res.status === 200) {
					setMessages(res.data.data)
				}
			} catch (error) {
				toast.error(error.message)
			} finally {
				setLoading(false)
			}
		}
		if (selectedConversation?.id) getMessages();
	}, [selectedConversation?.id, setMessages])

	return { messages, loading };
}

export default useGetConversation