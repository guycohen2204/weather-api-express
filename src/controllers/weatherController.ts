import { Request, Response } from 'express';
import { ENDPOINT } from '../config/environment';
import fetchHelper from '../utils/fetchHelper';

export const getCurrentWeather = async (req: Request, res: Response) => {
	try {
		const cityName: string = req.params.city;

		const response = await fetchHelper(
			`${ENDPOINT}/current.json`,
			cityName
		);

		if (!response.ok) {
			res.status(response.status).send({
				error: `failed to fetch current weather data for ${cityName}`,
			});
		}

		const json: any = await response.json();

		const { location, current } = json;

		const relevantData = {
			location: {
				name: location.name,
				country: location.country,
				localTime: location.localtime,
			},
			current: {
				temp: current.temp_c,
				condition: current.condition.text,
				conditionIcon: current.condition.icon,
				uvIndex: current.uv,
				windStatus: current.wind_kph,
				windDir: current.wind_dir,
				humidity: current.humidity,
				visibility: current.vis_km,
				air_quality: current.air_quality.co,
			},
		};
		res.send(relevantData);
	} catch (error) {
		res.sendStatus(500).send({ error: 'Something bad happened' });
	}
};
