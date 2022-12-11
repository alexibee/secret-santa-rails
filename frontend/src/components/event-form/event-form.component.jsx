import axios from 'axios';
import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EventContext } from '../../contexts/event.context';
import { selectAuthToken } from '../../store/auth/auth.selector';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './event-form.styles.scss';

const EventForm = () => {
	const { santaEvent, setSantaEvent } = useContext(EventContext);
	const currentPage = useSelector(selectCurrentPage);
	const authToken = useSelector(selectAuthToken);
	const dispatch = useDispatch();

	const blankFormFields = {
		title: '',
		date: '',
		location: '',
		description: '',
	};
	const [formFields, setFormFields] = useState(blankFormFields);
	const { title, date, location, description } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(blankFormFields);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				'http://localhost:4000/api/v1/events',
				{
					title: title,
					date: date,
					location: location,
					description: description,
				},
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			setSantaEvent(data);
			resetFormFields();
			window.alert('created!');
			dispatch(setCurrentPage(2));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div
			className={`event-form-container${currentPage !== 1 ? ' d-none' : ''}`}
		>
			<h1>Create a new event</h1>
			<form onSubmit={handleSubmit}>
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
				<Button type='submit'>Create!</Button>
			</form>
		</div>
	);
};
export default EventForm;
