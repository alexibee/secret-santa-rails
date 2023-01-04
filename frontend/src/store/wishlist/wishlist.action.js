import { createAction } from '../../utils/reducer.utils';
import { WISHLIST_ACTION_TYPES } from './wishlist.types';

export const setWishlist = (payload) =>
	createAction(WISHLIST_ACTION_TYPES.SET_WISHLIST, payload);

export const setDataTransferError = (error) =>
	createAction(WISHLIST_ACTION_TYPES.DATA_TRANSFER_FAIL, error);

export const setDataTransferStart = () =>
	createAction(WISHLIST_ACTION_TYPES.DATA_TRANSFER_START);

export const setDataTransferSuccess = () =>
	createAction(WISHLIST_ACTION_TYPES.DATA_TRANSFER_SUCCESS);

export const setWish = (payload) =>
	createAction(WISHLIST_ACTION_TYPES.SET_WISH, payload);
