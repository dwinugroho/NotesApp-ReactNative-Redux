
const initialState = {
	number: 10,
	data: [],
	searchResult: [],
	info: [],
	category_id: null,
	isLoading: false,
	isLoadingMore: false,
	isError: false
}

export default notes = (state = initialState, action) => {
	switch(action.type){

		//====== GET NOTES ======//

		case 'GET_NOTES_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'GET_NOTES_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'GET_NOTES_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload.data.data,
				info: action.payload.data.info,
				searchResult: action.payload.data.searchResult,
				category_id: null,
			}

		case 'GET_MORE_NOTES_PENDING':
			return {
				...state,
				isLoading: false,
			}
		case 'GET_MORE_NOTES_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'GET_MORE_NOTES_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: [...state.data, ...action.payload.data.data],
				info: action.payload.data.info,
				searchResult: [...state.data, ...action.payload.data.searchResult],
				category_id: null,
			}

		case 'GET_NOTES_BY_CATEGORY_PENDING':
			return {
				...state,
				isLoading: false,
			}
		case 'GET_NOTES_BY_CATEGORY_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'GET_NOTES_BY_CATEGORY_FULFILLED':
			return {
				...state,
				isLoading: false,
				isLoadingMore: false,
				isError: false,
				data: [...action.payload.data.data],
				info: action.payload.data.info,
				searchResult: [...action.payload.data.searchResult],
				category_id: action.payload.data.data[0].category_id
			}

		//======= POST NOTE =======//

		case 'POST_NOTES_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'POST_NOTES_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'POST_NOTE_FULFILLED' :
			return {
				...state,
				isLoading: false,
				isError: false,
				data: [...action.payload.data.data, ...state.data],
				searchResult: [...action.payload.data.data, ...state.searchResult]
			}

		//====== UPDATE NOTE =======//

		case 'PATCH_NOTES_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'PATCH_NOTES_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'PATCH_NOTE_FULFILLED' :
			return {
				...state,
				isLoading: false,
				isError: false,
				data: [...action.payload.data.data, ...state.data.filter(note => note.id !== action.payload.data.data[0].id)]
			}


		case 'DELETE_NOTES_PENDING':
			return {
				...state,
				isLoading: true
			}
		case 'DELETE_NOTES_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true
			}
		case 'DELETE_NOTE_FULFILLED' :
			return {
				...state,
				isLoading: false,
				isError: false,
				data: state.data.filter(note => note.id !== action.payload.data.data)
			}
		default :
			return state;
	}
}