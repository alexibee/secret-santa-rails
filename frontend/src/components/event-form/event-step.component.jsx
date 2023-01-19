import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import { setEventDetails } from '../../store/santa-event/santa-event.action';
import { selectSantaEventDetails } from '../../store/santa-event/santa-event.selector';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import DatePicker from 'react-datepicker';
import './event-step.styles.scss';

import MapboxInput from './mapbox-input.component';

const EventStep = () => {
	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();
	const startDate = new Date();

	// const mapContainer = useRef(null);
	// const map = useRef(null);
	// const marker = useRef(null);
	// const [lng, setLng] = useState(-0.0984);
	// const [lat, setLat] = useState(51.5138);
	// const [zoom, setZoom] = useState(9);
	// const mboxAccessToken = process.env.REACT_APP_MBOX_TOKEN;
	// mapboxgl.accessToken = mboxAccessToken;

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

	useEffect(() => {
		if (santaEventDetails) {
			setFormFields(santaEventDetails);
		}
	});

	// const geocoder = new MapboxGeocoder({
	// 	accessToken: mboxAccessToken,
	// 	marker: false,
	// });

	// useEffect(() => {
	// 	if (map.current) return;
	// 	map.current = new mapboxgl.Map({
	// 		container: mapContainer.current,
	// 		style: 'mapbox://styles/mapbox/streets-v12',
	// 		center: [lng, lat],
	// 		zoom: zoom,
	// 	}).addControl(geocoder);
	// 	if (location) {
	// 		console.log(location);
	// 		geocoder.setInput(location);
	// 	}
	// }, []);

	// geocoder.on('result', (result) => {
	// 	const location = result.result.place_name;
	// 	setFormFields({ ...formFields, location: location });
	// 	if (marker.current) {
	// 		marker.current.remove();
	// 	}
	// 	marker.current = new mapboxgl.Marker()
	// 		.setLngLat(result.result.center)
	// 		.addTo(map.current);
	// 	map.current.setZoom(12);
	// 	map.current.setCenter(result.result.center);
	// });

	// geocoder.on('clear', () => {
	// 	if (marker.current) {
	// 		marker.current.remove();
	// 	}
	// 	setFormFields({ ...formFields, location: '' });
	// });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
		dispatch(setEventDetails({ ...formFields, [name]: value }));
	};
	const handleDateChange = (date) => {
		setFormFields({ ...formFields, date: date });
		dispatch(setEventDetails({ ...formFields, date: date }));
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
			<MapboxInput
				formFields={formFields}
				setFormFields={setFormFields}
			/>
			{/* <FormInput
				label='Location'
				type='text'
				required
				name='location'
				onChange={handleChange}
				value={location}
			/> */}
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
