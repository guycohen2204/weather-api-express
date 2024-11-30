import { Request, Response } from 'express';
import fetchHelper from '../utils/fetchHelper';
import { ENDPOINT } from '../config/environment';

export const getDailyForecast = async (req: Request, res: Response) => {
	try {
		const cityName: string = req.params.city;

		const response = await fetchHelper(`${ENDPOINT}/forecast.json`, cityName);
		if (!response.ok) {
			res.status(response.status).send({
				error: `failed to fetch hourly forecast data for ${cityName}`,
			});
		}

		const json: any = await response.json();

		const { forecast } = json;
		const { forecastday } = forecast;

		const dailyForecast = forecastday.map((dayObj: any) => {
			return {
				date: dayObj.date,
				max_temp: dayObj.day.maxtemp_c,
				min_temp: dayObj.day.mintemp_c,
				imageUrl: dayObj.day.condition.icon,
			};
		});

		res.send(dailyForecast);
	} catch (error) {
		res.sendStatus(500).send({ error: 'Something bad happened' });
	}
};
