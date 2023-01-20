import mapboxgl from 'mapbox-gl';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const MapboxMap = ({ lng, lat }) => {
	const mboxAccessToken = process.env.REACT_APP_MBOX_TOKEN;
	mapboxgl.accessToken = mboxAccessToken;

	const showMap = useRef(null);
	const mapCont = useRef(null);
	console.log(lng, lat);

	const zoom = 12;

	useEffect(() => {
		if (showMap.current) return;
		showMap.current = new mapboxgl.Map({
			container: mapCont.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
		});
	}, []);

	return (
		<div
			ref={mapCont}
			id='map-container'
		/>
	);
};
export default MapboxMap;
