import { createAction } from '../../utils/reducer.utils';
import { PAGINATION_ACTION_TYPES } from './pagination.types';

export const setCurrentPage = (number) =>
	createAction(PAGINATION_ACTION_TYPES.SET_CURRENT_PAGE_NUMBER, number);
