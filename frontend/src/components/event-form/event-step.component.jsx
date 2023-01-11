import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import { setEventDetails } from '../../store/santa-event/santa-event.action';
import { selectSantaEventDetails } from '../../store/santa-event/santa-event.selector';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import DatePicker from 'react-datepicker';
import './event-step.styles.scss';
import AutofillCheckoutDemo from '../mapbox/mapbox-search.component';

const EventStep = () => {
	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();
	const startDate = new Date();

	const blankFormFields = {
		title: '',
		date: startDate,
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
	const handleDateChange = (date) => {
		setFormFields({ ...formFields, date: date });
	};

	const onClickNext = (e) => {
		e.preventDefault();
		dispatch(setEventDetails(formFields));
		dispatch(setCurrentPage(2));
	};

	const buttonDisabled = !(title && date && location);

	const CustomDateInput = ({ value, onClick }) => (
		<FormInput
			label='Date'
			value={value}
			onClick={onClick}
			onChange={() => {}}
		/>
	);

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
			<DatePicker
				name='date'
				selected={new Date(date)}
				minDate={startDate}
				onChange={handleDateChange}
				customInput={<CustomDateInput />}
				required
				popperModifiers={[
					{
						name: 'offset',
						options: {
							offset: [30, -30],
						},
					},
				]}
			/>
			<AutofillCheckoutDemo />
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
