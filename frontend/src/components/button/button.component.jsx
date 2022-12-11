import './button.styles.scss';

const Button = ({ children, disabled, addClass, ...rest }) => {
	return (
		<button
			className={`button-container${addClass || ''}`}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
