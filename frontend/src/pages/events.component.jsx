import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/auth/auth.selector';
import Spinner from '../components/spinner/spinner.component';
import { selectSantaEventIsLoading } from '../store/santa-event/santa-event.selector';
import EventCard from '../components/event-card/event-card.component';

const Events = () => {
	const [orgEvents, setOrgEvents] = useState([]);
	const [partEvents, setPartEvents] = useState([]);
	const isLoading = useSelector(selectSantaEventIsLoading);
	const authToken = useSelector(selectAuthToken);

	const getEvents = async () => {
		const data = await axios.get('http://localhost:4000/api/v1/events', {
			headers: {
				Authorization: authToken,
			},
		});
		const { org_events, part_events } = data.data;
		setOrgEvents(org_events);
		setPartEvents(part_events);
	};

	useEffect(() => {
		getEvents();
	}, []);

	return isLoading ? (
		<Spinner />
	) : (
		<div className='event-container'>
			<div>
				<h1>Your organised events</h1>
				<div className='events-grid'>
					{orgEvents && orgEvents.length
						? orgEvents.map((orgEvent) => (
								<div
									key={`org-${orgEvent.id}`}
									className='grid-cell'
								>
									<EventCard eventDetails={orgEvent} />
								</div>
						  ))
						: 'no events yet'}
				</div>
			</div>
			<div>
				<h1> Events you participate in</h1>
				<div className='events-grid'>
					{partEvents && partEvents.length
						? partEvents.map((partEvent) => (
								<div
									key={`part-${partEvent.id}`}
									className='grid-cell'
								>
									<EventCard eventDetails={partEvent} />
								</div>
						  ))
						: 'no events yet'}
				</div>
			</div>
		</div>
	);
};

export default Events;
