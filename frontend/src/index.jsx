import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { WishlistProvider } from './contexts/wishlist.context';
import { LoadingProvider } from './contexts/loading.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				<LoadingProvider>
					<WishlistProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</WishlistProvider>
				</LoadingProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
