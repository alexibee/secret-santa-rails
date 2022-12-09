import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const { setUserInfo, setAuthToken, authToken, userInfo } =
		useContext(AuthContext);

	const onSignOut = async (e) => {
		e.preventDefault();
		try {
			await axios.delete('http://localhost:4000/users/sign_out', {
				headers: {
					Authorization: authToken,
				},
			});
			alert('Success!');
		} catch (e) {
			console.error(e);
		}
		localStorage.setItem('authToken', '');
		setAuthToken('');
		localStorage.setItem(
			'user',
			JSON.stringify({
				id: null,
				username: null,
				email: null,
			})
		);
		setUserInfo({
			id: null,
			username: null,
			email: null,
		});
	};
	return (
		!!userInfo.id && (
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
