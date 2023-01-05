import { createSelector } from 'reselect';

export const selectWishlistReducer = (state) => state.wishlist;

export const selectWishlist = createSelector(
	[selectWishlistReducer],
	(wishlistSlice) => wishlistSlice.wishlist
);

export const selectWishlistIsLoading = createSelector(
	[selectWishlistReducer],
	(wishlistSlice) => wishlistSlice.isLoading
);
