import { useContext } from 'react';
import { PageContext } from '../../contexts/page.context';
import Button from '../button/button.component';
import './welcome.styles.scss';

const Welcome = () => {
	const { pageNr, setPageNr } = useContext(PageContext);
	const onClickHandler = () => {
		setPageNr(1);
	};
	return (
		<div className={`welcome-container${pageNr !== 0 ? ' d-none' : ''}`}>
			<div>
				<h1>Organising a Secret Santa Event?</h1>
				<Button onClick={onClickHandler}>LET'S START!</Button>
			</div>
		</div>
	);
};

export default Welcome;
