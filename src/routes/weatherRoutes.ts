import { Router } from 'express';
import {
    getTest,
    getCurrentWeather,
    getAutocomplete,
    getHourlyWeather,
    getTomorrowWeather,
    getDailyWeather,
} from '../controllers/weatherController';

const router = Router();

router.get('/test', getTest);
router.get('/current/:city', getCurrentWeather);
router.get('/autocomplete/:city', getAutocomplete);
router.get('/hourly/:city', getHourlyWeather);
router.get('/tomorrow/:city', getTomorrowWeather);
router.get('/daily/:city', getDailyWeather);

export default router;
