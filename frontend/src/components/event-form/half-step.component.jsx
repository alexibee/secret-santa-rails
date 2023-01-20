import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstHalfEventDetails } from '../../store/santa-event/santa-event.action';
import { selectFirstSantaEventDetails } from '../../store/santa-event/santa-event.selector';
import FormInput from '../form-input/form-input.component';
import DatePicker from 'react-datepicker';
import './event-step.styles.scss';

const EventStepHalf = () => {
	const dispatch = useDispatch();
	const startDate = new Date();

	const blankFormFields = {
		title: '',
		date: startDate,
		description: '',
	};

	const santaFirstEventDetails = useSelector(selectFirstSantaEventDetails);

	const [formFields, setFormFields] = useState(
		santaFirstEventDetails || blankFormFields
	);
	const { title, date, description } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
		dispatch(setFirstHalfEventDetails({ ...formFields, [name]: value }));
	};
	const handleDateChange = (date) => {
		setFormFields({ ...formFields, date: date });
		dispatch(setFirstHalfEventDetails({ ...formFields, date: date }));
	};

	const CustomDateInput = ({ value, onClick }) => (
		<FormInput
			label='Date'
			value={value}
			onClick={onClick}
			onChange={() => {}}
		/>
	);

	return (
		<div className='first-half'>
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
				dateFormat='dd/MM/yyyy'
				wrapperClassName='datepicker'
				required
				popperModifiers={[
					{
						name: 'offset',
						options: {
							offset: [30, 0],
						},
					},
				]}
			/>
		</div>
	);
};
export default EventStepHalf;
