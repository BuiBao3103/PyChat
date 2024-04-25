import axios from "axios"

export default axios.create({
	baseURL: "http://127.0.0.1:5000/",
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json; charset=utf-8'
	},
	withCredentials: true,
})