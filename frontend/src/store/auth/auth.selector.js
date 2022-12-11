import { createSelector } from 'reselect';

export const selectAuthReducer = (state) => state.auth;

export const selectCurrentUser = createSelector(
	[selectAuthReducer],
	(authSlice) => authSlice.currentUser
);

export const selectUserIsLoading = createSelector(
	[selectAuthReducer],
	(authSlice) => authSlice.isLoading
);

export const selectAuthToken = createSelector(
	[selectAuthReducer],
	(authSlice) => authSlice.authToken
);

export const selectAuthError = createSelector(
	[selectAuthReducer],
	(authSlice) => authSlice.error
);
