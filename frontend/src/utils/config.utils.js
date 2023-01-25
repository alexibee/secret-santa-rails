export const BACKEND_URL =
	process.env.NODE_ENV === 'production'
		? 'https://secret-santa-react-rails.fly.dev'
		: 'http://localhost:4000/';
