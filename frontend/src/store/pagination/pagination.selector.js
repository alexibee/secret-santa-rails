import { createSelector } from 'reselect';

export const selectPaginationReducer = (state) => state.pagination;

export const selectCurrentPage = createSelector(
	[selectPaginationReducer],
	(paginationSlice) => paginationSlice.currentPage
);
