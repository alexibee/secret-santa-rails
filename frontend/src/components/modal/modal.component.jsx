import './modal.styles.scss';
import { useSpring, animated } from '@react-spring/web';
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
	console.log(wishlist);

	return (
		<div
			className='modal-bground'
			ref={modalRef}
			onClick={closeModal}
		>
			<animated.div style={animation}>
				<div className='modal-wrapper'>
					<>
						<h1>Their wishlist:</h1>
						<div className='wishlist-content'>
							<ul>
								{!!wishlist.length ? (
									wishlist.map((gift) => (
										<li key={gift.id}>
											- {gift.name} £{gift.price}
											{!!gift.url && (
												<p>
													<a
														href={gift.url}
														target='_blank'
														rel='noreferrer'
													>
														see item
													</a>
												</p>
											)}
										</li>
									))
								) : (
									<h3>Nothing here yet!</h3>
								)}
							</ul>
						</div>
					</>
				</div>
			</animated.div>
		</div>
	);
};
export default Modal;
