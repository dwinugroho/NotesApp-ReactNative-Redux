import axios from 'axios'

const IP = 'http://192.168.100.63:3000'

export const getCategory = () => {
	return {
		type: 'GET_CATEGORY',
		payload: axios.get(`${IP}/category`)
	}
}

export const postCategory = (data) => {
	return {
		type: 'POST_CATEGORY',
		payload: axios.post(`${IP}/category`, {
			category_name: data.category_name,
			image_url: data.image_url
		})
	}
}

export const deleteCategory = (data) => {
	return {
		type: 'DELETE_CATEGORY',
		payload: axios.delete(`${IP}/category/${data.category_id}`)
	}
}