import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import {
	selectFirstSantaEventDetails,
	selectSecondSantaEventDetails,
} from '../../store/santa-event/santa-event.selector';
import Button from '../button/button.component';
import './event-step.styles.scss';

import MapboxInput from './mapbox-input.component';
import EventStepHalf from './half-step.component';

const EventStep = () => {
	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const santaFirstEventDetails = useSelector(selectFirstSantaEventDetails);
	const santaSecondEventDetails = useSelector(selectSecondSantaEventDetails);

	const location =
		santaSecondEventDetails && santaSecondEventDetails.location
			? santaSecondEventDetails.location
			: '';
	const title =
		santaFirstEventDetails && santaFirstEventDetails.title
			? santaFirstEventDetails.title
			: '';

	useEffect(() => {
		setButtonDisabled(!(title && location));
	});

	const onClickNext = (e) => {
		e.preventDefault();
		dispatch(setCurrentPage(2));
	};

	return (
		<div
			className={`event-form-container${currentPage !== 1 ? ' d-none' : ''}`}
		>
			<h1>Create a new event</h1>
			<EventStepHalf />
			<MapboxInput />
			<Button
				disabled={buttonDisabled}
				onClick={onClickNext}
			>
				Next
			</Button>
		</div>
	);
};
export default EventStep;
