const ENDPOINT = 'https://api.weatherapi.com/v1';

export const fetchCurrentWeather = async (city: string) => {
	const response = await fetch(
		`${ENDPOINT}/current.json?key=${process.env.API_KEY}&q=${city}&aqi=yes`
	);
	if (!response.ok)
		throw new Error(`Failed to fetch current weather data for ${city}`);
	const data = await response.json();
    
	return {
		location: {
			name: data.location.name,
			country: data.location.country,
			localTime: data.location.localtime,
			lat: data.location.lat,
			lon: data.location.lon,
		},
		current: {
			temp: data.current.temp_c,
			condition: data.current.condition.text,
			conditionIcon: data.current.condition.icon,
			uvIndex: data.current.uv,
			windStatus: data.current.wind_kph,
			windDir: data.current.wind_dir,
			humidity: data.current.humidity,
			visibility: data.current.vis_km,
			air_quality: data.current.air_quality.co,
		},
	};
};

export const fetchAutocompleteSuggestions = async (city: string) => {
	const response = await fetch(
		`${ENDPOINT}/search.json?key=${process.env.API_KEY}&q=${city}`
	);
	if (!response.ok)
		throw new Error(`Failed to fetch autocomplete data for ${city}`);
	const data = await response.json();
	return data.map((entry: any) => entry.name);
};

export const fetchHourlyWeather = async (city: string) => {
	const response = await fetch(
		`${ENDPOINT}/forecast.json?key=${process.env.API_KEY}&q=${city}&days=1&aqi=yes`
	);
	if (!response.ok)
		throw new Error(`Failed to fetch hourly forecast for ${city}`);
	const data = await response.json();
	const { hour } = data.forecast.forecastday[0];
	return hour.map((hourObj: any) => ({
		time: hourObj.time,
		temp: hourObj.temp_c,
		imageUrl: hourObj.condition.icon,
	}));
};

export const fetchTomorrowWeather = async (city: string) => {
	const response = await fetch(
		`${ENDPOINT}/forecast.json?key=${process.env.API_KEY}&q=${city}&days=2&aqi=yes`
	);
	if (!response.ok)
		throw new Error(`Failed to fetch tomorrow's weather for ${city}`);
	const data = await response.json();
	const { hour } = data.forecast.forecastday[1];
	return hour.map((hourObj: any) => ({
		time: hourObj.time,
		temp: hourObj.temp_c,
		imageUrl: hourObj.condition.icon,
	}));
};

export const fetchDailyWeather = async (city: string) => {
	const response = await fetch(
		`${ENDPOINT}/forecast.json?key=${process.env.API_KEY}&q=${city}&days=7&aqi=yes`
	);
	if (!response.ok)
		throw new Error(`Failed to fetch daily forecast for ${city}`);
	const data = await response.json();
	const { forecastday } = data.forecast;
	return forecastday.map((dayObj: any) => ({
		date: dayObj.date,
		max_temp: dayObj.day.maxtemp_c,
		min_temp: dayObj.day.mintemp_c,
		imageUrl: dayObj.day.condition.icon,
	}));
};
