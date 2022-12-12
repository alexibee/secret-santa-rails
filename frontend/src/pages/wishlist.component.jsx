import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import GiftForm from '../components/gift-form/gift-form.component';
import WishlistForm from '../components/wishlist-form/wishlist-form.component';
import { WishlistContext } from '../contexts/wishlist.context';
import { Link } from 'react-router-dom';
import { LoadingContext } from '../contexts/loading.context';
import { selectAuthToken } from '../store/auth/auth.selector';
import { useSelector } from 'react-redux';

const Wishlist = () => {
	const [ownWishlist, setOwnWishlist] = useState(null);
	const [giftWishes, setGiftWishes] = useState([]);
	const { isLoading, setIsLoading } = useContext(LoadingContext);
	const { gift } = useContext(WishlistContext);
	const authToken = useSelector(selectAuthToken);

	const getWishlist = async () => {
		try {
			const data = await axios.get(
				'http://localhost:4000/api/v1/own-wishlist',
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			setOwnWishlist(data.data[0]);
			setGiftWishes(data.data[1]);
		} catch (error) {
			console.error(error);
		}
	};

	const onDeleteClick = (id) => async () => {
		setIsLoading(true);
		try {
			const data = await axios.delete(
				`http://localhost:4000/api/v1/wishlists/${ownWishlist.id}/wishes/${id}`,
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			setIsLoading(false);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {}, []);

	useEffect(() => {
		getWishlist();
	}, [gift, isLoading]);

	return (
		<div>
			{!!ownWishlist ? (
				<div className='wishlist-container'>
					<h1>{ownWishlist.name}:</h1>
					{!giftWishes.length ? (
						<div> Your list is empty</div>
					) : (
						<div className='wishlist-grid'>
							{giftWishes.map((giftWish) => (
								<div
									className='grid-cell'
									key={giftWish.gift.id}
								>
									<h4>{giftWish.gift.name}</h4>
									<Link onClick={onDeleteClick(giftWish.wish[0].id)}>
										Delete
									</Link>
								</div>
							))}
						</div>
					)}
					<GiftForm />
				</div>
			) : (
				<div className='wishlist-container'>
					<h2>You don't have a wishlist yet</h2>
					<h3>Create one now!</h3>
					<WishlistForm />
				</div>
			)}
		</div>
	);
};
export default Wishlist;
