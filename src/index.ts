import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const ENDPOINT = 'https://api.weatherapi.com/v1/';

app.use(cors());

app.get('/test', (req: Request, res: Response) => {
	res.send(`I'm alive!`);
});

app.get('/current/:city', async (req: Request, res: Response) => {
	try {
		const cityName: string = req.params.city;

		const response = await fetch(
			`${ENDPOINT}/current.json?key=${process.env.API_KEY}&q=${cityName}&aqi=yes`
		);

		if (!response.ok) {
			res.status(response.status).send({
				error: `failed to fetch current weather data for ${cityName}`,
			});
		}

		const json = await response.json();

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
});

app.get('/autocomplete/:city', async (req: Request, res: Response) => {
	try {
		const value: string = req.params.city;

		const response = await fetch(
			`${ENDPOINT}/search.json?key=${process.env.API_KEY}&q=${value}`
		);
		if (!response.ok) {
			res.status(response.status).send({
				error: `failed to fetch auto complete data for ${value}`,
			});
		}

		const json = await response.json();

		const cityNamesList: string[] = json.map((obj: any) => obj.name);
		res.send(cityNamesList);
	} catch (error) {
		res.sendStatus(500).send({ error: 'Something bad happened' });
	}
});

app.get('/hourly/:city', async (req: Request, res: Response) => {
	try {
		const cityName: string = req.params.city;

		const response = await fetch(
			`${ENDPOINT}/forecast.json?key=${process.env.API_KEY}&q=${cityName}&days=1&aqi=yes`
		);
		if (!response.ok) {
			res.status(response.status).send({
				error: `failed to fetch hourly forecast data for ${cityName}`,
			});
		}

		const json = await response.json();

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
});

app.get('/daily/:city', async (req: Request, res: Response) => {
	try {
		const cityName: string = req.params.city;

		const response = await fetch(
			`${ENDPOINT}/forecast.json?key=${process.env.API_KEY}&q=${cityName}&days=3&aqi=yes`
		);
		if (!response.ok) {
			res.status(response.status).send({
				error: `failed to fetch hourly forecast data for ${cityName}`,
			});
		}

		const json = await response.json();

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
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
