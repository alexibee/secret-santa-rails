import { useDispatch, useSelector } from 'react-redux';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';
import { selectAuthToken } from '../../store/auth/auth.selector';
import {
	resetAuthToInitialState,
	signOutUserAsync,
} from '../../store/auth/auth.action';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { resetEventToInitialState } from '../../store/santa-event/santa-event.action';

const Navbar = () => {
	const authToken = useSelector(selectAuthToken);
	const dispatch = useDispatch();

	const onSignOut = async (e) => {
		e.preventDefault();
		dispatch(signOutUserAsync(authToken));
		dispatch(resetAuthToInitialState());
		dispatch(setCurrentPage(1));
		dispatch(resetEventToInitialState());
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
