import axios from 'axios';

export const BASE_URL = 'http://localhost:4000/api/v1';

export const createEvent = async ({ token, eventPayload }) => {
	return await axios.post(
		`${BASE_URL}/events`,
		{
			event: eventPayload,
		},
		{
			headers: {
				Authorization: token,
			},
		}
	);
};
