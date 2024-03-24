import { PRIVATE_HERE_APP_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';




export async function fetchGeocode(address:string):Promise<Point> {

    let point:Point = {
        lat:0.0,
        long:0.0,
    }

    const url = 'https://geocode.search.hereapi.com/v1/geocode';
    const headers = {
        'User-Agent': 'TownWatch/1.0',
    };
    const params = {
        q: address,
        types: 'postalCode',
        lang: 'en',
        apiKey: PRIVATE_HERE_APP_KEY
    };

    try {
        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`${url}${queryParams ? `?${queryParams}` : ''}`, {
            method: 'GET',
            headers: new Headers(headers)
        });

        if (!response.ok) {
            throw error(400, 'Could not find the address');
        }

        let data = await response.json();
        const locationData: GeocodeResponse = data;
        point.lat = locationData.items[0].position.lat;
        point.long = locationData.items[0].position.lng;

    } catch (err) {
        throw error(400, 'Could not find the address');
    }

    return point
}