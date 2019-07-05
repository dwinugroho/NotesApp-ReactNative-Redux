import axios from 'axios'

//======================= GET NOTES =========================//

export const getNotes = (data) => {
	return {
		type: 'GET_NOTES',
		payload: axios.get('http://192.168.100.63:3000/Notes?sort='+data.sort+'&search='+data.search)
	}
}

export const getMoreNotes = (data) => {
	return {
		type: 'GET_MORE_NOTES',
		payload: axios.get('http://192.168.100.63:3000/Notes?sort='+data.sort+'&search='+data.search+'&page='+data.page)
	}
}

export const getNotesByCategory = (data) => {
	return {
		type: 'GET_NOTES_BY_CATEGORY',
		payload: axios.get('http://192.168.100.63:3000/Notes/category/'+data.category_id+'?sort='+data.sort+'&search='+data.search)
	}
}



export const postNote = (data) => {
	return {
		type: 'POST_NOTE',
		payload: axios.post('http://192.168.100.63:3000/Notes',{
			title: data.title,
			note: data.note,
			category_id: data.category_id
		})
	}
}

export const patchNote = (data) => {
	return {
		type: 'PATCH_NOTE',
		payload: axios.patch('http://192.168.100.63:3000/Notes/'+ data.id, {
			title: data.title,
			note: data.note,
			category_id: data.category_id
		})
	}
}

export const deleteNote = (data) => {
	return {
		type: 'DELETE_NOTE',
		payload: axios.delete('http://192.168.100.63:3000/Notes/'+ data)
	}
}