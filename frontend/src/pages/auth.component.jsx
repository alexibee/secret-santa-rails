import axios from 'axios';
import { useContext, useEffect } from 'react';
import SignInForm from '../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../components/sign-up-form/sign-up-form.component';
import { AuthContext } from '../contexts/auth.context';

const Auth = () => {
	return (
		<div className='auth-container'>
			<SignUpForm />
			<SignInForm />
		</div>
	);
};

export default Auth;
