import axios from 'axios';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';
import { selectAuthToken } from '../../store/auth/auth.selector';
import { signOutUserAsync } from '../../store/auth/auth.action';

const Navbar = () => {
	const authToken = useSelector(selectAuthToken);
	const dispatch = useDispatch();

	const onSignOut = async (e) => {
		e.preventDefault();
		dispatch(signOutUserAsync(authToken));
	};
	return (
		!!authToken && (
			<div className='navbar'>
				<a href='/'>Home</a>
				<div>
					<Link
						className='nav-right'
						to='/mywishlist'
					>
						My wishlist
					</Link>
					<Link
						to='/myevents'
						className='nav-right'
					>
						My events
					</Link>
					<button
						className='signOutBtn nav-right'
						onClick={onSignOut}
					>
						Sign out
					</button>
				</div>
			</div>
		)
	);
};

export default Navbar;
