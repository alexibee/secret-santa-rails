import { useEffect, useState } from 'react';
import './sign-in-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import axios from 'axios';

const blankFormFields = {
	email: '',
	password: '',
};

const SignInForm = ({ googleSignInHandler }) => {
	const [formFields, setFormFields] = useState(blankFormFields);
	const { setUserInfo, authToken, setAuthToken } = useContext(AuthContext);
	const { email, password } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(blankFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = await axios.post('http://localhost:4000/users/sign_in', {
				user: {
					email: email,
					password: password,
				},
			});
			console.log(data.headers.authorization);
			localStorage.setItem('authToken', data.headers.authorization);
			setAuthToken(data.headers.authorization);
			localStorage.setItem('user', JSON.stringify(data.data.user));
			setUserInfo(data.data.user);
			resetFormFields();
			window.alert('Sign in successful');
		} catch (err) {
			console.error(err);
			window.alert('Sign in failed!');
		}
	};

	return (
		<div className='sign-in-container'>
			<span>Sign in to your account</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					name='email'
					onChange={handleChange}
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					name='password'
					onChange={handleChange}
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'> Sign In </Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
