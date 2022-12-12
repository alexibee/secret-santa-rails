import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='welcome-container'>
			<div>
				<h1> Organising a Secret Santa Event?</h1>
				<Link to='create-event'>LET'S START!</Link>
			</div>
		</div>
	);
};

export default Home;
