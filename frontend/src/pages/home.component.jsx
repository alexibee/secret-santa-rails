import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../components/spinner/spinner.component';
import { selectUserIsLoading } from '../store/auth/auth.selector';

const Home = () => {
	const isLoading = useSelector(selectUserIsLoading);

	return isLoading ? (
		<Spinner />
	) : (
		<div className='home-container'>
			<div>
				<Link to='create-event'>
					<img
						src='sflake.png'
						alt='santa claus'
					/>
					<h1> Create a new event</h1>
				</Link>
				<Link to='/mywishlist'>
					<img
						src='sflake.png'
						alt='santa claus'
					/>
					<h1> See my wishlist </h1>
				</Link>
				<Link to='/myevents'>
					<img
						src='sflake.png'
						alt='santa claus'
					/>
					<h1> See my events </h1>
				</Link>
			</div>
		</div>
	);
};

export default Home;
