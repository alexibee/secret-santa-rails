import { createContext, useState } from 'react';

export const EventContext = createContext({
	santaEvent: null,
	setSantaEvent: () => {},
});

export const EventProvider = ({ children }) => {
	const [santaEvent, setSantaEvent] = useState(null);
	const value = {
		santaEvent,
		setSantaEvent,
	};
	return (
		<EventContext.Provider value={value}>{children}</EventContext.Provider>
	);
};
