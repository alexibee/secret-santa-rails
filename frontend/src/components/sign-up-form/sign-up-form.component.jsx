import { useState } from 'react';
import './sign-up-form.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { registerUserAsync } from '../../store/auth/auth.action';
import { selectAuthError } from '../../store/auth/auth.selector';
import { useNavigate } from 'react-router-dom';

const blankFormFields = {
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(blankFormFields);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector(selectAuthError);
	const { email, password, confirmPassword } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		dispatch(registerUserAsync(formFields));
		if (error) {
			alert('Sign up failed!');
		} else {
			alert('Sign up successful!');
			navigate('/');
		}
	};

	return (
		<div className='sign-up-container'>
			<h3>Sign up with your email and password</h3>
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
