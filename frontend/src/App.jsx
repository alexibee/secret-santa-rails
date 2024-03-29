import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home.component';
import Auth from './pages/auth.component';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar.component';
import Events from './pages/events.component';
import EventShow from './pages/event-show.component';
import Wishlist from './pages/wishlist.component';
import { selectAuthError, selectAuthToken } from './store/auth/auth.selector';
import {
	resetAuthToInitialState,
	signInUserWithTokenAsync,
} from './store/auth/auth.action';
import CreateEvent from './pages/create-event.component';
import { setCurrentPage } from './store/pagination/pagination.action';
import { resetEventToInitialState } from './store/santa-event/santa-event.action';
import Landing from './pages/landing.component';
import Error404 from './pages/error404.component';

function App() {
	const dispatch = useDispatch();
	const authToken = useSelector(selectAuthToken);
	const error = useSelector(selectAuthError);
	const navigate = useNavigate();
	const [isNavOpen, setIsNavOpen] = useState(false);

	useEffect(() => {
		if (authToken) {
			dispatch(signInUserWithTokenAsync(authToken));
		}
		if (error) {
			console.log(error.message);
			dispatch(resetAuthToInitialState());
			dispatch(setCurrentPage(1));
			dispatch(resetEventToInitialState());
			navigate('/');
		}
	});

	return (
		<div className='App'>
			{!!authToken && !isNavOpen && (
				<div className='burger'>
					<span
						onClick={() => {
							setIsNavOpen(true);
						}}
					>
						&#9776;
					</span>
				</div>
			)}
			<Navbar
				isNavOpen={isNavOpen}
				setIsNavOpen={setIsNavOpen}
			/>
			<Routes>
				<Route
					path='/'
					element={!authToken ? <Landing /> : <Home />}
				/>
				<Route
					path='/create-event'
					element={!!authToken ? <CreateEvent /> : <Auth />}
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
				<Route
					path='*'
					element={<Error404 />}
				/>
			</Routes>
		</div>
	);
}

export default App;
