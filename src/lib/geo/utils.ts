import { error } from "@sveltejs/kit";
import { PRIVATE_GEO_SERVER_API_KEY, PRIVATE_GEO_SERVER_URL } from "$env/static/private";


interface RequestOptions {
    url:string
    headers?:{ [id: string] : string; }
    method:string
    body:any
}

export async function cfetch<T>(options:RequestOptions): Promise<T> {

    // try {
        const response = await fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: JSON.stringify(options.body)
        });
        console.log(`===========\n Req URL: ${options.url} || Body: ${JSON.stringify(options.body)}\n================`)

        if (!response.ok) {
            if(response.status == 401){
                throw error(response.status, `Unauthorized`);
            }
            console.log(`===========\n Response Error: ${JSON.stringify(response)}\n================`)
            const err: ErrorGeoServer = await response.json();
            throw error(response.status, `error: ${err.message} | error_id: ${err.event_id}`);
        }


        console.log(`===========\n Response Date: ${JSON.stringify(response)}\n================`)
        const data: T = await response.json();
        
        return data;
    // } catch (err) {
    //     throw error(400, `Error fetching data: ${err}`);
    // }
}




interface GeoRequestOptions {
    relativeURL:string
    method:string
    body:any
}

export async function geofetch<T>(options:GeoRequestOptions): Promise<T> {


    const url = new URL(options.relativeURL, PRIVATE_GEO_SERVER_URL);
    return await cfetch<T>({
        url:url.toString(),
        headers: {
            'Content-Type': 'application/json',
            'Api-Key': PRIVATE_GEO_SERVER_API_KEY,
        },
        method: options.method,
        body: options.body
    })

}

