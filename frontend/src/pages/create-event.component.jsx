import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/button.component';
import DrawStep from '../components/draw/draw-step.component';
import EventStep from '../components/event-form/event-step.component';
import GroupStep from '../components/group-form/group-step.component';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../store/pagination/pagination.action';
import { selectCurrentPage } from '../store/pagination/pagination.selector';
import {
	selectMemberData,
	selectSantaEventDetails,
	selectShuffledMemberData,
} from '../store/santa-event/santa-event.selector';
import { selectAuthToken } from '../store/auth/auth.selector';
import {
	resetEventToInitialState,
	setDataTransferError,
	setDataTransferStart,
	setDataTransferSuccess,
	setPairsDetails,
} from '../store/santa-event/santa-event.action';

const CreateEvent = () => {
	const dispatch = useDispatch();
	const currentPage = useSelector(selectCurrentPage);
	const santaEvent = useSelector(selectSantaEventDetails);
	const authToken = useSelector(selectAuthToken);
	const shuffledMemberData = useSelector(selectShuffledMemberData);
	const memberData = useSelector(selectMemberData);
	const navigate = useNavigate();

	const onClickHappy = async (e) => {
		e.preventDefault();
		dispatch(setDataTransferStart);
		try {
			const pairs = memberData.map((member, ind) => {
				return {
					giver_nr: member.member_nr,
					receiver_nr: shuffledMemberData[ind].member_nr,
					exclusion: false,
				};
			});
			console.log(pairs);
			dispatch(setPairsDetails(pairs));
			const data = await axios.post(
				'http://localhost:4000/api/v1/events',
				{
					event: {
						event: santaEvent,
						members: memberData,
						pairs: pairs,
					},
				},
				{
					headers: {
						Authorization: authToken,
					},
				}
			);
			dispatch(setDataTransferSuccess);
			dispatch(resetEventToInitialState());
			console.log('event created');
			dispatch(setCurrentPage(1));
			navigate(`/myevents/${data.data.id}`);
		} catch (error) {
			console.error(error);
			dispatch(setDataTransferError(error));
		}
	};

	return (
		<div className='create-event-container'>
			<form onSubmit={onClickHappy}>
				<EventStep id='eventf' />
				<GroupStep id='groupf' />
				<DrawStep id='draw' />
				<Button
					type='submit'
					addClass={currentPage === 3 ? '' : ' d-none'}
				>
					Happy With the Pairs!
				</Button>
			</form>
		</div>
	);
};
export default CreateEvent;
