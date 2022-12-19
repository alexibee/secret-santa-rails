import { WISHLIST_ACTION_TYPES } from './wishlist.types';

const WISHLIST_INITIAL_STATE = {
	wishlist: null,
	isLoading: true,
	error: null,
};

export const WishlistReducer = (
	state = WISHLIST_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		case WISHLIST_ACTION_TYPES.SET_WISHLIST:
			return { ...state, wishlist: payload, isLoading: false };
		case WISHLIST_ACTION_TYPES.DATA_TRANSFER_FAIL:
			return { ...state, error: payload, isLoading: false };
		case WISHLIST_ACTION_TYPES.DATA_TRANSFER_START:
			return { ...state, isLoading: true };
		case WISHLIST_ACTION_TYPES.DATA_TRANSFER_SUCCESS:
			return { ...state, isLoading: false };
		default:
			return state;
	}
};
