const initialState = {
	number: 10,
	data: [],
	results: [],
	isLoading: false,
	isError: false
}

export default category = (state = initialState, action) => {
	switch (action.type){

		//======= GET CATEGORY ======//

		case 'GET_CATEGORY_PENDING' :
			return {
				...state,
				isLoading: true
			}
		case 'GET_CATEGORY_REJECTED' :
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'GET_CATEGORY_FULFILLED' :
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload.data.values
			}

		//======= POST CATEGORY =======//

		case 'POST_CATEGORY_PENDING' :
			console.log(state.data)
			return {
				...state,
				isLoading: true
			}
		case 'POST_CATEGORY_REJECTED' :
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'POST_CATEGORY_FULFILLED' :
			return {
				...state,
				isLoading: false,
				isError: false,
				data: [...state.data, ...action.payload.data.values]
			}


		//========== DELETE CATEGORY =========//

		case 'DELETE_CATEGORY_PENDING' :
			console.log(state.data)
			return {
				...state,
				isLoading: true
			}
		case 'DELETE_CATEGORY_REJECTED' :
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'DELETE_CATEGORY_FULFILLED' :
			return {
				...state,
				isLoading: false,
				isError: false,
				data: state.data.filter(category => category.id !== action.payload.data.values)
			}

		default :
			return state;

	}
}