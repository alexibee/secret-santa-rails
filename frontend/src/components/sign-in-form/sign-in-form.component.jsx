import { useState } from 'react';
import './sign-in-form.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { signInUserAsync } from '../../store/auth/auth.action';
import { selectAuthError } from '../../store/auth/auth.selector';

const blankFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(blankFormFields);
	const dispatch = useDispatch();
	const error = useSelector(selectAuthError);
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
		dispatch(signInUserAsync(formFields));
		if (error) {
			alert('Sign in failed!');
		} else {
			alert('Sign in successful!');
			resetFormFields();
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
