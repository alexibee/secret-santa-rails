import './form-input.styles.scss';

const FormInput = ({ label, className, ...rest }) => {
	return (
		<div className='group'>
			<input
				className='form-input'
				{...rest}
			/>
			{label && <label className='form-input-label'>{label}</label>}
		</div>
	);
};

export default FormInput;
