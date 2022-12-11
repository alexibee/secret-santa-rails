import { AUTH_ACTION_TYPES } from './auth.types';

const AUTH_INITIAL_STATE = {
	currentUser: {
		id: null,
		email: null,
	},
	isLoading: true,
	authToken: null,
	error: null,
};

export const authReducer = (state = AUTH_INITIAL_STATE, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case AUTH_ACTION_TYPES.SET_CURRENT_USER_START:
			return { ...state, isLoading: true };
		case AUTH_ACTION_TYPES.SET_CURRENT_USER_SUCCESS:
			return { ...state, currentUser: payload, isLoading: false };
		case AUTH_ACTION_TYPES.SET_AUTH_TOKEN:
			return { ...state, authToken: payload };
		case AUTH_ACTION_TYPES.SET_CURRENT_USER_FAIL:
			return { ...state, error: payload, isLoading: false };
		case AUTH_ACTION_TYPES.RESET_TO_INITIAL_STATE:
			return AUTH_INITIAL_STATE;
		default:
			return state;
	}
};
