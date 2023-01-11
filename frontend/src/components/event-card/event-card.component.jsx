import './event-card.styles.scss';

const EventCard = ({ eventDetails }) => {
	console.log(eventDetails);

	return (
		<div className='event-card'>
			<div>
				<h4>{eventDetails.title}</h4>
				<p>
					at <span>{eventDetails.location}</span>
				</p>
				<p>
					<span>{eventDetails.date}</span>
				</p>
			</div>
			<div></div>
		</div>
	);
};

export default EventCard;
