import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { EventContext } from '../../contexts/event.context';
import { GroupContext } from '../../contexts/group.context';
import { PageContext } from '../../contexts/page.context';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

const GroupForm = () => {
	const { group, setGroup, members, setMembers } = useContext(GroupContext);
	const { pageNr, setPageNr } = useContext(PageContext);
	const { santaEvent } = useContext(EventContext);
	const [membersCount, setMembersCount] = useState([1, 2, 3, 4, 5]);
	const blankFormFields = {};

	const [formFields, setFormFields] = useState(blankFormFields);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	useEffect(() => {
		membersCount.forEach((number) => {
			blankFormFields[`memberName${number}`] = '';
			blankFormFields[`memberName${number}Email`] = '';
		});
	}, [membersCount]);

	const resetFormFields = () => {
		setFormFields(blankFormFields);
	};

	const onClickMoreMembers = (e) => {
		e.preventDefault();
		setMembersCount((prev) => [...prev, prev[prev.length - 1] + 1]);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formFields);
		const memberData = [];
		const formFieldKeys = Object.keys(formFields);
		for (let i = 0; i < formFieldKeys.length - 1; i += 2) {
			const memberName = formFields[formFieldKeys[i]];
			const email = formFields[formFieldKeys[i + 1]];
			if (memberName) {
				memberData.push({
					name: memberName,
					member_nr: formFieldKeys[i].slice(10),
					email: email,
				});
			}
		}
		try {
			const { data } = await axios.post(
				`http://localhost:4000/api/v1/events/${santaEvent.id}/groups`,
				{
					members: memberData,
				}
			);
			setGroup(data[0]);
			setMembers(data[1]);
			resetFormFields();
			window.alert('created!');
			setPageNr(3);
		} catch (err) {
			console.error(err);
		}
	};

	const onClickBack = () => {
		setPageNr(1);
	};
	// const onClickNext = () => {
	// 	setPageNr(3);
	// };

	const isRequired = (membNr) => {
		if (formFields[`memberName${membNr + 1}`]) return true;
		return false;
	};

	return (
		<div className={`group-form-container${pageNr !== 2 ? ' d-none' : ''}`}>
			<h1>Add participants</h1>
			<form onSubmit={handleSubmit}>
				{membersCount.map((memb) => {
					return (
						<div key={memb}>
							<FormInput
								type='text'
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
				{/* <a
					href='#eventf'
					onClick={onClickBack}
				>
					Back
				</a>
				<a
					href='#'
					onClick={onClickNext}
				>
					Next
				</a> */}
				<Button type='submit'>Add!</Button>
			</form>
		</div>
	);
};
export default GroupForm;
