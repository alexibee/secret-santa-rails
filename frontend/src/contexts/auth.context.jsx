import { createContext, useState } from 'react';

export const AuthContext = createContext({
	user: JSON.parse(localStorage.getItem('user')) || {
		id: null,
		username: null,
		email: null,
	},
	authToken: localStorage.getItem('authToken') || '',
	setAuthToken: () => {},
	setUserInfo: () => {},
});

export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(
		JSON.parse(localStorage.getItem('user')) || {
			id: null,
			username: null,
			email: null,
		}
	);
	const [authToken, setAuthToken] = useState(
		localStorage.getItem('authToken') || ''
	);
	const value = {
		userInfo,
		setUserInfo,
		authToken,
		setAuthToken,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
