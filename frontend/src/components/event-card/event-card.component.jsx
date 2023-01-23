import './event-card.styles.scss';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const EventCard = ({ eventDetails }) => {
	return (
		<Link to={`${eventDetails.id}`}>
			<div className='event-card'>
				<div>
					<h4>{eventDetails.title}</h4>
					<p>
						at <span>{eventDetails.location}</span>
					</p>
					<p>
						<span>{format(new Date(eventDetails.date), 'MM-dd-yyyy')}</span>
					</p>
				</div>
			</div>
		</Link>
	);
};

export default EventCard;
