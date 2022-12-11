import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Draw from '../components/draw/draw.component';
import EventForm from '../components/event-form/event-form.component';
import GroupForm from '../components/group-form/group-form.component';
import Welcome from '../components/welcome/welcome.component';

const Home = () => {
	// const [events, setEvents] = useState([]);

	// const getEvents = async () => {
	// 	try {
	// 		const data = await axios
	// 			.get('http://localhost:4000/api/v1/events')
	// 			.then((response) => {
	// 				console.log(response.data);
	// 				setEvents(response.data);
	// 			});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };
	// useEffect(() => {
	// 	getEvents();
	// }, [events]);

	return (
		<>
			<div className='main-form-container'>
				<Welcome id='welcome' />
				<form>
					<EventForm id='eventf' />
					<GroupForm id='groupf' />
					<Draw id='draw' />
				</form>
			</div>
			{/* <Link> Your wishlist </Link> */}
		</>
	);
};

export default Home;
