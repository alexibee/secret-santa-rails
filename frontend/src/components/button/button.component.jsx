import './button.styles.scss';

const Button = ({ children, isLoading, ...rest }) => {
	return (
		<button
			className='button-container'
			disabled={isLoading}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
