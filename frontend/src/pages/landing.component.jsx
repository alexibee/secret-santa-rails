import { Link } from 'react-router-dom';
import SnowParticles from '../components/snow-particles/snow-particles.component';

const Landing = () => {
	return (
		<div className='welcome-container'>
			<SnowParticles />
			<div>
				<h1> Organising a Secret Santa Event?</h1>
				<h2> We're here to help!</h2>
				<Link to='create-event'>LET'S START!</Link>
				<img
					src='santaclaws.png'
					alt='santa claus'
				/>
			</div>
		</div>
	);
};

export default Landing;
