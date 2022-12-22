import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../store/auth/auth.selector';
import {
	setDataTransferError,
	setDataTransferStart,
	setDataTransferSuccess,
} from '../../store/wishlist/wishlist.action';
import { selectWishlist } from '../../store/wishlist/wishlist.selector';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

const GiftForm = () => {
	const authToken = useSelector(selectAuthToken);
	const wishlist = useSelector(selectWishlist).wishlist;
	const blankFormFields = { wishName: '', wishPrice: '', wishUrl: '' };
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
				`http://localhost:4000/api/v1/wishlists/${wishlist.id}/wishes`,
				{
					name: formFields['wishName'],
					price: formFields['wishPrice'],
					url: formFields['wishUrl'],
				},
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			resetFormFields();
			dispatch(setDataTransferSuccess());
		} catch (err) {
			console.error(err);
			dispatch(setDataTransferError(err));
		}
	};

	return (
		<div className='gift-form-container'>
			<form onSubmit={handleSubmit}>
				<FormInput
					type='text'
					required
					placeholder='Name of the gift you would like to add'
					name='wishName'
					value={formFields['wishName']}
					onChange={handleChange}
				/>
				<FormInput
					type='text'
					required
					placeholder='Approx price'
					name='wishPrice'
					value={formFields['wishPrice']}
					onChange={handleChange}
				/>
				<FormInput
					type='text'
					required
					placeholder='URL'
					name='wishUrl'
					value={formFields['wishUrl']}
					onChange={handleChange}
				/>
				<Button type='submit'>Add!</Button>
			</form>
		</div>
	);
};
export default GiftForm;
