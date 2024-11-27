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
                localTime: location.localtime
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
            }
        };
        res.send(relevantData);
    } catch (error) {
        res.sendStatus(500).send({ error: 'Something bad happened' })
    }
});

// TODO: add forcast endpoint
app.get('/forecast/:city', async (req: Request, res: Response) => {
	const cityName: string = req.params.city;
	const days: number = req.query.days ? +req.query.days : 0;

	const response = await fetch(
		`${ENDPOINT}/forecast.json?key=${process.env.API_KEY}&q=${cityName}&aqi=yes`
	);
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
