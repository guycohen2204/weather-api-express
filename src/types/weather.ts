export interface WeatherResponse {
	location: {
		name: string;
		country: string;
		localTime: string;
		lat: number;
		lon: number;
	};
	current: {
		temp: number;
		condition: string;
		conditionIcon: string;
		uvIndex: number;
		windStatus: number;
		windDir: string;
		humidity: number;
		visibility: number;
		air_quality: number;
	};
}
