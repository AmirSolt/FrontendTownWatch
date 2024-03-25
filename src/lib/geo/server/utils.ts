import { error } from "@sveltejs/kit";
import { PRIVATE_GEO_SERVER_API_KEY, PRIVATE_GEO_SERVER_URL } from "$env/static/private";

interface RequestOptions {
    relativeURL:string
    method:string
    body:any
}

export async function fetchGeo<T>(options:RequestOptions): Promise<T> {

    // try {
        const url = new URL(options.relativeURL, PRIVATE_GEO_SERVER_URL);
        const response = await fetch(url.toString(), {
            method: options.method,
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': PRIVATE_GEO_SERVER_API_KEY,
            },
            body: JSON.stringify(options.body)
        });
        console.log(`===========\n Geo Server Req URL: ${url.toString()} || Body: ${JSON.stringify(options.body)}\n================`)

        if (!response.ok) {
            if(response.status == 401){
                throw error(response.status, `Unauthorized`);
            }
            console.log(`===========\n Geo Server Error: ${JSON.stringify(response)}\n================`)
            const err: ErrorGeoServer = await response.json();
            throw error(response.status, `error: ${err.message} | error_id: ${err.event_id}`);
        }


        console.log(`===========\n Geo Server Date: ${JSON.stringify(response)}\n================`)
        const data: T = await response.json();
        
        return data;
    // } catch (err) {
    //     throw error(400, `Error fetching data: ${err}`);
    // }
}

