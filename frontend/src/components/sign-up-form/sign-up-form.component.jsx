import { useContext, useState } from 'react';
import './sign-up-form.styles.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import axios from 'axios';
import { AuthContext } from '../../contexts/auth.context';

const blankFormFields = {
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(blankFormFields);
	const { setAuthToken, setUserInfo } = useContext(AuthContext);
	const { email, password, confirmPassword } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(blankFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		try {
			const data = await axios.post('http://localhost:4000/users', {
				user: {
					email: email,
					password: password,
					password_confirmation: confirmPassword,
				},
			});
			localStorage.setItem('authToken', data.headers.authorization);
			setAuthToken(data.headers.authorization);
			localStorage.setItem('user', JSON.stringify(data.data.user));
			setUserInfo(data.data.user);
			resetFormFields();
			window.alert('Sign up successful!');
		} catch (err) {
			window.alert('Sign up failed!');
		}
	};

	return (
		<div className='sign-up-container'>
			<span>Sign up with your email and password</span>
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
				<FormInput
					label='Confirm Password'
					type='password'
					required
					name='confirmPassword'
					onChange={handleChange}
					value={confirmPassword}
				/>
				<Button type='submit'> Sign Up </Button>
			</form>
		</div>
	);
};
export default SignUpForm;
