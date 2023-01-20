import { SANTA_EVENT_ACTION_TYPES } from './santa-event.types';

const SANTA_EVENT_INITIAL_STATE = {
	santaEventFirst: null,
	santaEventSecond: null,
	group: null,
	memberCount: [1, 2, 3, 4, 5],
	memberData: null,
	shuffledMemberData: null,
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
		case SANTA_EVENT_ACTION_TYPES.SET_FIRST_HALF_EVENT_DETAILS:
			return { ...state, santaEventFirst: payload };
		case SANTA_EVENT_ACTION_TYPES.SET_SECOND_HALF_EVENT_DETAILS:
			return { ...state, santaEventSecond: payload };
		case SANTA_EVENT_ACTION_TYPES.SET_GROUP_DETAILS:
			return { ...state, group: payload };
		case SANTA_EVENT_ACTION_TYPES.SET_MEMBER_COUNT:
			return { ...state, memberCount: payload };
		case SANTA_EVENT_ACTION_TYPES.SET_MEMBER_DATA:
			return { ...state, memberData: payload };
		case SANTA_EVENT_ACTION_TYPES.SET_SHUFFLED_MEMBER_DATA:
			return { ...state, shuffledMemberData: payload };
		case SANTA_EVENT_ACTION_TYPES.SET_PAIRS_DETAILS:
			return { ...state, pairs: payload };
		case SANTA_EVENT_ACTION_TYPES.PERSIST_DATA_START:
			return { ...state, isLoading: true };
		case SANTA_EVENT_ACTION_TYPES.PERSIST_DATA_SUCCESS:
			return { ...state, isLoading: false };
		case SANTA_EVENT_ACTION_TYPES.PERSIST_DATA_FAIL:
			return { ...state, isLoading: false, error: payload };
		case SANTA_EVENT_ACTION_TYPES.RESET_TO_INITIAL_STATE:
			return SANTA_EVENT_INITIAL_STATE;
		default:
			return state;
	}
};
