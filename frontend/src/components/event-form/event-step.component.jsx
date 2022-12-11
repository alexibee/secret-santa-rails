import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import { setEventDetails } from '../../store/santa-event/santa-event.action';
import { selectSantaEventDetails } from '../../store/santa-event/santa-event.selector';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './event-step.styles.scss';

const EventStep = () => {
	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();

	const blankFormFields = {
		title: '',
		date: '',
		location: '',
		description: '',
	};

	const santaEventDetails = useSelector(selectSantaEventDetails);

	const [formFields, setFormFields] = useState(
		santaEventDetails || blankFormFields
	);
	const { title, date, location, description } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const onClickNext = (e) => {
		e.preventDefault();
		dispatch(setEventDetails(formFields));
		dispatch(setCurrentPage(2));
	};

	const buttonDisabled = !(title && date && location);

	return (
		<div
			className={`event-form-container${currentPage !== 1 ? ' d-none' : ''}`}
		>
			<h1>Create a new event</h1>
			<FormInput
				label='Title'
				type='text'
				required
				name='title'
				onChange={handleChange}
				value={title}
			/>
			<FormInput
				label='Description'
				type='text'
				name='description'
				onChange={handleChange}
				value={description}
			/>
			<FormInput
				label='Date'
				type='date'
				required
				name='date'
				onChange={handleChange}
				value={date}
			/>
			<FormInput
				label='Location'
				type='text'
				required
				name='location'
				onChange={handleChange}
				value={location}
			/>
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
