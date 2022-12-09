import { createContext, useState } from 'react';

export const PageContext = createContext({
	pageNr: null,
	setPageNr: () => {},
});

export const PageProvider = ({ children }) => {
	const [pageNr, setPageNr] = useState(1);
	const value = {
		pageNr,
		setPageNr,
	};
	return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
