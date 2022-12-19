import axios from 'axios';
import { useEffect } from 'react';
import GiftForm from '../components/gift-form/gift-form.component';
import WishlistForm from '../components/wishlist-form/wishlist-form.component';
import { Link } from 'react-router-dom';
import { selectAuthToken } from '../store/auth/auth.selector';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlist } from '../store/wishlist/wishlist.selector';
import {
	setDataTransferError,
	setDataTransferStart,
	setDataTransferSuccess,
	setWishlist,
} from '../store/wishlist/wishlist.action';

const Wishlist = () => {
	const wishlistData = useSelector(selectWishlist);
	const dispatch = useDispatch();
	const authToken = useSelector(selectAuthToken);

	const getWishlist = async () => {
		dispatch(setDataTransferStart());
		try {
			const data = await axios.get(
				'http://localhost:4000/api/v1/own-wishlist',
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			console.log(data.data);
			dispatch(setWishlist(data.data));
		} catch (error) {
			dispatch(setDataTransferError(error));
			console.error(error);
		}
	};

	const onDeleteClick = (id) => async () => {
		dispatch(setDataTransferStart());
		try {
			const data = await axios.delete(
				`http://localhost:4000/api/v1/wishlists/${wishlistData.wishlist.id}/wishes/${id}`,
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			dispatch(setDataTransferSuccess());
		} catch (error) {
			dispatch(setDataTransferError(error));
			console.error(error);
		}
	};

	useEffect(() => {
		getWishlist();
	}, []);

	return (
		<div>
			{!!wishlistData ? (
				<div className='wishlist-container'>
					<h1>{wishlistData.wishlist.name}:</h1>
					{!wishlistData.wishes.length ? (
						<div> Your list is empty</div>
					) : (
						<div className='wishlist-grid'>
							{wishlistData.wishes.map((wish) => (
								<div
									className='grid-cell'
									key={wish.id}
								>
									<h4>{wish.name}</h4>
									<Link onClick={onDeleteClick(wish.id)}>Delete</Link>
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
