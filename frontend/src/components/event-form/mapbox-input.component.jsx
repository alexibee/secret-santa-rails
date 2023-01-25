import { useEffect, useRef, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { setSecondHalfEventDetails } from '../../store/santa-event/santa-event.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectSecondSantaEventDetails } from '../../store/santa-event/santa-event.selector';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

const MapboxInput = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);
	const mboxAccessToken = process.env.REACT_APP_MBOX_TOKEN;
	mapboxgl.accessToken = mboxAccessToken;
	mapboxgl.workerClass = MapboxWorker.default;

	const dispatch = useDispatch();

	const blankFormFields = {
		location: '',
		lat: 51.5138,
		lng: -0.0984,
	};

	const santaSecondEventDetails = useSelector(selectSecondSantaEventDetails);

	const [formFields, setFormFields] = useState(
		santaSecondEventDetails || blankFormFields
	);
	const { lng, lat, location } = formFields;

	const zoom = 9;
	const geocoder = new MapboxGeocoder({
		accessToken: mboxAccessToken,
		marker: false,
	});

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
		}).addControl(geocoder);
		if (location) {
			geocoder.setInput(location);
		}
	}, []);

	geocoder.on('result', (result) => {
		const address = result.result.place_name;
		const coords = result.result.center;
		if (marker.current) {
			marker.current.remove();
		}
		marker.current = new mapboxgl.Marker().setLngLat(coords).addTo(map.current);
		map.current.setZoom(12);
		map.current.setCenter(coords);
		setFormFields({ location: address, lat: coords[1], lng: coords[0] });
		dispatch(
			setSecondHalfEventDetails({
				location: address,
				lat: coords[1],
				lng: coords[0],
			})
		);
	});

	geocoder.on('clear', () => {
		if (marker.current) {
			marker.current.remove();
		}
		if (map.current) {
			map.current
				.setCenter([blankFormFields.lng, blankFormFields.lat])
				.setZoom(9);
		}
		setFormFields(blankFormFields);
		dispatch(setSecondHalfEventDetails(blankFormFields));
	});

	return (
		<div className='mapbox'>
			<FormInput
				type='number'
				step='0.0001'
				required
				name='lat'
				value={lat}
				id='coord-input'
				readOnly
			/>
			<FormInput
				type='number'
				step='0.0001'
				required
				name='lng'
				value={lng}
				id='coord-input'
				readOnly
			/>
			<FormInput
				type='text'
				required
				name='location'
				value={location}
				id='location-input'
				readOnly
			/>

			<div
				ref={mapContainer}
				id='map-container'
			/>
		</div>
	);
};
export default MapboxInput;
