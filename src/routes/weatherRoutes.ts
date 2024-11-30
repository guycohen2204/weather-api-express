import { Router } from 'express';

import { getCurrentWeather } from '../controllers/weatherController';
import { getAutoComplete } from '../controllers/autoCompleteController';
import { getHourlyForecast } from '../controllers/getHourlyForecast';
import { getDailyForecast } from '../controllers/getDailyForecast';

const router = Router();

router.get('/current/:city', getCurrentWeather);
router.get('/autocomplete/:city', getAutoComplete);
router.get('/hourly/:city', getHourlyForecast);
router.get('/daily/:city', getDailyForecast);

export default router;