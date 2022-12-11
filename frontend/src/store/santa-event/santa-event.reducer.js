import { SANTA_EVENT_ACTION_TYPES } from './santa-event.types';

const SANTA_EVENT_INITIAL_STATE = {
	santaEvent: null,
	group: null,
	pairs: null,
	isLoading: false,
	error: null,
};

export const santaEventReducer = (
	state = SANTA_EVENT_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		case SANTA_EVENT_ACTION_TYPES.SET_EVENT_DETAILS:
			return { ...state, santaEvent: payload };
		case SANTA_EVENT_ACTION_TYPES.SET_GROUP_DETAILS:
			return { ...state, group: payload };
		case SANTA_EVENT_ACTION_TYPES.SET_PAIRS_DETAILS:
			return { ...state, pairs: payload };
		case SANTA_EVENT_ACTION_TYPES.PERSIST_DATA_START:
			return { ...state, isLoading: true };
		case SANTA_EVENT_ACTION_TYPES.PERSIST_DATA_SUCCESS:
			return { ...state, isLoading: false };
		case SANTA_EVENT_ACTION_TYPES.RESET_TO_INITIAL_STATE:
			return SANTA_EVENT_INITIAL_STATE;
		default:
			return state;
	}
};
