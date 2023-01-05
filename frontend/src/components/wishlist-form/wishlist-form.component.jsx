import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './wishlist-form.styles.scss';
import { selectAuthToken } from '../../store/auth/auth.selector';
import {
	setDataTransferError,
	setDataTransferStart,
	setDataTransferSuccess,
	setWishlist,
} from '../../store/wishlist/wishlist.action';

const WishlistForm = ({ getWishlist }) => {
	const blankFormFields = { wishlistName: '' };
	const authToken = useSelector(selectAuthToken);
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(blankFormFields);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(blankFormFields);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(setDataTransferStart());
		try {
			const data = await axios.post(
				`http://localhost:4000/api/v1/wishlists`,
				{
					name: formFields['wishlistName'],
				},
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			dispatch(setWishlist(data.data));
			resetFormFields();
			window.alert('created!');
			getWishlist();
			dispatch(setDataTransferSuccess());
		} catch (err) {
			dispatch(setDataTransferError(err));
			console.error(err);
		}
	};

	return (
		<div className='wishlist-form-container'>
			<form onSubmit={handleSubmit}>
				<FormInput
					type='text'
					required
					placeholder='Name of your wishlist'
					name='wishlistName'
					value={formFields['wishlistName']}
					onChange={handleChange}
				/>
				<Button type='submit'>Create!</Button>
			</form>
		</div>
	);
};
export default WishlistForm;
