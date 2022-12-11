import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.component';
import Auth from './pages/auth.component';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navbar from './components/navbar/navbar.component';
import axios from 'axios';
import Events from './pages/events.component';
import EventShow from './pages/event-show.component';
import Wishlist from './pages/wishlist.component';
import { selectAuthError, selectAuthToken } from './store/auth/auth.selector';
import { signInUserWithTokenAsync } from './store/auth/auth.action';

function App() {
	const dispatch = useDispatch();
	const authToken = useSelector(selectAuthToken);
	const error = useSelector(selectAuthError);

	useEffect(() => {
		console.log(authToken);
		if (authToken) {
			dispatch(signInUserWithTokenAsync(authToken));
		}
		if (error) {
			console.log(error.message);
		}
	}, []);

	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={!!authToken ? <Home /> : <Auth />}
				/>
				<Route
					path='/myevents'
					element={!!authToken ? <Events /> : <Auth />}
				/>
				<Route
					index
					path='myevents/:event_id'
					element={!!authToken ? <EventShow /> : <Auth />}
				/>
				<Route
					path='/mywishlist'
					element={!!authToken ? <Wishlist /> : <Auth />}
				/>
			</Routes>
		</div>
	);
}

export default App;
