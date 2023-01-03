import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='home-container'>
			<div>
				<Link to='create-event'>
					<img
						src='santaclaws sm.png'
						alt='santa claus'
					/>
					<h1> Create a new event</h1>
				</Link>
				<Link to='/mywishlist'>
					<img
						src='santaclaws sm.png'
						alt='santa claus'
					/>
					<h1> See my wishlist </h1>
				</Link>
				<Link to='/myevents'>
					<img
						src='santaclaws sm.png'
						alt='santa claus'
					/>
					<h1> See my events </h1>
				</Link>
			</div>
		</div>
	);
};

export default Home;
