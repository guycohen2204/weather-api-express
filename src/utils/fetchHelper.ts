import fetch from 'node-fetch';

const fetchHelper = async (url: string, query: string) => {
	return await fetch(`${url}?key=${process.env.API_KEY}&q=${query}`);
};

export default fetchHelper;
