import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { EventProvider } from './contexts/event.context';
import { PageProvider } from './contexts/page.context';
import { GroupProvider } from './contexts/group.context';
import { AuthProvider } from './contexts/auth.context';
import { WishlistProvider } from './contexts/wishlist.context';
import { LoadingProvider } from './contexts/loading.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<LoadingProvider>
				<PageProvider>
					<EventProvider>
						<GroupProvider>
							<WishlistProvider>
								<BrowserRouter>
									<App />
								</BrowserRouter>
							</WishlistProvider>
						</GroupProvider>
					</EventProvider>
				</PageProvider>
			</LoadingProvider>
		</AuthProvider>
	</React.StrictMode>
);
