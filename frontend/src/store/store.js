import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { authReducer } from './auth/auth.reducer';
import { paginationReducer } from './pagination/pagination.reducer';
import { santaEventReducer } from './santa-event/santa-event.reducer';
import { WishlistReducer } from './wishlist/wishlist.reducer';

const rootReducer = combineReducers({
	auth: authReducer,
	pagination: paginationReducer,
	santaEvent: santaEventReducer,
	wishlist: WishlistReducer,
});

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth', 'pagination', 'santaEvent'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
	thunk,
	process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: middlewares,
	devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
