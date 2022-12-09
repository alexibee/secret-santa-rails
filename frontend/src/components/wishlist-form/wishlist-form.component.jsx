import axios from 'axios';
import { useContext, useState } from 'react';
import { LoadingContext } from '../../contexts/loading.context';
import { WishlistContext } from '../../contexts/wishlist.context';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './wishlist-form.styles.scss';

const WishlistForm = () => {
	const blankFormFields = { wishlistName: '' };
	const { isLoading, setIsLoading } = useContext(LoadingContext);
	const [formFields, setFormFields] = useState(blankFormFields);
	const { setWishlist } = useContext(WishlistContext);

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
			const data = await axios.post(`http://localhost:4000/api/v1/wishlists`, {
				name: formFields['wishlistName'],
			});
			setWishlist(data.data);
			resetFormFields();
			window.alert('created!');
			setIsLoading(false);
		} catch (err) {
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
