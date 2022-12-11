import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/pagination/pagination.action';
import { selectCurrentPage } from '../../store/pagination/pagination.selector';
import Button from '../button/button.component';
import './welcome.styles.scss';

const Welcome = () => {
	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();

	const onClickHandler = () => {
		dispatch(setCurrentPage(1));
	};
	return (
		<div className={`welcome-container${currentPage !== 0 ? ' d-none' : ''}`}>
			<div>
				<h1>Organising a Secret Santa Event?</h1>
				<Button onClick={onClickHandler}>LET'S START!</Button>
			</div>
		</div>
	);
};

export default Welcome;
