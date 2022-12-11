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
				{orgEvents.map((orgEvent) => (
					<Link
						to={`${orgEvent.id}`}
						key={orgEvent.id}
					>
						{orgEvent.title}
					</Link>
				))}
			</div>
			<div>
				<h1> Events you participate in</h1>
				{partEvents.map((partEvent) => (
					<Link
						to={`${partEvent.id}`}
						key={partEvent.id}
					>
						{partEvent.title}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Events;
