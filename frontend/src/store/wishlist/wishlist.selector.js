import { createSelector } from 'reselect';

export const selectWishlistReducer = (state) => state.wishlist;

export const selectWishlist = createSelector(
	[selectWishlistReducer],
	(wishlistSlice) => wishlistSlice.wishlist
);
