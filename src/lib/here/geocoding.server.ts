import { PRIVATE_HERE_APP_KEY } from '$env/static/private';
import { cfetch } from '$lib/utils';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

const addressSchema = z.string().min(1).max(12);

export async function fetchGeocodeServer(address:string):Promise<Point> {

    if(!addressSchema.safeParse(address).success){
        throw error(400, "Address input is wrong")
    }

    let point:Point = {
        lat:0.0,
        long:0.0,
    }

    // =========
    const params = {
        "q": address,
        "types": 'postalCode',
        "lang": 'en',
        "apiKey": PRIVATE_HERE_APP_KEY
    };
    const url = new URL("/v1/geocode", "https://geocode.search.hereapi.com");
    for (const [k, v] of Object.entries(params)) {
        url.searchParams.set(k, v);
    }
    const headers = {
        'User-Agent': 'TownWatch/1.0',
    };

    const locationData = await cfetch<GeocodeResponse>({
        url:url.toString(),
        headers,
        method:"GET",
    })

    point.lat = locationData.items[0].position.lat;
    point.long = locationData.items[0].position.lng;


    return point
}