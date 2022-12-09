import './App.scss';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/home.component';
import Auth from './pages/auth.component';
import { AuthContext } from './contexts/auth.context';
import { useContext, useEffect } from 'react';
import Navbar from './components/navbar/navbar.component';
import axios from 'axios';
import Events from './pages/events.component';
import EventShow from './pages/event-show.component';
import Wishlist from './pages/wishlist.component';

function App() {
	const { authToken, setAuthToken, userInfo, setUserInfo } =
		useContext(AuthContext);
	const signInUserWithToken = async (payload) => {
		try {
			const data = await axios.post(
				'http://localhost:4000/users/sign_in',
				{
					user: payload,
				},
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			localStorage.setItem('user', JSON.stringify(data.data.user));
			setUserInfo(data.data.user);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			signInUserWithToken(userInfo);
		}
	}, []);

	useEffect(() => {
		axios.defaults.headers.common['Authorization'] = authToken;
	}, [authToken]);

	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={!!userInfo.id ? <Home /> : <Auth />}
				/>
				<Route
					path='/myevents'
					element={!!userInfo.id ? <Events /> : <Auth />}
				/>
				<Route
					index
					path='myevents/:event_id'
					element={!!userInfo.id ? <EventShow /> : <Auth />}
				/>
				<Route
					path='/mywishlist'
					element={!!userInfo.id ? <Wishlist /> : <Auth />}
				/>
			</Routes>
		</div>
	);
}

export default App;
