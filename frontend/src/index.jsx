import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { EventProvider } from './contexts/event.context';
import { PageProvider } from './contexts/page.context';
import { GroupProvider } from './contexts/group.context';
import { AuthProvider } from './contexts/auth.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<PageProvider>
				<EventProvider>
					<GroupProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</GroupProvider>
				</EventProvider>
			</PageProvider>
		</AuthProvider>
	</React.StrictMode>
);
