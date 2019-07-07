import axios from 'axios'

const IP = 'http://192.168.100.63:3000'

//======================= GET NOTES =========================//

export const getNotes = (data) => {
	return {
		type: 'GET_NOTES',
		payload: axios.get(`${IP}/Notes?search=${data.search}&sort=${data.sort}`)
	}
}

export const getMoreNotes = (data) => {
	return {
		type: 'GET_MORE_NOTES',
		payload: axios.get(`${IP}/Notes?search=${data.search}&sort=${data.sort}&page=${data.page}`)
	}
}

export const getNotesByCategory = (data) => {
	return {
		type: 'GET_NOTES_BY_CATEGORY',
		payload: axios.get(`${IP}/Notes/Category/${data.category_id}?search=${data.search}&sort=${data.sort}`)
	}
}



export const postNote = (data) => {
	return {
		type: 'POST_NOTE',
		payload: axios.post(`${IP}/Notes`,{
			title: data.title,
			note: data.note,
			category_id: data.category_id
		})
	}
}

export const patchNote = (data) => {
	return {
		type: 'PATCH_NOTE',
		payload: axios.patch(`${IP}/Notes/${data.id}`, {
			title: data.title,
			note: data.note,
			category_id: data.category_id
		})
	}
}

export const deleteNote = (data) => {
	return {
		type: 'DELETE_NOTE',
		payload: axios.delete(`${IP}/Notes/${data}`)
	}
}