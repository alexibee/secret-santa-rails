import { createSelector } from 'reselect';

export const selectSantaEventReducer = (state) => state.santaEvent;

export const selectSantaEventDetails = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.santaEvent
);

export const selectGroupDetails = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.group
);

export const selectMemberCount = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.memberCount
);

export const selectMemberData = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.memberData
);

export const selectShuffledMemberData = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.shuffledMemberData
);

export const selectPairsDetails = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.pairs
);

export const selectSantaEventError = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.error
);
