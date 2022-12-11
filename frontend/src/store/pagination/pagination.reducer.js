import { PAGINATION_ACTION_TYPES } from './pagination.types';

const PAGINATION_INITIAL_STATE = {
	currentPage: 0,
	isLoading: true,
	error: null,
};

export const paginationReducer = (
	state = PAGINATION_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		case PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE_NUMBER:
			return { ...state, currentPage: payload };
		default:
			return state;
	}
};
