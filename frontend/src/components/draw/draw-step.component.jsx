import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import { setShuffledMemberData } from '../../store/santa-event/santa-event.action';
import {
	selectGroupDetails,
	selectMemberData,
	selectShuffledMemberData,
} from '../../store/santa-event/santa-event.selector';
import Button from '../button/button.component';
import './draw-step.styles.scss';

const DrawStep = () => {
	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();
	const shuffledMemberData = useSelector(selectShuffledMemberData) || [];
	const memberData = useSelector(selectMemberData) || [];

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
			if (el.member_nr === array[ind].member_nr) {
				a = false;
				return a;
			}
		});
		return a;
	};

	const shuffleAndCheck = () => {
		let shuffled = shuffleArray([...memberData]);
		if (check(shuffled, memberData)) {
			dispatch(setShuffledMemberData(shuffled));
		} else {
			shuffleAndCheck();
		}
		return;
	};

	const onClickShuffleAndCheck = (e) => {
		e.preventDefault();
		shuffleAndCheck();
	};

	const onClickBack = (e) => {
		e.preventDefault();
		dispatch(setCurrentPage(2));
	};

	return (
		<div className={`draw-container${currentPage !== 3 ? ' d-none' : ''}`}>
			<div className='draw-inner-container'>
				<div className='draw-grid'>
					<div>
						<h2>Secret Santas:</h2>
						{memberData.map((member, ind) => (
							<div
								className='grid-cell'
								key={ind}
							>
								<h6>{member.name}</h6>
							</div>
						))}
					</div>
					<div>
						<h2>Receivers of gifts:</h2>
						{shuffledMemberData.map((member, ind) => (
							<div
								className='grid-cell'
								key={ind}
							>
								<h6>{member.name}</h6>
							</div>
						))}
					</div>
				</div>
				<div className='draw-button-container'>
					<Button onClick={onClickShuffleAndCheck}>Shuffle</Button>
					<Button onClick={onClickBack}>Back</Button>
				</div>
			</div>
		</div>
	);
};

export default DrawStep;
