import React, { useEffect, useState } from 'react'
import Axios from '../api/index'
import useConversation from '../zustand/useConversation'
const useGetAllImages = () => {
	const { selectedConversation } = useConversation()
	const [imagesData, setImagesData] = useState([])
	const getAllImages = async () => {
		try {
			const res = await Axios.get(`/api/v1/conversations/${selectedConversation.id}/images?sort_by=-time`)
			if (res.status == 200) {
				setImagesData(res.data.data)
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		if (selectedConversation?.id) getAllImages();
	}, [selectedConversation?.id, setImagesData])

	return { imagesData, getAllImages };
}

export default useGetAllImages