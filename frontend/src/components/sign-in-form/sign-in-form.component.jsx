import { useState } from 'react';
import './sign-in-form.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { signInUserAsync } from '../../store/auth/auth.action';
import { selectAuthError } from '../../store/auth/auth.selector';
import { useNavigate } from 'react-router-dom';

const blankFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(blankFormFields);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector(selectAuthError);
	const { email, password } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch(signInUserAsync(formFields));
		if (error) {
			alert('Sign in failed!');
		} else {
			alert('Sign in successful!');
			navigate('/');
		}
	};

	return (
		<div className='sign-in-container'>
			<h3>Sign in to your account</h3>
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
