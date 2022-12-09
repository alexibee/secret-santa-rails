import { createContext, useState } from 'react';

export const PageContext = createContext({
	pageNr: 0,
	setPageNr: () => {},
});

export const PageProvider = ({ children }) => {
	const [pageNr, setPageNr] = useState(0);
	const value = {
		pageNr,
		setPageNr,
	};
	return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
