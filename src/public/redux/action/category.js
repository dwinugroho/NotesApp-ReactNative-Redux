import axios from 'axios'

export const getCategory = () => {
	return {
		type: 'GET_CATEGORY',
		payload: axios.get('http://192.168.100.63:3000/Category')
	}
}

export const postCategory = (data) => {
	return {
		type: 'POST_CATEGORY',
		payload: axios.post('http://192.168.100.63:3000/Category', {
			category_name: data.category_name,
			image_url: data.image_url
		})
	}
}

export const deleteCategory = (data) => {
	return {
		type: 'DELETE_CATEGORY',
		payload: axios.delete('http://192.168.100.63:3000/Category/'+data.category_id)
	}
}