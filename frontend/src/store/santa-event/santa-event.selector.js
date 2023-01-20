import { createSelector } from 'reselect';

export const selectSantaEventReducer = (state) => state.santaEvent;

export const selectFirstSantaEventDetails = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.santaEventFirst
);
export const selectSecondSantaEventDetails = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.santaEventSecond
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

export const selectSantaEventIsLoading = createSelector(
	[selectSantaEventReducer],
	(santaEventSlice) => santaEventSlice.isLoading
);
