import SignInForm from '../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../components/sign-up-form/sign-up-form.component';

const Auth = () => {
	return (
		<div className='auth-container'>
			<SignUpForm />
			<SignInForm />
		</div>
	);
};

export default Auth;
