import { Request, Response } from 'express';
import {
	fetchCurrentWeather,
	fetchAutocompleteSuggestions,
	fetchHourlyWeather,
	fetchTomorrowWeather,
	fetchDailyWeather,
} from '../services/weatherService';

export const getTest = (_req: Request, res: Response) => {
	res.send(`I'm alive!`);
};

export const getCurrentWeather = async (req: Request, res: Response) => {
	try {
        console.log('hi');
		const data = await fetchCurrentWeather(req.params.city);
        
		res.json(data);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

export const getAutocomplete = async (req: Request, res: Response) => {
	try {
		const data = await fetchAutocompleteSuggestions(req.params.city);
		res.json(data);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

export const getHourlyWeather = async (req: Request, res: Response) => {
	try {
		const data = await fetchHourlyWeather(req.params.city);
		res.json(data);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

export const getTomorrowWeather = async (req: Request, res: Response) => {
	try {
		const data = await fetchTomorrowWeather(req.params.city);
		res.json(data);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};

export const getDailyWeather = async (req: Request, res: Response) => {
	try {
		const data = await fetchDailyWeather(req.params.city);
		res.json(data);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		} else {
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
};
