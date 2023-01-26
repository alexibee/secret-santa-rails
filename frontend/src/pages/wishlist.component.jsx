import axios from 'axios';
import { useEffect } from 'react';
import GiftForm from '../components/gift-form/gift-form.component';
import WishlistForm from '../components/wishlist-form/wishlist-form.component';
import { Link } from 'react-router-dom';
import { selectAuthToken } from '../store/auth/auth.selector';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectWishlist,
	selectWishlistIsLoading,
} from '../store/wishlist/wishlist.selector';
import {
	setDataTransferError,
	setDataTransferStart,
	setDataTransferSuccess,
	setWishlist,
} from '../store/wishlist/wishlist.action';
import Spinner from '../components/spinner/spinner.component';
import { BACKEND_URL } from '../utils/config.utils';

const Wishlist = () => {
	const wishlistData = useSelector(selectWishlist);
	const dispatch = useDispatch();
	const isLoading = useSelector(selectWishlistIsLoading);
	const authToken = useSelector(selectAuthToken);

	const getWishlist = async () => {
		dispatch(setDataTransferStart());
		try {
			const data = await axios.get(`${BACKEND_URL}/api/v1/own-wishlist`, {
				headers: {
					Authorization: authToken,
				},
			});
			dispatch(setWishlist(data.data));
			dispatch(setDataTransferSuccess());
		} catch (error) {
			dispatch(setDataTransferError(error));
			console.error(error);
		}
	};

	const onDeleteClick = (id) => async () => {
		dispatch(setDataTransferStart());
		try {
			const data = await axios.delete(
				`${BACKEND_URL}/api/v1/wishlists/${wishlistData.wishlist.id}/wishes/${id}`,
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			getWishlist();
			dispatch(setDataTransferSuccess());
		} catch (error) {
			dispatch(setDataTransferError(error));
			console.error(error);
		}
	};

	useEffect(() => {
		getWishlist();
	}, []);

	return isLoading ? (
		<Spinner />
	) : (
		<div>
			{!!wishlistData && !!wishlistData.wishlist ? (
				<div className='wishlist-container four-three-fr'>
					<div className='wishlist-list'>
						<h1>{wishlistData.wishlist.name}:</h1>
						{!wishlistData.wishes.length ? (
							<div> Your list is empty</div>
						) : (
							<div className='wishlist-grid'>
								{wishlistData.wishes.map((wish) => (
									<div
										className='grid-row'
										key={wish.id}
									>
										<div className='grid-cell'>
											<h4>
												{wish.name} (£{wish.price})
											</h4>
											<Link
												onClick={onDeleteClick(wish.id)}
												className='delete-cell'
											>
												&#10006;
											</Link>
										</div>
										<div className='grid-cell'>
											<a
												href={wish.url}
												target='_blank'
												rel='noreferrer'
											>
												link to item
											</a>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
					<GiftForm getWishlist={getWishlist} />
				</div>
			) : (
				<div className='wishlist-container'>
					<h2>You don't have a wishlist yet</h2>
					<h3>Create one now!</h3>
					<WishlistForm getWishlist={getWishlist} />
				</div>
			)}
		</div>
	);
};
export default Wishlist;
