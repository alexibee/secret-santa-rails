import { useDispatch, useSelector } from 'react-redux';
import './navbar.styles.scss';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { selectAuthToken } from '../../store/auth/auth.selector';
import {
	resetAuthToInitialState,
	signOutUserAsync,
} from '../../store/auth/auth.action';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { resetEventToInitialState } from '../../store/santa-event/santa-event.action';

const Navbar = ({ isNavOpen, setIsNavOpen }) => {
	const authToken = useSelector(selectAuthToken);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSignOut = async (e) => {
		e.preventDefault();
		dispatch(signOutUserAsync(authToken));
		dispatch(resetAuthToInitialState());
		dispatch(setCurrentPage(1));
		dispatch(resetEventToInitialState());
		navigate('/');
	};
	return (
		!!authToken && (
			<div className='navbar-container'>
				<div className={`navbar${isNavOpen ? ' nav-open' : ''}`}>
					<span
						className='close-nav'
						onClick={() => {
							setIsNavOpen(false);
						}}
					>
						&times;
					</span>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/mywishlist'>My wishlist</Link>
						</li>
						<li>
							<Link to='/myevents'>My events</Link>
						</li>
						<li>
							<button
								className='signOutBtn'
								onClick={onSignOut}
							>
								Sign out
							</button>
						</li>
					</ul>
				</div>
			</div>
		)
	);
};

export default Navbar;
