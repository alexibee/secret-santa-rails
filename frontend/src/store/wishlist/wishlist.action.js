import { createAction } from '../../utils/reducer.utils';
import { WISHLIST_ACTION_TYPES } from './wishlist.types';

export const set = (payload) =>
	createAction(WISHLIST_ACTION_TYPES.SET_WISHLIST, payload);
