import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';

const EventShow = () => {
	const { authToken } = useContext(AuthContext);
	const [secretEvent, setSecretEvent] = useState(null);
	const [eventMembers, setEventMembers] = useState([]);
	const [giftReceiver, setGiftReceiver] = useState(null);
	const [recWishlist, setRecWishlist] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const params = useParams();

	const getEvent = async () => {
		const data = await axios.get(
			`http://localhost:4000/api/v1/events/${params.event_id}`,
			{
				headers: {
					Authorization: authToken,
				},
			}
		);
		setSecretEvent(data.data[0]);
		setEventMembers(data.data[1]);
		setGiftReceiver(data.data[2].receiver);
		setRecWishlist(data.data[2].rec_wishlist);
	};

	const onClickWishlist = () => {
		setIsVisible(true);
	};

	useEffect(() => {
		getEvent();
	}, []);

	return (
		<>
			{secretEvent && (
				<div className='event-show-container'>
					<div>
						<h1>Event: {secretEvent.title}</h1>
						<h2>Date: {secretEvent.date}</h2>
						<h2>Location: {secretEvent.location}</h2>
					</div>
					<div>
						<h3>Participants of the event:</h3>
						{eventMembers.map((eventMember) => (
							<h4 key={eventMember.id}> {eventMember.name}</h4>
						))}
					</div>
					{giftReceiver && (
						<div>
							<h3>Lucky receiver of your gift:</h3>
							<h4>{giftReceiver.name}</h4>
							{!isVisible ? (
								<Link onClick={onClickWishlist}>Check their wishlist</Link>
							) : (
								<>
									<h1>Their wishlist:</h1>
									<div>
										{!!recWishlist.length ? (
											recWishlist.map((gift) => (
												<p key={gift.id}>{gift.name}</p>
											))
										) : (
											<h3>Nothing here yet!</h3>
										)}
									</div>
								</>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default EventShow;
