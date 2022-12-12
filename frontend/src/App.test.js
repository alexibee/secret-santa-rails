import axios from './lib/axios.js';
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
			const event = {
				id: 15,
				title: 'yeah',
				description: 'yeah',
				location: 'yeah',
				date: '2022-12-02',
				created_at: '2022-12-11T23:55:26.812Z',
				updated_at: '2022-12-11T23:55:26.812Z',
				organiser_id: 25,
			};
			axios.post.mockResolvedValueOnce(event);
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
			const token =
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNSIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY3MDgwMTYwMCwiZXhwIjoxNjcwODA1MjAwLCJqdGkiOiI0ZDlmNjk4YS1iM2Y4LTRkYjQtOGI4NS0yZjc1MzNlMmExMjQifQ.2muLXZxIov-9-AhTUmOMfiHKpfMmyDsIAVxHsAF4ecI';
			// when
			const result = await createEvent({ token, eventPayload });

			// then
			expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/events`);
			expect(result).toEqual(event);
		});
	});

	describe('when API call fails', () => {
		it('should return null', async () => {
			const message = 'Unprocessable entity';
			const error = new Error(message);
			error.code = 422;
			axios.post.mockRejectedValueOnce(error);

			const result = await createEvent({});

			expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/events`);
			expect(result).toEqual([]);
		});
	});
});
