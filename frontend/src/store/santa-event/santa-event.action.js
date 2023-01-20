import { createAction } from '../../utils/reducer.utils';
import { SANTA_EVENT_ACTION_TYPES } from './santa-event.types';

export const setFirstHalfEventDetails = (payload) =>
	createAction(SANTA_EVENT_ACTION_TYPES.SET_FIRST_HALF_EVENT_DETAILS, payload);
export const setSecondHalfEventDetails = (payload) =>
	createAction(SANTA_EVENT_ACTION_TYPES.SET_SECOND_HALF_EVENT_DETAILS, payload);
export const setGroupDetails = (payload) =>
	createAction(SANTA_EVENT_ACTION_TYPES.SET_GROUP_DETAILS, payload);
export const setMemberCount = (payload) =>
	createAction(SANTA_EVENT_ACTION_TYPES.SET_MEMBER_COUNT, payload);
export const setMemberData = (payload) =>
	createAction(SANTA_EVENT_ACTION_TYPES.SET_MEMBER_DATA, payload);
export const setShuffledMemberData = (payload) =>
	createAction(SANTA_EVENT_ACTION_TYPES.SET_SHUFFLED_MEMBER_DATA, payload);
export const setPairsDetails = (payload) =>
	createAction(SANTA_EVENT_ACTION_TYPES.SET_PAIRS_DETAILS, payload);
export const setDataTransferStart = () =>
	createAction(SANTA_EVENT_ACTION_TYPES.PERSIST_DATA_START);
export const setDataTransferSuccess = () =>
	createAction(SANTA_EVENT_ACTION_TYPES.PERSIST_DATA_SUCCESS);
export const setDataTransferError = (error) =>
	createAction(SANTA_EVENT_ACTION_TYPES.PERSIST_DATA_FAIL, error);
export const resetEventToInitialState = () =>
	createAction(SANTA_EVENT_ACTION_TYPES.RESET_TO_INITIAL_STATE);
