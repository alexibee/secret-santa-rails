import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingContext } from '../../contexts/loading.context';
import { WishlistContext } from '../../contexts/wishlist.context';
import { selectAuthToken } from '../../store/auth/auth.selector';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

const GiftForm = () => {
	const authToken = useSelector(selectAuthToken);
	const blankFormFields = { giftName: '' };

	const [formFields, setFormFields] = useState(blankFormFields);
	const { setGift } = useContext(WishlistContext);
	const { isLoading, setIsLoading } = useContext(LoadingContext);
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(blankFormFields);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const data = await axios.post(
				`http://localhost:4000/api/v1/gifts`,
				{
					name: formFields['giftName'],
				},
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			setGift(data.data[0]);
			resetFormFields();
			setIsLoading(false);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='gift-form-container'>
			<form onSubmit={handleSubmit}>
				<FormInput
					type='text'
					required
					placeholder='Name of the gift you would like to add'
					name='giftName'
					value={formFields['giftName']}
					onChange={handleChange}
				/>
				<Button type='submit'>Add!</Button>
			</form>
		</div>
	);
};
export default GiftForm;
