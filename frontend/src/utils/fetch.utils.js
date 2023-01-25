import axios from 'axios';
import { BACKEND_URL } from './config.utils';

export const createEvent = async ({ token, eventPayload }) => {
	return await axios.post(
		`${BACKEND_URL}/api/v1/events`,
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
