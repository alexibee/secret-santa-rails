import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { authReducer } from './auth/auth.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	// pagination: paginationReducer,
	// santaEvent: santaEventReducer,
});

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['santaEvent', 'pagination', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
	process.env.NODE_ENV !== 'production' && logger,
	thunk,
].filter(Boolean);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: middlewares,
	devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
