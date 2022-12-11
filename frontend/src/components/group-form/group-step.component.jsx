import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './group-step.styles.scss';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import {
	selectGroupDetails,
	selectMemberCount,
} from '../../store/santa-event/santa-event.selector';
import {
	setGroupDetails,
	setMemberCount,
	setMemberData,
	setShuffledMemberData,
} from '../../store/santa-event/santa-event.action';

const GroupStep = () => {
	const dispatch = useDispatch();
	const currentPage = useSelector(selectCurrentPage);
	const memberCount = useSelector(selectMemberCount);
	const groupDetails = useSelector(selectGroupDetails);
	const blankFormFields = {};
	const [formFields, setFormFields] = useState(groupDetails || blankFormFields);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	useEffect(() => {
		memberCount.forEach((number) => {
			blankFormFields[`memberName${number}`] = '';
			blankFormFields[`memberName${number}Email`] = '';
		});
	}, [memberCount]);

	const onClickMoreMembers = (e) => {
		e.preventDefault();
		const newMemberCount = [
			...memberCount,
			memberCount[memberCount.length - 1] + 1,
		];
		dispatch(setMemberCount(newMemberCount));
	};

	const isRequired = (membNr) => {
		if (formFields[`memberName${membNr + 1}`]) return true;
		return false;
	};

	const setMemberDataFromFields = () => {
		const memberKeysArray = Object.keys(formFields);
		const length = memberKeysArray.length;

		const memberArray = [];
		for (let i = 0; i < length; i += 2) {
			const memberName = formFields[memberKeysArray[i]];
			const email = formFields[memberKeysArray[i + 1]];
			if (memberName) {
				memberArray.push({
					name: memberName,
					member_nr: parseInt(memberKeysArray[i].slice(10)),
					email: email,
				});
			}
		}
		dispatch(setMemberData(memberArray));
	};

	const onClickNext = (e) => {
		e.preventDefault();
		dispatch(setGroupDetails(formFields));
		setMemberDataFromFields();
		dispatch(setShuffledMemberData(null));
		dispatch(setCurrentPage(3));
	};
	const onClickBack = (e) => {
		e.preventDefault();
		dispatch(setGroupDetails(formFields));
		setMemberDataFromFields();
		dispatch(setShuffledMemberData(null));
		dispatch(setCurrentPage(1));
	};
	const buttonDisabled = !(
		formFields['memberName1'] &&
		formFields['memberName2'] &&
		formFields['memberName3']
	);

	return (
		<div
			className={`group-form-container${currentPage !== 2 ? ' d-none' : ''}`}
		>
			<div className='group-form-inner'>
				<h1>Add participants</h1>
				<h3>(at least 3)</h3>
				{memberCount.map((memb) => {
					return (
						<div
							key={memb}
							className='participant-line'
						>
							<FormInput
								type='text'
								label={`Participant ${memb}`}
								required={isRequired(memb)}
								placeholder={`Participant ${memb}`}
								name={`memberName${memb}`}
								value={formFields[`memberName${memb}`] || ''}
								onChange={handleChange}
							/>
							<FormInput
								type='text'
								placeholder={`Participant ${memb} email`}
								name={`memberName${memb}Email`}
								value={formFields[`memberName${memb}Email`] || ''}
								onChange={handleChange}
							/>
						</div>
					);
				})}
				<Button onClick={onClickMoreMembers}>+</Button>
				<div>
					<Button onClick={onClickBack}>Back</Button>
					<Button
						disabled={buttonDisabled}
						onClick={onClickNext}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};
export default GroupStep;
