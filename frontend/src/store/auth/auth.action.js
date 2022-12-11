import axios from 'axios';
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

export const resetToInitialState = () =>
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
		dispatch(resetToInitialState());
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
		dispatch(resetToInitialState());
	}
};

const BASE_URL = 'http://localhost:4000/';

const registerUserRequest = async (payload) => {
	const { email, password, confirmPassword } = payload;
	return await axios.post(`${BASE_URL}users`, {
		user: {
			email: email,
			password: password,
			password_confirmation: confirmPassword,
		},
	});
};

const signInUserRequest = async (userInfo) => {
	const { email, password } = userInfo;
	return await axios.post(`${BASE_URL}users/sign_in`, {
		user: {
			email: email,
			password: password,
		},
	});
};

const signInUserWithTokenRequest = async (authToken) => {
	const config = {
		headers: {
			Authorization: authToken,
		},
	};
	return await axios.get(`${BASE_URL}user-member-data`, config);
};

const signOutUserRequest = async (authToken) => {
	const config = {
		headers: {
			authorization: authToken,
		},
	};
	await axios.delete(`${BASE_URL}users/sign_out`, config);
};
