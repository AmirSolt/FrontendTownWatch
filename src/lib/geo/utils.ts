import { PRIVATE_GEO_SERVER_API_KEY, PRIVATE_GEO_SERVER_URL } from "$env/static/private";
import { cfetch } from "$lib/utils";





interface GeoRequestOptions {
    relativeURL:string
    method:string
    body?:any
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

export function censorEventsQuery(censorEvents:boolean):string{
    return `censor_events=${String(censorEvents)}`
}