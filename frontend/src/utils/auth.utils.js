import axios from 'axios';
import { BACKEND_URL } from './config.utils';

export const registerUserRequest = async (payload) => {
	const { email, password, confirmPassword } = payload;
	return await axios.post(`${BACKEND_URL}/users`, {
		user: {
			email: email,
			password: password,
			password_confirmation: confirmPassword,
		},
	});
};

export const signInUserRequest = async (userInfo) => {
	const { email, password } = userInfo;
	return await axios.post(`${BACKEND_URL}/users/sign_in`, {
		user: {
			email: email,
			password: password,
		},
	});
};

export const signInUserWithTokenRequest = async (authToken) => {
	const config = {
		headers: {
			Authorization: authToken,
		},
	};
	return await axios.get(`${BACKEND_URL}/user-member-data`, config);
};

export const signOutUserRequest = async (authToken) => {
	const config = {
		headers: {
			authorization: authToken,
		},
	};
	await axios.delete(`${BACKEND_URL}/users/sign_out`, config);
};
