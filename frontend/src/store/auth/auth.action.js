import {
	registerUserRequest,
	signInUserRequest,
	signInUserWithTokenRequest,
	signOutUserRequest,
} from '../../utils/auth.utils';
import { createAction } from '../../utils/reducer.utils';
import { AUTH_ACTION_TYPES } from './auth.types';

export const setCurrentUserStart = () =>
	createAction(AUTH_ACTION_TYPES.SET_CURRENT_USER_START);

export const setCurrentUserSuccess = (user) =>
	createAction(AUTH_ACTION_TYPES.SET_CURRENT_USER_SUCCESS, user);

export const setAuthToken = (authToken) =>
	createAction(AUTH_ACTION_TYPES.SET_AUTH_TOKEN, authToken);

export const setCurrentUserFail = (error) =>
	createAction(AUTH_ACTION_TYPES.SET_CURRENT_USER_FAIL, error);

export const resetAuthToInitialState = () =>
	createAction(AUTH_ACTION_TYPES.RESET_TO_INITIAL_STATE);

export const registerUserAsync = (userInfo) => async (dispatch) => {
	dispatch(setCurrentUserStart());
	try {
		const data = await registerUserRequest(userInfo);
		if (data) {
			const user = data.data.user;
			const authToken = data.headers.authorization;
			dispatch(setAuthToken(authToken));
			dispatch(setCurrentUserSuccess(user));
		}
	} catch (error) {
		dispatch(setCurrentUserFail(error));
	}
};

export const signInUserAsync = (userInfo) => async (dispatch) => {
	dispatch(setCurrentUserStart());
	try {
		const data = await signInUserRequest(userInfo);
		if (data) {
			const user = data.data.user;
			const authToken = data.headers.authorization;
			dispatch(setAuthToken(authToken));
			dispatch(setCurrentUserSuccess(user));
		}
	} catch (error) {
		dispatch(setCurrentUserFail(error));
	}
};

export const signInUserWithTokenAsync = (authToken) => async (dispatch) => {
	dispatch(setCurrentUserStart());
	try {
		const data = await signInUserWithTokenRequest(authToken);
		if (data) {
			const user = data.data.user;
			dispatch(setCurrentUserSuccess(user));
		}
	} catch (error) {
		dispatch(setCurrentUserFail(error));
	}
};

export const signOutUserAsync = (authToken) => async (dispatch) => {
	dispatch(setCurrentUserStart());
	try {
		await signOutUserRequest(authToken);
		dispatch(setAuthToken(null));
		dispatch(setCurrentUserSuccess({ id: null, email: null }));
	} catch (error) {
		dispatch(setCurrentUserFail(error));
		dispatch(resetAuthToInitialState());
	}
};
