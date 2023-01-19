import { useEffect, useRef, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { setEventDetails } from '../../store/santa-event/santa-event.action';
import { useDispatch } from 'react-redux';

const MapboxInput = ({ formFields, setFormFields }) => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);
	const [lng, setLng] = useState(-0.0984);
	const [lat, setLat] = useState(51.5138);
	const [zoom, setZoom] = useState(9);
	const dispatch = useDispatch();

	const mboxAccessToken = process.env.REACT_APP_MBOX_TOKEN;
	mapboxgl.accessToken = mboxAccessToken;

	const geocoder = new MapboxGeocoder({
		accessToken: mboxAccessToken,
		marker: false,
	});
	const { location } = formFields;

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
		}).addControl(geocoder);
	}, []);

	geocoder.on('result', (result) => {
		const location = result.result.place_name;
		setFormFields({ ...formFields, location: location });
		dispatch(setEventDetails({ ...formFields, location: location }));
		if (marker.current) {
			marker.current.remove();
		}
		marker.current = new mapboxgl.Marker()
			.setLngLat(result.result.center)
			.addTo(map.current);
		map.current.setZoom(12);
		map.current.setCenter(result.result.center);
	});

	geocoder.on('clear', () => {
		if (marker.current) {
			marker.current.remove();
		}
		setFormFields({ ...formFields, location: '' });
		dispatch(setEventDetails({ ...formFields, location: '' }));
	});

	return (
		<div className='mapbox'>
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
