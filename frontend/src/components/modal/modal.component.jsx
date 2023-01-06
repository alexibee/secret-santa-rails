import './modal.styles.scss';
import { useSpring, animated } from 'react-spring';
import { useRef } from 'react';

const Modal = ({ wishlist, isVisible, setIsVisible }) => {
	const modalRef = useRef();

	const animation = useSpring({
		config: {
			duration: 8000,
		},
		opacity: isVisible ? 1 : 0,
		transform: isVisible ? `translateY(-0%)` : `translateY(-100%)`,
	});
	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setIsVisible(false);
		}
	};

	return isVisible ? (
		<div
			className='modal-bground'
			ref={modalRef}
			onClick={closeModal}
		>
			<animated.div style={animation}>
				<div className='modal-wrapper'>
					<>
						<h1>Their wishlist:</h1>
						<div>
							{!!wishlist.length ? (
								wishlist.map((gift) => <p key={gift.id}>{gift.name}</p>)
							) : (
								<h3>Nothing here yet!</h3>
							)}
						</div>
					</>
				</div>
			</animated.div>
		</div>
	) : null;
};
export default Modal;
