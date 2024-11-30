import { Request, Response } from "express";
import fetchHelper from "../utils/fetchHelper";
import { ENDPOINT } from "../config/environment";


export const getHourlyForecast = async (req: Request, res: Response) => {
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
		const { hour } = forecastday[0];

		const hourlyForecast = hour.map((hourObj: any) => {
			return {
				time: hourObj.time,
				temp: hourObj.temp_c,
				imageUrl: hourObj.condition.icon,
			};
		});

		res.send(hourlyForecast);
	} catch (error) {
		res.sendStatus(500).send({ error: 'Something bad happened' });
	}
}