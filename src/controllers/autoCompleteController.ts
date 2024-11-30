import { Request, Response } from 'express';
import fetchHelper from '../utils/fetchHelper';
import { ENDPOINT } from '../config/environment';

export const getAutoComplete = async (req: Request, res: Response) => {
	try {
		const value: string = req.params.city;

		const response = await fetchHelper(`${ENDPOINT}/search.json`, value);
		if (!response.ok) {
			res.status(response.status).send({
				error: `failed to fetch auto complete data for ${value}`,
			});
		}

		const json: any = await response.json();

		const cityNamesList: string[] = json.map((obj: any) => obj.name);
		res.send(cityNamesList);
	} catch (error) {
		res.sendStatus(500).send({ error: 'Something bad happened' });
	}
};
