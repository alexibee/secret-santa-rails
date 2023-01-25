import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/auth/auth.selector';
import Spinner from '../components/spinner/spinner.component';
import Modal from '../components/modal/modal.component';
import MapboxMap from '../components/mapbox/mapbox-map.component';
import { format } from 'date-fns';
import { BACKEND_URL } from '../utils/config.utils';

const EventShow = () => {
	const authToken = useSelector(selectAuthToken);
	const [secretEvent, setSecretEvent] = useState(null);
	const [eventMembers, setEventMembers] = useState([]);
	const [giftReceiver, setGiftReceiver] = useState(null);
	const [recWishlist, setRecWishlist] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const params = useParams();

	const getEvent = async () => {
		setIsLoading(true);
		try {
			const data = await axios.get(
				`${BACKEND_URL}/api/v1/events/${params.event_id}`,
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
						<div className='event-details'>
							<MapboxMap
								lng={secretEvent.lng}
								lat={secretEvent.lat}
							/>
							<div className='headers-container'>
								<h1>
									Event: <span>{secretEvent.title}</span>
								</h1>
								<h2>
									Date:
									<span>
										{format(new Date(secretEvent.date), 'MM-dd-yyyy')}
									</span>
								</h2>
								<h2>
									Location: <span>{secretEvent.location}</span>
								</h2>
							</div>
						</div>
						<div className='participants-details'>
							<div className='participants-container'>
								<h3>Participants of the event:</h3>
								{eventMembers.map((eventMember) => (
									<h4 key={eventMember.id}>
										<span>{eventMember.name}</span>
									</h4>
								))}
							</div>
							{giftReceiver && (
								<div className='receiver-info'>
									<h3>Lucky receiver of your gift:</h3>
									<h4>
										<span>{giftReceiver.name}</span>
									</h4>
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
					</div>
				</div>
			)}
		</>
	);
};

export default EventShow;
