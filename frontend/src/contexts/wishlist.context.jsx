import { createContext, useState } from 'react';

export const WishlistContext = createContext({
	wishlist: null,
	gift: null,
	setWishlist: () => {},
	setGift: () => {},
});

export const WishlistProvider = ({ children }) => {
	const [wishlist, setWishlist] = useState(null);
	const [gift, setGift] = useState(null);
	const value = {
		gift,
		setGift,
		wishlist,
		setWishlist,
	};
	return (
		<WishlistContext.Provider value={value}>
			{children}
		</WishlistContext.Provider>
	);
};
