import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../store/auth/auth.selector';

const Events = () => {
	const [orgEvents, setOrgEvents] = useState([]);
	const [partEvents, setPartEvents] = useState([]);
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

	return (
		<div className='event-container'>
			<div>
				<h1>Your organised events</h1>
				<div className='events-grid'>
					{orgEvents.map((orgEvent) => (
						<div
							key={orgEvent.id}
							className='grid-cell'
						>
							<Link to={`${orgEvent.id}`}>{orgEvent.title}</Link>
						</div>
					))}
				</div>
			</div>
			<div>
				<h1> Events you participate in</h1>
				<div className='events-grid'>
					{partEvents.map((partEvent) => (
						<div
							key={partEvent.id}
							className='grid-cell'
						>
							<Link to={`${partEvent.id}`}>{partEvent.title}</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Events;
