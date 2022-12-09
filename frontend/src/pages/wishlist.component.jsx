import { useState } from 'react';
import Button from '../components/button/button.component';

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);
	return (
		<div>
			{wishlist.length ? (
				<div>wishlist</div>
			) : (
				<div>
					<Button>Create Your Wishlist</Button>
				</div>
			)}
		</div>
	);
};
export default Wishlist;
