import React, { useEffect, useState } from 'react'
import useDebounce from './useDebounce'
import Axios from '../api/index'
const useSearch = ({ query }) => {

	const [loading, setLoading] = useState(false)
	const [users, setUsers] = useState([])
	const debounceSearch = useDebounce(query, 700)
	const searchUsers = async () => {
		setLoading(true)
		try {
			const res = await Axios.get(`/api/v1/users/search?q=${debounceSearch}`)
			if (res.status === 200) {
				setUsers(res.data.data)
			}
		} catch (error) {
			console.log(error);
		} finally {
			clearTimeout()
			setLoading(false)
		}
	}
	useEffect(() => {
		searchUsers()
	}, [debounceSearch])

	return { loading, users, searchUsers }
}

export default useSearch