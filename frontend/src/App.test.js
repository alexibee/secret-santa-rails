import axios from 'axios';
// import { registerUserRequest } from './utils/auth.utils';

// const registeredEmail = `${Math.random()}@example.com`;

// test('register user request works with correct data', async () => {

//   const response = await registerUserRequest({ email: registeredEmail, password: 'secret', confirmPassword: 'secret'})
//   expect(response.data.message).toBe("Signed up sucessfully")
// })

import { BASE_URL, createEvent } from './utils/fetch.utils';

jest.mock('axios');

describe('createEvent', () => {
	describe('when API call is successful', () => {
		it('should return created event', async () => {
			const mockResponse = {
				event: {
					title: 'yeah',
					description: 'yeah',
					location: 'yeah',
					date: '2022-12-02',
				},
			};

			axios.post.mockResolvedValueOnce(mockResponse);
			const eventPayload = {
				event: {
					title: 'yeah',
					description: 'yeah',
					location: 'yeah',
					date: '2022-12-02',
				},
				members: [
					{ member_nr: 1, name: 'ha1', email: 'ha1@email.com' },
					{ member_nr: 2, name: 'ha2', email: 'ha2@email.com' },
					{ member_nr: 3, name: 'ha3', email: 'ha3@email.com' },
				],
				pairs: [
					{ giver_nr: 1, receiver_nr: 2, exclusion: false },
					{ giver_nr: 2, receiver_nr: 3, exclusion: false },
					{ giver_nr: 3, receiver_nr: 1, exclusion: false },
				],
			};
			const token = 'token';
			// when
			const result = await createEvent({ token, eventPayload });

			// then
			expect(axios.post).toHaveBeenCalledWith(
				`${BASE_URL}/events`,
				{ event: eventPayload },
				{
					headers: { Authorization: token },
				}
			);
			expect(result.event.title).toEqual('yeah');
		});
	});

	// describe('when API call fails', () => {
	// 	it('should throw', async () => {
	// 		const eventPayload = {
	// 			event: {
	// 				description: 'yeah',
	// 				location: 'yeah',
	// 				date: '2022-12-02',
	// 			},
	// 		};
	// 		const token = 'token';
	// 		const result = await createEvent({ token, eventPayload });
	// 		expect(axios.post).toHaveBeenCalledWith(
	// 			`${BASE_URL}/events`,
	// 			{ event: eventPayload },
	// 			{ headers: { Authorization: token } }
	// 		);
	// 		axios.post.mockRejectedValueOnce({
	// 			title: ["can't be blank"],
	// 		});

	// 		expect(result).toBe({
	// 			title: ["can't be blank"],
	// 		});
	// 	});
	// });
});
