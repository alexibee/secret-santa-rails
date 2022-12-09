import axios from 'axios';
import { useContext, useEffect } from 'react';
import SignInForm from '../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../components/sign-up-form/sign-up-form.component';
import { AuthContext } from '../contexts/auth.context';

const Auth = () => {
	const { userInfo, setUserInfo, setAuthToken, authToken } =
		useContext(AuthContext);

	// localStorage.setItem('auth_token', data.headers.authorization);

	// useEffect(() => {
	// 	console.log(authToken);
	// 	axios.defaults.headers.common['Authorization'] = authToken || null;
	// }, [authToken]);

	// const onSubmitSignIn = async (e) => {
	// 	try {
	// 		e.preventDefault();
	// 		const target = e.target;
	// 		const { data } = await axios.post('http://localhost:4000/users/sign_in', {
	// 			email: target.email.value,
	// 			password: target.password.value,
	// 		});
	// 		localStorage.setItem('user', JSON.stringify(data.data.user));
	// 		setUserInfo(data.data.user);
	// 		window.alert('Sign in successful');
	// 	} catch (err) {
	// 		console.error(err);
	// 		window.alert('Sign in failed!');
	// 	}
	// };

	return (
		<div className='container'>
			<SignUpForm />
			<SignInForm />
			{/* <div className='signInForm'>
				<form onSubmit={onSubmitSignIn}>
					<div>
						<input
							name='email'
							type='text'
							placeholder='Email'
						/>
					</div>
					<div>
						<input
							name='password'
							type='password'
							placeholder='Password'
						/>
					</div>
					<div>
						<button type='submit'>Sign in</button>
					</div>
				</form> */}
			{/* </div> */}
		</div>
	);
};

export default Auth;
