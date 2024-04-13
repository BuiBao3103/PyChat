import React, { useEffect, useRef, useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import MessageDetail from './MessageDetail'
import useConversation from '../../zustand/useConversation'
import { useLoaderData, useParams } from 'react-router-dom'
import Axios from '../../api/index'
const MessageContainer = () => {
	const { setSelectedConversation } = useConversation()
	const params = useParams()
	const loader = useLoaderData()

	return (
		<div className='w-full h-full flex flex-row gap-3'>
			<div className="w-full flex flex-col gap-2 bg-white p-3 rounded-xl">
				<Messages msgConversation={loader} />
				<MessageInput />
			</div>
			<MessageDetail />
		</div>
	)
}

export const action = async ({ params }) => {
	console.log(params.conversationID)
	const res = await Axios.get(`/api/v1/conversations/${params.conversationID}/messages?sort_by=-time`)
	if (res.status === 200) {
		return res.data.data
	}
}

export default MessageContainer