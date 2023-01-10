import './event-card.styles.scss';

const EventCard = ({ eventDetails }) => {
	console.log(eventDetails);

	return (
		<div className='event-card'>
			<div>
				<h4>{eventDetails.title}</h4>
				<p>location: {eventDetails.location}</p>
			</div>
			<div></div>
		</div>
	);
};

export default EventCard;
