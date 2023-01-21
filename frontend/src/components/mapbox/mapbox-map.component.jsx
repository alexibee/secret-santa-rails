import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { useRef } from 'react';
import './mapbox-map.styles.scss';

const MapboxMap = ({ lng, lat }) => {
	const mboxAccessToken = process.env.REACT_APP_MBOX_TOKEN;
	mapboxgl.accessToken = mboxAccessToken;

	const showMap = useRef(null);
	const mapCont = useRef(null);
	const marker = useRef(null);

	const zoom = 9;

	useEffect(() => {
		if (showMap.current) return;
		showMap.current = new mapboxgl.Map({
			container: mapCont.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
		}).resize();
		if (lng && lat) {
			marker.current = new mapboxgl.Marker()
				.setLngLat([lng, lat])
				.addTo(showMap.current);
		}
	}, []);

	return (
		<div className='map-show'>
			<div
				ref={mapCont}
				id='map-show-container'
			/>
		</div>
	);
};
export default MapboxMap;
