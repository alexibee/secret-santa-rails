import { createContext, useState } from 'react';

export const GroupContext = createContext({
	group: null,
	setGroup: () => {},
	members: [],
	setMember: () => {},
});

export const GroupProvider = ({ children }) => {
	const [group, setGroup] = useState(null);
	const [members, setMembers] = useState([]);
	const value = {
		group,
		setGroup,
		members,
		setMembers,
	};
	return (
		<GroupContext.Provider value={value}>{children}</GroupContext.Provider>
	);
};
