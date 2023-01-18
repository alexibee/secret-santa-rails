import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/auth/auth.selector';
import Spinner from '../components/spinner/spinner.component';
import Modal from '../components/modal/modal.component';
import mapboxgl from 'mapbox-gl';

const EventShow = () => {
	const authToken = useSelector(selectAuthToken);
	const [secretEvent, setSecretEvent] = useState(null);
	const [eventMembers, setEventMembers] = useState([]);
	const [giftReceiver, setGiftReceiver] = useState(null);
	const [recWishlist, setRecWishlist] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const mapContainer = useRef(null);
	const map = useRef(null);

	const [lng, setLng] = useState(-0.0984);
	const [lat, setLat] = useState(51.5138);
	const [zoom, setZoom] = useState(9);

	const params = useParams();
	console.log(mapContainer.current);

	useEffect(() => {
		const mboxAccessToken = process.env.REACT_APP_MBOX_TOKEN;
		mapboxgl.accessToken = mboxAccessToken;
	}, []);

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
		});
	}, []);

	const getEvent = async () => {
		setIsLoading(true);
		try {
			const data = await axios.get(
				`http://localhost:4000/api/v1/events/${params.event_id}`,
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			setSecretEvent(data.data.event);
			setEventMembers(data.data.members);
			setGiftReceiver(data.data.receiver_data.receiver);
			setRecWishlist(data.data.receiver_data.rec_wishlist);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const onClickWishlist = () => {
		setIsVisible(true);
	};

	useEffect(() => {
		getEvent();
	}, []);

	return isLoading ? (
		<Spinner />
	) : (
		<>
			{secretEvent && (
				<div className='event-show-container'>
					<div className='event-show-card'>
						<div className='map-slot'>
							<div
								ref={mapContainer}
								className='map-container'
							/>
						</div>
						<div className='headers-container'>
							<h1>Event: {secretEvent.title}</h1>
							<h2>Date: {secretEvent.date}</h2>
							<h2>Location: {secretEvent.location}</h2>
						</div>
						<div className='participants-container'>
							<h3>Participants of the event:</h3>
							{eventMembers.map((eventMember) => (
								<h4 key={eventMember.id}> {eventMember.name}</h4>
							))}
						</div>
					</div>
					{giftReceiver && (
						<div className='receiver-info'>
							<h3>Lucky receiver of your gift:</h3>
							<h4>{giftReceiver.name}</h4>
							{!isVisible ? (
								<Link onClick={onClickWishlist}>Check their wishlist</Link>
							) : (
								<Modal
									wishlist={recWishlist}
									isVisible={isVisible}
									setIsVisible={setIsVisible}
								/>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default EventShow;
