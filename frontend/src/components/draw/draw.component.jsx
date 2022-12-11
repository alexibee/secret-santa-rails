import axios from 'axios';
import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EventContext } from '../../contexts/event.context';
import { GroupContext } from '../../contexts/group.context';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import Button from '../button/button.component';
import './draw.styles.scss';

const Draw = () => {
	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();
	const { santaEvent, setSantaEvent } = useContext(EventContext);
	const { members, group } = useContext(GroupContext);
	const [shuffledMembers, setShuffledMembers] = useState([]);
	let drawMembers = [...members];

	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	};

	const check = (drawArray, array) => {
		let a = true;
		drawArray.forEach((el, ind) => {
			if (el.id === array[ind].id) {
				a = false;
				return a;
			}
		});
		return a;
	};

	const shuffleAndCheck = () => {
		let shuffled = shuffleArray(drawMembers);
		if (check(shuffled, members)) {
			setShuffledMembers(shuffled);
			return;
		} else {
			shuffleAndCheck();
		}
	};

	const onClickHappy = () => {
		const responses = [];
		members.forEach(async (member, index) => {
			try {
				const { data } = await axios.post(
					`http://localhost:4000/api/v1/events/${santaEvent.id}/groups/${group.id}/pairs`,
					{
						giver_id: member.id,
						receiver_id: shuffledMembers[index].id,
						exclusion: false,
					}
				);
				responses.push(data);
			} catch (error) {
				console.error(error);
			}
			alert("It's done!");
			dispatch(setCurrentPage(0));
		});
		console.log(responses);
		// try {
		// 	const { data } = await axios.post(
		// 		`http://localhost:4000/api/v1/events/${santaEvent.id}/groups/${group.id}/pairs`,
		// 		{ pairs: pairs }
		// 	);
		// 	setPageNr(1);
		// 	console.log('success!');
		// } catch (error) {
		// 	console.error(error);
		// }
	};

	return (
		<div className={`draw-container${currentPage !== 3 ? ' d-none' : ''}`}>
			<div className='draw-inner-container'>
				<div className='draw-grid'>
					<div>
						<h1>Secret Santas:</h1>
						{members.map((member) => (
							<h6 key={member.id}> {member.name}</h6>
						))}
					</div>
					<div>
						<h1>Receivers of gifts:</h1>
						{shuffledMembers.map((member) => (
							<h6 key={member.id}> {member.name}</h6>
						))}
					</div>
				</div>
				<Button onClick={shuffleAndCheck}>Shuffle</Button>
				<Button onClick={onClickHappy}>Happy With the Pairs!</Button>
			</div>
		</div>
	);
};

export default Draw;
