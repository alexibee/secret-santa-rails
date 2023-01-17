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
import { AddressAutofill, config } from '@mapbox/search-js-react';
import mapboxgl from 'mapbox-gl';

const EventStep = () => {
	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();
	const startDate = new Date();
	const [feature, setFeature] = useState();
	const [mboxToken, setMboxToken] = useState('');

	const mapContainer = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);
	const [lng, setLng] = useState(-0.0984);
	const [lat, setLat] = useState(51.5138);
	const [zoom, setZoom] = useState(9);

	const [markerLng, setMarkerLng] = useState(-0.0984);
	const [markerLat, setMarkerLat] = useState(51.5138);

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
		const mboxAccessToken =
			'pk.eyJ1IjoiYWxleGliZWUiLCJhIjoiY2t6OGw2dXEyMDA3cTJ2bHBwOWZuZWFrYyJ9.EpZ7ocMU8RMsom-BLai1kQ';
		setMboxToken(mboxAccessToken);
		mapboxgl.accessToken = mboxAccessToken;
		config.accessToken = mboxAccessToken;
	}, []);

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
		});
	});

	useEffect(() => {
		if (!map.current) return;
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});

	useEffect(() => {
		if (!marker.current) {
			marker.current = new mapboxgl.Marker()
				.setLngLat([markerLng, markerLat])
				.addTo(map.current);
		} else {
			marker.current.remove();
			marker.current = new mapboxgl.Marker()
				.setLngLat([markerLng, markerLat])
				.addTo(map.current);
		}
	}, [markerLat, markerLng]);

	const handleRetrieve = useCallback(
		(res) => {
			const feature = res.features[0];
			setMarkerLng(feature.geometry.coordinates[0]);
			setMarkerLat(feature.geometry.coordinates[1]);
			setFeature(feature);
		},
		[setFeature]
	);

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
			<div className='mapbox'>
				<div>
					<AddressAutofill
						accessToken={mboxToken}
						onRetrieve={handleRetrieve}
					>
						<FormInput
							placeholder='Start typing your address, e.g. 123 Main...'
							autoComplete='street-address'
							type='search'
							required
							name='location'
							value={location}
							onChange={handleChange}
							id='mapbox-autofill'
						/>
					</AddressAutofill>
				</div>
				<div
					ref={mapContainer}
					className='map-container'
				/>
				{/* <div id='minimap-container'>
					<AddressMinimap
						canAdjustMarker={true}
						satelliteToggle={true}
						feature={feature || defaultFeature}
						footer={false}
						show={true}
						onSaveMarkerLocation={handleSaveMarkerLocation}
					/>
				</div> */}
			</div>
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
